import { createServerClient } from '@backend/database/server';
import { SiteSetting } from '@backend/types/database.types';
import { MOCK_SETTINGS } from '@backend/data/mock-data';

export async function getSiteSettings() {
  const supabase = createServerClient();

  if (supabase) {
    try {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (!error && data && data.length > 0) {
        const settingsMap: Record<string, unknown> = {};
        (data as SiteSetting[]).forEach((item) => {
          settingsMap[item.key] = item.value;
        });
        return { data: settingsMap, error: null, source: 'supabase' as const };
      }
    } catch {
      // Fallback
    }
  }

  return { data: MOCK_SETTINGS, error: null, source: 'local' as const };
}

export async function getSettingByKey(key: string) {
  const supabase = createServerClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single();

      if (!error && data) {
        return { data: data.value, error: null, source: 'supabase' as const };
      }
    } catch {
      // Fallback
    }
  }

  const localVal = MOCK_SETTINGS[key] ?? null;
  return {
    data: localVal,
    error: localVal ? null : `Setting key '${key}' not found`,
    source: 'local' as const,
  };
}
