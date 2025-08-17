import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProfileService } from '../profile.service';
import type { Database } from '../../db';
import type { Profile } from '../../db/schema/profiles';

// nanoidのモック
vi.mock('nanoid', () => ({
  nanoid: vi.fn(() => 'test-nano-id-12345678'),
}));

// Drizzle ORMのモック
const mockDb = {
  select: vi.fn(),
  insert: vi.fn(),
  from: vi.fn(),
  where: vi.fn(),
  limit: vi.fn(),
  values: vi.fn(),
} as unknown as Database;

describe('ProfileService', () => {
  let profileService: ProfileService;
  
  beforeEach(() => {
    vi.clearAllMocks();
    profileService = new ProfileService(mockDb);
  });

  describe('createProfile', () => {
    const testAuthUuid = '12345678-1234-1234-1234-123456789012';

    it('新しいプロフィールを作成できる場合、trueを返す', async () => {
      // 既存プロフィールなしをモック
      const mockSelect = vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([]), // 空配列 = 既存なし
          }),
        }),
      });

      // 挿入成功をモック
      const mockInsert = vi.fn().mockReturnValue({
        values: vi.fn().mockResolvedValue(undefined),
      });

      (mockDb.select as any) = mockSelect;
      (mockDb.insert as any) = mockInsert;

      const result = await profileService.createProfile(testAuthUuid);

      expect(result).toBe(true);
      expect(mockSelect).toHaveBeenCalled();
      expect(mockInsert).toHaveBeenCalled();
    });

    it('既存のプロフィールがある場合、falseを返す', async () => {
      const existingProfile: Profile = {
        id: 1,
        authUuid: testAuthUuid,
        nanoId: 'existing-nano-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // 既存プロフィールありをモック
      const mockSelect = vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([existingProfile]), // 既存あり
          }),
        }),
      });

      const mockInsert = vi.fn();

      (mockDb.select as any) = mockSelect;
      (mockDb.insert as any) = mockInsert;

      const result = await profileService.createProfile(testAuthUuid);

      expect(result).toBe(false);
      expect(mockSelect).toHaveBeenCalled();
      expect(mockInsert).not.toHaveBeenCalled(); // insertは呼ばれない
    });

    it('データベースエラーが発生した場合、エラーを投げる', async () => {
      const mockSelect = vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockRejectedValue(new Error('Database error')),
          }),
        }),
      });

      (mockDb.select as any) = mockSelect;

      await expect(profileService.createProfile(testAuthUuid)).rejects.toThrow('Database error');
    });
  });
});