import { adminStore } from '@backend/data/admin-mock-data';
import { Destination } from '@backend/types/database.types';

export function getAllAdminDestinations() {
  return adminStore.destinations;
}

export function createAdminDestination(
  input: {
    name_en: string;
    name_bn: string;
    region: string;
    short_description_en: string;
    short_description_bn: string;
    full_description_en?: string;
    full_description_bn?: string;
    cover_image_url?: string;
    is_featured?: boolean;
    status?: 'draft' | 'published';
  },
  adminEmail = 'admin@traversebd.com'
): Destination {
  const slug = input.name_en
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const newDest: Destination = {
    id: `dest-${Date.now()}`,
    slug,
    name_en: input.name_en,
    name_bn: input.name_bn,
    region: input.region,
    short_description_en: input.short_description_en,
    short_description_bn: input.short_description_bn,
    full_description_en: input.full_description_en || input.short_description_en,
    full_description_bn: input.full_description_bn || input.short_description_bn,
    cover_image_url:
      input.cover_image_url ||
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtPHh2iaz5X9KmvXNLkCUmO933HB1CY580l3wazkJoj3Gvec3OBvEjYhkOJ0q5-vjrguFJSP7vaJacV8a_c4uLCvm4np0xphq7ZA9fPh-OSj2YBTU_DKGEQw_4uCjRAJS8CNiaoGSz8SD0Y5scBH0iZNL6UqtOXHRLXvgFPvMe4J6lymyO3cksqPznEb0oAjYZqKBvU-5_EDkHCJkYSTmuBHPp--4WEkJJSHlevDB2',
    highlights: ['Scenic Views', 'Local Culture', 'Eco Trekking'],
    travel_tips: ['Best visited between Oct and Mar', 'Hire certified local guides'],
    status: input.status || 'published',
    is_featured: !!input.is_featured,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  adminStore.destinations.push(newDest);

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'DESTINATION_CREATED',
    slug,
    `Added destination "${input.name_en}" (${input.region})`
  );

  return newDest;
}

export function updateAdminDestination(
  id: string,
  updates: Partial<Destination>,
  adminEmail = 'admin@traversebd.com'
): Destination | null {
  const index = adminStore.destinations.findIndex((d) => d.id === id);
  if (index === -1) return null;

  const existing = adminStore.destinations[index];
  const updated: Destination = {
    ...existing,
    ...updates,
    updated_at: new Date().toISOString(),
  };

  adminStore.destinations[index] = updated;

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'DESTINATION_UPDATED',
    existing.slug,
    `Updated destination "${updated.name_en}"`
  );

  return updated;
}

export function deleteAdminDestination(id: string, adminEmail = 'admin@traversebd.com'): boolean {
  const index = adminStore.destinations.findIndex((d) => d.id === id);
  if (index === -1) return false;

  const deleted = adminStore.destinations.splice(index, 1)[0];

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'DESTINATION_DELETED',
    deleted.slug,
    `Deleted destination "${deleted.name_en}"`
  );

  return true;
}
