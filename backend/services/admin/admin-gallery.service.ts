import { adminStore, GalleryItem } from '@backend/data/admin-mock-data';

export interface CreateGalleryInput {
  title: string;
  location: string;
  author?: string;
  gear?: string;
  category: 'coastal' | 'hills' | 'forests' | 'riverine' | 'cultural';
  desc?: string;
  alt?: string;
  imageUrl: string;
  aspect?: string;
  badge?: string;
  sort_order?: number;
  status?: 'published' | 'draft';
}

export function getAllAdminGallery(): GalleryItem[] {
  return adminStore.gallery;
}

export function getAdminGalleryById(id: string): GalleryItem | null {
  return adminStore.gallery.find((g) => g.id === id) || null;
}

export function createAdminGalleryItem(
  input: CreateGalleryInput,
  adminEmail = 'admin@traversebd.com'
): GalleryItem {
  if (!input.title || !input.imageUrl || !input.location) {
    throw new Error('Title, Image URL, and Location are required.');
  }

  const categoryLabels: Record<string, string> = {
    coastal: 'Coastal & Marine',
    hills: 'Hill Tracts & Clouds',
    forests: 'Forests & Wildlife',
    riverine: 'Riverine & Haors',
    cultural: 'Cultural & Heritage',
  };

  const newItem: GalleryItem = {
    id: `gal-${Date.now()}`,
    title: input.title.trim(),
    location: input.location.trim(),
    author: input.author?.trim() || 'Traverse BD Guild',
    gear: input.gear?.trim() || 'Professional Optics',
    category: input.category || 'hills',
    desc: input.desc?.trim() || 'Curated high-resolution dispatch from Traverse BD expeditions.',
    alt: input.alt?.trim() || input.title.trim(),
    imageUrl: input.imageUrl.trim(),
    aspect: input.aspect || 'aspect-[4/5]',
    badge: input.badge?.trim() || categoryLabels[input.category] || 'Curated Archive',
    sort_order: input.sort_order || adminStore.gallery.length + 1,
    status: input.status || 'published',
    created_at: new Date().toISOString(),
  };

  adminStore.gallery.unshift(newItem);

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'GALLERY_IMAGE_ADDED',
    newItem.id,
    `Added new gallery image "${newItem.title}" (${newItem.category})`
  );

  return newItem;
}

export function updateAdminGalleryItem(
  id: string,
  updates: Partial<CreateGalleryInput>,
  adminEmail = 'admin@traversebd.com'
): GalleryItem | null {
  const index = adminStore.gallery.findIndex((g) => g.id === id);
  if (index === -1) return null;

  const existing = adminStore.gallery[index];
  const updatedItem: GalleryItem = {
    ...existing,
    ...updates,
  };

  adminStore.gallery[index] = updatedItem;

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'GALLERY_IMAGE_UPDATED',
    id,
    `Updated gallery photo details for "${updatedItem.title}"`
  );

  return updatedItem;
}

export function deleteAdminGalleryItem(
  id: string,
  adminEmail = 'admin@traversebd.com'
): boolean {
  const index = adminStore.gallery.findIndex((g) => g.id === id);
  if (index === -1) return false;

  const deleted = adminStore.gallery.splice(index, 1)[0];

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'GALLERY_IMAGE_DELETED',
    id,
    `Deleted gallery photo "${deleted.title}"`
  );

  return true;
}

export function toggleGalleryStatus(
  id: string,
  adminEmail = 'admin@traversebd.com'
): GalleryItem | null {
  const item = adminStore.gallery.find((g) => g.id === id);
  if (!item) return null;

  item.status = item.status === 'draft' ? 'published' : 'draft';

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'GALLERY_STATUS_TOGGLED',
    id,
    `Toggled gallery photo "${item.title}" status to ${item.status}`
  );

  return item;
}
