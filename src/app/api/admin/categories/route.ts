import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import { getAllAdminCategories, createAdminCategory } from '@backend/services/admin/admin-categories.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export async function GET(request: NextRequest) {
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized admin access', 'UNAUTHORIZED', 401);
  }

  const categories = getAllAdminCategories();
  return successResponse({ categories });
}

export async function POST(request: NextRequest) {
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized admin access', 'UNAUTHORIZED', 401);
  }

  try {
    const body = await request.json();
    if (!body.name_en) {
      return errorResponse('Category name is required', 'VALIDATION_ERROR', 400);
    }

    const created = createAdminCategory(body, user.email);
    return successResponse({ category: created }, 201);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to create category', 'INTERNAL_ERROR', 500);
  }
}
