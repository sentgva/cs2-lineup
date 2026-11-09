import { afterEach, describe, expect, it, vi } from "vitest";
import { handleStoreRequest } from "../database/edge-function/handler";
import { deleteUserData, getUserState, setFavorite, setMastered, StorageUnavailableError } from "../src/lib/store";

const secret = "test-only-key-with-at-least-thirty-two-characters";
const hash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret))))
  .map((byte) => byte.toString(16).padStart(2, "0")).join("");

function req(body: unknown, key = secret) {
  return new Request("https://test.invalid/store", {
    method: "POST", headers: { "x-cs2-store-key": key }, body: JSON.stringify(body),
  });
}

const config = { secretHash: hash, supabaseUrl: "https://test.supabase.co", serviceKey: "sb_secret_test" };

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("Edge store security and semantics", () => {
  it("rejects unauthenticated callers before touching the database", async () => {
    const fetcher = vi.fn();
    const response = await handleStoreRequest(req({ action: "get", telegramId: 42 }, "invalid"), { ...config, fetcher });
    expect(response.status).toBe(401);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it.each([
    { action: "get", telegramId: -1 },
    { action: "get", telegramId: "42" },
    { action: "set", telegramId: 42, grenadeId: "x&telegram_id=eq.43", kind: "favorite", value: true },
    { action: "set", telegramId: 42, grenadeId: "mirage-smoke", kind: "admin", value: true },
    { action: "set", telegramId: 42, grenadeId: "mirage-smoke", kind: "favorite", value: "true" },
  ])("rejects malformed operations %#", async (body) => {
    const fetcher = vi.fn();
    expect((await handleStoreRequest(req(body), { ...config, fetcher })).status).toBe(400);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("scopes reads to the verified user's ID and splits mark types", async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json([
      { grenade_id: "mirage-ct", kind: "favorite" }, { grenade_id: "dust2-mid", kind: "mastered" },
    ]));
    const response = await handleStoreRequest(req({ action: "get", telegramId: 42 }), { ...config, fetcher });
    expect(await response.json()).toEqual({ favorites: ["mirage-ct"], mastered: ["dust2-mid"] });
    expect(fetcher.mock.calls[0][0]).toContain("telegram_id=eq.42&");
  });

  it("uses idempotent insert semantics without overwriting the other mark", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
    const response = await handleStoreRequest(req({ action: "set", telegramId: 42, grenadeId: "mirage-ct", kind: "favorite", value: true }), { ...config, fetcher });
    expect(response.status).toBe(200);
    const options = fetcher.mock.calls[0][1];
    expect(options.headers.Prefer).toContain("resolution=ignore-duplicates");
    expect(JSON.parse(options.body)).toEqual({ telegram_id: 42, grenade_id: "mirage-ct", kind: "favorite" });
  });

  it("limits deletion to one user", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    await handleStoreRequest(req({ action: "delete", telegramId: 42 }), { ...config, fetcher });
    expect(fetcher.mock.calls[0][0]).toBe("https://test.supabase.co/rest/v1/cs2_lineup_marks?telegram_id=eq.42");
    expect(fetcher.mock.calls[0][1].method).toBe("DELETE");
  });

  it("does not expose upstream error bodies", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response("sensitive upstream error", { status: 500 }));
    const response = await handleStoreRequest(req({ action: "get", telegramId: 42 }), { ...config, fetcher });
    expect(response.status).toBe(503);
    expect(await response.text()).not.toContain("sensitive");
  });
});

describe("server storage adapter", () => {
  it("fails honestly when configuration is absent", async () => {
    vi.stubEnv("SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_STORE_SECRET", "");
    await expect(getUserState(42)).rejects.toBeInstanceOf(StorageUnavailableError);
  });

  it("sends explicit on/off operations and delete action", async () => {
    vi.stubEnv("SUPABASE_URL", "https://test.supabase.co");
    vi.stubEnv("SUPABASE_STORE_SECRET", secret);
    const fetcher = vi.fn().mockImplementation(() => Promise.resolve(Response.json({ ok: true })));
    vi.stubGlobal("fetch", fetcher);
    await setFavorite(42, "mirage-ct", true);
    await setMastered(42, "mirage-ct", false);
    await deleteUserData(42);
    const bodies = fetcher.mock.calls.map((call) => JSON.parse(call[1].body));
    expect(bodies).toEqual([
      { action: "set", telegramId: 42, grenadeId: "mirage-ct", kind: "favorite", value: true },
      { action: "set", telegramId: 42, grenadeId: "mirage-ct", kind: "mastered", value: false },
      { action: "delete", telegramId: 42 },
    ]);
  });
});
