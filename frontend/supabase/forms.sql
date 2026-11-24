-- Run this in the Supabase SQL editor after schema.sql.
-- Form rows are inserted only through submit_form. Each submission is also emailed by the site.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  country text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.vehicle_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  country text not null,
  route text not null,
  dates text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  email text not null,
  phone text not null,
  country text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.booking_enquiries (
  id uuid primary key default gen_random_uuid(),
  package_title text not null,
  name text not null,
  email text not null,
  phone text not null,
  dates text not null,
  travellers text not null,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.safari_plans (
  id uuid primary key default gen_random_uuid(),
  arrival date not null,
  departure date not null,
  adults integer not null,
  children integer not null,
  child_ages text,
  destinations text[] not null,
  other_destination text,
  budget text not null,
  styles text[] not null,
  transport text not null,
  accommodation text not null,
  name text not null,
  email text not null,
  country text not null,
  phone text not null,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
alter table public.vehicle_enquiries enable row level security;
alter table public.partnership_enquiries enable row level security;
alter table public.booking_enquiries enable row level security;
alter table public.newsletter_signups enable row level security;
alter table public.safari_plans enable row level security;

revoke all on public.contact_messages from anon, authenticated;
revoke all on public.vehicle_enquiries from anon, authenticated;
revoke all on public.partnership_enquiries from anon, authenticated;
revoke all on public.booking_enquiries from anon, authenticated;
revoke all on public.newsletter_signups from anon, authenticated;
revoke all on public.safari_plans from anon, authenticated;

create or replace function public.submit_form(p_kind text, p_fields jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_kind = 'contact' then
    insert into public.contact_messages (name, email, phone, country, message)
    values (p_fields->>'name', p_fields->>'email', p_fields->>'phone', p_fields->>'country', p_fields->>'message');
  elsif p_kind = 'vehicle' then
    insert into public.vehicle_enquiries (name, email, phone, country, route, dates, message)
    values (p_fields->>'name', p_fields->>'email', p_fields->>'phone', p_fields->>'country', p_fields->>'route', p_fields->>'dates', p_fields->>'message');
  elsif p_kind = 'partnership' then
    insert into public.partnership_enquiries (name, company, email, phone, country, message)
    values (p_fields->>'name', p_fields->>'company', p_fields->>'email', p_fields->>'phone', p_fields->>'country', p_fields->>'message');
  elsif p_kind = 'booking' then
    insert into public.booking_enquiries (package_title, name, email, phone, dates, travellers, message)
    values (p_fields->>'packageTitle', p_fields->>'name', p_fields->>'email', p_fields->>'phone', p_fields->>'dates', p_fields->>'travellers', nullif(p_fields->>'message', ''));
  elsif p_kind = 'newsletter' then
    insert into public.newsletter_signups (email)
    values (p_fields->>'email');
  elsif p_kind = 'planner' then
    insert into public.safari_plans (
      arrival, departure, adults, children, child_ages, destinations, other_destination,
      budget, styles, transport, accommodation, name, email, country, phone, notes
    )
    values (
      (p_fields->>'arrival')::date,
      (p_fields->>'departure')::date,
      (p_fields->>'adults')::integer,
      coalesce((p_fields->>'children')::integer, 0),
      nullif(p_fields->>'childAges', ''),
      array(select jsonb_array_elements_text(p_fields->'destinations')),
      nullif(p_fields->>'otherDestination', ''),
      p_fields->>'budget',
      array(select jsonb_array_elements_text(p_fields->'styles')),
      p_fields->>'transport',
      p_fields->>'accommodation',
      p_fields->>'name',
      p_fields->>'email',
      p_fields->>'country',
      p_fields->>'phone',
      nullif(p_fields->>'notes', '')
    );
  else
    raise exception 'Unknown form';
  end if;
end;
$$;

revoke all on function public.submit_form(text, jsonb) from public;
grant execute on function public.submit_form(text, jsonb) to anon, authenticated;
