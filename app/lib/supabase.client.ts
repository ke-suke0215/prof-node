import { createBrowserClient } from '@supabase/ssr';

// 認証のみに使用するSupabaseクライアント
// データ操作は全てHono APIルート経由で行う
export const supabase = createBrowserClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
