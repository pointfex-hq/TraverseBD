import React, { Suspense } from 'react';
import PackagesView from '@frontend/views/PackagesView';
import { getPublishedPackages } from '@backend/services/packages.service';
import { getPublishedCategories } from '@backend/services/categories.service';

export const dynamic = 'force-dynamic';

interface PackagesPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    destination?: string;
  }>;
}

export default async function PackagesPage({ searchParams }: PackagesPageProps) {
  const resolvedParams = await searchParams;
  const [packagesRes, categoriesRes] = await Promise.all([
    getPublishedPackages({
      q: resolvedParams.q,
      categorySlug: resolvedParams.category,
      destinationSlug: resolvedParams.destination,
      limit: 50,
    }),
    getPublishedCategories(),
  ]);

  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading expeditions...</div>}>
      <PackagesView
        initialPackages={packagesRes.data || []}
        categories={categoriesRes.data || []}
        initialCategory={resolvedParams.category || ''}
        initialDestination={resolvedParams.destination || ''}
        initialQuery={resolvedParams.q || ''}
      />
    </Suspense>
  );
}
