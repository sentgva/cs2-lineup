import { maps, plans, type Plan, type Grenade, type MapId, type Side, type Zone } from '../data/catalog';
import { createHash, timingSafeEqual } from 'node:crypto';

export type UserState = { favorites: string[]; mastered: string[] };
export interface BotStore {
  getUserState(userId: number): Promise<UserState>;
  setFavorite(userId: number, grenadeId: string, value: boolean): Promise<void>;
  setMastered(userId: number, grenadeId: string, value: boolean): Promise<void>;
  deleteUserData(userId: number): Promise<void>;
}
type Button = { text: string; callback_data?: string; url?: string };
export type BotView = { text: string; reply_markup: { inline_keyboard: Button[][] }; link_preview_options?: { is_disabled: boolean; url?: string; prefer_large_media?: boolean } };
export type TelegramCall = (method: string, payload: Record<string, unknown>) => Promise<unknown>;
type TelegramMessage = { message_id: number; chat: { id: number; type: string }; from?: { id: number }; text?: string };
export type TelegramUpdate = {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: { id: string; from: { id: number }; data?: string; message?: TelegramMessage };
};

const grenadeNames: Record<Grenade['type'], string> = { smoke: '💨 Смок', flash: '⚡ Флешка', molotov: '🔥 Молотов', he: '💥 HE' };
const difficultyNames = { easy: 'Легко', medium: 'Средне', hard: 'Сложно' };
const home = [{ text: '🗺 Карты', callback_data: 'home' }, { text: '⭐ Избранное', callback_data: 'favorites' }];

export function validWebhookSecret(supplied: string | null, expected: string): boolean {
  if (!supplied || !expected) return false;
  return timingSafeEqual(createHash('sha256').update(supplied).digest(), createHash('sha256').update(expected).digest());
}

export function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function view(text: string, rows: Button[][]): BotView {
  for (const row of rows) for (const button of row) {
    if (button.callback_data && Buffer.byteLength(button.callback_data) > 64) throw new Error('Callback exceeds Telegram limit');
  }
  return { text, reply_markup: { inline_keyboard: rows } };
}

function mapName(mapId: MapId) { return maps.find((map) => map.id === mapId)?.name ?? mapId; }
function zoneName(mapId: MapId, zone: Zone) {
  return zone === 'a' ? 'Плент A' : zone === 'b' ? 'Плент B' : maps.find((map) => map.id === mapId)?.midLabel ?? 'Мид';
}
function findGrenade(id: string) {
  for (const plan of plans) {
    const index = plan.grenades.findIndex((grenade) => grenade.id === id);
    if (index >= 0) return { plan, grenade: plan.grenades[index], index };
  }
  return undefined;
}

