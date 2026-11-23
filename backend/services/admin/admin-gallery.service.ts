import { adminStore, GalleryItem } from '@backend/data/admin-mock-data';

export interface CreateGalleryInput {
  title: string;
  location: string;
  category: 'hills' | 'coastal' | 'forest' | 'riverine';
  imageUrl: string;
  badge?: string;
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

  const newItem: GalleryItem = {
    id: `gal-${Date.now()}`,
    title: input.title.trim(),
    location: input.location.trim(),
    category: input.category || 'hills',
    imageUrl: input.imageUrl.trim(),
    badge: input.badge?.trim() || 'Visual Archive',
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
