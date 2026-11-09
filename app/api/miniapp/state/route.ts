import { verifyInitData } from '../../../../src/lib/telegram-auth';
import { getUserState, setFavorite, setMastered } from '../../../../src/lib/store';
import { plans } from '../../../../src/data/catalog';
export const runtime = 'nodejs';
const ids = new Set(plans.flatMap(plan => plan.grenades.map(grenade => grenade.id)));
function identity(request: Request) {
  const header = request.headers.get('authorization') || '';
  return header.startsWith('tma ') ? verifyInitData(header.slice(4), process.env.TELEGRAM_BOT_TOKEN || '') : null;
}
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
export async function GET(request: Request) {
  const id = identity(request);
  if (!id) return json({ error: 'Откройте приложение заново через Telegram.' }, 401);
  try { return json(await getUserState(id)); }
  catch { return json({ error: 'Хранилище временно недоступно.' }, 503); }
}
export async function POST(request: Request) {
  const id = identity(request);
  if (!id) return json({ error: 'Откройте приложение заново через Telegram.' }, 401);
  if (Number(request.headers.get('content-length')) > 2048) return json({ error: 'Слишком большой запрос.' }, 413);
  let data;
  try { const raw = await request.text(); if (Buffer.byteLength(raw) > 2048) return json({ error: 'Слишком большой запрос.' }, 413); data = JSON.parse(raw); }
  catch { return json({ error: 'Некорректный запрос.' }, 400); }
  if (!data || !ids.has(data.grenadeId) || !['favorite', 'mastered'].includes(data.kind) || typeof data.value !== 'boolean') return json({ error: 'Некорректная отметка.' }, 400);
  try {
    await (data.kind === 'favorite' ? setFavorite : setMastered)(id, data.grenadeId, data.value);
    return json(await getUserState(id));
  } catch { return json({ error: 'Не удалось сохранить отметку. Попробуйте ещё раз.' }, 503); }
}
