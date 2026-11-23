import { NextRequest } from 'next/server';
import { generateWhatsAppInquiryUrl } from '@backend/services/whatsapp.service';
import { whatsappInquirySchema } from '@backend/validations';
import { successResponse, errorResponse } from '@backend/utils/api-response';

/**
 * WhatsApp Inquiry Link Builder API
 * POST /api/public/whatsapp
 * 
 * Rules (PRD 7.1):
 * - Validates input parameters
 * - Returns generated wa.me URL
 * - Strictly NO database write (no booking / no customer data created)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = whatsappInquirySchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(
        'Invalid WhatsApp inquiry parameters',
        'VALIDATION_ERROR',
        400,
        parsed.error.flatten().fieldErrors
      );
    }

    const inquiryUrl = generateWhatsAppInquiryUrl(parsed.data);

    return successResponse({
      inquiryUrl,
      targetPhone: parsed.data.phoneNumber || process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER || '8801700000000',
      status: 'ready',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to generate WhatsApp URL';
    return errorResponse(message, 'INTERNAL_ERROR', 500);
  }
}
