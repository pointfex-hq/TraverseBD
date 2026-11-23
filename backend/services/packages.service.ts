import { createServerClient } from '@backend/database/server';
import { Package, PackageDetailDTO } from '@backend/types/database.types';
import { adminStore } from '@backend/data/admin-mock-data';

export interface PackagesFilterOptions {
  q?: string;
  categorySlug?: string;
  destinationSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  durationDays?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'duration_asc';
  featuredOnly?: boolean;
  trendingOnly?: boolean;
  page?: number;
  limit?: number;
}

export async function getPublishedPackages(options: PackagesFilterOptions = {}) {
  const supabase = createServerClient();
  const page = options.page || 1;
  const limit = options.limit || 12;

  if (supabase) {
    try {
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      let query = supabase
        .from('packages')
        .select('*, destination:destinations!inner(*), category:categories!inner(*)', { count: 'exact' })
        .eq('status', 'published');

      if (options.destinationSlug) {
        query = query.eq('destinations.slug', options.destinationSlug);
      }
      if (options.categorySlug) {
        query = query.eq('categories.slug', options.categorySlug);
      }
      if (options.minPrice !== undefined) {
        query = query.gte('price_bdt', options.minPrice);
      }
      if (options.maxPrice !== undefined) {
        query = query.lte('price_bdt', options.maxPrice);
      }
      if (options.durationDays !== undefined) {
        query = query.eq('duration_days', options.durationDays);
      }
      if (options.featuredOnly) {
        query = query.eq('is_featured', true);
      }
      if (options.trendingOnly) {
        query = query.eq('is_trending', true);
      }

      switch (options.sort) {
        case 'price_asc':
          query = query.order('price_bdt', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price_bdt', { ascending: false });
          break;
        case 'duration_asc':
          query = query.order('duration_days', { ascending: true });
          break;
        case 'newest':
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }

      query = query.range(from, to);

      const { data, count, error } = await query;
      if (!error && data && data.length > 0) {
        return {
          data: data as Package[],
          total: count || data.length,
          error: null,
          source: 'supabase' as const,
        };
      }
    } catch {
      // Fallback to local
    }
  }

  // Local In-Memory Query & Filter Engine
  let filtered = adminStore.packages.filter((p) => p.status === 'published');

  // Text search (case-insensitive query matching title, descriptions, destination name)
  if (options.q?.trim()) {
    const qLower = options.q.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title_en.toLowerCase().includes(qLower) ||
        p.title_bn.includes(qLower) ||
        p.short_description_en.toLowerCase().includes(qLower) ||
        (p.destination?.name_en?.toLowerCase().includes(qLower) ?? false) ||
        (p.destination?.name_bn?.includes(qLower) ?? false) ||
        (p.category?.name_en?.toLowerCase().includes(qLower) ?? false)
    );
  }

  // Category filter
  if (options.categorySlug) {
    filtered = filtered.filter((p) => p.category?.slug === options.categorySlug);
  }

  // Destination filter
  if (options.destinationSlug) {
    filtered = filtered.filter((p) => p.destination?.slug === options.destinationSlug);
  }

  // Min Price filter
  if (options.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price_bdt >= options.minPrice!);
  }

  // Max Price filter
  if (options.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price_bdt <= options.maxPrice!);
  }

  // Duration filter
  if (options.durationDays !== undefined) {
    filtered = filtered.filter((p) => p.duration_days === options.durationDays);
  }

  // Featured only
  if (options.featuredOnly) {
    filtered = filtered.filter((p) => p.is_featured);
  }

  // Trending only
  if (options.trendingOnly) {
    filtered = filtered.filter((p) => p.is_trending);
  }

  // Sort
  switch (options.sort) {
    case 'price_asc':
      filtered.sort((a, b) => a.price_bdt - b.price_bdt);
      break;
    case 'price_desc':
      filtered.sort((a, b) => b.price_bdt - a.price_bdt);
      break;
    case 'duration_asc':
      filtered.sort((a, b) => a.duration_days - b.duration_days);
      break;
    case 'newest':
    default:
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      break;
  }

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  return {
    data: paginated,
    total,
    error: null,
    source: 'local' as const,
  };
}

export async function getPackageBySlug(slug: string): Promise<{
  data: PackageDetailDTO | null;
  error: string | null;
  source: 'supabase' | 'local';
}> {
  const supabase = createServerClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select(`
          *,
          destination:destinations(*),
          category:categories(*),
          images:package_images(*),
          itinerary:itinerary_days(*),
          items:package_items(*),
          departures:package_departures(*)
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (!error && data) {
        return { data: data as PackageDetailDTO, error: null, source: 'supabase' as const };
      }
    } catch {
      // Fallback
    }
  }

  const found = adminStore.packages.find(
    (p) => p.slug === slug && p.status === 'published'
  );

  return {
    data: (found as unknown as PackageDetailDTO) || null,
    error: found ? null : 'Package not found',
    source: 'local' as const,
  };
}
