import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import {
  getAllAdminTestimonials,
  createAdminTestimonial,
} from '@backend/services/testimonials.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 'UNAUTHORIZED', 401);
    }

    const testimonials = getAllAdminTestimonials();
    return successResponse({ testimonials }, 200);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to fetch testimonials', 'INTERNAL_ERROR', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 'UNAUTHORIZED', 401);
    }

    const body = await request.json();
    if (!body.name || !body.quote) {
      return errorResponse('Name and Quote are required fields', 'VALIDATION_ERROR', 400);
    }

    const created = createAdminTestimonial(body, admin.email);
    return successResponse({ testimonial: created }, 201);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to create testimonial', 'BAD_REQUEST', 400);
  }
}
