import { createServerClient } from '@backend/database/server';
import { successResponse, errorResponse } from '@backend/utils/api-response';

/**
 * PHASE 6: Safe Database Connection Test Endpoint
 * GET /api/public/health
 * 
 * Verifies:
 * - Environment variables are present
 * - Server can reach the Supabase PostgreSQL database
 * - Returns sanitized response without exposing credentials
 */
export async function GET() {
  const isUrlSet = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const isAnonSet = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const isServiceSet = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!isUrlSet || !isAnonSet) {
    return errorResponse(
      'Supabase credentials are not configured in .env.local',
      'ENV_MISSING',
      503,
      {
        NEXT_PUBLIC_SUPABASE_URL: isUrlSet ? 'Configured' : 'Missing',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: isAnonSet ? 'Configured' : 'Missing',
        SUPABASE_SERVICE_ROLE_KEY: isServiceSet ? 'Configured' : 'Missing (Optional for public reads, required for admin)',
      }
    );
  }

  const supabase = createServerClient();
  if (!supabase) {
    return errorResponse('Failed to initialize Supabase client', 'CLIENT_INIT_FAILED', 500);
  }

  const startTime = Date.now();
  // Safe lightweight query to verify active connectivity
  const { count, error } = await supabase
    .from('site_settings')
    .select('*', { count: 'exact', head: true });

  const latencyMs = Date.now() - startTime;

  if (error) {
    return errorResponse(
      'Database connection failed or tables not yet migrated',
      'DB_QUERY_ERROR',
      500,
      {
        message: error.message,
        code: error.code,
        latencyMs,
      }
    );
  }

  return successResponse({
    status: 'healthy',
    database: 'connected',
    timestamp: new Date().toISOString(),
    latencyMs,
    tablesAccessible: true,
  });
}
