import { NextRequest } from 'next/server';
import { getPublishedTestimonials } from '@backend/services/testimonials.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const packageSlug = searchParams.get('package') || undefined;

    const { data, error } = await getPublishedTestimonials(packageSlug);

    if (error) {
      return errorResponse(error, 'DB_ERROR', 500);
    }

    return successResponse(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch testimonials';
    return errorResponse(message, 'INTERNAL_ERROR', 500);
  }
}
