import { NextRequest } from 'next/server';
import { getBlogBySlug } from '@backend/services/blogs.service';
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
    const { data, error } = await getBlogBySlug(slug);

    if (error || !data) {
      return errorResponse(error || 'Blog post not found', 'NOT_FOUND', 404);
    }

    return successResponse(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch blog post';
    return errorResponse(message, 'INTERNAL_ERROR', 500);
  }
}
