import { getContext } from 'hono/context-storage';

type EnvVariables = {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  DATABASE_URL: string;
};

export function getEnv<T extends keyof EnvVariables>(key: T): EnvVariables[T] {
  try {
    const context = getContext();
    if (!context.env) {
      throw new Error('Environment variables not available in context');
    }
    return context.env[key] as EnvVariables[T];
  } catch (error) {
    throw new Error(
      `Failed to get environment variable: ${key}. Make sure contextStorage is properly configured.`
    );
  }
}
