import { createServerClient } from '@backend/database/server';
import { adminStore, GalleryItem } from '@backend/data/admin-mock-data';

export async function getPublishedGalleryItems(category?: string): Promise<{
  data: GalleryItem[];
  error: string | null;
  source: 'supabase' | 'local';
}> {
  const supabase = createServerClient();

  if (supabase) {
    try {
      let query = supabase.from('gallery_images').select('*').order('sort_order', { ascending: true });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        const mapped = data.map((d: any) => ({
          id: d.id,
          title: d.title || d.caption_en || 'Visual Dispatch',
          location: d.location || 'Bangladesh',
          author: d.author || 'Traverse BD Guild',
          gear: d.gear || 'Professional Optics',
          category: d.category || 'hills',
          desc: d.description || d.desc || 'High resolution documentation captured on expedition with Traverse BD field experts.',
          alt: d.alt || d.title || 'Traverse BD Expedition Photo',
          imageUrl: d.image_url,
          aspect: d.aspect || 'aspect-[4/5]',
          badge: d.badge || 'Expedition Archive',
          sort_order: d.sort_order || 1,
          created_at: d.created_at,
        }));
        return { data: mapped as GalleryItem[], error: null, source: 'supabase' };
      }
    } catch {
      // Fallback
    }
  }

  let items = adminStore.gallery.filter((g) => g.status !== 'draft');
  if (category && category !== 'all') {
    items = items.filter((item) => item.category === category);
  }

  return {
    data: items,
    error: null,
    source: 'local',
  };
}
