import { getSiteSettings } from '@backend/services/settings.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

/**
 * Public Site Settings API
 * GET /api/public/settings
 * Exposes safe public settings: contact phone/email, WhatsApp configuration, social links
 */
export async function GET() {
  try {
    const { data, error } = await getSiteSettings();

    if (error) {
      return errorResponse(error, 'DB_ERROR', 500);
    }

    return successResponse(data || {});
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch site settings';
    return errorResponse(message, 'INTERNAL_ERROR', 500);
  }
}
