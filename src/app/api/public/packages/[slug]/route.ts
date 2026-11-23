import { NextRequest } from 'next/server';
import { getPackageBySlug } from '@backend/services/packages.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

/**
 * Public Package Detail API
 * GET /api/public/packages/[slug]
 * Returns: Complete package detail with destination, category, images, itinerary, items, and upcoming departures.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    if (!slug) {
      return errorResponse('Package slug is required', 'VALIDATION_ERROR', 400);
    }

    const { data, error } = await getPackageBySlug(slug);

    if (error) {
      return errorResponse(error, 'DB_ERROR', 500);
    }

    if (!data) {
      return errorResponse('Package not found or unpublished', 'NOT_FOUND', 404);
    }

    return successResponse(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch package';
    return errorResponse(message, 'INTERNAL_ERROR', 500);
  }
}
