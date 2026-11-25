import { createServerClient } from '@backend/database/server';
import { Destination } from '@backend/types/database.types';
import { adminStore } from '@backend/data/admin-mock-data';

export interface DestinationsFilterOptions {
  featuredOnly?: boolean;
  region?: string;
  limit?: number;
}

export async function getPublishedDestinations(options: DestinationsFilterOptions = {}) {
  const supabase = createServerClient();

  if (supabase) {
    try {
      let query = supabase
        .from('destinations')
        .select('*')
        .eq('status', 'published')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (options.featuredOnly) {
        query = query.eq('is_featured', true);
      }
      if (options.region) {
        query = query.ilike('region', `%${options.region}%`);
      }
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return { data: data as Destination[], error: null, source: 'supabase' as const };
      }
    } catch {
      // Fallback to local data on database connection error
    }
  }

  // Graceful Local Fallback
  let results = adminStore.destinations.filter((d) => d.status === 'published');

  if (options.featuredOnly) {
    results = results.filter((d) => d.is_featured);
  }
  if (options.region) {
    const regionLower = options.region.toLowerCase();
    results = results.filter((d) => d.region.toLowerCase().includes(regionLower));
  }
  if (options.limit && options.limit > 0) {
    results = results.slice(0, options.limit);
  }

  return { data: results, error: null, source: 'local' as const };
}

export async function getDestinationBySlug(slug: string) {
  const supabase = createServerClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (!error && data) {
        return { data: data as Destination, error: null, source: 'supabase' as const };
      }
    } catch {
      // Fallback
    }
  }

  const found = adminStore.destinations.find(
    (d) => d.slug === slug && d.status === 'published'
  );

  return {
    data: found || null,
    error: found ? null : 'Destination not found',
    source: 'local' as const,
  };
}
