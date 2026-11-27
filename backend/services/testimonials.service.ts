import { adminStore, Testimonial, INITIAL_TESTIMONIALS } from '@backend/data/admin-mock-data';

export type { Testimonial };
export const MOCK_TESTIMONIALS: Testimonial[] = INITIAL_TESTIMONIALS;

function getStoreTestimonials(): Testimonial[] {
  if (!adminStore.testimonials || !Array.isArray(adminStore.testimonials)) {
    adminStore.testimonials = JSON.parse(JSON.stringify(INITIAL_TESTIMONIALS));
  }
  return adminStore.testimonials;
}

export async function getPublishedTestimonials(packageSlug?: string) {
  const storeList = getStoreTestimonials();
  let list = storeList.filter((t) => t.status === 'published');
  if (packageSlug) {
    list = list.filter((t) => t.package_slug === packageSlug);
  }
  return { data: list, error: null };
}

export function getAllAdminTestimonials(): Testimonial[] {
  return getStoreTestimonials();
}

export function createAdminTestimonial(
  input: Omit<Testimonial, 'id'>,
  adminEmail = 'admin@traversebd.com'
): Testimonial {
  const list = getStoreTestimonials();
  const newId = `t-${Date.now()}`;
  const testimonial: Testimonial = {
    ...input,
    id: newId,
    rating: Number(input.rating) || 5,
    verified: input.verified !== undefined ? Boolean(input.verified) : true,
    status: input.status || 'published',
  };

  list.unshift(testimonial);
  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'TESTIMONIAL_CREATED',
    'testimonials',
    `Added new review from ${testimonial.name} (${testimonial.location})`
  );

  return testimonial;
}

export function updateAdminTestimonial(
  id: string,
  updates: Partial<Testimonial>,
  adminEmail = 'admin@traversebd.com'
): Testimonial | null {
  const list = getStoreTestimonials();
  const index = list.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const existing = list[index];
  const updated: Testimonial = {
    ...existing,
    ...updates,
    id: existing.id,
    rating: updates.rating !== undefined ? Number(updates.rating) : existing.rating,
  };

  list[index] = updated;
  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'TESTIMONIAL_UPDATED',
    'testimonials',
    `Updated review for ${updated.name}`
  );

  return updated;
}

export function deleteAdminTestimonial(
  id: string,
  adminEmail = 'admin@traversebd.com'
): boolean {
  const list = getStoreTestimonials();
  const existing = list.find((t) => t.id === id);
  if (!existing) return false;

  adminStore.testimonials = list.filter((t) => t.id !== id);
  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'TESTIMONIAL_DELETED',
    'testimonials',
    `Deleted review from ${existing.name}`
  );

  return true;
}
