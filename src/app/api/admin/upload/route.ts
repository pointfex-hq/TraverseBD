import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import {
  uploadImageBuffer,
  deleteImageFromCloudinary,
  MAX_IMAGE_SIZE_BYTES,
  validateImage,
} from '@backend/services/cloudinary.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 'UNAUTHORIZED', 401);
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'traversebd';

    if (!file) {
      return errorResponse('No file provided for upload', 'BAD_REQUEST', 400);
    }

    // Pre-check size
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return errorResponse(
        `File size (${sizeMB}MB) exceeds the maximum allowed limit of 10MB.`,
        'PAYLOAD_TOO_LARGE',
        400
      );
    }

    // Validate MIME type
    validateImage(file.size, file.type);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadImageBuffer(buffer, file.name, file.type, folder);

    return successResponse(result, 201);
  } catch (err: any) {
    return errorResponse(err.message || 'Image upload failed', 'BAD_REQUEST', 400);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 'UNAUTHORIZED', 401);
    }

    const { searchParams } = new URL(request.url);
    let publicId = searchParams.get('public_id');

    if (!publicId) {
      try {
        const body = await request.json();
        publicId = body.public_id;
      } catch {
        // query param was empty and body not json
      }
    }

    if (!publicId) {
      return errorResponse('public_id is required to delete image', 'BAD_REQUEST', 400);
    }

    const success = await deleteImageFromCloudinary(publicId);

    return successResponse({ deleted: publicId, success }, 200);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to delete image', 'BAD_REQUEST', 400);
  }
}
