import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import { getAllAdminUsers, createAdminUser } from '@backend/services/admin/admin-users.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export async function GET(request: NextRequest) {
  // Super Admin only check
  const user = await verifyAdminSession(request, true);
  if (!user) {
    return errorResponse('Forbidden: Super Admin access required', 'FORBIDDEN', 403);
  }

  const users = getAllAdminUsers();
  return successResponse({ users });
}

export async function POST(request: NextRequest) {
  const user = await verifyAdminSession(request, true);
  if (!user) {
    return errorResponse('Forbidden: Super Admin access required', 'FORBIDDEN', 403);
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
