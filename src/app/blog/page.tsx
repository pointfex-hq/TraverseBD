import React from 'react';
import BlogView from '@frontend/views/BlogView';
import { getPublishedBlogs } from '@backend/services/blogs.service';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Traveler Journal & Expert Field Guides — Traverse BD',
  description: 'In-depth itineraries, hiking logistics, and trail dispatches across Bangladesh.',
};

export default async function BlogPage() {
  const { data } = await getPublishedBlogs();
  return <BlogView initialBlogs={data || []} />;
}
