import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(12),
  locale: z.enum(['en', 'bn']).default('en'),
});

export const packagesQuerySchema = paginationSchema.extend({
  q: z.string().optional(),
  category: z.string().optional(),
  destination: z.string().optional(),
  min_price: z.coerce.number().nonnegative().optional(),
  max_price: z.coerce.number().positive().optional(),
  duration: z.coerce.number().positive().optional(),
  sort: z.enum(['price_asc', 'price_desc', 'newest', 'duration_asc']).default('newest'),
  featured: z.enum(['true', 'false']).optional(),
  trending: z.enum(['true', 'false']).optional(),
});

export const whatsappInquirySchema = z.object({
  packageTitle: z.string().min(1, 'Package title is required'),
  packageSlug: z.string().min(1, 'Package slug is required'),
  packagePrice: z.number().int().positive().optional(),
  priceMode: z.enum(['fixed', 'starting_from']).default('fixed'),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format').optional(),
  travelerCount: z.number().int().positive().max(50).optional(),
  customNote: z.string().max(300).optional(),
  locale: z.enum(['en', 'bn']).default('en'),
  phoneNumber: z.string().regex(/^\d{10,15}$/, 'Phone number must be 10-15 digits without symbols').optional(),
});
