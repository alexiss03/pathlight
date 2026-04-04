create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  name text not null,
  role text not null default 'member' check (role in ('member', 'admin')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.study_states (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  completed_readings jsonb not null default '{}'::jsonb,
  notes jsonb not null default '[]'::jsonb,
  reflections jsonb not null default '[]'::jsonb,
  prayers jsonb not null default '[]'::jsonb,
  bookmarks jsonb not null default '[]'::jsonb,
  study_days jsonb not null default '[]'::jsonb,
  bible_reader jsonb not null default '{"book":"Genesis","chapter":1,"translation":"kjv"}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  author_name text not null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.is_admin(check_user_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = check_user_id
      and role = 'admin'
  );
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

drop trigger if exists study_states_set_updated_at on public.study_states;
create trigger study_states_set_updated_at
before update on public.study_states
for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.study_states enable row level security;
alter table public.announcements enable row level security;

drop policy if exists "profiles_select_self_or_admin" on public.profiles;
create policy "profiles_select_self_or_admin"
on public.profiles for select
using (auth.uid() = id or public.is_admin(auth.uid()));

drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self"
on public.profiles for insert
with check (auth.uid() = id);

drop policy if exists "profiles_update_self_or_admin" on public.profiles;
create policy "profiles_update_self_or_admin"
on public.profiles for update
using (auth.uid() = id or public.is_admin(auth.uid()))
with check (auth.uid() = id or public.is_admin(auth.uid()));

drop policy if exists "profiles_delete_admin" on public.profiles;
create policy "profiles_delete_admin"
on public.profiles for delete
using (public.is_admin(auth.uid()));

drop policy if exists "study_states_select_self_or_admin" on public.study_states;
create policy "study_states_select_self_or_admin"
on public.study_states for select
using (auth.uid() = user_id or public.is_admin(auth.uid()));

drop policy if exists "study_states_insert_self_or_admin" on public.study_states;
create policy "study_states_insert_self_or_admin"
on public.study_states for insert
with check (auth.uid() = user_id or public.is_admin(auth.uid()));

drop policy if exists "study_states_update_self_or_admin" on public.study_states;
create policy "study_states_update_self_or_admin"
on public.study_states for update
using (auth.uid() = user_id or public.is_admin(auth.uid()))
with check (auth.uid() = user_id or public.is_admin(auth.uid()));

drop policy if exists "study_states_delete_admin" on public.study_states;
create policy "study_states_delete_admin"
on public.study_states for delete
using (public.is_admin(auth.uid()));

drop policy if exists "announcements_select_public" on public.announcements;
create policy "announcements_select_public"
on public.announcements for select
using (true);

drop policy if exists "announcements_write_admin" on public.announcements;
create policy "announcements_write_admin"
on public.announcements for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));
