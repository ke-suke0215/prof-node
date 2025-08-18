import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Cloudflare Workers環境では、環境変数はコンテキストから取得する必要がある
export function createDb(databaseUrl: string) {
  const client = postgres(databaseUrl);
  return drizzle(client, { schema });
}

// 型エクスポート
export type Database = ReturnType<typeof createDb>;
