import { NextRequest } from 'next/server';
import { getPublishedGalleryItems } from '@backend/services/gallery.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;

    const { data, error, source } = await getPublishedGalleryItems(category);

    if (error) {
      return errorResponse(error, 'GALLERY_FETCH_ERROR', 500);
    }

    return successResponse(data, 200);
  } catch (err: any) {
    return errorResponse(err.message || 'Internal server error', 'SERVER_ERROR', 500);
  }
}
