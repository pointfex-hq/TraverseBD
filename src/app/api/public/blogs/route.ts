import { NextRequest } from 'next/server';
import { getPublishedBlogs } from '@backend/services/blogs.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destinationSlug = searchParams.get('destination') || undefined;
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const { data, error } = await getPublishedBlogs({ destinationSlug, limit });

    if (error) {
      return errorResponse(error, 'DB_ERROR', 500);
    }

    return successResponse(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch blogs';
    return errorResponse(message, 'INTERNAL_ERROR', 500);
  }
}
