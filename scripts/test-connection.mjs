/**
 * TraverseBD Database Connection Verification Script
 * 
 * How to run:
 * node scripts/test-connection.mjs
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

console.log('----------------------------------------------------');
console.log('🚀 TraverseBD Database Connection Diagnostic');
console.log('----------------------------------------------------');

// Read .env.local manually if not in Next.js environment
const envPath = path.resolve(process.cwd(), '.env.local');
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
let supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...rest] = trimmed.split('=');
      const val = rest.join('=').trim();
      if (key === 'NEXT_PUBLIC_SUPABASE_URL' && val) supabaseUrl = val;
      if (
        (key === 'NEXT_PUBLIC_SUPABASE_ANON_KEY' || key === 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') &&
        val
      ) {
        supabaseAnonKey = val;
      }
      if (key === 'SUPABASE_SERVICE_ROLE_KEY' && val) supabaseServiceKey = val;
    }
  });
}

console.log('Checking Environment Variables:');
console.log(`- NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✅ Set (' + supabaseUrl.substring(0, 25) + '...)' : '❌ Not Set'}`);
console.log(`- NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✅ Set (Length: ' + supabaseAnonKey.length + ')' : '❌ Not Set'}`);
console.log(`- SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceKey ? '✅ Set (Length: ' + supabaseServiceKey.length + ')' : '⚠️ Not Set (Optional for read-only)'}`);

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('\n❌ RESULT: Credentials missing in .env.local.');
  console.log('Please paste your Supabase Project URL and Anon Key into .env.local, then run this script again.');
  process.exit(1);
}

const client = createClient(supabaseUrl, supabaseAnonKey);

console.log('\nTesting connection to Supabase PostgreSQL...');
const start = Date.now();

try {
  const { data, error } = await client.from('site_settings').select('count', { count: 'exact', head: true });
  const latency = Date.now() - start;

  if (error) {
    console.log(`❌ Database Query Error (${latency}ms):`, error.message);
    if (error.code === '42P01') {
      console.log('💡 Note: Relation does not exist yet. Please run the SQL migration in Supabase SQL Editor:');
      console.log('   File: supabase/migrations/20261121000001_initial_schema.sql');
    }
    process.exit(1);
  }

  console.log(`✅ SUCCESS: Connected to Supabase PostgreSQL (${latency}ms)`);
  console.log('Database tables are ready and accessible.');
} catch (err) {
  console.log('❌ Connection failed:', err.message);
  process.exit(1);
}
