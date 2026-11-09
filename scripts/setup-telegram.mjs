// Run with Node 24: node --env-file=.env.local scripts/setup-telegram.mjs
// Credentials are never accepted as command-line flags or printed.
const token = process.env.TELEGRAM_BOT_TOKEN;
const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
const baseUrl = process.env.APP_URL;
if (!token || !secret || !baseUrl) {
  console.error('Set TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET and APP_URL.');
  process.exit(1);
}
let parsed;
try { parsed = new URL(baseUrl); } catch { console.error('APP_URL must be a valid HTTPS URL.'); process.exit(1); }
if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== '/') {
  console.error('APP_URL must be an HTTPS origin without credentials, path, query or fragment.');
  process.exit(1);
}
if (!/^[A-Za-z0-9_-]{32,256}$/.test(secret)) {
  console.error('TELEGRAM_WEBHOOK_SECRET must be 32–256 letters, numbers, underscores or hyphens.');
  process.exit(1);
}
async function telegram(method, body = {}) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(15_000),
  });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error(`Telegram ${method} failed (${response.status})`);
  return result.result;
}
try {
  const me = await telegram('getMe');
  await telegram('setMyCommands', { commands: [
    { command: 'start', description: 'Карты и планы раскидок' },
    { command: 'maps', description: 'Выбрать карту' },
    { command: 'favorites', description: 'Избранные раскидки' },
    { command: 'progress', description: 'Прогресс тренировок' },
    { command: 'help', description: 'Как пользоваться ботом' },
    { command: 'delete_me', description: 'Удалить избранное и прогресс' },
  ] });
  await telegram('setMyDescription', { description: 'Раскидки CS2: Mirage, Dust2, Anubis, Overpass и Nuke. Планы за T и CT для A, B и мида, видео каждого броска, избранное и прогресс тренировок.' });
  await telegram('setMyShortDescription', { short_description: 'CS2-раскидки с видео · 5 карт · T / CT · A / B / мид' });
  await telegram('setWebhook', { url: `${parsed.origin}/api/telegram`, secret_token: secret, allowed_updates: ['message', 'callback_query'], max_connections: 20, drop_pending_updates: false });
  const webhook = await telegram('getWebhookInfo');
  console.log(JSON.stringify({ bot: `https://t.me/${me.username}`, webhookUrl: webhook.url, pendingUpdates: webhook.pending_update_count, hasCustomCertificate: webhook.has_custom_certificate }, null, 2));
} catch (error) {
  // Network errors may contain a secret-bearing URL; output only our fixed message.
  console.error(error instanceof Error && /^Telegram \w+ failed \(\d+\)$/.test(error.message) ? error.message : 'Telegram setup failed. Check connectivity and server-side settings.');
  process.exit(1);
}
