import { createMiddleware } from 'hono/factory';
import { createSupabaseClient } from '../lib/supabase';
import { getEnv } from '../lib/env';

export interface AuthContext {
  Bindings: {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    DATABASE_URL: string;
  };
  Variables: {
    user: {
      id: string;
      email?: string;
    } | null;
  };
}

// 認証ミドルウェア
export const authMiddleware = createMiddleware<AuthContext>(async (c, next) => {
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    c.set('user', null);
    await next();
    return;
  }

  try {
    const supabaseUrl = getEnv('SUPABASE_URL');
    const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');
    
    const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      c.set('user', null);
    } else {
      c.set('user', {
        id: user.id,
        email: user.email,
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    c.set('user', null);
  }

  await next();
});

// 認証が必要なルート用のミドルウェア
export const requireAuth = createMiddleware<AuthContext>(async (c, next) => {
  const user = c.get('user');
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  await next();
});