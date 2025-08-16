import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/profiles';

export function createDrizzleClient(connectionString: string) {
  // Cloudflare Workers環境対応のため、prepareオプションをfalseに設定
  const client = postgres(connectionString, {
    prepare: false,
    ssl: connectionString.includes('localhost') ? false : 'require',
  });
  
  return drizzle(client, { schema });
}

export type DrizzleClient = ReturnType<typeof createDrizzleClient>;