# LINEUP / CS2

Русскоязычный Telegram-бот и адаптивный веб-каталог раскидок Counter-Strike 2.

- Mirage, Dust2, Anubis, Overpass и Nuke.
- Стороны T / CT, планы A / B / мид. На Nuke «мид» означает Outside / улицу.
- Видео конкретных бросков, ссылки на авторов, порядок выполнения плана.
- Избранное и отметки «отработано» в Telegram сохраняются в Supabase.
- Веб-избранное хранится на текущем устройстве; оно не синхронизируется с Telegram.

## Разработка

Node.js 24, npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Публичный каталог работает без секретов. Для Telegram и сохранений нужны серверные переменные из `.env.example`. Не добавляйте токены и пароли в репозиторий.

```sh
npm test
npm run typecheck
npm run build
```

## Telegram и Vercel

Импортируйте этот репозиторий в Vercel как Next.js. Укажите `APP_URL` — HTTPS-адрес production, `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_SECRET`, `SUPABASE_URL`, `SUPABASE_STORE_SECRET`. Секрет webhook — случайная строка из 32–256 символов `A-Z a-z 0-9 _ -`.

Production endpoint `/api/telegram` должен быть доступен Telegram без Vercel SSO. Сам endpoint проверяет `X-Telegram-Bot-Api-Secret-Token`. Preview может оставаться защищённым. После установки переменных выполните новый deploy.

После публикации запустите с теми же переменными в локальном `.env.local`:

```sh
npm run telegram:setup
```

Скрипт проверяет токен, задаёт команды, описание и webhook. Он не удаляет ожидающие обновления. Команды бота: `/start`, `/maps`, `/favorites`, `/progress`, `/help`, `/delete_me`.

## Данные

[Настройка Supabase и подготовка Oracle](docs/database.md). Supabase используется для текущего хранилища; Oracle не требуется для запуска. SQL-схема Oracle подготовлена отдельно — подключённого Oracle-инстанса нет.

Каталог: `src/data/catalog.ts`. Видео принадлежат указанным авторам. Ссылки проверяются по источникам, но броски не тестировались в игровом клиенте на текущем патче. Перед матчем повторите бросок на тренировочном сервере. Не используйте схемы интерфейса как точный радар карты.

## Структура

- `app/` — веб-каталог и защищённый Telegram webhook.
- `src/lib/bot.ts` — меню, команды и обработка Telegram callbacks.
- `src/lib/store.ts` — серверный клиент Supabase Edge Function.
- `database/` — схемы и код Edge Function.
- `tests/` — тесты меню, webhook, хранилища и каталога.

Бот сохраняет только Telegram ID, ID раскидок и отметки. Тексты сообщений и имена в базе не сохраняются. `/delete_me` удаляет избранное и прогресс после подтверждения.

## Telegram Mini App

Каталог открывается внутри Telegram: кнопка «Раскидки» рядом с полем ввода и кнопка «Открыть Mini App» в `/start`. После публикации `npm run telegram:setup` обновляет меню бота. Mini App использует Telegram WebApp SDK, встроенную кнопку назад и безопасные отступы. Избранное и прогресс синхронизируются с ботом через `/api/miniapp/state`. Сервер проверяет HMAC-подпись `initData` и срок до 1 часа, ID пользователя из тела запроса не используется. В обычном браузере сохраняется локальный режим.

## Видео внутри приложения

YouTube-источники воспроизводятся встроенным плеером. Для самостоятельных MP4/WebM предусмотрен нативный плеер без перехода на YouTube. Исходные MP4 от авторов пока не предоставлены; видео не выдаются за загруженные файлы.

Для импорта подготовьте JSON, где ключ — ID смока из `src/data/catalog.ts`, значение — путь к вашему файлу:

```json
{ "mirage-t-a-1": "/absolute/path/to/mirage-smoke.mp4" }
```

```sh
node scripts/import-smoke-videos.mjs /absolute/path/to/manifest.json
npm run build
```

Скрипт проверяет ID, формат и размер до 25 МБ, копирует ролики в `public/videos` с хешем содержимого и обновляет `src/data/media.ts`. Затем закоммитьте файлы и отправьте изменения — Vercel опубликует их вместе с приложением. Для MP4 рекомендуется H.264/AAC и faststart. Используйте файлы, которые можно публиковать. `docs/video-sources.json` содержит соответствие бросков и роликов источника.
