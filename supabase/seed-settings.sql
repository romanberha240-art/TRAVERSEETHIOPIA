-- Optional contact information used by the website.
-- Run after schema.sql if you want business contact details stored in Supabase too.
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
insert into public.site_settings (key, value) values
('contact', '{"phone":["+251924012897","+251911626671"],"whatsapp":["+251924012897","+251911626671"],"email":"traverseethiopia@gmail.com","address":"Addis Ababa, Ethiopia"}'::jsonb)
on conflict (key) do update set value = excluded.value, updated_at = now();
