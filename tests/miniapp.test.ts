import { createHmac } from 'node:crypto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { verifyInitData } from '../src/lib/telegram-auth';
import { mapsView } from '../src/lib/bot';
import { plans } from '../src/data/catalog';
const mocks = vi.hoisted(() => ({ getUserState: vi.fn(), setFavorite: vi.fn(), setMastered: vi.fn() }));
vi.mock('../src/lib/store', () => mocks);
import { GET, POST } from '../app/api/miniapp/state/route';
const token = 'test-bot-token';
function signed(id = 123, date = Math.floor(Date.now() / 1000)) {
  const fields = { auth_date: String(date), query_id: 'test', user: JSON.stringify({ id, first_name: 'Test' }) };
  const secret = createHmac('sha256', 'WebAppData').update(token).digest();
  const check = Object.entries(fields).sort().map(([key, value]) => `${key}=${value}`).join('\n');
  return new URLSearchParams({ ...fields, hash: createHmac('sha256', secret).update(check).digest('hex') }).toString();
}
beforeEach(() => { vi.clearAllMocks(); vi.stubEnv('TELEGRAM_BOT_TOKEN', token); mocks.getUserState.mockResolvedValue({ favorites: [], mastered: [] }); });
describe('Telegram Mini App authentication', () => {
  it('verifies signed identities, rejects tampering and expired data', () => {
    expect(verifyInitData(signed(), token)).toBe(123);
    expect(verifyInitData(signed().replace('123', '456'), token)).toBeNull();
    expect(verifyInitData(signed(123, 1), token)).toBeNull();
    expect(verifyInitData(signed(), 'wrong-token')).toBeNull();
    expect(verifyInitData(signed() + '&user={}', token)).toBeNull();
  });
  it('rejects unsigned API requests without accessing storage', async () => {
    expect((await GET(new Request('https://test/state'))).status).toBe(401);
    expect(mocks.getUserState).not.toHaveBeenCalled();
  });
  it('always scopes writes to the signed identity and ignores body user IDs', async () => {
    const request = new Request('https://test/state', { method: 'POST', headers: { authorization: `tma ${signed(123)}` }, body: JSON.stringify({ telegramId: 456, grenadeId: plans[0].grenades[0].id, kind: 'favorite', value: true }) });
    expect((await POST(request)).status).toBe(200);
    expect(mocks.setFavorite).toHaveBeenCalledExactlyOnceWith(123, plans[0].grenades[0].id, true);
  });
  it('rejects missing catalog IDs', async () => {
    const request = new Request('https://test/state', { method: 'POST', headers: { authorization: `tma ${signed()}` }, body: JSON.stringify({ grenadeId: 'unknown', kind: 'favorite', value: true }) });
    expect((await POST(request)).status).toBe(400);
    expect(mocks.setFavorite).not.toHaveBeenCalled();
  });
  it('opens the catalog as a web_app inside Telegram', () => {
    expect(mapsView('https://test.example').reply_markup.inline_keyboard.at(-1)?.[0]).toEqual({ text: '🎮 Открыть Mini App', web_app: { url: 'https://test.example' } });
  });
});
