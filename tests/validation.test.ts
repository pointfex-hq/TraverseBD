import { describe, expect, it } from "vitest";
import {
  categorySchema, departureSchema, destinationSchema, loginSchema,
  packageSchema, updateAdminSchema
} from "../lib/validation";
import { slugify } from "../lib/slug";

describe("TraverseBD validation", () => {
  it("accepts valid login", () => {
    expect(loginSchema.safeParse({
      email: "admin@traversebd.local",
      password: "Admin@123456"
    }).success).toBe(true);
  });

  it("accepts category contract", () => {
    expect(categorySchema.safeParse({
      name: "Beach",
      status: "PUBLISHED",
      sortOrder: 1
    }).success).toBe(true);
  });

  it("accepts destination contract", () => {
    expect(destinationSchema.safeParse({
      name: "Coxs Bazar",
      featured: true,
      status: "PUBLISHED"
    }).success).toBe(true);
  });

  it("accepts package contract", () => {
    expect(packageSchema.safeParse({
      title: "Sundarbans 3 Day",
      price: 12500,
      durationDays: 3,
      priceMode: "FIXED",
      status: "PUBLISHED",
      items: [{ type: "included", text: "Transport", sortOrder: 1 }]
    }).success).toBe(true);
  });

  it("rejects booked seats greater than capacity", () => {
    const result = departureSchema.safeParse({
      packageId: "550e8400-e29b-41d4-a716-446655440000",
      departureDate: "2026-12-10",
      totalSeats: 30,
      bookedSeats: 31
    });
    expect(result.success).toBe(false);
  });

  it("validates admin update roles", () => {
    expect(updateAdminSchema.safeParse({
      email: "staff@example.com",
      role: "ADMIN",
      active: true
    }).success).toBe(true);
  });

  it("creates URL-safe slugs", () => {
    expect(slugify("Cox's  Bazar")).toBe("cox-s-bazar");
  });
});
