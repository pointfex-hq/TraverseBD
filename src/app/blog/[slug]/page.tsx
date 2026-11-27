import React from 'react';
import { notFound } from 'next/navigation';
import BlogDetailView from '@frontend/views/BlogDetailView';
import { getBlogBySlug, getPublishedBlogs } from '@backend/services/blogs.service';
import { adminStore } from '@backend/data/admin-mock-data';

export const dynamic = 'force-dynamic';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const res = await getBlogBySlug(slug);
  if (!res.data) {
    return { title: 'Travel Guide — Traverse BD' };
  }
  return {
    title: `${res.data.title_en} — Traverse BD Field Guide`,
    description: res.data.excerpt_en,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const res = await getBlogBySlug(slug);
  const blog = res.data;

  if (!blog) {
    // If not found by slug, also attempt by ID in adminStore
    const fallback = adminStore.blogs.find(
      (b) => (b.slug === slug || b.id === slug) && b.status === 'published'
    );
    if (!fallback) {
      notFound();
    }
    const allBlogsRes = await getPublishedBlogs();
    const related = (allBlogsRes.data || [])
      .filter((b) => b.id !== fallback.id)
      .slice(0, 4);

    return (
      <BlogDetailView
        blog={fallback}
        relatedBlogs={related}
        phoneHotline={adminStore.siteSettings?.phone_hotline}
        whatsappNumber={adminStore.siteSettings?.whatsapp_number}
      />
    );
  }

  const allBlogsRes = await getPublishedBlogs();
  const related = (allBlogsRes.data || [])
    .filter((b) => b.id !== blog.id)
    .slice(0, 4);

  return (
    <BlogDetailView
      blog={blog}
      relatedBlogs={related}
      phoneHotline={adminStore.siteSettings?.phone_hotline}
      whatsappNumber={adminStore.siteSettings?.whatsapp_number}
    />
  );
}
