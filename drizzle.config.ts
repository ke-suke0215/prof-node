import type { Config } from 'drizzle-kit';

export default {
  schema: './server/db/schema/*.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:54322/postgres',
  },
  verbose: true,
  strict: true,
} satisfies Config;