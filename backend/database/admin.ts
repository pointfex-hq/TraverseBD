import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * PRIVILEGED SERVER-SIDE SUPABASE CLIENT
 * Uses the Service Role Key which BYPASSES Row Level Security.
 * 
 * IMPORTANT:
 * - This MUST NEVER be imported or used in client-side components.
 * - Used strictly for server-side administrative endpoints, migrations, and seed scripts.
 */
export function getAdminClient() {
  if (typeof window !== 'undefined') {
    throw new Error('FATAL SECURITY ERROR: getAdminClient called on the client side!');
  }

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
