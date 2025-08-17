import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Hono } from 'hono';
import auth from '../auth';
import { ProfileService } from '../../services/profile.service';

// モック
vi.mock('../../db', () => ({
  createDb: vi.fn(() => ({})),
}));

vi.mock('../../services/profile.service');

vi.mock('../../middleware/auth', () => ({
  authMiddleware: vi.fn((c, next) => {
    // 環境変数をモック
    c.env = {
      DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
      SUPABASE_URL: 'http://test',
      SUPABASE_ANON_KEY: 'test-key',
    };
    return next();
  }),
  AuthContext: {},
}));

describe('Auth Routes', () => {
  let app: Hono;
  
  beforeEach(() => {
    vi.clearAllMocks();
    app = new Hono();
    app.route('/auth', auth);
  });

  describe('POST /auth/profile', () => {
    const validAuthUuid = '12345678-1234-1234-1234-123456789012';
    const validPayload = { authUuid: validAuthUuid };

    it('プロフィール作成成功時、200とsuccessメッセージを返す', async () => {
      // ProfileService.createProfileがtrueを返すようモック
      const mockCreateProfile = vi.fn().mockResolvedValue(true);
      vi.mocked(ProfileService).mockImplementation(() => ({
        createProfile: mockCreateProfile,
      }) as any);

      const res = await app.request('/auth/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validPayload),
      });

      expect(res.status).toBe(200);
      
      const body = await res.json();
      expect(body).toEqual({
        success: true,
        message: 'Profile created successfully',
      });
      
      expect(mockCreateProfile).toHaveBeenCalledWith(validAuthUuid);
    });

    it('プロフィールが既に存在する場合、422エラーを返す', async () => {
      // ProfileService.createProfileがfalseを返すようモック
      const mockCreateProfile = vi.fn().mockResolvedValue(false);
      vi.mocked(ProfileService).mockImplementation(() => ({
        createProfile: mockCreateProfile,
      }) as any);

      const res = await app.request('/auth/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validPayload),
      });

      expect(res.status).toBe(422);
      
      const body = await res.json();
      expect(body).toEqual({
        success: false,
        error: 'Profile already exists',
      });
      
      expect(mockCreateProfile).toHaveBeenCalledWith(validAuthUuid);
    });

    it('サービスでエラーが発生した場合、500エラーを返す', async () => {
      // ProfileService.createProfileがエラーを投げるようモック
      const mockCreateProfile = vi.fn().mockRejectedValue(new Error('Database error'));
      vi.mocked(ProfileService).mockImplementation(() => ({
        createProfile: mockCreateProfile,
      }) as any);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const res = await app.request('/auth/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validPayload),
      });

      expect(res.status).toBe(500);
      
      const body = await res.json();
      expect(body).toEqual({
        success: false,
        error: 'Failed to create profile',
      });
      
      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });

    it('無効なUUID形式の場合、バリデーションエラーを返す', async () => {
      const invalidPayload = { authUuid: 'invalid-uuid' };

      const res = await app.request('/auth/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidPayload),
      });

      expect(res.status).toBe(400);
    });

    it('authUuidが欠けている場合、バリデーションエラーを返す', async () => {
      const invalidPayload = {};

      const res = await app.request('/auth/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidPayload),
      });

      expect(res.status).toBe(400);
    });
  });
});
