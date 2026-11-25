import { NextRequest } from 'next/server';
import { analyticsEventSchema, recordAnalyticsEvent } from '@backend/services/analytics.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

/**
 * Public Privacy-Conscious Visitor Analytics API
 * POST /api/public/analytics
 * 
 * Rules (PRD Section 8):
 * - Records non-PII events: package_view, whatsapp_click, search_filter, destination_view.
 * - Never collects IP addresses or personally identifiable information.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = analyticsEventSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(
        'Invalid analytics payload',
        'VALIDATION_ERROR',
        400,
        parsed.error.flatten().fieldErrors
      );
    }

    const result = await recordAnalyticsEvent(parsed.data);
    return successResponse(result, 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to record event';
    return errorResponse(message, 'INTERNAL_ERROR', 500);
  }
}
