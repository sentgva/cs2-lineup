-- Isolated CS2 bot data. No usernames, chat messages, or Telegram credentials.
create table public.cs2_lineup_marks (
  telegram_id bigint not null check (telegram_id > 0 and telegram_id <= 9007199254740991),
  grenade_id text not null check (grenade_id ~ '^[a-z0-9_-]{1,100}$'),
  kind text not null check (kind in ('favorite', 'mastered')),
  created_at timestamptz not null default now(),
  primary key (telegram_id, grenade_id, kind)
);

alter table public.cs2_lineup_marks enable row level security;
revoke all on table public.cs2_lineup_marks from public, anon, authenticated;
grant select, insert, delete on table public.cs2_lineup_marks to service_role;

comment on table public.cs2_lineup_marks is
  'CS2 Telegram bot favorites and training marks; server-only access via authenticated cs2-lineup-store Edge Function.';
