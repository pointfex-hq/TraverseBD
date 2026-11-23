export type AdminRole = 'ADMIN' | 'SUPER_ADMIN';
export type AdminStatus = 'Active' | 'Inactive';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  status: AdminStatus;
  mfa_enabled: boolean;
  avatar_url?: string;
  created_at: string;
  last_login?: string;
}

export interface AdminAuditLog {
  id: string;
  user_email: string;
  user_role: AdminRole;
  action: string;
  resource: string;
  details: string;
  ip_address?: string;
  created_at: string;
}

export interface AdminDashboardMetrics {
  totalPackages: number;
  publishedPackages: number;
  draftPackages: number;
  totalDestinations: number;
  totalCategories: number;
  totalDepartures: number;
  totalAvailableSeats: number;
  totalAdmins: number;
  superAdmins: number;
}
