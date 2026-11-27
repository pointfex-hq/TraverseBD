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
  rating_average?: number;
  reviews_count?: number;
  itinerary?: { id?: string; day_no: number; title_en: string; description_en: string }[];
  inclusions?: string[];
  exclusions?: string[];
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

  // Find or auto-create destination relation
  let destination = adminStore.destinations.find(
    (d) =>
      d.id === input.destination_id ||
      d.name_en.toLowerCase() === input.destination_id.toLowerCase() ||
      d.slug.toLowerCase() === input.destination_id.toLowerCase()
  );

  if (!destination && input.destination_id && input.destination_id.trim().length >= 2) {
    const destName = input.destination_id.trim();
    const destSlug =
      destName
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '') || `dest-${Date.now()}`;

    const newDest: any = {
      id: `dest-${Date.now()}`,
      slug: destSlug,
      name_en: destName,
      name_bn: destName,
      region: 'Bangladesh',
      short_description_en: `Scenic travel corridor across ${destName}, Bangladesh.`,
      short_description_bn: `${destName} ভ্রমণ`,
      cover_image_url:
        'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
      is_popular: true,
      created_at: now,
      updated_at: now,
    };
    adminStore.destinations.push(newDest);
    destination = newDest;
  }

  // Find or auto-create category relation
  let category = adminStore.categories.find(
    (c) =>
      c.id === input.category_id ||
      c.name_en.toLowerCase() === input.category_id.toLowerCase() ||
      c.slug.toLowerCase() === input.category_id.toLowerCase()
  );

  if (!category && input.category_id && input.category_id.trim().length >= 2) {
    const catName = input.category_id.trim();
    const catSlug =
      catName
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '') || `cat-${Date.now()}`;

    const newCat: any = {
      id: `cat-${Date.now()}`,
      slug: catSlug,
      name_en: catName,
      name_bn: catName,
      description_en: `${catName} expeditions and journeys across Bangladesh.`,
      description_bn: `${catName} ট্যুর`,
      icon: 'explore',
      created_at: now,
      updated_at: now,
    };
    adminStore.categories.push(newCat);
    category = newCat;
  }

  const finalDestinationId = destination ? destination.id : input.destination_id;
  const finalCategoryId = category ? category.id : input.category_id;

  const newPackage: any = {
    id: newId,
    slug,
    destination_id: finalDestinationId,
    category_id: finalCategoryId,
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
    rating_average: input.rating_average !== undefined ? Number(input.rating_average) : 4.95,
    reviews_count: input.reviews_count !== undefined ? Number(input.reviews_count) : 120,
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
    itinerary: (input.itinerary || []).map((it, idx) => ({
      id: it.id || `itin-${Date.now()}-${idx}`,
      package_id: newId,
      day_no: it.day_no || idx + 1,
      title_en: it.title_en || `Day ${idx + 1}`,
      title_bn: it.title_en || `Day ${idx + 1}`,
      description_en: it.description_en || '',
      description_bn: it.description_en || '',
      created_at: now,
    })),
    items: [
      ...(input.inclusions || []).map((inc, idx) => ({
        id: `inc-${Date.now()}-${idx}`,
        package_id: newId,
        type: 'included' as const,
        text_en: inc,
        text_bn: inc,
        sort_order: idx + 1,
        created_at: now,
      })),
      ...(input.exclusions || []).map((exc, idx) => ({
        id: `exc-${Date.now()}-${idx}`,
        package_id: newId,
        type: 'excluded' as const,
        text_en: exc,
        text_bn: exc,
        sort_order: idx + 1,
        created_at: now,
      })),
    ],
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
  let destination = existing.destination;
  let category = existing.category;
  let destinationId = updates.destination_id || existing.destination_id;
  let categoryId = updates.category_id || existing.category_id;

  if (updates.destination_id) {
    const foundDest = adminStore.destinations.find(
      (d) =>
        d.id === updates.destination_id ||
        d.name_en.toLowerCase() === updates.destination_id!.toLowerCase() ||
        d.slug.toLowerCase() === updates.destination_id!.toLowerCase()
    );
    if (foundDest) {
      destination = {
        id: foundDest.id,
        slug: foundDest.slug,
        name_en: foundDest.name_en,
        name_bn: foundDest.name_bn,
        region: foundDest.region,
      };
      destinationId = foundDest.id;
    } else if (updates.destination_id.trim().length >= 2) {
      const destName = updates.destination_id.trim();
      const destSlug =
        destName
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '') || `dest-${Date.now()}`;
      const newDest: any = {
        id: `dest-${Date.now()}`,
        slug: destSlug,
        name_en: destName,
        name_bn: destName,
        region: 'Bangladesh',
        short_description_en: `Scenic travel corridor across ${destName}, Bangladesh.`,
        short_description_bn: `${destName} ভ্রমণ`,
        cover_image_url:
          'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
        is_popular: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      adminStore.destinations.push(newDest);
      destination = {
        id: newDest.id,
        slug: newDest.slug,
        name_en: newDest.name_en,
        name_bn: newDest.name_bn,
        region: newDest.region,
      };
      destinationId = newDest.id;
    }
  }

  if (updates.category_id) {
    const foundCat = adminStore.categories.find(
      (c) =>
        c.id === updates.category_id ||
        c.name_en.toLowerCase() === updates.category_id!.toLowerCase() ||
        c.slug.toLowerCase() === updates.category_id!.toLowerCase()
    );
    if (foundCat) {
      category = {
        id: foundCat.id,
        slug: foundCat.slug,
        name_en: foundCat.name_en,
        name_bn: foundCat.name_bn,
      };
      categoryId = foundCat.id;
    } else if (updates.category_id.trim().length >= 2) {
      const catName = updates.category_id.trim();
      const catSlug =
        catName
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '') || `cat-${Date.now()}`;
      const newCat: any = {
        id: `cat-${Date.now()}`,
        slug: catSlug,
        name_en: catName,
        name_bn: catName,
        description_en: `${catName} expeditions and journeys across Bangladesh.`,
        description_bn: `${catName} ট্যুর`,
        icon: 'explore',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      adminStore.categories.push(newCat);
      category = {
        id: newCat.id,
        slug: newCat.slug,
        name_en: newCat.name_en,
        name_bn: newCat.name_bn,
      };
      categoryId = newCat.id;
    }
  }

  let itinerary = existing.itinerary;
  if (updates.itinerary !== undefined) {
    itinerary = (updates.itinerary || []).map((it, idx) => ({
      id: it.id || `itin-${Date.now()}-${idx}`,
      package_id: id,
      day_no: it.day_no || idx + 1,
      title_en: it.title_en || `Day ${idx + 1}`,
      title_bn: it.title_en || `Day ${idx + 1}`,
      description_en: it.description_en || '',
      description_bn: it.description_en || '',
      created_at: new Date().toISOString(),
    }));
  }

  let items = existing.items;
  if (updates.inclusions !== undefined || updates.exclusions !== undefined) {
    const existingInclusions = (existing.items || [])
      .filter((i: any) => i.type === 'included')
      .map((i: any) => i.text_en);
    const existingExclusions = (existing.items || [])
      .filter((i: any) => i.type === 'excluded')
      .map((i: any) => i.text_en);

    const finalInclusions = updates.inclusions !== undefined ? updates.inclusions : existingInclusions;
    const finalExclusions = updates.exclusions !== undefined ? updates.exclusions : existingExclusions;

    items = [
      ...finalInclusions.map((inc, idx) => ({
        id: `inc-${Date.now()}-${idx}`,
        package_id: id,
        type: 'included' as const,
        text_en: inc,
        text_bn: inc,
        sort_order: idx + 1,
        created_at: new Date().toISOString(),
      })),
      ...finalExclusions.map((exc, idx) => ({
        id: `exc-${Date.now()}-${idx}`,
        package_id: id,
        type: 'excluded' as const,
        text_en: exc,
        text_bn: exc,
        sort_order: idx + 1,
        created_at: new Date().toISOString(),
      })),
    ];
  }

  let departures = existing.departures;
  if (updates.departures !== undefined) {
    departures = (updates.departures || []).map((dep: any, idx: number) => {
      const cap = Number(dep.capacity) || 20;
      const avail = dep.available_seats !== undefined ? Number(dep.available_seats) : cap;
      const status = avail === 0 ? 'sold_out' : avail <= 5 ? 'few_seats' : 'available';
      return {
        id: dep.id || `dep-${Date.now()}-${idx}`,
        package_id: id,
        departure_date: dep.departure_date || new Date().toISOString().split('T')[0],
        capacity: cap,
        available_seats: avail,
        status,
        created_at: dep.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    });
  }

  const updatedPackage: any = {
    ...existing,
    ...updates,
    destination_id: destinationId,
    category_id: categoryId,
    destination,
    category,
    itinerary,
    items,
    departures,
    rating_average:
      updates.rating_average !== undefined
        ? Number(updates.rating_average)
        : existing.rating_average || 4.95,
    reviews_count:
      updates.reviews_count !== undefined
        ? Number(updates.reviews_count)
        : existing.reviews_count || 120,
    is_featured: updates.is_featured !== undefined ? !!updates.is_featured : existing.is_featured,
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
