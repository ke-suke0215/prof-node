import { hc } from 'hono/client';
import type { AppType } from '../../server/index';

// Hono RPCクライアントを作成
export const createApiClient = (baseUrl: string) => {
  return hc<AppType>(baseUrl);
};
