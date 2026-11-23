import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import {
  getAllAdminGallery,
  createAdminGalleryItem,
} from '@backend/services/admin/admin-gallery.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 'UNAUTHORIZED', 401);
    }

    const items = getAllAdminGallery();
    return successResponse(items, 200);
  } catch (err: any) {
    return errorResponse(err.message || 'Internal server error', 'SERVER_ERROR', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 'UNAUTHORIZED', 401);
    }

    const body = await request.json();
    const created = createAdminGalleryItem(body, admin.email);

    return successResponse(created, 201);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to create gallery item', 'BAD_REQUEST', 400);
  }
}
