import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import { getAllAdminDestinations, createAdminDestination } from '@backend/services/admin/admin-destinations.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export async function GET(request: NextRequest) {
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized admin access', 'UNAUTHORIZED', 401);
  }

  const destinations = getAllAdminDestinations();
  return successResponse({ destinations });
}

export async function POST(request: NextRequest) {
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized admin access', 'UNAUTHORIZED', 401);
  }

  try {
    const body = await request.json();
    if (!body.name_en || !body.region) {
      return errorResponse('Destination name and region are required', 'VALIDATION_ERROR', 400);
    }

    const created = createAdminDestination(body, user.email);
    return successResponse({ destination: created }, 201);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to create destination', 'INTERNAL_ERROR', 500);
  }
}
