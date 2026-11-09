import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '../app/api/telegram/route';

describe('Telegram webhook HTTP boundary', () => {
  const fetchMock = vi.fn();
  const secret = 'test-secret-with-at-least-thirty-two-characters';
  const request = (body: string, suppliedSecret: string | undefined = secret, extraHeaders: Record<string, string> = {}) => new Request('http://localhost/api/telegram', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(suppliedSecret ? { 'x-telegram-bot-api-secret-token': suppliedSecret } : {}), ...extraHeaders },
    body,
  });
  beforeEach(() => {
    vi.stubEnv('TELEGRAM_BOT_TOKEN', 'test-token');
    vi.stubEnv('TELEGRAM_WEBHOOK_SECRET', secret);
    vi.stubGlobal('fetch', fetchMock);
    fetchMock.mockReset();
  });
  afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

  it('requires configured server secrets', async () => {
    vi.stubEnv('TELEGRAM_BOT_TOKEN', '');
    expect((await POST(request('{"update_id":1}'))).status).toBe(503);
    vi.stubEnv('TELEGRAM_BOT_TOKEN', 'test-token');
    vi.stubEnv('TELEGRAM_WEBHOOK_SECRET', '');
    expect((await POST(request('{"update_id":1}'))).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('denies missing or incorrect webhook authentication before parsing payloads', async () => {
    expect((await POST(request('not-json', ''))).status).toBe(401);
    expect((await POST(request('not-json', `${secret}x`))).status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects malformed JSON, invalid updates and excessive payloads', async () => {
    expect((await POST(request('not-json'))).status).toBe(400);
    expect((await POST(request('{"update_id":"bad"}'))).status).toBe(400);
    expect((await POST(request('{"update_id":1,"callback_query":null}'))).status).toBe(400);
    expect((await POST(request(' '.repeat(262145)))).status).toBe(413);
    expect((await POST(request('{}', secret, { 'content-length': '262145' }))).status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('acknowledges unsupported but valid updates without making outbound calls', async () => {
    const response = await POST(request('{"update_id":12,"edited_message":{"text":"ignored"}}'));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
