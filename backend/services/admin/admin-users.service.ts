import { adminStore } from '@backend/data/admin-mock-data';
import { AdminUser, AdminRole, AdminStatus } from '@backend/types/admin.types';

export function getAllAdminUsers() {
  return adminStore.users;
}

export function createAdminUser(
  input: {
    email: string;
    name: string;
    role: AdminRole;
  },
  actingUserEmail = 'superadmin@traversebd.com'
): AdminUser {
  const existing = adminStore.users.find(
    (u) => u.email.toLowerCase() === input.email.trim().toLowerCase()
  );
  if (existing) {
    throw new Error('An administrator with this email already exists.');
  }

  const newUser: AdminUser = {
    id: `u-${Date.now()}`,
    email: input.email.trim().toLowerCase(),
    name: input.name.trim(),
    role: input.role,
    status: 'Active',
    mfa_enabled: false,
    created_at: new Date().toISOString(),
  };

  adminStore.users.push(newUser);

  adminStore.addAuditLog(
    actingUserEmail,
    'SUPER_ADMIN',
    'ADMIN_USER_CREATED',
    newUser.email,
    `Created new staff account with role ${newUser.role}`
  );

  return newUser;
}

export function updateAdminUserRole(
  userId: string,
  newRole: AdminRole,
  actingUserEmail = 'superadmin@traversebd.com'
): AdminUser | null {
  const user = adminStore.users.find((u) => u.id === userId);
  if (!user) return null;

  const oldRole = user.role;
  user.role = newRole;

  adminStore.addAuditLog(
    actingUserEmail,
    'SUPER_ADMIN',
    'ROLE_CHANGED',
    user.email,
    `Role changed from ${oldRole} to ${newRole}`
  );

  return user;
}

export function toggleAdminUserStatus(
  userId: string,
  actingUserEmail = 'superadmin@traversebd.com'
): AdminUser | null {
  const user = adminStore.users.find((u) => u.id === userId);
  if (!user) return null;

  const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@traversebd.com').trim().toLowerCase();
  if (user.email.toLowerCase() === envAdminEmail || user.id === 'usr-env-admin') {
    throw new Error('Cannot deactivate the master environment Super Administrator.');
  }

  user.status = user.status === 'Active' ? 'Inactive' : 'Active';

  adminStore.addAuditLog(
    actingUserEmail,
    'SUPER_ADMIN',
    'STATUS_TOGGLED',
    user.email,
    `Account status changed to ${user.status}`
  );

  return user;
}

export function deleteAdminUser(
  userId: string,
  actingUserEmail = 'superadmin@traversebd.com'
): boolean {
  const index = adminStore.users.findIndex((u) => u.id === userId);
  if (index === -1) return false;

  const user = adminStore.users[index];
  const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@traversebd.com').trim().toLowerCase();
  if (user.email.toLowerCase() === envAdminEmail || user.id === 'usr-env-admin') {
    throw new Error('Cannot delete or revoke the master environment Super Administrator.');
  }

  const deleted = adminStore.users.splice(index, 1)[0];

  adminStore.addAuditLog(
    actingUserEmail,
    'SUPER_ADMIN',
    'ADMIN_DELETED',
    deleted.email,
    `Revoked and deleted staff account for ${deleted.email}`
  );

  return true;
}
