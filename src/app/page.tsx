import React from 'react';
import HomeView from '@frontend/views/HomeView';
import { getPublishedPackages } from '@backend/services/packages.service';
import { adminStore } from '@backend/data/admin-mock-data';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const packagesRes = await getPublishedPackages({ limit: 12, featuredOnly: false });
  const packages = packagesRes.data || [];
  const siteSettings = adminStore.siteSettings;

  return <HomeView packages={packages} siteSettings={siteSettings} />;
}
