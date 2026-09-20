-- Run this script once in Supabase SQL Editor.
create extension if not exists pgcrypto;
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null,
  phone text, tour text, dates text, people text, budget text, message text,
  created_at timestamptz not null default now()
);
create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('itinerary', 'post', 'image')),
  title text not null, slug text unique, excerpt text, body text, image_url text,
  published boolean not null default false, metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists content_items_type_published_idx on public.content_items(type, published, created_at desc);
alter table public.inquiries enable row level security;
alter table public.content_items enable row level security;
-- The backend uses the Supabase service-role key and performs protected writes.
-- Do not expose that key in browser code.
