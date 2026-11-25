import { NextRequest } from 'next/server';
import { adminStore } from '@backend/data/admin-mock-data';
import { AdminUser } from '@backend/types/admin.types';

export const ADMIN_COOKIE_NAME = 'ADMIN_SESSION';

export async function verifyAdminSession(
  request: NextRequest,
  superOnly = false
): Promise<AdminUser | null> {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const bearer = request.headers.get('authorization');
  const token = bearer?.startsWith('Bearer ') ? bearer.slice(7) : cookie;

  if (!token) {
    return null;
  }

  // Find user by session token or email
  const user = adminStore.users.find(
    (u) =>
      u.status === 'Active' &&
      (token === `session-${u.id}` ||
        token === u.email ||
        token === 'session-usr-env-admin' ||
        token === 'demo-super-admin-token' ||
        token === 'demo-admin-token')
  );

  if (!user) {
    // Fallback default super admin for demo or env token
    if (token === 'demo-super-admin-token' || token === 'session-usr-env-admin') {
      return adminStore.users[0];
    }
    return null;
  }

  if (superOnly && user.role !== 'SUPER_ADMIN') {
    return null;
  }

  return user;
}

export async function adminLogin(
  email: string,
  password?: string
): Promise<{ user: AdminUser; token: string } | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@traversebd.com').trim().toLowerCase();
  const envAdminPassword = process.env.ADMIN_PASSWORD || 'Admin@Traverse2026!';

  // 1. Check fixed Environment Variable credentials
  if (normalizedEmail === envAdminEmail) {
    if (password && password !== envAdminPassword) {
      return null;
    }

    let envUser: AdminUser | undefined = adminStore.users.find(
      (u) => u.email.toLowerCase() === envAdminEmail
    );
    if (!envUser) {
      const newAdmin: AdminUser = {
        id: 'usr-env-admin',
        name: 'Master Administrator',
        email: envAdminEmail,
        role: 'SUPER_ADMIN',
        status: 'Active',
        mfa_enabled: false,
        created_at: new Date().toISOString(),
      };
      adminStore.users.unshift(newAdmin);
      envUser = newAdmin;
    }

    envUser.last_login = new Date().toISOString();

    adminStore.addAuditLog(
      envUser.email,
      envUser.role,
      'ADMIN_LOGIN',
      'auth',
      'Master admin logged in with environment credentials'
    );

    return {
      user: envUser,
      token: `session-${envUser.id}`,
    };
  }

  // 2. Check registered staff users in memory store
  const user = adminStore.users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!user) {
    return null;
  }

  if (user.status !== 'Active') {
    throw new Error('This account has been deactivated. Contact Super Admin.');
  }

  // Update last login
  user.last_login = new Date().toISOString();

  adminStore.addAuditLog(
    user.email,
    user.role,
    'ADMIN_LOGIN',
    'auth',
    'Successful admin login session established'
  );

  return {
    user,
    token: `session-${user.id}`,
  };
}

export function demoSuperAdminLogin(): { user: AdminUser; token: string } {
  const superAdmin = adminStore.users.find((u) => u.role === 'SUPER_ADMIN') || adminStore.users[0];
  superAdmin.last_login = new Date().toISOString();

  adminStore.addAuditLog(
    superAdmin.email,
    superAdmin.role,
    'DEMO_LOGIN',
    'auth',
    'Demo Super Admin logged in for testing'
  );

  return {
    user: superAdmin,
    token: 'demo-super-admin-token',
  };
}
