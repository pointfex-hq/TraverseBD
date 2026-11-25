import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import {
  updateAdminUserRole,
  toggleAdminUserStatus,
  deleteAdminUser,
} from '@backend/services/admin/admin-users.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const user = await verifyAdminSession(request, true);
  if (!user) {
    return errorResponse('Forbidden: Super Admin access required', 'FORBIDDEN', 403);
  }

  const { id } = await params;
  try {
    const body = await request.json();
    if (body.role) {
      const updated = updateAdminUserRole(id, body.role, user.email);
      if (!updated) return errorResponse('User not found', 'NOT_FOUND', 404);
      return successResponse({ user: updated });
    }

    if (body.toggleStatus) {
      const updated = toggleAdminUserStatus(id, user.email);
      if (!updated) return errorResponse('User not found', 'NOT_FOUND', 404);
      return successResponse({ user: updated });
    }

    return errorResponse('Invalid update request', 'BAD_REQUEST', 400);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to update user', 'INTERNAL_ERROR', 500);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const user = await verifyAdminSession(request, true);
  if (!user) {
    return errorResponse('Forbidden: Super Admin access required', 'FORBIDDEN', 403);
  }

  const { id } = await params;
  if (id === user.id) {
    return errorResponse('Cannot delete your own super admin account', 'BAD_REQUEST', 400);
  }

  const deleted = deleteAdminUser(id, user.email);
  if (!deleted) {
    return errorResponse('User not found', 'NOT_FOUND', 404);
  }

  return successResponse({ message: 'Admin user deleted successfully' });
}
