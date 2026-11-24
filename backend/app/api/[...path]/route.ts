import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { OAuth2Client } from "google-auth-library";
import { getAnonSupabase, getServerSupabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth";
import { error, json, zodError } from "@/lib/http";
import { slugify } from "@/lib/slug";
import {
  categorySchema, createAdminSchema, departureSchema, destinationSchema,
  googleSchema, loginSchema, packageSchema, statusSchema, updateAdminSchema
} from "@/lib/validation";

type Context = { params: Promise<{ path: string[] }> };

function base(row: Record<string, any>) {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function category(row: Record<string, any>) {
  return { ...base(row), name: row.name, slug: row.slug, status: row.status, sortOrder: row.sort_order };
}

function destination(row: Record<string, any>) {
  return {
    ...base(row),
    name: row.name, slug: row.slug, region: row.region,
    shortDescription: row.short_description, fullDescription: row.full_description,
    coverImageUrl: row.cover_image_url, highlights: row.highlights,
    status: row.status, featured: row.featured
  };
}

function travelPackage(row: Record<string, any>, destinationRow?: any, categoryRow?: any, items: any[] = []) {
  return {
    ...base(row),
    title: row.title,
    slug: row.slug,
    destinationId: row.destination_id,
    categoryId: row.category_id,
    destination: destinationRow ? destination(destinationRow) : null,
    category: categoryRow ? category(categoryRow) : null,
    price: row.price,
    durationDays: row.duration_days,
    priceMode: row.price_mode,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    coverImageUrl: row.cover_image_url,
    status: row.status,
    featured: row.featured,
    trending: row.trending,
    items: items.map(item => ({
      ...base(item),
      type: item.type,
      text: item.text,
      sortOrder: item.sort_order
    })).sort((a, b) => a.sortOrder - b.sortOrder)
  };
}

function departure(row: Record<string, any>) {
  return {
    ...base(row),
    packageId: row.package_id,
    departureDate: row.departure_date,
    totalSeats: row.total_seats,
    bookedSeats: row.booked_seats,
    priceOverride: row.price_override
  };
}

function gallery(row: Record<string, any>) {
  return { ...base(row), imageUrl: row.image_url, caption: row.caption, status: row.status, sortOrder: row.sort_order };
}

function blog(row: Record<string, any>) {
  return {
    ...base(row),
    title: row.title, slug: row.slug, excerpt: row.excerpt, content: row.content,
    coverImageUrl: row.cover_image_url, status: row.status, publishedAt: row.published_at
  };
}

function testimonial(row: Record<string, any>) {
  return { ...base(row), name: row.name, quote: row.quote, rating: row.rating, status: row.status };
}

function travelService(row: Record<string, any>) {
  return { ...base(row), title: row.title, description: row.description, iconName: row.icon_name, status: row.status, sortOrder: row.sort_order };
}

function faq(row: Record<string, any>) {
  return { ...base(row), question: row.question, answer: row.answer, status: row.status, sortOrder: row.sort_order };
}

async function packageJson(db: ReturnType<typeof getServerSupabase>, row: Record<string, any>) {
  const destinationRequest = row.destination_id
    ? await db.from("destinations").select("*").eq("id", row.destination_id).maybeSingle()
    : { data: null };
  const categoryRequest = row.category_id
    ? await db.from("categories").select("*").eq("id", row.category_id).maybeSingle()
    : { data: null };
  const itemsRequest = await db.from("package_items").select("*").eq("package_id", row.id).order("sort_order");
  return travelPackage(row, destinationRequest.data, categoryRequest.data, itemsRequest.data ?? []);
}

async function setCookieResponse(request: NextRequest, accessToken: string, email: string, role: string) {
  const response = json({ accessToken, email, role });
  response.cookies.set("ADMIN_SESSION", accessToken, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: (process.env.COOKIE_SAME_SITE?.toLowerCase() === "strict" ? "strict" : "lax") as "strict" | "lax",
    path: "/",
    maxAge: 60 * 60
  });
  return response;
}

export async function GET(request: NextRequest, context: Context) {
  const { path } = await context.params;
  const db = getServerSupabase();

  if (path[0] === "public" && path[1] === "settings") {
    const { data } = await db.from("site_settings").select("*");
    const publicKeys = new Set([
      "whatsapp_number", "whatsapp_message", "contact_phone", "contact_email",
      "store_name", "tagline", "facebook_url", "instagram_url", "address", "footer_text"
    ]);
    return json(Object.fromEntries((data ?? []).filter(row => publicKeys.has(row.setting_key)).map(row => [row.setting_key, row.value])));
  }

  if (path[0] === "public" && path[1] === "categories") {
    const { data } = await db.from("categories").select("*").eq("status", "PUBLISHED").order("sort_order");
    return json((data ?? []).map(category));
  }

  if (path[0] === "public" && path[1] === "destinations" && path[2]) {
    const { data } = await db.from("destinations").select("*").eq("status", "PUBLISHED").eq("slug", path[2]).maybeSingle();
    if (!data) return error("NOT_FOUND", "Destination not found", 404);
    return json(destination(data));
  }
  if (path[0] === "public" && path[1] === "destinations") {
    const { data } = await db.from("destinations").select("*").eq("status", "PUBLISHED").order("name");
    return json((data ?? []).map(destination));
  }

  if (path[0] === "public" && path[1] === "packages" && path[2] && path[3] === "departures") {
    const { data } = await db.from("departures").select("*").eq("package_id", path[2]).order("departure_date");
    return json((data ?? []).map(departure));
  }
  if (path[0] === "public" && path[1] === "packages" && path[2]) {
    const { data } = await db.from("packages").select("*").eq("status", "PUBLISHED").eq("slug", path[2]).maybeSingle();
    if (!data) return error("NOT_FOUND", "Package not found", 404);
    return json(await packageJson(db, data));
  }
  if (path[0] === "public" && path[1] === "packages") {
    let query = db.from("packages").select("*").eq("status", "PUBLISHED");
    const destinationId = request.nextUrl.searchParams.get("destinationId");
    const categoryId = request.nextUrl.searchParams.get("categoryId");
    const minPrice = request.nextUrl.searchParams.get("minPrice");
    const maxPrice = request.nextUrl.searchParams.get("maxPrice");
    const durationDays = request.nextUrl.searchParams.get("durationDays");
    if (destinationId) query = query.eq("destination_id", destinationId);
    if (categoryId) query = query.eq("category_id", categoryId);
    if (minPrice) query = query.gte("price", Number(minPrice));
    if (maxPrice) query = query.lte("price", Number(maxPrice));
    if (durationDays) query = query.eq("duration_days", Number(durationDays));
    const { data } = await query.order("created_at", { ascending: false });
    return json(await Promise.all((data ?? []).map(row => packageJson(db, row))));
  }

  if (path[0] === "public" && path[1] === "gallery") {
    const { data } = await db.from("gallery_images").select("*").eq("status", "PUBLISHED").order("sort_order");
    return json((data ?? []).map(gallery));
  }
  if (path[0] === "public" && path[1] === "blog" && path[2]) {
    const { data } = await db.from("blog_posts").select("*").eq("status", "PUBLISHED").eq("slug", path[2]).maybeSingle();
    if (!data) return error("NOT_FOUND", "Blog post not found", 404);
    return json(blog(data));
  }
  if (path[0] === "public" && path[1] === "blog") {
    const { data } = await db.from("blog_posts").select("*").eq("status", "PUBLISHED").order("published_at", { ascending: false });
    return json((data ?? []).map(blog));
  }
  if (path[0] === "public" && path[1] === "testimonials") {
    const { data } = await db.from("testimonials").select("*").eq("status", "PUBLISHED").order("created_at", { ascending: false });
    return json((data ?? []).map(testimonial));
  }
  if (path[0] === "public" && path[1] === "services") {
    const { data } = await db.from("travel_services").select("*").eq("status", "PUBLISHED").order("sort_order");
    return json((data ?? []).map(travelService));
  }
  if (path[0] === "public" && path[1] === "faqs") {
    const { data } = await db.from("faqs").select("*").eq("status", "PUBLISHED").order("sort_order");
    return json((data ?? []).map(faq));
  }
  if (path[0] === "public" && path[1] === "search") {
    const q = (request.nextUrl.searchParams.get("q") ?? "").trim();
    if (!q) return json({ destinations: [], packages: [] });
    const [destinationNameResult, destinationRegionResult, packagesResult] = await Promise.all([
      db.from("destinations").select("*").eq("status", "PUBLISHED").ilike("name", `%${q}%`),
      db.from("destinations").select("*").eq("status", "PUBLISHED").ilike("region", `%${q}%`),
      db.from("packages").select("*").eq("status", "PUBLISHED").ilike("title", `%${q}%`)
    ]);
    const destinationMap = new Map<string, any>();
    for (const row of [...(destinationNameResult.data ?? []), ...(destinationRegionResult.data ?? [])]) {
      destinationMap.set(row.id, row);
    }
    return json({
      destinations: [...destinationMap.values()].map(destination),
      packages: await Promise.all((packagesResult.data ?? []).map(row => packageJson(db, row)))
    });
  }

  const admin = await requireAdmin(request);
  if (!admin) return error("UNAUTHORIZED", "Authentication is required", 401);

  if (path[0] === "admin" && path[1] === "dashboard") {
    const [destinations, packages, categories, users] = await Promise.all([
      db.from("destinations").select("status"),
      db.from("packages").select("status"),
      db.from("categories").select("id"),
      db.from("admin_users").select("id")
    ]);
    const destinationRows = destinations.data ?? [];
    const packageRows = packages.data ?? [];
    return json({
      destinations: destinationRows.length,
      publishedDestinations: destinationRows.filter(row => row.status === "PUBLISHED").length,
      packages: packageRows.length,
      publishedPackages: packageRows.filter(row => row.status === "PUBLISHED").length,
      categories: (categories.data ?? []).length,
      admins: (users.data ?? []).length
    });
  }

  if (path[0] === "admin" && path[1] === "settings") {
    const { data } = await db.from("site_settings").select("*");
    return json(Object.fromEntries((data ?? []).map(row => [row.setting_key, row.value])));
  }

  if (path[0] === "admin" && path[1] === "users") {
    if (admin.role !== "SUPER_ADMIN") return error("FORBIDDEN", "Super Admin role is required", 403);
    const { data } = await db.from("admin_users").select("*").order("email");
    return json((data ?? []).map(row => ({
      id: row.id,
      email: row.email,
      role: row.role,
      active: row.status === "Active",
      googleSubject: row.google_subject,
      mfaEnabled: row.mfa_enabled,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    })));
  }

  const resourceConfig: Record<string, { table: string; mapper: (row: any) => any }> = {
    categories: { table: "categories", mapper: category },
    destinations: { table: "destinations", mapper: destination },
    gallery: { table: "gallery_images", mapper: gallery },
    blog: { table: "blog_posts", mapper: blog },
    testimonials: { table: "testimonials", mapper: testimonial },
    services: { table: "travel_services", mapper: travelService },
    faqs: { table: "faqs", mapper: faq }
  };
  const resource = path[1];
  const config = resourceConfig[resource];
  if (path[0] === "admin" && config) {
    const id = path[2];
    if (id) {
      const { data } = await db.from(config.table).select("*").eq("id", id).maybeSingle();
      if (!data) return error("NOT_FOUND", "Resource not found", 404);
      return json(config.mapper(data));
    }
    const { data } = await db.from(config.table).select("*").order("created_at", { ascending: false });
    return json((data ?? []).map(config.mapper));
  }

  if (path[0] === "admin" && path[1] === "packages") {
    const id = path[2];
    if (id) {
      const { data } = await db.from("packages").select("*").eq("id", id).maybeSingle();
      if (!data) return error("NOT_FOUND", "Package not found", 404);
      return json(await packageJson(db, data));
    }
    const { data } = await db.from("packages").select("*").order("created_at", { ascending: false });
    return json(await Promise.all((data ?? []).map(row => packageJson(db, row))));
  }

  if (path[0] === "admin" && path[1] === "departures") {
    const id = path[2];
    if (id) {
      const { data } = await db.from("departures").select("*").eq("id", id).maybeSingle();
      if (!data) return error("NOT_FOUND", "Departure not found", 404);
      return json(departure(data));
    }
    const { data } = await db.from("departures").select("*").order("departure_date");
    return json((data ?? []).map(departure));
  }
  return error("NOT_FOUND", "Endpoint not found", 404);
}

export async function DELETE(request: NextRequest, context: Context) {
  const { path } = await context.params;
  const db = getServerSupabase();
  const admin = await requireAdmin(request);
  if (!admin) return error("UNAUTHORIZED", "Authentication is required", 401);

  if (path[0] === "admin" && path[1] === "users" && path[2]) {
    if (admin.role !== "SUPER_ADMIN") return error("FORBIDDEN", "Super Admin role is required", 403);
    const { data: activeSuperAdmins } = await db.from("admin_users").select("id")
      .eq("role", "SUPER_ADMIN").eq("status", "Active");
    const { data: target } = await db.from("admin_users").select("role").eq("id", path[2]).maybeSingle();
    if (!target) return error("NOT_FOUND", "Admin not found", 404);
    if (target.role === "SUPER_ADMIN" && (activeSuperAdmins?.length ?? 0) <= 1) {
      return error("CONFLICT", "At least one active Super Admin must remain", 409);
    }
    await db.from("admin_users").delete().eq("id", path[2]);
    return new NextResponse(null, { status: 204 });
  }

  if (path[0] === "admin" && path[1] === "categories" && path[2]) {
    const packageCount = await db.from("packages").select("id", { count: "exact", head: true })
      .eq("category_id", path[2]);
    if ((packageCount.count ?? 0) > 0) return error("CONFLICT", "Category is used by one or more packages", 409);
    await db.from("categories").delete().eq("id", path[2]);
    return new NextResponse(null, { status: 204 });
  }

  if (path[0] === "admin" && path[1] === "media") {
    const objectName = request.nextUrl.searchParams.get("objectName");
    if (!objectName || !objectName.match(/^[A-Za-z0-9_-]+\.(jpg|jpeg|png|webp)$/)) {
      return error("BAD_REQUEST", "Invalid object name");
    }
    const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "tourism-media";
    if (!supabaseUrl || !key) return error("UNAVAILABLE", "Supabase Storage is not configured", 503);
    const response = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${objectName}`, {
      method: "DELETE",
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    if (!response.ok) return error("BAD_GATEWAY", "Supabase Storage rejected the delete", 502);
    return new NextResponse(null, { status: 204 });
  }

  const resourceConfig: Record<string, string> = {
    destinations: "destinations",
    categories: "categories",
    packages: "packages",
    departures: "departures",
    gallery: "gallery_images",
    blog: "blog_posts",
    testimonials: "testimonials",
    services: "travel_services",
    faqs: "faqs"
  };
  const table = resourceConfig[path[1]];
  if (path[0] === "admin" && table && path[2]) {
    await db.from(table).delete().eq("id", path[2]);
    return new NextResponse(null, { status: 204 });
  }
  return error("NOT_FOUND", "Endpoint not found", 404);
}

export async function PUT(request: NextRequest, context: Context) {
  const { path } = await context.params;
  const body = await request.json().catch(() => null);
  const db = getServerSupabase();
  const admin = await requireAdmin(request);
  if (!admin) return error("UNAUTHORIZED", "Authentication is required", 401);

  if (path[0] === "admin" && path[1] === "users" && path[2]) {
    if (admin.role !== "SUPER_ADMIN") return error("FORBIDDEN", "Super Admin role is required", 403);
    const parsed = updateAdminSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    const { data: saved, error: updateError } = await db.from("admin_users").update({
      email: parsed.data.email.trim().toLowerCase(),
      role: parsed.data.role,
      status: parsed.data.active ? "Active" : "Disabled",
      updated_at: new Date().toISOString()
    }).eq("id", path[2]).select("*").single();
    if (updateError) return error("BAD_REQUEST", updateError.message);
    return json({
      id: saved.id,
      email: saved.email,
      role: saved.role,
      active: saved.status === "Active",
      googleSubject: saved.google_subject,
      mfaEnabled: saved.mfa_enabled,
      createdAt: saved.created_at,
      updatedAt: saved.updated_at
    });
  }

  if (path[0] === "admin" && path[1] === "settings") {
    const parsed = z.object({ settings: z.record(z.string().min(1)) }).safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    for (const [key, value] of Object.entries(parsed.data.settings)) {
      await db.from("site_settings").upsert({ setting_key: key, value, updated_at: new Date().toISOString() });
    }
    const { data } = await db.from("site_settings").select("*");
    return json(Object.fromEntries((data ?? []).map(row => [row.setting_key, row.value])));
  }

  if (path[0] === "admin" && path[1] === "categories" && path[2]) {
    const parsed = categorySchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    const data = parsed.data;
    const { data: saved, error: updateError } = await db.from("categories").update({
      name: data.name,
      slug: data.slug?.trim() || undefined,
      status: data.status,
      sort_order: data.sortOrder,
      updated_at: new Date().toISOString()
    }).eq("id", path[2]).select("*").single();
    if (updateError) return error("CONFLICT", updateError.message, 409);
    return json(category(saved));
  }

  if (path[0] === "admin" && path[1] === "destinations" && path[2]) {
    const parsed = destinationSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    const data = parsed.data;
    const { data: saved, error: updateError } = await db.from("destinations").update({
      name: data.name,
      slug: data.slug?.trim() || undefined,
      region: data.region,
      short_description: data.shortDescription,
      full_description: data.fullDescription,
      cover_image_url: data.coverImageUrl,
      highlights: data.highlights,
      status: data.status,
      featured: data.featured,
      updated_at: new Date().toISOString()
    }).eq("id", path[2]).select("*").single();
    if (updateError) return error("CONFLICT", updateError.message, 409);
    return json(destination(saved));
  }

  if (path[0] === "admin" && path[1] === "packages" && path[2]) {
    const parsed = packageSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    const data = parsed.data;
    const { data: saved, error: updateError } = await db.from("packages").update({
      title: data.title,
      slug: data.slug?.trim() || undefined,
      destination_id: data.destinationId ?? null,
      category_id: data.categoryId ?? null,
      price: data.price,
      duration_days: data.durationDays,
      price_mode: data.priceMode,
      short_description: data.shortDescription,
      full_description: data.fullDescription,
      cover_image_url: data.coverImageUrl,
      status: data.status,
      featured: data.featured,
      trending: data.trending,
      updated_at: new Date().toISOString()
    }).eq("id", path[2]).select("*").single();
    if (updateError) return error("CONFLICT", updateError.message, 409);
    await db.from("package_items").delete().eq("package_id", path[2]);
    if (data.items?.length) {
      await db.from("package_items").insert(data.items.map(item => ({
        package_id: path[2],
        type: item.type,
        text: item.text,
        sort_order: item.sortOrder
      })));
    }
    return json(await packageJson(db, saved));
  }

  if (path[0] === "admin" && path[1] === "departures" && path[2]) {
    const parsed = departureSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    const data = parsed.data;
    if (data.bookedSeats > data.totalSeats) return error("BAD_REQUEST", "Booked seats cannot exceed total seats");
    const { data: saved, error: updateError } = await db.from("departures").update({
      package_id: data.packageId,
      departure_date: data.departureDate,
      total_seats: data.totalSeats,
      booked_seats: data.bookedSeats,
      price_override: data.priceOverride ?? null,
      updated_at: new Date().toISOString()
    }).eq("id", path[2]).select("*").single();
    if (updateError) return error("BAD_REQUEST", updateError.message);
    return json(departure(saved));
  }

  const simpleResources: Record<string, { table: string; schema: z.ZodTypeAny; mapper: (row: any) => any }> = {
    gallery: { table: "gallery_images", schema: z.object({ imageUrl: z.string().url(), caption: z.string().optional(), status: statusSchema.optional(), sortOrder: z.number().int().min(0).optional() }), mapper: gallery },
    blog: { table: "blog_posts", schema: z.object({ title: z.string().min(1), slug: z.string().optional(), excerpt: z.string().optional(), content: z.string().min(1), coverImageUrl: z.string().optional(), status: statusSchema.optional() }), mapper: blog },
    testimonials: { table: "testimonials", schema: z.object({ name: z.string().min(1), quote: z.string().min(1), rating: z.number().int().min(1).max(5).optional(), status: statusSchema.optional() }), mapper: testimonial },
    services: { table: "travel_services", schema: z.object({ title: z.string().min(1), description: z.string().optional(), iconName: z.string().optional(), status: statusSchema.optional(), sortOrder: z.number().int().min(0).optional() }), mapper: travelService },
    faqs: { table: "faqs", schema: z.object({ question: z.string().min(1), answer: z.string().min(1), status: statusSchema.optional(), sortOrder: z.number().int().min(0).optional() }), mapper: faq }
  };
  const simple = simpleResources[path[1]];
  if (path[0] === "admin" && simple && path[2]) {
    const parsed = simple.schema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    const data = parsed.data as Record<string, any>;
    const update: Record<string, any> = { updated_at: new Date().toISOString() };
    for (const [key, value] of Object.entries(data)) {
      update[key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)] = value;
    }
    if (path[1] === "blog") {
      update.slug = data.slug?.trim() || undefined;
      if (data.status === "PUBLISHED") update.published_at = new Date().toISOString();
      if (data.status === "DRAFT") update.published_at = null;
    }
    const { data: saved, error: updateError } = await db.from(simple.table).update(update).eq("id", path[2]).select("*").single();
    if (updateError) return error("CONFLICT", updateError.message, 409);
    return json(simple.mapper(saved));
  }
  return error("NOT_FOUND", "Endpoint not found", 404);
}

export async function POST(request: NextRequest, context: Context) {
  const { path } = await context.params;
  const body = await request.json().catch(() => null);
  const db = getServerSupabase();

  if (path[0] === "auth" && path[1] === "login") {
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    const anon = getAnonSupabase();
    const { data, error: authError } = await anon.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password
    });
    if (authError || !data.session) return error("UNAUTHORIZED", "Invalid credentials", 401);
    const { data: admin } = await db.from("admin_users").select("role,status")
      .eq("email", parsed.data.email.toLowerCase()).eq("status", "Active").maybeSingle();
    if (!admin) return error("UNAUTHORIZED", "Invalid credentials", 401);
    return setCookieResponse(request, data.session.access_token, parsed.data.email.toLowerCase(), admin.role);
  }

  if (path[0] === "auth" && path[1] === "google") {
    const parsed = googleSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) return error("UNAVAILABLE", "Google sign-in is not configured", 503);
    try {
      const client = new OAuth2Client(clientId);
      const ticket = await client.verifyIdToken({ idToken: parsed.data.idToken, audience: clientId });
      const payload = ticket.getPayload();
      if (!payload?.email) return error("UNAUTHORIZED", "Invalid Google token", 401);
      const { data: admin } = await db.from("admin_users").select("*")
        .eq("email", payload.email.toLowerCase()).eq("status", "Active").maybeSingle();
      if (!admin) return error("UNAUTHORIZED", "Google account is not provisioned in TraverseBD", 401);
      await db.from("admin_users").update({ google_subject: payload.sub }).eq("id", admin.id);
      const anon = getAnonSupabase();
      const { data: googleSession, error: googleError } =
        await anon.auth.signInWithIdToken({ provider: "google", token: parsed.data.idToken });
      if (googleError || !googleSession.session) {
        return error("UNAUTHORIZED", "Google account could not create a session", 401);
      }
      return json({
        accessToken: googleSession.session.access_token,
        email: admin.email,
        role: admin.role
      });
    } catch {
      return error("UNAUTHORIZED", "Invalid Google token", 401);
    }
  }

  if (path[0] === "auth" && path[1] === "logout") {
    const response = new NextResponse(null, { status: 204 });
    response.cookies.set("ADMIN_SESSION", "", {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: (process.env.COOKIE_SAME_SITE?.toLowerCase() === "strict" ? "strict" : "lax") as "strict" | "lax",
      path: "/",
      maxAge: 0
    });
    return response;
  }

  const admin = await requireAdmin(request);
  if (!admin) return error("UNAUTHORIZED", "Authentication is required", 401);

  if (path[0] === "admin" && path[1] === "users") {
    if (admin.role !== "SUPER_ADMIN") return error("FORBIDDEN", "Super Admin role is required", 403);
    const parsed = createAdminSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    const email = parsed.data.email.trim().toLowerCase();
    const existing = await db.from("admin_users").select("id").eq("email", email).maybeSingle();
    if (existing.data) return error("CONFLICT", "Admin email already exists", 409);
    const { data: created, error: insertError } = await db.from("admin_users").insert({
      email,
      role: parsed.data.role,
      status: "Active"
    }).select("*").single();
    if (insertError) return error("BAD_REQUEST", insertError.message);
    if (parsed.data.password) {
      const authResult = await db.auth.admin.createUser({
        email,
        password: parsed.data.password,
        email_confirm: true
      });
      if (authResult.error) {
        await db.from("admin_users").delete().eq("id", created.id);
        return error("BAD_REQUEST", authResult.error.message);
      }
    }
    return json({
      id: created.id,
      email: created.email,
      role: created.role,
      active: true,
      googleSubject: created.google_subject,
      mfaEnabled: created.mfa_enabled,
      createdAt: created.created_at,
      updatedAt: created.updated_at
    }, 201);
  }

  if (path[0] === "admin" && path[1] === "settings") {
    const parsed = z.object({ settings: z.record(z.string().min(1)) }).safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    for (const [key, value] of Object.entries(parsed.data.settings)) {
      await db.from("site_settings").upsert({ setting_key: key, value, updated_at: new Date().toISOString() });
    }
    const { data } = await db.from("site_settings").select("*");
    return json(Object.fromEntries((data ?? []).map(row => [row.setting_key, row.value])));
  }

  if (path[0] === "admin" && path[1] === "categories") {
    const parsed = categorySchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    const data = parsed.data;
    const { data: saved, error: insertError } = await db.from("categories").insert({
      name: data.name,
      slug: data.slug?.trim() || slugify(data.name),
      status: data.status ?? "DRAFT",
      sort_order: data.sortOrder ?? 0
    }).select("*").single();
    if (insertError) return error("CONFLICT", insertError.message, 409);
    return json(category(saved), 201);
  }

  if (path[0] === "admin" && path[1] === "destinations") {
    const parsed = destinationSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    const data = parsed.data;
    const { data: saved, error: insertError } = await db.from("destinations").insert({
      name: data.name,
      slug: data.slug?.trim() || slugify(data.name),
      region: data.region,
      short_description: data.shortDescription,
      full_description: data.fullDescription,
      cover_image_url: data.coverImageUrl,
      highlights: data.highlights,
      status: data.status ?? "DRAFT",
      featured: data.featured ?? false
    }).select("*").single();
    if (insertError) return error("CONFLICT", insertError.message, 409);
    return json(destination(saved), 201);
  }

  if (path[0] === "admin" && path[1] === "packages") {
    const parsed = packageSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    const data = parsed.data;
    const { data: saved, error: insertError } = await db.from("packages").insert({
      title: data.title,
      slug: data.slug?.trim() || slugify(data.title),
      destination_id: data.destinationId ?? null,
      category_id: data.categoryId ?? null,
      price: data.price,
      duration_days: data.durationDays,
      price_mode: data.priceMode,
      short_description: data.shortDescription,
      full_description: data.fullDescription,
      cover_image_url: data.coverImageUrl,
      status: data.status ?? "DRAFT",
      featured: data.featured ?? false,
      trending: data.trending ?? false
    }).select("*").single();
    if (insertError) return error("CONFLICT", insertError.message, 409);
    if (data.items?.length) {
      await db.from("package_items").insert(data.items.map(item => ({
        package_id: saved.id,
        type: item.type,
        text: item.text,
        sort_order: item.sortOrder
      })));
    }
    return json(await packageJson(db, saved), 201);
  }

  if (path[0] === "admin" && path[1] === "departures") {
    const parsed = departureSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    const data = parsed.data;
    if (data.bookedSeats > data.totalSeats) return error("BAD_REQUEST", "Booked seats cannot exceed total seats");
    const packageExists = await db.from("packages").select("id").eq("id", data.packageId).maybeSingle();
    if (!packageExists.data) return error("NOT_FOUND", "Package not found", 404);
    const { data: saved, error: insertError } = await db.from("departures").insert({
      package_id: data.packageId,
      departure_date: data.departureDate,
      total_seats: data.totalSeats,
      booked_seats: data.bookedSeats,
      price_override: data.priceOverride ?? null
    }).select("*").single();
    if (insertError) return error("BAD_REQUEST", insertError.message);
    return json(departure(saved), 201);
  }

  const simpleResources: Record<string, { table: string; schema: z.ZodTypeAny; mapper: (row: any) => any }> = {
    gallery: {
      table: "gallery_images",
      schema: z.object({ imageUrl: z.string().url(), caption: z.string().optional(), status: statusSchema.optional(), sortOrder: z.number().int().min(0).optional() }),
      mapper: gallery
    },
    blog: {
      table: "blog_posts",
      schema: z.object({ title: z.string().min(1), slug: z.string().optional(), excerpt: z.string().optional(), content: z.string().min(1), coverImageUrl: z.string().optional(), status: statusSchema.optional() }),
      mapper: blog
    },
    testimonials: {
      table: "testimonials",
      schema: z.object({ name: z.string().min(1), quote: z.string().min(1), rating: z.number().int().min(1).max(5).optional(), status: statusSchema.optional() }),
      mapper: testimonial
    },
    services: {
      table: "travel_services",
      schema: z.object({ title: z.string().min(1), description: z.string().optional(), iconName: z.string().optional(), status: statusSchema.optional(), sortOrder: z.number().int().min(0).optional() }),
      mapper: travelService
    },
    faqs: {
      table: "faqs",
      schema: z.object({ question: z.string().min(1), answer: z.string().min(1), status: statusSchema.optional(), sortOrder: z.number().int().min(0).optional() }),
      mapper: faq
    }
  };
  const simple = simpleResources[path[1]];
  if (path[0] === "admin" && simple) {
    const parsed = simple.schema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);
    const data = parsed.data as Record<string, any>;
    const insert: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      const snake = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      insert[snake === "cover_image_url" ? "cover_image_url" : snake] = value;
    }
    if (path[1] === "blog") {
      insert.slug = data.slug?.trim() || slugify(data.title);
      insert.published_at = data.status === "PUBLISHED" ? new Date().toISOString() : null;
    }
    if (insert.status === undefined) insert.status = "DRAFT";
    const { data: saved, error: insertError } = await db.from(simple.table).insert(insert).select("*").single();
    if (insertError) return error("CONFLICT", insertError.message, 409);
    return json(simple.mapper(saved), 201);
  }

  if (path[0] === "admin" && path[1] === "media" && path[2] === "upload") {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return error("BAD_REQUEST", "File is required");
    if (file.size > 5 * 1024 * 1024) return error("BAD_REQUEST", "File exceeds 5 MB");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return error("BAD_REQUEST", "Only JPG, PNG or WebP images are allowed");
    const bytes = new Uint8Array(await file.arrayBuffer());
    let extension: "jpg" | "png" | "webp" | null = null;
    if (file.type === "image/jpeg" && bytes[0] === 255 && bytes[1] === 216) extension = "jpg";
    if (file.type === "image/png" && bytes[0] === 137 && bytes[1] === 80) extension = "png";
    if (file.type === "image/webp" && bytes[0] === 82 && bytes[1] === 73) extension = "webp";
    if (!extension) return error("BAD_REQUEST", "The file contents do not match its declared image type");
    const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "tourism-media";
    if (!supabaseUrl || !key) return error("UNAVAILABLE", "Supabase Storage is not configured", 503);
    const objectName = `${crypto.randomUUID()}.${extension}`;
    const upload = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${objectName}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": file.type,
        "x-upsert": "false"
      },
      body: bytes
    });
    if (!upload.ok) return error("BAD_GATEWAY", "Supabase Storage rejected the upload", 502);
    return json({
      url: `${supabaseUrl}/storage/v1/object/public/${bucket}/${objectName}`,
      objectName
    }, 201);
  }

  return error("NOT_FOUND", "Endpoint not found", 404);
}
