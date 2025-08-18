import { vi } from 'vitest';

// 環境変数のモック（全テスト共通）
vi.mock('../lib/env', () => ({
  getEnv: vi.fn((key: string) => {
    const mockEnv = {
      DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
      SUPABASE_URL: 'http://test',
      SUPABASE_ANON_KEY: 'test-key',
    };
    return mockEnv[key as keyof typeof mockEnv];
  }),
}));