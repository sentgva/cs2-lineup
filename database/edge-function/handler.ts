type Dependencies = {
  secretHash: string;
  supabaseUrl: string;
  serviceKey: string;
  fetcher?: typeof fetch;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

async function authenticates(value: string, expectedHash: string): Promise<boolean> {
  if (value.length < 32 || value.length > 128 || !/^[a-f0-9]{64}$/.test(expectedHash)) return false;
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
  const expected = Uint8Array.from(expectedHash.match(/../g)!, (hex) => parseInt(hex, 16));
  let mismatch = 0;
  for (let i = 0; i < digest.length; i++) mismatch |= digest[i] ^ expected[i];
  return mismatch === 0;
}

export async function handleStoreRequest(req: Request, deps: Dependencies): Promise<Response> {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  if (!await authenticates(req.headers.get("x-cs2-store-key") || "", deps.secretHash)) {
    return json({ error: "unauthorized" }, 401);
  }
  if (!deps.supabaseUrl || !deps.serviceKey) return json({ error: "unavailable" }, 503);
  const contentLength = Number(req.headers.get("content-length") || 0);
  if (contentLength > 2048) return json({ error: "too_large" }, 413);
  let data: Record<string, unknown>;
  try {
    const body = await req.text();
    if (body.length > 2048) return json({ error: "too_large" }, 413);
    const parsed: unknown = JSON.parse(body);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return json({ error: "invalid_body" }, 400);
    data = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "invalid_json" }, 400);
  }
  if (typeof data.telegramId !== "number" || !Number.isSafeInteger(data.telegramId) || data.telegramId <= 0) {
    return json({ error: "invalid_user" }, 400);
  }
  if (!["get", "set", "delete"].includes(String(data.action))) return json({ error: "invalid_action" }, 400);
  if (data.action === "set" && (typeof data.grenadeId !== "string" || !/^[a-z0-9_-]{1,100}$/.test(data.grenadeId) ||
      !["favorite", "mastered"].includes(String(data.kind)) || typeof data.value !== "boolean")) {
    return json({ error: "invalid_mark" }, 400);
  }
  const headers: Record<string, string> = { apikey: deps.serviceKey, "content-type": "application/json" };
  // Modern sb_secret keys go only in apikey. Legacy service_role JWTs need Authorization too.
  if (!deps.serviceKey.startsWith("sb_secret_")) headers.Authorization = `Bearer ${deps.serviceKey}`;
  const base = `${deps.supabaseUrl.replace(/\/$/, "")}/rest/v1/cs2_lineup_marks`;
  const filter = `telegram_id=eq.${data.telegramId}`;
  const fetcher = deps.fetcher || fetch;
  const send = (url: string, options: RequestInit = {}) => fetcher(url, {
    ...options,
    headers: { ...headers, ...options.headers },
    signal: AbortSignal.timeout(6000),
  });
  try {
    if (data.action === "get") {
      const response = await send(`${base}?${filter}&select=grenade_id,kind&order=created_at.desc&limit=1000`);
      if (!response.ok) return json({ error: "database_unavailable" }, 503);
      const rows: { grenade_id: string; kind: string }[] = await response.json();
      return json({
        favorites: rows.filter((row) => row.kind === "favorite").map((row) => row.grenade_id),
        mastered: rows.filter((row) => row.kind === "mastered").map((row) => row.grenade_id),
      });
    }
    let response: Response;
    if (data.action === "delete") {
      response = await send(`${base}?${filter}`, { method: "DELETE" });
    } else if (data.value) {
      response = await send(base, {
        method: "POST",
        headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
        body: JSON.stringify({ telegram_id: data.telegramId, grenade_id: data.grenadeId, kind: data.kind }),
      });
    } else {
      response = await send(`${base}?${filter}&grenade_id=eq.${encodeURIComponent(String(data.grenadeId))}&kind=eq.${data.kind}`, { method: "DELETE" });
    }
    return response.ok ? json({ ok: true }) : json({ error: "database_unavailable" }, 503);
  } catch {
    return json({ error: "database_unavailable" }, 503);
  }
}
