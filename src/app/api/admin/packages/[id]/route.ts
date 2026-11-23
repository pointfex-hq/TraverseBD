import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import {
  updateAdminPackage,
  togglePackageStatus,
  deleteAdminPackage,
  getAdminPackageById,
} from '@backend/services/admin/admin-packages.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized admin access', 'UNAUTHORIZED', 401);
  }

  const { id } = await params;
  const pkg = getAdminPackageById(id);
  if (!pkg) {
    return errorResponse('Package not found', 'NOT_FOUND', 404);
  }

  return successResponse({ package: pkg });
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized admin access', 'UNAUTHORIZED', 401);
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const updated = updateAdminPackage(id, body, user.email);
    if (!updated) {
      return errorResponse('Package not found', 'NOT_FOUND', 404);
    }
    return successResponse({ package: updated });
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to update package', 'INTERNAL_ERROR', 500);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized admin access', 'UNAUTHORIZED', 401);
  }

  const { id } = await params;
  const toggled = togglePackageStatus(id, user.email);
  if (!toggled) {
    return errorResponse('Package not found', 'NOT_FOUND', 404);
  }

  return successResponse({ package: toggled });
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized admin access', 'UNAUTHORIZED', 401);
  }

  const { id } = await params;
  const deleted = deleteAdminPackage(id, user.email);
  if (!deleted) {
    return errorResponse('Package not found', 'NOT_FOUND', 404);
  }

  return successResponse({ message: 'Package deleted successfully' });
}
