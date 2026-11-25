import { adminStore, SiteSettings } from '@backend/data/admin-mock-data';

export function getAdminSettings(): SiteSettings {
  return adminStore.siteSettings;
}

export function updateAdminSettings(
  updates: Partial<SiteSettings>,
  adminEmail = 'admin@traversebd.com'
): SiteSettings {
  adminStore.siteSettings = {
    ...adminStore.siteSettings,
    ...updates,
  };

  adminStore.addAuditLog(
    adminEmail,
    'ADMIN',
    'SETTINGS_UPDATED',
    'global_settings',
    'Updated website operations, hotline, and hero settings'
  );

  return adminStore.siteSettings;
}
