import React from 'react';
import HomeView from '@frontend/views/HomeView';
import { getPublishedPackages } from '@backend/services/packages.service';
import { getPublishedDestinations } from '@backend/services/destinations.service';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [packagesRes, destinationsRes] = await Promise.all([
    getPublishedPackages({ limit: 12, featuredOnly: false }),
    getPublishedDestinations({ limit: 8, featuredOnly: true }),
  ]);

  const packages = packagesRes.data || [];
  const destinations = destinationsRes.data || [];

  return <HomeView packages={packages} destinations={destinations} />;
}
