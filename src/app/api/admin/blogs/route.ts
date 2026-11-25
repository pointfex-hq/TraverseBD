import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import {
  getAllAdminBlogs,
  createAdminBlog,
} from '@backend/services/admin/admin-blogs.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 'UNAUTHORIZED', 401);
    }

    const blogs = getAllAdminBlogs();
    return successResponse(blogs, 200);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to fetch blogs', 'INTERNAL_ERROR', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 'UNAUTHORIZED', 401);
    }

    const body = await request.json();
    const created = createAdminBlog(body, admin.email);

    return successResponse(created, 201);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to create blog post', 'BAD_REQUEST', 400);
  }
}
