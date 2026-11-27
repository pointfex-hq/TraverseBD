import { adminStore, BlogItem } from '@backend/data/admin-mock-data';

export interface CreateBlogInput {
  title_en: string;
  slug?: string;
  excerpt_en: string;
  content_en: string;
  cover_image_url: string;
  destination_slug?: string;
  read_time?: string;
  status?: 'published' | 'draft';
  is_featured?: boolean;
  gallery_images?: string[];
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getAllAdminBlogs(): BlogItem[] {
  return adminStore.blogs;
}

export function getAdminBlogById(id: string): BlogItem | null {
  return adminStore.blogs.find((b) => b.id === id) || null;
}

export function createAdminBlog(
  input: CreateBlogInput,
  adminEmail = 'admin@traversebd.com'
): BlogItem {
  if (!input.title_en || !input.excerpt_en || !input.content_en) {
    throw new Error('Title, summary excerpt, and blog content are required.');
  }

  const slug = input.slug?.trim() ? generateSlug(input.slug) : generateSlug(input.title_en);

  // Check unique slug
  if (adminStore.blogs.some((b) => b.slug === slug)) {
    throw new Error(`A blog post with slug "${slug}" already exists.`);
  }

  if (input.is_featured) {
    adminStore.blogs.forEach((b) => {
      b.is_featured = false;
    });
  }

  const newBlog: BlogItem = {
    id: `blog-${Date.now()}`,
    slug,
    title_en: input.title_en.trim(),
    excerpt_en: input.excerpt_en.trim(),
    content_en: input.content_en.trim(),
    cover_image_url:
      input.cover_image_url?.trim() ||
      'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1200&auto=format&fit=crop',
    destination_slug: input.destination_slug?.trim() || undefined,
    read_time: input.read_time?.trim() || '5 min read',
    status: input.status || 'published',
    published_at: new Date().toISOString(),
    is_featured: !!input.is_featured,
    gallery_images: Array.isArray(input.gallery_images)
      ? input.gallery_images.filter((img) => img && img.trim().length > 0).slice(0, 5)
      : [],
  };

  adminStore.blogs.unshift(newBlog);

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'BLOG_CREATED',
    newBlog.id,
    `Created blog post "${newBlog.title_en}" (${newBlog.status})`
  );

  return newBlog;
}

export function updateAdminBlog(
  id: string,
  updates: Partial<CreateBlogInput>,
  adminEmail = 'admin@traversebd.com'
): BlogItem | null {
  const index = adminStore.blogs.findIndex((b) => b.id === id);
  if (index === -1) return null;

  const existing = adminStore.blogs[index];

  let slug = existing.slug;
  if (updates.slug && updates.slug !== existing.slug) {
    const formattedSlug = generateSlug(updates.slug);
    if (adminStore.blogs.some((b) => b.id !== id && b.slug === formattedSlug)) {
      throw new Error(`A blog post with slug "${formattedSlug}" already exists.`);
    }
    slug = formattedSlug;
  }

  if (updates.is_featured) {
    adminStore.blogs.forEach((b) => {
      if (b.id !== id) b.is_featured = false;
    });
  }

  const updated: BlogItem = {
    ...existing,
    ...updates,
    slug,
    is_featured: updates.is_featured !== undefined ? !!updates.is_featured : existing.is_featured,
    gallery_images: Array.isArray(updates.gallery_images)
      ? updates.gallery_images.filter((img) => img && img.trim().length > 0).slice(0, 5)
      : existing.gallery_images || [],
  };

  adminStore.blogs[index] = updated;

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'BLOG_UPDATED',
    id,
    `Updated blog post "${updated.title_en}"`
  );

  return updated;
}

export function deleteAdminBlog(
  id: string,
  adminEmail = 'admin@traversebd.com'
): boolean {
  const index = adminStore.blogs.findIndex((b) => b.id === id);
  if (index === -1) return false;

  const deleted = adminStore.blogs.splice(index, 1)[0];

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'BLOG_DELETED',
    id,
    `Deleted blog post "${deleted.title_en}"`
  );

  return true;
}

export function toggleBlogStatus(
  id: string,
  adminEmail = 'admin@traversebd.com'
): BlogItem | null {
  const blog = adminStore.blogs.find((b) => b.id === id);
  if (!blog) return null;

  blog.status = blog.status === 'draft' ? 'published' : 'draft';

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'BLOG_STATUS_TOGGLED',
    id,
    `Toggled blog post "${blog.title_en}" status to ${blog.status}`
  );

  return blog;
}
