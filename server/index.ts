import { Hono } from 'hono';
import { cors } from 'hono/cors';
import profileRoutes from './routes/profile';
import healthRoutes from './routes/health';

const app = new Hono();

// CORS設定
app.use(
  '*',
  cors({
    origin: (origin) => origin, // オリジンをそのまま許可
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400,
  })
);

// APIルートの設定
app.route('/api', profileRoutes);
app.route('/api', healthRoutes);

// ヘルスチェック用エンドポイント
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
export type AppType = typeof app;
