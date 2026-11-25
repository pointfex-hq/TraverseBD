-- =====================================================================
-- TraverseBD Database Schema Migration (PostgreSQL / Supabase)
-- Version: 1.0.0
-- Reference: TraverseBD Master PRD v1.0 & Consolidated SRS v1.1
-- =====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DESTINATIONS TABLE
CREATE TABLE IF NOT EXISTS public.destinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name_en TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    region TEXT NOT NULL,
    short_description_en TEXT NOT NULL,
    short_description_bn TEXT NOT NULL,
    full_description_en TEXT NOT NULL,
    full_description_bn TEXT NOT NULL,
    cover_image_url TEXT NOT NULL,
    highlights TEXT[] DEFAULT '{}',
    travel_tips TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name_en TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    description_en TEXT,
    description_bn TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PACKAGES TABLE
CREATE TABLE IF NOT EXISTS public.packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    destination_id UUID NOT NULL REFERENCES public.destinations(id) ON DELETE RESTRICT,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    title_en TEXT NOT NULL,
    title_bn TEXT NOT NULL,
    short_description_en TEXT NOT NULL,
    short_description_bn TEXT NOT NULL,
    full_description_en TEXT NOT NULL,
    full_description_bn TEXT NOT NULL,
    price_mode TEXT NOT NULL DEFAULT 'fixed' CHECK (price_mode IN ('fixed', 'starting_from')),
    price_bdt INT NOT NULL CHECK (price_bdt > 0),
    duration_days INT NOT NULL CHECK (duration_days > 0),
    duration_nights INT NOT NULL CHECK (duration_nights >= 0),
    cover_image_url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_trending BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PACKAGE IMAGES
CREATE TABLE IF NOT EXISTS public.package_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_en TEXT NOT NULL DEFAULT '',
    alt_bn TEXT NOT NULL DEFAULT '',
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. ITINERARY DAYS
CREATE TABLE IF NOT EXISTS public.itinerary_days (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
    day_no INT NOT NULL,
    title_en TEXT NOT NULL,
    title_bn TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_bn TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_package_itinerary_day UNIQUE (package_id, day_no)
);

-- 6. PACKAGE ITEMS (Inclusions, Exclusions, Activities, Notes)
CREATE TABLE IF NOT EXISTS public.package_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('included', 'excluded', 'activity', 'food', 'accommodation', 'transport', 'note')),
    text_en TEXT NOT NULL,
    text_bn TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. PACKAGE DEPARTURES (Manually managed dates and seats)
CREATE TABLE IF NOT EXISTS public.package_departures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
    departure_date DATE NOT NULL,
    capacity INT NOT NULL CHECK (capacity >= 1),
    available_seats INT NOT NULL CHECK (available_seats >= 0),
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'few_seats', 'sold_out', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_available_le_capacity CHECK (available_seats <= capacity)
);

-- 8. GALLERY IMAGES
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url TEXT NOT NULL,
    title TEXT NOT NULL DEFAULT 'Expedition Moment',
    location TEXT NOT NULL DEFAULT 'Bangladesh',
    category TEXT NOT NULL DEFAULT 'hills' CHECK (category IN ('hills', 'coastal', 'forest', 'riverine')),
    badge TEXT NOT NULL DEFAULT 'Visual Archive',
    caption_en TEXT,
    caption_bn TEXT,
    destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. BLOG POSTS
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title_en TEXT NOT NULL,
    title_bn TEXT NOT NULL,
    excerpt_en TEXT,
    excerpt_bn TEXT,
    content_en TEXT NOT NULL,
    content_bn TEXT NOT NULL,
    cover_image_url TEXT,
    destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. TESTIMONIALS
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    quote_en TEXT NOT NULL,
    quote_bn TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    package_id UUID REFERENCES public.packages(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. SITE SETTINGS (Key-Value configuration for WhatsApp, Contact info, etc.)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. ADMIN PROFILES (Linked to Supabase Auth user id)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID UNIQUE NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID NOT NULL,
    action TEXT NOT NULL,
    target_entity TEXT NOT NULL,
    target_id TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================
-- PERFORMANCE INDEXES
-- =====================================================================
CREATE INDEX IF NOT EXISTS idx_destinations_slug ON public.destinations(slug);
CREATE INDEX IF NOT EXISTS idx_destinations_status ON public.destinations(status);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_packages_slug ON public.packages(slug);
CREATE INDEX IF NOT EXISTS idx_packages_destination ON public.packages(destination_id);
CREATE INDEX IF NOT EXISTS idx_packages_category ON public.packages(category_id);
CREATE INDEX IF NOT EXISTS idx_packages_status ON public.packages(status);
CREATE INDEX IF NOT EXISTS idx_packages_price ON public.packages(price_bdt);
CREATE INDEX IF NOT EXISTS idx_package_departures_date ON public.package_departures(departure_date);
CREATE INDEX IF NOT EXISTS idx_package_departures_package ON public.package_departures(package_id);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_departures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Public can read published content
CREATE POLICY "Public can view published destinations" ON public.destinations
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view published categories" ON public.categories
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view published packages" ON public.packages
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view package images" ON public.package_images
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.packages p WHERE p.id = package_images.package_id AND p.status = 'published'));

CREATE POLICY "Public can view itinerary days" ON public.itinerary_days
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.packages p WHERE p.id = itinerary_days.package_id AND p.status = 'published'));

CREATE POLICY "Public can view package items" ON public.package_items
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.packages p WHERE p.id = package_items.package_id AND p.status = 'published'));

CREATE POLICY "Public can view package departures" ON public.package_departures
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.packages p WHERE p.id = package_departures.package_id AND p.status = 'published'));

CREATE POLICY "Public can view published gallery images" ON public.gallery_images
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view published blog posts" ON public.blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view published testimonials" ON public.testimonials
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view site settings" ON public.site_settings
    FOR SELECT USING (true);
