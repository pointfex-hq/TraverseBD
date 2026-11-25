import React from 'react';
import GalleryView from '@frontend/views/GalleryView';
import { getPublishedGalleryItems } from '@backend/services/gallery.service';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Gallery — Traverse BD',
  description: 'Visual chronicles and photography across Bangladesh’s premier landscapes.',
};

export default async function GalleryPage() {
  const { data } = await getPublishedGalleryItems();
  return <GalleryView initialItems={data || []} />;
}
