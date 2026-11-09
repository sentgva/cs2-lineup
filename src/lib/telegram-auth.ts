import { createHmac, timingSafeEqual } from 'node:crypto';

/** Verify raw Telegram Mini App initData on the server. Never trust initDataUnsafe. */
export function verifyInitData(raw: string, token: string, now = Math.floor(Date.now() / 1000)): number | null {
  if (!token || !raw || raw.length > 16384) return null;
  const params = new URLSearchParams(raw);
  const supplied = params.get('hash');
  if (!supplied || !/^[a-f0-9]{64}$/i.test(supplied)) return null;
  const seen = new Set<string>();
  for (const key of params.keys()) { if (seen.has(key)) return null; seen.add(key); }
  params.delete('hash');
  const check = [...params.entries()].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, value]) => `${key}=${value}`).join('\n');
  const secret = createHmac('sha256', 'WebAppData').update(token).digest();
  const expected = createHmac('sha256', secret).update(check).digest();
  if (!timingSafeEqual(expected, Buffer.from(supplied, 'hex'))) return null;
  const date = Number(params.get('auth_date'));
  if (!Number.isSafeInteger(date) || date > now + 30 || now - date > 3600) return null;
  try {
    const user: unknown = JSON.parse(params.get('user') || 'null');
    const id = (user as { id?: unknown } | null)?.id;
    return typeof id === 'number' && Number.isSafeInteger(id) && id > 0 ? id : null;
  } catch { return null; }
}
