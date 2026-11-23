import React from 'react';
import DestinationsView from '@frontend/views/DestinationsView';
import { getPublishedDestinations } from '@backend/services/destinations.service';

export const dynamic = 'force-dynamic';

export default async function DestinationsPage() {
  const destinationsRes = await getPublishedDestinations();
  const destinations = destinationsRes.data || [];

  return <DestinationsView destinations={destinations} />;
}
