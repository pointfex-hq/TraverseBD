import { createServerClient } from '@backend/database/server';
import { Category } from '@backend/types/database.types';
import { adminStore } from '@backend/data/admin-mock-data';

export async function getPublishedCategories() {
  const supabase = createServerClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('status', 'published')
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return { data: data as Category[], error: null, source: 'supabase' as const };
      }
    } catch {
      // Fallback
    }
  }

  const published = adminStore.categories.filter((c) => c.status === 'published').sort(
    (a, b) => a.sort_order - b.sort_order
  );

  return { data: published, error: null, source: 'local' as const };
}

export async function getCategoryBySlug(slug: string) {
  const supabase = createServerClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (!error && data) {
        return { data: data as Category, error: null, source: 'supabase' as const };
      }
    } catch {
      // Fallback
    }
  }

  const found = adminStore.categories.find((c) => c.slug === slug && c.status === 'published');
  return {
    data: found || null,
    error: found ? null : 'Category not found',
    source: 'local' as const,
  };
}
