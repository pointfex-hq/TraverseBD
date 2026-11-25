import { adminStore } from '@backend/data/admin-mock-data';
import { AdminDashboardMetrics, AdminAuditLog } from '@backend/types/admin.types';

export function getAdminDashboardMetrics(): AdminDashboardMetrics {
  const totalPackages = adminStore.packages.length;
  const publishedPackages = adminStore.packages.filter((p) => p.status === 'published').length;
  const draftPackages = totalPackages - publishedPackages;
  const totalDestinations = adminStore.destinations.length;
  const totalCategories = adminStore.categories.length;

  let totalDepartures = 0;
  let totalAvailableSeats = 0;

  adminStore.packages.forEach((pkg: any) => {
    if (pkg.departures && Array.isArray(pkg.departures)) {
      totalDepartures += pkg.departures.length;
      pkg.departures.forEach((dep: any) => {
        totalAvailableSeats += dep.available_seats || 0;
      });
    }
  });

  const totalAdmins = adminStore.users.length;
  const superAdmins = adminStore.users.filter((u) => u.role === 'SUPER_ADMIN').length;

  return {
    totalPackages,
    publishedPackages,
    draftPackages,
    totalDestinations,
    totalCategories,
    totalDepartures,
    totalAvailableSeats,
    totalAdmins,
    superAdmins,
  };
}

export function getRecentAuditLogs(limit = 10): AdminAuditLog[] {
  return adminStore.auditLogs.slice(0, limit);
}
