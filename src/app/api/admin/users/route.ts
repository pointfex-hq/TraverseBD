import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import { getAllAdminUsers, createAdminUser } from '@backend/services/admin/admin-users.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export async function GET(request: NextRequest) {
  // Any authenticated active admin can view the admin directory
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized: Administrator access required', 'UNAUTHORIZED', 401);
  }

  const users = getAllAdminUsers();
  return successResponse({ users, currentUser: user });
}

export async function POST(request: NextRequest) {
  // Only Super Admin can provision new administrators
  const user = await verifyAdminSession(request, true);
  if (!user) {
    return errorResponse('Forbidden: Only Super Administrator can provision new administrators', 'FORBIDDEN', 403);
  }

  try {
    const body = await request.json();
    if (!body.email || !body.name || !body.role) {
      return errorResponse('Email, name, and role are required', 'VALIDATION_ERROR', 400);
    }

    const created = createAdminUser(body, user.email);
    return successResponse({ user: created }, 201);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to create admin user', 'INTERNAL_ERROR', 500);
  }
}
