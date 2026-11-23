import { getPublishedCategories } from '@backend/services/categories.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

/**
 * Public Categories API
 * GET /api/public/categories
 */
export async function GET() {
  try {
    const { data, error } = await getPublishedCategories();

    if (error) {
      return errorResponse(error, 'DB_ERROR', 500);
    }

    return successResponse(data || []);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch categories';
    return errorResponse(message, 'INTERNAL_ERROR', 500);
  }
}