export function mapsView(appUrl?: string): BotView {
  const rows: Button[][] = maps.map((map) => [{ text: map.name, callback_data: `m:${map.id}` }]);
  rows.push([{ text: '⭐ Избранное', callback_data: 'favorites' }, { text: '🎯 Прогресс', callback_data: 'progress' }]);
  if (appUrl && /^https:\/\//.test(appUrl)) rows.push([{ text: '↗ Открыть каталог', url: appUrl }]);
  return view('<b>LINEUP / CS2</b>\n\nРаскидка начинается с плана.\nВыберите карту → сторону → зону. В каждой карточке — задача, порядок действий и видео броска.\n\n🗺 <b>5 карт · T / CT · A / B / мид</b>\nДля Nuke вместо обычного мида — улица.\n\nОбновления CS2 могут менять геометрию: перед матчем проверьте бросок на тренировочном сервере.', rows);
}

export function sidesView(mapId: MapId): BotView {
  return view(`<b>${mapName(mapId)}</b>\n\nЗа какую сторону играем?`, [
    [{ text: '🟠 T · Атака', callback_data: `s:${mapId}:t` }, { text: '🔵 CT · Защита', callback_data: `s:${mapId}:ct` }],
    [{ text: '← Все карты', callback_data: 'home' }],
  ]);
}

export function zonesView(mapId: MapId, side: Side): BotView {
  return view(`<b>${mapName(mapId)} / ${side.toUpperCase()}</b>\n\nВыберите план раунда.`, [
    (['a', 'b', 'mid'] as const).map((zone) => ({ text: zoneName(mapId, zone), callback_data: `z:${mapId}:${side}:${zone}` })),
    [{ text: '← Сторона', callback_data: `m:${mapId}` }],
  ]);
}

export function planView(plan: Plan): BotView {
  return view(`<b>${escapeHtml(mapName(plan.mapId))} / ${plan.side.toUpperCase()} / ${escapeHtml(zoneName(plan.mapId, plan.zone))}</b>\n\n<b>${escapeHtml(plan.title)}</b>\n${escapeHtml(plan.description)}\n\n${plan.steps.map((step, index) => `${index + 1}. ${escapeHtml(step)}`).join('\n')}\n\n<b>Броски и видео ↓</b>`, [
    ...plan.grenades.map((grenade, index) => [{ text: `${grenadeNames[grenade.type]} · ${grenade.title}`, callback_data: `g:${plan.id}:${index}` }]),
    [{ text: '← Планы', callback_data: `s:${plan.mapId}:${plan.side}` }], home,
  ]);
}

export function grenadeView(plan: Plan, index: number, state: UserState): BotView {
  const grenade = plan.grenades[index];
  const favorite = state.favorites.includes(grenade.id);
  const mastered = state.mastered.includes(grenade.id);
  const result = view(`<b>${escapeHtml(grenade.title)}</b>\n${escapeHtml(mapName(plan.mapId))} · ${plan.side.toUpperCase()} · ${grenadeNames[grenade.type]}\n\n<b>Откуда:</b> ${escapeHtml(grenade.from)}\n<b>Куда:</b> ${escapeHtml(grenade.to)}\n<b>Бросок:</b> ${escapeHtml(grenade.technique)}\n<b>Сложность:</b> ${difficultyNames[grenade.difficulty]}\n\n${grenade.steps.map((step, i) => `${i + 1}. ${escapeHtml(step)}`).join('\n')}\n\n🎬 <a href="${escapeHtml(grenade.videoUrl)}">Видео броска</a> — ориентир и момент броска.\nИсточник: ${escapeHtml(grenade.sourceName)}${mastered ? '\n\n✅ Вы отметили этот бросок как отработанный.' : ''}`, [
    [{ text: '▶ Смотреть видео', url: grenade.videoUrl }, { text: '↗ Источник', url: grenade.sourceUrl }],
    [{ text: favorite ? '★ Убрать из избранного' : '☆ В избранное', callback_data: `f:${plan.id}:${index}:${favorite ? 0 : 1}` }],
    [{ text: mastered ? '↺ Повторить тренировку' : '✓ Отработано', callback_data: `d:${plan.id}:${index}:${mastered ? 0 : 1}` }],
    [{ text: '← План раунда', callback_data: `z:${plan.mapId}:${plan.side}:${plan.zone}` }], home,
  ]);
  result.link_preview_options = { is_disabled: false, url: grenade.videoUrl, prefer_large_media: true };
  return result;
}

export function savedView(state: UserState, kind: 'favorites' | 'progress', page = 0): BotView {
  const saved = [...new Set(kind === 'favorites' ? state.favorites : state.mastered)].map(findGrenade).filter((item) => !!item);
  const lastPage = Math.max(0, Math.ceil(saved.length / 8) - 1);
  const currentPage = Math.min(Math.max(page, 0), lastPage);
  const rows: Button[][] = saved.slice(currentPage * 8, currentPage * 8 + 8).map(({ plan, grenade, index }) => [{ text: `${mapName(plan.mapId)} · ${grenade.title}`, callback_data: `g:${plan.id}:${index}` }]);
  if (lastPage > 0) {
    const paging: Button[] = [];
    if (currentPage > 0) paging.push({ text: '← Назад', callback_data: `${kind}:${currentPage - 1}` });
    if (currentPage < lastPage) paging.push({ text: 'Далее →', callback_data: `${kind}:${currentPage + 1}` });
    rows.push(paging);
  }
  rows.push([{ text: '🗺 Все карты', callback_data: 'home' }]);
  const title = kind === 'favorites' ? '⭐ Избранные раскидки' : '🎯 Прогресс тренировок';
  const count = kind === 'progress' ? `${saved.length} / ${new Set(plans.flatMap((plan) => plan.grenades.map((grenade) => grenade.id))).size} бросков отработано` : `${saved.length} сохранено`;
  return view(`<b>${title}</b>\n\n${saved.length ? count : 'Пока пусто. Откройте любую раскидку и отметьте её в карточке.'}${lastPage > 0 ? `\nСтраница ${currentPage + 1} / ${lastPage + 1}` : ''}\n\nСохраняется для вашего Telegram-аккаунта.`, rows);
}

export const helpView = () => view('<b>Как пользоваться</b>\n\n/start — карты и планы\n/maps — выбрать карту\n/favorites — избранные броски\n/progress — отработанные броски\n/delete_me — удалить избранное и прогресс\n\nВыберите карту, сторону и зону. Откройте бросок, посмотрите видео, повторите его в тренировке и нажмите «Отработано».\n\nМы сохраняем только Telegram ID, ID избранных и отработанных бросков. Секреты и история сообщений в базе не хранятся.\n\nНа Nuke раздел «мид» обозначает улицу. Наличие видео не означает проверку броска на текущем патче.', [home]);

export function parseUpdate(value: unknown): TelegramUpdate | null {
  if (!value || typeof value !== 'object') return null;
  const update = value as Record<string, unknown>;
  if (!Number.isSafeInteger(update.update_id) || Number(update.update_id) < 0) return null;
  const validUser = (user: unknown) => !!user && typeof user === 'object' && Number.isSafeInteger((user as { id?: unknown }).id) && Number((user as { id: number }).id) > 0;
  const validMessage = (message: unknown): boolean => {
    if (!message || typeof message !== 'object') return false;
    const item = message as Record<string, unknown>;
    const chat = item.chat as Record<string, unknown> | undefined;
    return Number.isSafeInteger(item.message_id) && !!chat && Number.isSafeInteger(chat.id) && typeof chat.type === 'string' && (item.text === undefined || typeof item.text === 'string') && (item.from === undefined || validUser(item.from));
  };
  if (update.message !== undefined && !validMessage(update.message)) return null;
  if (update.callback_query !== undefined) {
    const callback = update.callback_query as Record<string, unknown>;
    if (!callback || typeof callback.id !== 'string' || callback.id.length > 256 || !validUser(callback.from) || (callback.data !== undefined && (typeof callback.data !== 'string' || Buffer.byteLength(callback.data) > 64)) || (callback.message !== undefined && !validMessage(callback.message))) return null;
  }
  return value as TelegramUpdate;
}

export function createTelegramCall(token: string, fetcher: typeof fetch = fetch): TelegramCall {
  return async (method, payload) => {
    const response = await fetcher(`https://api.telegram.org/bot${token}/${method}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(12_000) });
    const result = await response.json() as { ok?: boolean; result?: unknown; description?: string };
    if (!response.ok || !result.ok) {
      if (method === 'editMessageText' && result.description?.includes('message is not modified')) return undefined;
      // Do not expose Telegram's response text or the secret-bearing URL to logs.
      throw new Error(`Telegram ${method} failed (${response.status})`);
    }
    return result.result;
  };
}

export async function handleUpdate(update: TelegramUpdate, options: { call: TelegramCall; store: BotStore; appUrl?: string }): Promise<void> {
  const { call, store, appUrl } = options;
  const callback = update.callback_query;
  const message = callback?.message ?? update.message;
  if (!message) return;
  const userId = callback?.from.id ?? message.from?.id;
  const isPrivate = message.chat.type === 'private' && message.chat.id === userId;
  if (callback) {
    await call('answerCallbackQuery', { callback_query_id: callback.id, ...(isPrivate ? {} : { text: 'Откройте бота в личном чате.', show_alert: true }) }).catch(() => undefined);
  }
  if (!isPrivate || !userId) {
    if (!callback && message.text?.startsWith('/')) await call('sendMessage', { chat_id: message.chat.id, text: 'Для избранного и персональных тренировок откройте бота в личном чате.' });
    return;
  }
  let result: BotView;
  const data = callback?.data;
  const command = message.text?.trim().split(/\s/)[0].split('@')[0];
  const storage = async <T>(operation: () => Promise<T>): Promise<T> => {
    try { return await operation(); } catch { throw new Error('BOT_STORAGE_UNAVAILABLE'); }
  };
  try {
  if (!callback) {
    if (command === '/help') result = helpView();
    else if (command === '/favorites' || command === '/progress') result = savedView(await storage(() => store.getUserState(userId)), command.slice(1) as 'favorites' | 'progress');
    else if (command === '/delete_me') result = view('<b>Удалить ваши данные?</b>\n\nИзбранное и прогресс будут удалены без возможности восстановления.', [[{ text: 'Удалить мои данные', callback_data: 'delete:confirm' }], [{ text: 'Отмена', callback_data: 'home' }]]);
    else result = mapsView(appUrl);
  } else if (data === 'delete:confirm') {
    await storage(() => store.deleteUserData(userId));
    result = view('Ваше избранное и прогресс удалены.', [[{ text: '🗺 К картам', callback_data: 'home' }]]);
  } else if (data === 'home') result = mapsView(appUrl);
  else if (data && /^(favorites|progress)(:\d{1,4})?$/.test(data)) {
    const [kind, page] = data.split(':');
    result = savedView(await storage(() => store.getUserState(userId)), kind as 'favorites' | 'progress', Number(page ?? 0));
  } else {
    const parts = data?.split(':') ?? [];
    const [action, id, sideOrIndex, zoneOrValue] = parts;
    const map = maps.find((item) => item.id === id);
    const side = sideOrIndex === 't' || sideOrIndex === 'ct' ? sideOrIndex : undefined;
    const zone = zoneOrValue === 'a' || zoneOrValue === 'b' || zoneOrValue === 'mid' ? zoneOrValue : undefined;
    const plan = plans.find((item) => item.id === id);
    const index = /^\d{1,2}$/.test(sideOrIndex ?? '') ? Number(sideOrIndex) : -1;
    if (action === 'm' && map && parts.length === 2) result = sidesView(map.id);
    else if (action === 's' && map && side && parts.length === 3) result = zonesView(map.id, side);
    else if (action === 'z' && map && side && zone && parts.length === 4) {
      const selectedPlan = plans.find((item) => item.mapId === map.id && item.side === side && item.zone === zone);
      result = selectedPlan ? planView(selectedPlan) : mapsView(appUrl);
    } else if (['g', 'f', 'd'].includes(action) && plan && plan.grenades[index] && (action === 'g' ? parts.length === 3 : parts.length === 4 && (zoneOrValue === '0' || zoneOrValue === '1'))) {
      if (action === 'f') await storage(() => store.setFavorite(userId, plan.grenades[index].id, zoneOrValue === '1'));
      if (action === 'd') await storage(() => store.setMastered(userId, plan.grenades[index].id, zoneOrValue === '1'));
      try { result = grenadeView(plan, index, await store.getUserState(userId)); }
      catch {
        result = grenadeView(plan, index, { favorites: [], mastered: [] });
        result.text += '\n\n⚠️ Избранное и прогресс временно недоступны. Видео можно смотреть.';
        result.reply_markup.inline_keyboard = result.reply_markup.inline_keyboard.filter((row) => !row.some((button) => button.callback_data?.startsWith('f:') || button.callback_data?.startsWith('d:')));
      }
    } else result = view('Эта кнопка устарела. Выберите раскидку заново.', [[{ text: '🗺 Карты', callback_data: 'home' }]]);
  }
  } catch (error) {
    if (!(error instanceof Error) || error.message !== 'BOT_STORAGE_UNAVAILABLE') throw error;
    result = view('Сохранение временно недоступно. Не удалось подтвердить изменение избранного или прогресса. Попробуйте ещё раз позже; карты и видео доступны.', [[{ text: '🗺 Карты', callback_data: 'home' }]]);
  }
  await call(callback ? 'editMessageText' : 'sendMessage', { chat_id: message.chat.id, ...(callback ? { message_id: message.message_id } : {}), ...result, parse_mode: 'HTML', link_preview_options: result.link_preview_options ?? { is_disabled: true } });
}
