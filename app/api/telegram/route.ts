import { createTelegramCall, handleUpdate, parseUpdate, validWebhookSecret } from '../../../src/lib/bot';
import * as store from '../../../src/lib/store';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: Request): Promise<Response> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!token || !secret) return Response.json({ error: 'Bot is not configured' }, { status: 503 });
  if (!validWebhookSecret(request.headers.get('x-telegram-bot-api-secret-token'), secret)) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  if (Number(request.headers.get('content-length') ?? 0) > 262144) return Response.json({ error: 'Payload too large' }, { status: 413 });
  let body: unknown;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw) > 262144) return Response.json({ error: 'Payload too large' }, { status: 413 });
    body = JSON.parse(raw);
  } catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }); }
  const update = parseUpdate(body);
  if (!update) return Response.json({ error: 'Invalid update' }, { status: 400 });
  try {
    await handleUpdate(update, { call: createTelegramCall(token), store, appUrl: process.env.APP_URL });
    return Response.json({ ok: true });
  } catch {
    // No incoming messages, user identifiers, URLs or credentials in logs.
    console.error('Telegram update processing failed');
    return Response.json({ error: 'Temporary processing error' }, { status: 500 });
  }
}
