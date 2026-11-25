import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import {
  getAdminSettings,
  updateAdminSettings,
} from '@backend/services/admin/admin-settings.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 'UNAUTHORIZED', 401);
    }

    const settings = getAdminSettings();
    return successResponse(settings, 200);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to fetch site settings', 'INTERNAL_ERROR', 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 'UNAUTHORIZED', 401);
    }

    const body = await request.json();
    const updated = updateAdminSettings(body, admin.email);

    return successResponse(updated, 200);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to update site settings', 'BAD_REQUEST', 400);
  }
}
