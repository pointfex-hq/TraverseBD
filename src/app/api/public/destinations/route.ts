import { NextRequest } from 'next/server';
import { getPublishedDestinations } from '@backend/services/destinations.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

/**
 * Public Destinations API
 * GET /api/public/destinations?featured=true&limit=10
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get('featured') === 'true';
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const { data, error } = await getPublishedDestinations({ featuredOnly, limit });

    if (error) {
      return errorResponse(error, 'DB_ERROR', 500);
    }

    return successResponse(data || []);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch destinations';
    return errorResponse(message, 'INTERNAL_ERROR', 500);
  }
}
