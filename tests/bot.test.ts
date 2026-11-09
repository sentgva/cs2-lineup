import { beforeEach, describe, expect, it, vi } from 'vitest';
import { maps, plans } from '../src/data/catalog';
import { createTelegramCall, escapeHtml, grenadeView, handleUpdate, mapsView, parseUpdate, planView, savedView, validWebhookSecret, type BotStore, type TelegramUpdate } from '../src/lib/bot';

function message(text: string, userId = 123): TelegramUpdate {
  return { update_id: 1, message: { message_id: 1, chat: { id: userId, type: 'private' }, from: { id: userId }, text } };
}
function callback(data: string, userId = 123): TelegramUpdate {
  return { update_id: 2, callback_query: { id: 'callback-1', from: { id: userId }, data, message: { message_id: 1, chat: { id: userId, type: 'private' } } } };
}

describe('Telegram navigation and persistence', () => {
  const call = vi.fn().mockResolvedValue({});
  let state: { favorites: string[]; mastered: string[] };
  let store: BotStore;
  beforeEach(() => {
    call.mockClear();
    state = { favorites: [], mastered: [] };
    store = {
      getUserState: vi.fn(async () => structuredClone(state)),
      setFavorite: vi.fn(async (_user, id, value) => { state.favorites = value ? [...new Set([...state.favorites, id])] : state.favorites.filter((item) => item !== id); }),
      setMastered: vi.fn(async (_user, id, value) => { state.mastered = value ? [...new Set([...state.mastered, id])] : state.mastered.filter((item) => item !== id); }),
      deleteUserData: vi.fn(async () => { state = { favorites: [], mastered: [] }; }),
    };
  });

  it('starts with five maps and resolves map → side → zone → video', async () => {
    await handleUpdate(message('/start'), { call, store });
    expect(call).toHaveBeenLastCalledWith('sendMessage', expect.objectContaining({ text: expect.stringContaining('LINEUP'), chat_id: 123 }));
    expect(mapsView().reply_markup.inline_keyboard.slice(0, 5).map((row) => row[0].text)).toEqual(maps.map((map) => map.name));
    for (const plan of plans) {
      await handleUpdate(callback(`m:${plan.mapId}`), { call, store });
      await handleUpdate(callback(`s:${plan.mapId}:${plan.side}`), { call, store });
      await handleUpdate(callback(`z:${plan.mapId}:${plan.side}:${plan.zone}`), { call, store });
      expect(call).toHaveBeenLastCalledWith('editMessageText', expect.objectContaining({ text: expect.stringContaining(escapeHtml(plan.title)) }));
      for (let i = 0; i < plan.grenades.length; i++) {
        expect(grenadeView(plan, i, state).text.length).toBeLessThan(4096);
        await handleUpdate(callback(`g:${plan.id}:${i}`), { call, store });
        expect(call.mock.lastCall?.[1].reply_markup.inline_keyboard[0][0].url).toBe(plan.grenades[i].videoUrl);
        for (const row of grenadeView(plan, i, state).reply_markup.inline_keyboard) for (const button of row) {
          if (button.callback_data) expect(Buffer.byteLength(button.callback_data)).toBeLessThanOrEqual(64);
        }
      }
      expect(planView(plan).text.length).toBeLessThan(4096);
    }
  });

  it('makes repeated favorite and mastered writes idempotent', async () => {
    const plan = plans[0];
    await handleUpdate(callback(`f:${plan.id}:0:1`), { call, store });
    await handleUpdate(callback(`f:${plan.id}:0:1`), { call, store });
    await handleUpdate(callback(`d:${plan.id}:0:1`), { call, store });
    expect(state).toEqual({ favorites: [plan.grenades[0].id], mastered: [plan.grenades[0].id] });
    expect(store.setFavorite).toHaveBeenCalledWith(123, plan.grenades[0].id, true);
    await handleUpdate(callback(`f:${plan.id}:0:0`), { call, store });
    expect(state.favorites).toEqual([]);
  });

  it('rejects another user pressing a private-chat callback and all group writes', async () => {
    const forged = callback(`f:${plans[0].id}:0:1`);
    forged.callback_query!.from.id = 456;
    await handleUpdate(forged, { call, store });
    const group = callback(`d:${plans[0].id}:0:1`);
    group.callback_query!.message!.chat = { id: -100123, type: 'supergroup' };
    await handleUpdate(group, { call, store });
    expect(store.getUserState).not.toHaveBeenCalled();
    expect(store.setFavorite).not.toHaveBeenCalled();
    expect(store.setMastered).not.toHaveBeenCalled();
    expect(call.mock.calls.every(([method]) => method === 'answerCallbackQuery')).toBe(true);
  });

  it('requires a delete confirmation and only deletes the acting user', async () => {
    await handleUpdate(message('/delete_me'), { call, store });
    expect(store.deleteUserData).not.toHaveBeenCalled();
    await handleUpdate(callback('delete:confirm'), { call, store });
    expect(store.deleteUserData).toHaveBeenCalledExactlyOnceWith(123);
  });

  it('refuses malformed and stale callback commands', async () => {
    for (const data of [`f:${plans[0].id}:0:2`, `f:${plans[0].id}:-1:1`, `f:${plans[0].id}:0:1:extra`, 'z:mirage:t:bad', 'g:deleted-plan:0']) {
      await handleUpdate(callback(data), { call, store });
      expect(call.mock.lastCall?.[1].text).toContain('устарела');
    }
    expect(store.setFavorite).not.toHaveBeenCalled();
  });

  it('keeps videos available but does not claim saved state when storage fails', async () => {
    store.getUserState = vi.fn().mockRejectedValue(new Error('unavailable'));
    store.setFavorite = vi.fn().mockRejectedValue(new Error('unavailable'));
    await handleUpdate(callback(`g:${plans[0].id}:0`), { call, store });
    expect(call.mock.lastCall?.[1].text).toContain('временно недоступны');
    expect(call.mock.lastCall?.[1].reply_markup.inline_keyboard[0][0].url).toBe(plans[0].grenades[0].videoUrl);
    await handleUpdate(callback(`f:${plans[0].id}:0:1`), { call, store });
    expect(call.mock.lastCall?.[1].text).toContain('Не удалось подтвердить');
  });

  it('paginates saved collections and removes unknown saved IDs', () => {
    const ids = [...new Set(plans.flatMap((plan) => plan.grenades.map((grenade) => grenade.id)))];
    const result = savedView({ favorites: [...ids, 'removed-id'], mastered: [] }, 'favorites');
    expect(result.reply_markup.inline_keyboard.filter((row) => row[0].callback_data?.startsWith('g:'))).toHaveLength(Math.min(8, ids.length));
    expect(result.text).not.toContain('removed-id');
  });
});

