import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import { getAllAdminPackages, createAdminPackage } from '@backend/services/admin/admin-packages.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export async function GET(request: NextRequest) {
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized admin access', 'UNAUTHORIZED', 401);
  }

  const packages = getAllAdminPackages();
  return successResponse({ packages });
}

export async function POST(request: NextRequest) {
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized admin access', 'UNAUTHORIZED', 401);
  }

  try {
    const body = await request.json();
    if (!body.title_en || !body.destination_id || !body.price_bdt) {
      return errorResponse('Title, Destination, and Price are required', 'VALIDATION_ERROR', 400);
    }

    const created = createAdminPackage(body, user.email);
    return successResponse({ package: created }, 201);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to create package', 'INTERNAL_ERROR', 500);
  }
}
