import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import { updateAdminDestination, deleteAdminDestination } from '@backend/services/admin/admin-destinations.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized admin access', 'UNAUTHORIZED', 401);
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const updated = updateAdminDestination(id, body, user.email);
    if (!updated) {
      return errorResponse('Destination not found', 'NOT_FOUND', 404);
    }
    return successResponse({ destination: updated });
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to update destination', 'INTERNAL_ERROR', 500);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized admin access', 'UNAUTHORIZED', 401);
  }

  const { id } = await params;
  const deleted = deleteAdminDestination(id, user.email);
  if (!deleted) {
    return errorResponse('Destination not found', 'NOT_FOUND', 404);
  }

  return successResponse({ message: 'Destination deleted successfully' });
}
