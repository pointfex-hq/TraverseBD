import { NextRequest } from 'next/server';
import { getDestinationBySlug } from '@backend/services/destinations.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

/**
 * Public Destination Detail API
 * GET /api/public/destinations/[slug]
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    if (!slug) {
      return errorResponse('Destination slug is required', 'VALIDATION_ERROR', 400);
    }

    const { data, error } = await getDestinationBySlug(slug);

    if (error) {
      return errorResponse(error, 'DB_ERROR', 500);
    }

    if (!data) {
      return errorResponse('Destination not found or unpublished', 'NOT_FOUND', 404);
    }

    return successResponse(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch destination';
    return errorResponse(message, 'INTERNAL_ERROR', 500);
  }
}
