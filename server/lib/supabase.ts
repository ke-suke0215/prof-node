import { createClient } from '@supabase/supabase-js';

// Cloudflare Workers環境では、環境変数はコンテキストから取得する必要がある
export function createSupabaseClient(supabaseUrl: string, supabaseKey: string) {
  return createClient(supabaseUrl, supabaseKey);
}

// Supabase Admin Client（service_role_keyを使用）
export function createSupabaseAdminClient(supabaseUrl: string, serviceRoleKey: string) {
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}