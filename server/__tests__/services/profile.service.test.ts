import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProfileService } from '../../services/profile.service';

// Drizzle clientのモック
vi.mock('../../db/client', () => ({
  createDrizzleClient: vi.fn(() => ({
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => ({
          limit: vi.fn(() => Promise.resolve([])),
        })),
      })),
    })),
  })),
}));

describe('ProfileService', () => {
  let profileService: ProfileService;
  const mockConnectionString = 'postgresql://test:test@localhost:5432/test';

  beforeEach(() => {
    vi.clearAllMocks();
    profileService = new ProfileService(mockConnectionString);
  });


  describe('getProfileByNanoId', () => {
    it('存在するプロフィールを返す', async () => {
      const mockProfile = {
        id: 'test-id',
        nanoId: 'ZiFx0qtfRoUaZ7PTCNlBA',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockDb = {
        select: vi.fn(() => ({
          from: vi.fn(() => ({
            where: vi.fn(() => ({
              limit: vi.fn(() => Promise.resolve([mockProfile])),
            })),
          })),
        })),
      };
      
      vi.mocked(await import('../../db/client')).createDrizzleClient.mockReturnValue(mockDb as any);
      profileService = new ProfileService(mockConnectionString);

      const result = await profileService.getProfileByNanoId('ZiFx0qtfRoUaZ7PTCNlBA');
      expect(result).toEqual(mockProfile);
    });

    it('存在しないプロフィールの場合nullを返す', async () => {
      const mockDb = {
        select: vi.fn(() => ({
          from: vi.fn(() => ({
            where: vi.fn(() => ({
              limit: vi.fn(() => Promise.resolve([])),
            })),
          })),
        })),
      };
      
      vi.mocked(await import('../../db/client')).createDrizzleClient.mockReturnValue(mockDb as any);
      profileService = new ProfileService(mockConnectionString);

      const result = await profileService.getProfileByNanoId('non-existent-id');
      expect(result).toBeNull();
    });

    it('エラーが発生した場合、例外をスロー', async () => {
      const mockDb = {
        select: vi.fn(() => ({
          from: vi.fn(() => ({
            where: vi.fn(() => ({
              limit: vi.fn(() => Promise.reject(new Error('Database error'))),
            })),
          })),
        })),
      };
      
      vi.mocked(await import('../../db/client')).createDrizzleClient.mockReturnValue(mockDb as any);
      profileService = new ProfileService(mockConnectionString);

      await expect(profileService.getProfileByNanoId('test-id')).rejects.toThrow('Failed to fetch profile');
    });
  });
});