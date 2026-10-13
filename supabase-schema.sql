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

create table if not exists public.study_circle_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  author_name text not null,
  reference text not null default '',
  title text not null,
  body text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.study_circle_prayers (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  author_name text not null,
  category text not null default 'Personal',
  text text not null,
  answered boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.study_circle_members (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  user_name text not null,
  user_email text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  requested_at timestamptz not null default timezone('utc', now()),
  approved_at timestamptz,
  approved_by uuid references public.profiles (id) on delete set null
);

create or replace function public.is_admin(check_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = check_user_id
      and role = 'admin'
  );
$$;

create or replace function public.is_study_circle_member(check_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.study_circle_members
    where user_id = check_user_id
      and status = 'approved'
  );
$$;

-- RLS controls row access; these guards protect privileged column changes.
create or replace function public.guard_profile_role()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if auth.uid() is not null and not public.is_admin(auth.uid()) then
    if tg_op = 'INSERT' then
      if new.role <> 'member' then
        raise exception 'Only admins can assign admin roles';
      end if;
    elsif new.role is distinct from old.role then
      raise exception 'Only admins can change roles';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_guard_role on public.profiles;
create trigger profiles_guard_role before insert or update on public.profiles
for each row execute function public.guard_profile_role();

create or replace function public.guard_circle_approval()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if auth.uid() is not null and not public.is_admin(auth.uid()) then
    if new.status <> 'pending' or new.approved_at is not null or new.approved_by is not null then
      raise exception 'Only admins can approve circle membership';
    end if;
    if tg_op = 'UPDATE' and old.status = 'approved' then
      raise exception 'Only admins can change approved membership';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists study_circle_guard_approval on public.study_circle_members;
create trigger study_circle_guard_approval before insert or update on public.study_circle_members
for each row execute function public.guard_circle_approval();

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
alter table public.study_circle_posts enable row level security;
alter table public.study_circle_prayers enable row level security;
alter table public.study_circle_members enable row level security;

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

drop policy if exists "study_circle_posts_select_public" on public.study_circle_posts;
create policy "study_circle_posts_select_public"
on public.study_circle_posts for select
using (public.is_study_circle_member(auth.uid()) or public.is_admin(auth.uid()));

drop policy if exists "study_circle_posts_insert_self" on public.study_circle_posts;
create policy "study_circle_posts_insert_self"
on public.study_circle_posts for insert
with check ((auth.uid() = author_id and public.is_study_circle_member(auth.uid())) or public.is_admin(auth.uid()));

drop policy if exists "study_circle_posts_update_owner_or_admin" on public.study_circle_posts;
create policy "study_circle_posts_update_owner_or_admin"
on public.study_circle_posts for update
using ((auth.uid() = author_id and public.is_study_circle_member(auth.uid())) or public.is_admin(auth.uid()))
with check ((auth.uid() = author_id and public.is_study_circle_member(auth.uid())) or public.is_admin(auth.uid()));

drop policy if exists "study_circle_posts_delete_owner_or_admin" on public.study_circle_posts;
create policy "study_circle_posts_delete_owner_or_admin"
on public.study_circle_posts for delete
using (auth.uid() = author_id or public.is_admin(auth.uid()));

drop policy if exists "study_circle_prayers_select_public" on public.study_circle_prayers;
create policy "study_circle_prayers_select_public"
on public.study_circle_prayers for select
using (public.is_study_circle_member(auth.uid()) or public.is_admin(auth.uid()));

drop policy if exists "study_circle_prayers_insert_self" on public.study_circle_prayers;
create policy "study_circle_prayers_insert_self"
on public.study_circle_prayers for insert
with check ((auth.uid() = author_id and public.is_study_circle_member(auth.uid())) or public.is_admin(auth.uid()));

drop policy if exists "study_circle_prayers_update_owner_or_admin" on public.study_circle_prayers;
create policy "study_circle_prayers_update_owner_or_admin"
on public.study_circle_prayers for update
using ((auth.uid() = author_id and public.is_study_circle_member(auth.uid())) or public.is_admin(auth.uid()))
with check ((auth.uid() = author_id and public.is_study_circle_member(auth.uid())) or public.is_admin(auth.uid()));

drop policy if exists "study_circle_prayers_delete_owner_or_admin" on public.study_circle_prayers;
create policy "study_circle_prayers_delete_owner_or_admin"
on public.study_circle_prayers for delete
using (auth.uid() = author_id or public.is_admin(auth.uid()));

drop policy if exists "study_circle_members_select_self_or_admin" on public.study_circle_members;
create policy "study_circle_members_select_self_or_admin"
on public.study_circle_members for select
using (auth.uid() = user_id or public.is_admin(auth.uid()));

drop policy if exists "study_circle_members_insert_self" on public.study_circle_members;
create policy "study_circle_members_insert_self"
on public.study_circle_members for insert
with check (auth.uid() = user_id);

drop policy if exists "study_circle_members_update_self_or_admin" on public.study_circle_members;
create policy "study_circle_members_update_self_or_admin"
on public.study_circle_members for update
using (auth.uid() = user_id or public.is_admin(auth.uid()))
with check (auth.uid() = user_id or public.is_admin(auth.uid()));

drop policy if exists "study_circle_members_delete_admin" on public.study_circle_members;
create policy "study_circle_members_delete_admin"
on public.study_circle_members for delete
using (public.is_admin(auth.uid()));
