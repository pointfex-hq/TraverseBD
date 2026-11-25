import { NextRequest } from 'next/server';
import { getDestinationBySlug } from '@backend/services/destinations.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return errorResponse('Destination slug is required', 'VALIDATION_ERROR', 400);
    }

    const { data, error } = await getDestinationBySlug(slug);

    if (error) {
      return errorResponse(error, 'DB_ERROR', 500);
    }

    if (!data) {
      return errorResponse('Destination not found', 'NOT_FOUND', 404);
    }

    return successResponse(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch destination';
    return errorResponse(message, 'INTERNAL_ERROR', 500);
  }
}
