import { Hono } from 'hono';

const app = new Hono();

// ヘルスチェック用エンドポイント
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'prof-node-api',
  });
});

export default app;
