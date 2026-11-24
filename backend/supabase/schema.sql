create extension if not exists "pgcrypto";

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text,
  google_subject text,
  role text not null default 'ADMIN' check (role in ('ADMIN','SUPER_ADMIN')),
  status text not null default 'Active',
  mfa_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  status text not null default 'DRAFT',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  region text,
  short_description text,
  full_description text,
  cover_image_url text,
  highlights text,
  status text not null default 'DRAFT',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists packages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  destination_id uuid references destinations(id),
  category_id uuid references categories(id),
  price integer not null check (price > 0),
  duration_days integer not null check (duration_days > 0),
  price_mode text not null default 'FIXED' check (price_mode in ('FIXED','STARTING_FROM')),
  short_description text,
  full_description text,
  cover_image_url text,
  status text not null default 'DRAFT',
  featured boolean not null default false,
  trending boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists package_items (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  type text not null,
  text text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists departures (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  departure_date date not null,
  total_seats integer not null check (total_seats > 0),
  booked_seats integer not null default 0 check (booked_seats >= 0),
  price_override integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint booked_seats_not_over_capacity check (booked_seats <= total_seats)
);

create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  status text not null default 'DRAFT',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  cover_image_url text,
  status text not null default 'DRAFT',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quote text not null,
  rating integer,
  status text not null default 'DRAFT',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists travel_services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon_name text,
  status text not null default 'DRAFT',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  status text not null default 'DRAFT',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists site_settings (
  setting_key text primary key,
  value text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