describe('Telegram request security', () => {
  it('compares webhook secrets without accepting blank or altered values', () => {
    expect(validWebhookSecret('a'.repeat(48), 'a'.repeat(48))).toBe(true);
    expect(validWebhookSecret('a'.repeat(47) + 'b', 'a'.repeat(48))).toBe(false);
    expect(validWebhookSecret(null, 'secret')).toBe(false);
    expect(validWebhookSecret('', '')).toBe(false);
  });

  it('rejects malformed updates and preserves legitimate updates', () => {
    expect(parseUpdate(message('/start'))).not.toBeNull();
    expect(parseUpdate(callback('home'))).not.toBeNull();
    expect(parseUpdate({ update_id: 123, edited_message: {} })).not.toBeNull();
    for (const value of [null, [], {}, { update_id: '1' }, { update_id: 1, message: {} }, { update_id: 1, callback_query: null }, { update_id: 1, callback_query: { id: 'x', from: { id: 1 }, data: 'a'.repeat(65) } }]) expect(parseUpdate(value)).toBeNull();
  });

  it('escapes HTML in displayed content', () => {
    expect(escapeHtml('<script>"x" & y</script>')).toBe('&lt;script&gt;&quot;x&quot; &amp; y&lt;/script&gt;');
  });

  it('handles harmless edit retries and sanitizes API errors', async () => {
    const same = createTelegramCall('test-token', vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: false, description: 'Bad Request: message is not modified' }), { status: 400 })));
    await expect(same('editMessageText', {})).resolves.toBeUndefined();
    const error = createTelegramCall('test-token', vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: false, description: 'do not leak this' }), { status: 401 })));
    await expect(error('sendMessage', {})).rejects.toThrow('Telegram sendMessage failed (401)');
  });
});
