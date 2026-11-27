import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import {
  updateAdminTestimonial,
  deleteAdminTestimonial,
} from '@backend/services/testimonials.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 'UNAUTHORIZED', 401);
    }

    const { id } = await params;
    const body = await request.json();
    const updated = updateAdminTestimonial(id, body, admin.email);

    if (!updated) {
      return errorResponse('Testimonial not found', 'NOT_FOUND', 404);
    }

    return successResponse({ testimonial: updated }, 200);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to update testimonial', 'BAD_REQUEST', 400);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 'UNAUTHORIZED', 401);
    }

    const { id } = await params;
    const deleted = deleteAdminTestimonial(id, admin.email);

    if (!deleted) {
      return errorResponse('Testimonial not found', 'NOT_FOUND', 404);
    }

    return successResponse({ success: true, message: 'Testimonial deleted successfully' }, 200);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to delete testimonial', 'INTERNAL_ERROR', 500);
  }
}
