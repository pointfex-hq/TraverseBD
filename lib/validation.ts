import { z } from "zod";

export const statusSchema = z.enum(["DRAFT", "PUBLISHED"]);
export const roleSchema = z.enum(["ADMIN", "SUPER_ADMIN"]);

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const googleSchema = z.object({ idToken: z.string().min(1) });

export const createAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
  role: roleSchema
});

export const updateAdminSchema = z.object({
  email: z.string().email(),
  role: roleSchema,
  active: z.boolean()
});

export const categorySchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().optional(),
  status: statusSchema.optional(),
  sortOrder: z.number().int().min(0).optional()
});

export const destinationSchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().optional(),
  region: z.string().optional(),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  coverImageUrl: z.string().optional(),
  highlights: z.string().optional(),
  status: statusSchema.optional(),
  featured: z.boolean().optional()
});

export const packageSchema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().optional(),
  destinationId: z.string().uuid().optional().nullable(),
  categoryId: z.string().uuid().optional().nullable(),
  price: z.number().int().positive(),
  durationDays: z.number().int().positive(),
  priceMode: z.enum(["FIXED", "STARTING_FROM"]),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  coverImageUrl: z.string().optional(),
  status: statusSchema.optional(),
  featured: z.boolean().optional(),
  trending: z.boolean().optional(),
  items: z.array(z.object({
    type: z.string().trim().min(1),
    text: z.string().trim().min(1),
    sortOrder: z.number().int().min(0)
  })).optional()
});

export const departureSchema = z.object({
  packageId: z.string().uuid(),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  totalSeats: z.number().int().positive(),
  bookedSeats: z.number().int().min(0),
  priceOverride: z.number().int().positive().nullable().optional()
}).refine(data => data.bookedSeats <= data.totalSeats, {
  message: "Booked seats cannot exceed total seats",
  path: ["bookedSeats"]
});
