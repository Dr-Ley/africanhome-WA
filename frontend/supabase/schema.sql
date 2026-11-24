-- Run this once in the Supabase SQL editor for project enllttuprsrsivbnvmuo.
-- It creates the admin account store, safari package rows, and the public file bucket.
-- Passwords are stored as bcrypt hashes. The publishable key cannot read them.

create extension if not exists pgcrypto;

create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  username text not null unique check (char_length(username) between 3 and 80 and username = lower(username)),
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_sessions (
  token text primary key,
  admin_id uuid not null references public.admins (id) on delete cascade,
  expires_at timestamptz not null
);

create table if not exists public.admin_settings (
  id boolean primary key default true check (id),
  safaris_seeded boolean not null default false
);

insert into public.admin_settings (id, safaris_seeded)
values (true, false)
on conflict (id) do nothing;

create table if not exists public.safari_packages (
  id text primary key,
  slug text not null unique,
  package jsonb not null,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.admin_settings enable row level security;
alter table public.admins enable row level security;
alter table public.admin_sessions enable row level security;
alter table public.safari_packages enable row level security;

revoke all on public.admin_settings from anon, authenticated;
revoke all on public.admins from anon, authenticated;
revoke all on public.admin_sessions from anon, authenticated;
revoke insert, update, delete on public.safari_packages from anon, authenticated;
grant select on public.safari_packages to anon, authenticated;

drop policy if exists safari_packages_select on public.safari_packages;
create policy safari_packages_select on public.safari_packages
  for select to anon, authenticated
  using (true);

insert into storage.buckets (id, name, public)
values ('aha-files', 'aha-files', true)
on conflict (id) do update set public = true;

drop policy if exists "aha files are public" on storage.objects;
create policy "aha files are public" on storage.objects
  for select to public
  using (bucket_id = 'aha-files');

drop policy if exists "aha files can be uploaded" on storage.objects;
create policy "aha files can be uploaded" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'aha-files');

drop policy if exists "aha files can be replaced" on storage.objects;
create policy "aha files can be replaced" on storage.objects
  for update to anon, authenticated
  using (bucket_id = 'aha-files');

drop policy if exists "aha files can be removed" on storage.objects;
create policy "aha files can be removed" on storage.objects
  for delete to anon, authenticated
  using (bucket_id = 'aha-files');

create or replace function public.safari_catalog_ready()
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce((select safaris_seeded from public.admin_settings where id), false);
$$;

create or replace function public.safari_mark_seeded(p_token text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.admin_session_valid(p_token) then
    raise exception 'Not signed in';
  end if;
  insert into public.admin_settings (id, safaris_seeded)
  values (true, true)
  on conflict (id) do update set safaris_seeded = true;
end;
$$;

create or replace function public.admin_has_account()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins);
$$;

create or replace function public.admin_register_first(p_username text, p_password text)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if exists (select 1 from public.admins) then
    raise exception 'An admin account already exists';
  end if;
  if char_length(lower(trim(p_username))) < 3 or char_length(lower(trim(p_username))) > 80 then
    raise exception 'Username must be between 3 and 80 characters';
  end if;
  if char_length(p_password) < 8 or char_length(p_password) > 200 then
    raise exception 'Password must be between 8 and 200 characters';
  end if;
  insert into public.admins (username, password_hash)
  values (lower(trim(p_username)), extensions.crypt(p_password, extensions.gen_salt('bf')));
end;
$$;

create or replace function public.admin_sign_in(p_username text, p_password text)
returns text
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  admin_row public.admins%rowtype;
  new_token text;
begin
  delete from public.admin_sessions where expires_at <= now();
  select * into admin_row from public.admins where username = lower(trim(p_username));
  if admin_row.id is null or admin_row.password_hash <> extensions.crypt(p_password, admin_row.password_hash) then
    raise exception 'Invalid username or password';
  end if;
  new_token := encode(extensions.gen_random_bytes(32), 'hex');
  insert into public.admin_sessions (token, admin_id, expires_at)
  values (new_token, admin_row.id, now() + interval '12 hours');
  return new_token;
end;
$$;

create or replace function public.admin_sign_out(p_token text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.admin_sessions where token = p_token;
end;
$$;

create or replace function public.admin_session_valid(p_token text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_sessions
    where token = p_token and expires_at > now()
  );
$$;

create or replace function public.safari_upsert(p_token text, p_package jsonb, p_sort integer default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  pkg_id text := p_package->>'id';
  pkg_slug text := p_package->>'slug';
begin
  if not public.admin_session_valid(p_token) then
    raise exception 'Not signed in';
  end if;
  if pkg_id is null or char_length(pkg_id) = 0 or pkg_slug is null or char_length(pkg_slug) = 0 then
    raise exception 'A safari needs an id and a web address';
  end if;
  if p_package->>'title' is null or char_length(trim(p_package->>'title')) = 0 then
    raise exception 'Add a title before saving';
  end if;
  insert into public.safari_packages (id, slug, package, sort_order, updated_at)
  values (
    pkg_id,
    pkg_slug,
    p_package,
    coalesce(p_sort, (select coalesce(max(sort_order), -1) + 1 from public.safari_packages)),
    now()
  )
  on conflict (id) do update
    set slug = excluded.slug,
        package = excluded.package,
        updated_at = now(),
        sort_order = coalesce(p_sort, public.safari_packages.sort_order);
exception
  when unique_violation then
    raise exception 'Another safari already uses this web address';
end;
$$;

create or replace function public.safari_delete(p_token text, p_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.admin_session_valid(p_token) then
    raise exception 'Not signed in';
  end if;
  delete from public.safari_packages where id = p_id;
end;
$$;

revoke all on function public.safari_catalog_ready() from public;
revoke all on function public.safari_mark_seeded(text) from public;
revoke all on function public.admin_has_account() from public;
revoke all on function public.admin_register_first(text, text) from public;
revoke all on function public.admin_sign_in(text, text) from public;
revoke all on function public.admin_sign_out(text) from public;
revoke all on function public.admin_session_valid(text) from public;
revoke all on function public.safari_upsert(text, jsonb, integer) from public;
revoke all on function public.safari_delete(text, text) from public;

grant execute on function public.safari_catalog_ready() to anon, authenticated;
grant execute on function public.safari_mark_seeded(text) to anon, authenticated;
grant execute on function public.admin_has_account() to anon, authenticated;
grant execute on function public.admin_register_first(text, text) to anon, authenticated;
grant execute on function public.admin_sign_in(text, text) to anon, authenticated;
grant execute on function public.admin_sign_out(text) to anon, authenticated;
grant execute on function public.admin_session_valid(text) to anon, authenticated;
grant execute on function public.safari_upsert(text, jsonb, integer) to anon, authenticated;
grant execute on function public.safari_delete(text, text) to anon, authenticated;
