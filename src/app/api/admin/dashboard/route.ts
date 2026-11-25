import { NextRequest } from 'next/server';
import { verifyAdminSession } from '@backend/services/admin/admin-auth.service';
import { getAdminDashboardMetrics, getRecentAuditLogs } from '@backend/services/admin/admin-dashboard.service';
import { successResponse, errorResponse } from '@backend/utils/api-response';

export async function GET(request: NextRequest) {
  const user = await verifyAdminSession(request);
  if (!user) {
    return errorResponse('Unauthorized admin access', 'UNAUTHORIZED', 401);
  }

  const metrics = getAdminDashboardMetrics();
  const recentLogs = getRecentAuditLogs(10);

  return successResponse({
    metrics,
    recentLogs,
    currentUser: user,
  });
}
