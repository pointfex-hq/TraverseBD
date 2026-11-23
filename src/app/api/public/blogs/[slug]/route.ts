import { NextRequest } from 'next/server';
import { getBlogBySlug } from '@backend/services/blogs.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { data, error } = await getBlogBySlug(params.slug);

    if (error || !data) {
      return errorResponse(error || 'Blog post not found', 'NOT_FOUND', 404);
    }

    return successResponse(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch blog post';
    return errorResponse(message, 'INTERNAL_ERROR', 500);
  }
}
