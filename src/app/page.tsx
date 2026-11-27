import React from 'react';
import HomeView from '@frontend/views/HomeView';
import { getPublishedPackages } from '@backend/services/packages.service';
import { getPublishedCategories } from '@backend/services/categories.service';
import { adminStore } from '@backend/data/admin-mock-data';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [packagesRes, categoriesRes] = await Promise.all([
    getPublishedPackages({ limit: 12, featuredOnly: false }),
    getPublishedCategories(),
  ]);
  const packages = packagesRes.data || [];
  const categories = categoriesRes.data || [];
  const siteSettings = adminStore.siteSettings;

  return <HomeView packages={packages} categories={categories} siteSettings={siteSettings} />;
}
