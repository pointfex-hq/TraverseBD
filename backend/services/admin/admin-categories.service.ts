import { adminStore } from '@backend/data/admin-mock-data';
import { Category } from '@backend/types/database.types';

export function getAllAdminCategories() {
  return adminStore.categories;
}

export function createAdminCategory(
  input: {
    name_en: string;
    name_bn: string;
    description_en?: string;
    description_bn?: string;
    sort_order?: number;
    status?: 'draft' | 'published';
  },
  adminEmail = 'admin@traversebd.com'
): Category {
  const slug = input.name_en
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const newCat: Category = {
    id: `cat-${Date.now()}`,
    slug,
    name_en: input.name_en,
    name_bn: input.name_bn,
    description_en: input.description_en || null,
    description_bn: input.description_bn || null,
    sort_order: input.sort_order || adminStore.categories.length + 1,
    status: input.status || 'published',
    created_at: new Date().toISOString(),
  };

  adminStore.categories.push(newCat);

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'CATEGORY_CREATED',
    slug,
    `Added category "${input.name_en}"`
  );

  return newCat;
}

export function updateAdminCategory(
  id: string,
  updates: Partial<Category>,
  adminEmail = 'admin@traversebd.com'
): Category | null {
  const index = adminStore.categories.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const existing = adminStore.categories[index];
  const updated: Category = {
    ...existing,
    ...updates,
  };

  adminStore.categories[index] = updated;

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'CATEGORY_UPDATED',
    existing.slug,
    `Updated category "${updated.name_en}"`
  );

  return updated;
}

export function deleteAdminCategory(id: string, adminEmail = 'admin@traversebd.com'): boolean {
  const index = adminStore.categories.findIndex((c) => c.id === id);
  if (index === -1) return false;

  const deleted = adminStore.categories.splice(index, 1)[0];

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'CATEGORY_DELETED',
    deleted.slug,
    `Deleted category "${deleted.name_en}"`
  );

  return true;
}
