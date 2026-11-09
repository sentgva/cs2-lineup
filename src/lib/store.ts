/** Server-side only. Never import this module into a client component. */
export type UserState = { favorites: string[]; mastered: string[] };

export class StorageUnavailableError extends Error {
  constructor() {
    super("Хранилище временно недоступно. Попробуйте ещё раз позже.");
    this.name = "StorageUnavailableError";
  }
}

type StoreAction =
  | { action: "get" | "delete"; telegramId: number }
  | { action: "set"; telegramId: number; grenadeId: string; kind: "favorite" | "mastered"; value: boolean };

async function request(action: StoreAction): Promise<unknown> {
  if (!Number.isSafeInteger(action.telegramId) || action.telegramId <= 0) {
    throw new TypeError("Invalid Telegram user ID");
  }
  if (action.action === "set" && (!/^[a-z0-9_-]{1,100}$/.test(action.grenadeId) || typeof action.value !== "boolean")) {
    throw new TypeError("Invalid lineup state");
  }
  const url = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_STORE_SECRET;
  if (!url || !secret) throw new StorageUnavailableError();
  try {
    const response = await fetch(`${url.replace(/\/$/, "")}/functions/v1/cs2-lineup-store`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-cs2-store-key": secret },
      body: JSON.stringify(action),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new StorageUnavailableError();
    return await response.json();
  } catch {
    // Never include upstream bodies, request headers, or credentials in logs/errors.
    throw new StorageUnavailableError();
  }
}

export async function getUserState(telegramId: number): Promise<UserState> {
  const data = await request({ action: "get", telegramId }) as Partial<UserState> | null;
  if (!data || !Array.isArray(data.favorites) || !Array.isArray(data.mastered) ||
      !data.favorites.every((id) => typeof id === "string") || !data.mastered.every((id) => typeof id === "string")) {
    throw new StorageUnavailableError();
  }
  return { favorites: data.favorites, mastered: data.mastered };
}

export async function setFavorite(telegramId: number, grenadeId: string, value: boolean): Promise<void> {
  await request({ action: "set", telegramId, grenadeId, kind: "favorite", value });
}

export async function setMastered(telegramId: number, grenadeId: string, value: boolean): Promise<void> {
  await request({ action: "set", telegramId, grenadeId, kind: "mastered", value });
}

export async function deleteUserData(telegramId: number): Promise<void> {
  await request({ action: "delete", telegramId });
}
