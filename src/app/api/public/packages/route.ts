import { NextRequest } from 'next/server';
import { getPublishedPackages } from '@backend/services/packages.service';
import { packagesQuerySchema } from '@backend/validations';
import { paginatedResponse, errorResponse } from '@backend/utils/api-response';

/**
 * Public Packages API
 * GET /api/public/packages
 * Supports: search (q), category, destination, min_price, max_price, duration, sort, pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawQuery = Object.fromEntries(searchParams.entries());

    const parsed = packagesQuerySchema.safeParse(rawQuery);
    if (!parsed.success) {
      return errorResponse(
        'Invalid query parameters',
        'VALIDATION_ERROR',
        400,
        parsed.error.flatten().fieldErrors
      );
    }

    const query = parsed.data;

    const { data, total, error } = await getPublishedPackages({
      q: query.q,
      categorySlug: query.category,
      destinationSlug: query.destination,
      minPrice: query.min_price,
      maxPrice: query.max_price,
      durationDays: query.duration,
      sort: query.sort,
      featuredOnly: query.featured === 'true',
      trendingOnly: query.trending === 'true',
      page: query.page,
      limit: query.limit,
    });

    if (error) {
      return errorResponse(error, 'DB_ERROR', 500);
    }

    return paginatedResponse(
      data || [],
      {
        page: query.page,
        limit: query.limit,
        total,
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch packages';
    return errorResponse(message, 'INTERNAL_ERROR', 500);
  }
}
