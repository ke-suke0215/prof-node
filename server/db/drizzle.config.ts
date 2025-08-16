import type { Config } from 'drizzle-kit';

export default {
  schema: './server/db/schema/*.ts',
  out: './server/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54322/postgres',
  },
  verbose: true,
  strict: true,
} satisfies Config;