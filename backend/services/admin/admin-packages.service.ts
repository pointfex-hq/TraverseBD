import { adminStore } from '@backend/data/admin-mock-data';
import { Package, PackageDeparture } from '@backend/types/database.types';
import { validatePackagePrice } from '@backend/services/pricing.service';

export function getAllAdminPackages() {
  return adminStore.packages;
}

export function getAdminPackageById(id: string) {
  return adminStore.packages.find((p) => p.id === id || p.slug === id) || null;
}

export interface CreatePackageInput {
  title_en: string;
  title_bn: string;
  slug?: string;
  destination_id: string;
  category_id: string;
  short_description_en: string;
  short_description_bn: string;
  full_description_en: string;
  full_description_bn: string;
  price_bdt: number;
  price_mode?: 'fixed' | 'starting_from';
  duration_days: number;
  duration_nights: number;
  cover_image_url: string;
  status?: 'draft' | 'published';
  is_featured?: boolean;
  is_trending?: boolean;
  departures?: Partial<PackageDeparture>[];
}

export function createAdminPackage(input: CreatePackageInput, adminEmail = 'admin@traversebd.com'): Package {
  // Validate whole BDT integer invariant
  validatePackagePrice(input.price_bdt);

  const slug =
    input.slug ||
    input.title_en
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const newId = `pkg-${Date.now()}`;
  const now = new Date().toISOString();

  // Find destination and category relations
  const destination = adminStore.destinations.find((d) => d.id === input.destination_id);
  const category = adminStore.categories.find((c) => c.id === input.category_id);

  const newPackage: any = {
    id: newId,
    slug,
    destination_id: input.destination_id,
    category_id: input.category_id,
    title_en: input.title_en,
    title_bn: input.title_bn,
    short_description_en: input.short_description_en,
    short_description_bn: input.short_description_bn,
    full_description_en: input.full_description_en,
    full_description_bn: input.full_description_bn,
    price_bdt: Math.round(input.price_bdt),
    price_mode: input.price_mode || 'fixed',
    duration_days: input.duration_days,
    duration_nights: input.duration_nights,
    cover_image_url:
      input.cover_image_url ||
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDpUVy88M-JfS7aa1VRk5EQP84477D1d4N0yAaGUV17rNaVLqjOHDD1kPiIz-4BZBuGoLUEU2nleVT9LEyqekyrtQg3z_ZLNMH0RWGqZN8PElx2iuEG5N67z54yhKoPsI3MCic-vc430pF7LvB572knrtsX2RmgHwcTTBYjl1c1Vqvmu2WqS6q1vL7NHSjn90i7lLQzg9YSoDEpIVlGP_wOwziOJuGPSbPTPccyVIuU',
    status: input.status || 'draft',
    is_featured: !!input.is_featured,
    is_trending: !!input.is_trending,
    created_at: now,
    updated_at: now,
    destination: destination
      ? {
          id: destination.id,
          slug: destination.slug,
          name_en: destination.name_en,
          name_bn: destination.name_bn,
          region: destination.region,
        }
      : undefined,
    category: category
      ? {
          id: category.id,
          slug: category.slug,
          name_en: category.name_en,
          name_bn: category.name_bn,
        }
      : undefined,
    itinerary: [],
    items: [],
    departures: (input.departures || []).map((dep, idx) => ({
      id: `dep-${Date.now()}-${idx}`,
      package_id: newId,
      departure_date: dep.departure_date || new Date().toISOString().split('T')[0],
      capacity: dep.capacity || 20,
      available_seats: dep.available_seats !== undefined ? dep.available_seats : (dep.capacity || 20),
      status: (dep.available_seats || 20) === 0 ? 'sold_out' : (dep.available_seats || 20) <= 5 ? 'few_seats' : 'available',
      created_at: now,
      updated_at: now,
    })),
  };

  adminStore.packages.unshift(newPackage);

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'PACKAGE_CREATED',
    slug,
    `Created package "${input.title_en}" with price ${input.price_bdt} BDT`
  );

  return newPackage;
}

export function updateAdminPackage(
  id: string,
  updates: Partial<CreatePackageInput>,
  adminEmail = 'admin@traversebd.com'
): Package | null {
  const index = adminStore.packages.findIndex((p) => p.id === id);
  if (index === -1) return null;

  if (updates.price_bdt !== undefined) {
    validatePackagePrice(updates.price_bdt);
  }

  const existing = adminStore.packages[index];
  const updatedPackage: any = {
    ...existing,
    ...updates,
    updated_at: new Date().toISOString(),
  };

  adminStore.packages[index] = updatedPackage;

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'PACKAGE_UPDATED',
    existing.slug,
    `Updated package details for "${updatedPackage.title_en}"`
  );

  return updatedPackage;
}

export function togglePackageStatus(id: string, adminEmail = 'admin@traversebd.com'): Package | null {
  const pkg = adminStore.packages.find((p) => p.id === id);
  if (!pkg) return null;

  const oldStatus = pkg.status;
  pkg.status = pkg.status === 'published' ? 'draft' : 'published';
  pkg.updated_at = new Date().toISOString();

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'PACKAGE_STATUS_TOGGLED',
    pkg.slug,
    `Status changed from ${oldStatus.toUpperCase()} to ${pkg.status.toUpperCase()}`
  );

  return pkg;
}

export function deleteAdminPackage(id: string, adminEmail = 'admin@traversebd.com'): boolean {
  const index = adminStore.packages.findIndex((p) => p.id === id);
  if (index === -1) return false;

  const deleted = adminStore.packages.splice(index, 1)[0];

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'PACKAGE_DELETED',
    deleted.slug,
    `Permanently deleted package "${deleted.title_en}"`
  );

  return true;
}
