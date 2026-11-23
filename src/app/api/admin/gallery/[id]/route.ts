import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import {
  updateAdminGalleryItem,
  deleteAdminGalleryItem,
  getAdminGalleryById,
} from '@backend/services/admin/admin-gallery.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: { id: string };
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 'UNAUTHORIZED', 401);
    }

    const body = await request.json();
    const updated = updateAdminGalleryItem(params.id, body, admin.email);

    if (!updated) {
      return errorResponse('Gallery photo not found', 'NOT_FOUND', 404);
    }

    return successResponse(updated, 200);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to update gallery photo', 'BAD_REQUEST', 400);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 'UNAUTHORIZED', 401);
    }

    const success = deleteAdminGalleryItem(params.id, admin.email);
    if (!success) {
      return errorResponse('Gallery photo not found', 'NOT_FOUND', 404);
    }

    return successResponse({ deleted: true }, 200);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to delete gallery photo', 'BAD_REQUEST', 400);
  }
}
