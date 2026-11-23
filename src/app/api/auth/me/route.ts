import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export async function GET(request: NextRequest) {
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized admin session', 'UNAUTHORIZED', 401);
  }
  return successResponse({ user });
}
