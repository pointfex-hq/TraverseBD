import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import { updateAdminCategory, deleteAdminCategory } from '@backend/services/admin/admin-categories.service';
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
    const updated = updateAdminCategory(id, body, user.email);
    if (!updated) {
      return errorResponse('Category not found', 'NOT_FOUND', 404);
    }
    return successResponse({ category: updated });
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to update category', 'INTERNAL_ERROR', 500);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized admin access', 'UNAUTHORIZED', 401);
  }

  const { id } = await params;
  const deleted = deleteAdminCategory(id, user.email);
  if (!deleted) {
    return errorResponse('Category not found', 'NOT_FOUND', 404);
  }

  return successResponse({ message: 'Category deleted successfully' });
}
