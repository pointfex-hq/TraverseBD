import React from 'react';
import { notFound } from 'next/navigation';
import PackageDetailView from '@frontend/views/PackageDetailView';
import { getPackageBySlug } from '@backend/services/packages.service';

export const dynamic = 'force-dynamic';

interface PackageDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PackageDetailPage({ params }: PackageDetailPageProps) {
  const { slug } = await params;
  const res = await getPackageBySlug(slug);

  if (res.error || !res.data) {
    notFound();
  }

  return <PackageDetailView packageData={res.data} />;
}
