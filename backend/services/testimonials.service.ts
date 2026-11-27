import { adminStore, Testimonial, INITIAL_TESTIMONIALS } from '@backend/data/admin-mock-data';

export type { Testimonial };
export const MOCK_TESTIMONIALS: Testimonial[] = INITIAL_TESTIMONIALS;

export async function getPublishedTestimonials(packageSlug?: string) {
  const storeList = adminStore.testimonials || INITIAL_TESTIMONIALS;
  let list = storeList.filter((t) => t.status === 'published');
  if (packageSlug) {
    list = list.filter((t) => t.package_slug === packageSlug);
  }
  return { data: list, error: null };
}

export function getAllAdminTestimonials(): Testimonial[] {
  return adminStore.testimonials || INITIAL_TESTIMONIALS;
}

export function createAdminTestimonial(
  input: Omit<Testimonial, 'id'>,
  adminEmail = 'admin@traversebd.com'
): Testimonial {
  const newId = `t-${Date.now()}`;
  const testimonial: Testimonial = {
    ...input,
    id: newId,
    rating: Number(input.rating) || 5,
    verified: input.verified !== undefined ? Boolean(input.verified) : true,
    status: input.status || 'published',
  };

  adminStore.testimonials.unshift(testimonial);
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
  const index = adminStore.testimonials.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const existing = adminStore.testimonials[index];
  const updated: Testimonial = {
    ...existing,
    ...updates,
    id: existing.id,
    rating: updates.rating !== undefined ? Number(updates.rating) : existing.rating,
  };

  adminStore.testimonials[index] = updated;
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
  const existing = adminStore.testimonials.find((t) => t.id === id);
  if (!existing) return false;

  adminStore.testimonials = adminStore.testimonials.filter((t) => t.id !== id);
  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'TESTIMONIAL_DELETED',
    'testimonials',
    `Deleted review from ${existing.name}`
  );

  return true;
}
