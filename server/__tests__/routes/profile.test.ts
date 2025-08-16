import { describe, it, expect, vi } from 'vitest';
import profileRoutes from '../../routes/profile';

// ProfileServiceのモック
vi.mock('../../services/profile.service', () => ({
  ProfileService: vi.fn().mockImplementation(() => ({
    getProfileByNanoId: vi.fn().mockImplementation((nanoId: string) => {
      // 既知のnano IDの場合はプロフィール情報を返す、そうでなければnull
      if (nanoId === 'ZiFx0qtfRoUaZ7PTCNlBA') {
        return Promise.resolve({
          id: 'test-uuid',
          nanoId: 'ZiFx0qtfRoUaZ7PTCNlBA',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      return Promise.resolve(null);
    }),
  })),
}));

describe('Profile API', () => {
  describe('GET /profile/:id', () => {
    it('should return profile data for valid nano ID', async () => {
      const validNanoId = 'ZiFx0qtfRoUaZ7PTCNlBA';
      const req = new Request(`http://localhost/profile/${validNanoId}`);
      const res = await profileRoutes.request(req);

      expect(res.status).toBe(200);
      
      const data = await res.json() as any;
      expect(data).toHaveProperty('profile');
      expect(data.profile).toMatchObject({
        name: 'Keisuke Isoda',
        subName: '磯田 圭佑',
        title: 'Software Engineer',
        company: '株式会社LegalOn Technologies',
        email: 'keisuke.yohs.0215.1209@gmail.com',
      });
      expect(data.profile.links).toHaveProperty('github');
      expect(data.profile.links).toHaveProperty('twitter');
      expect(data.profile.links).toHaveProperty('linkedin');
      expect(data.profile.otherLinks).toBeInstanceOf(Array);
      expect(data.profile.otherLinks.length).toBeGreaterThan(0);
    });

    it('should return 404 for invalid nano ID', async () => {
      const invalidNanoId = 'invalidNanoId123456789';
      const req = new Request(`http://localhost/profile/${invalidNanoId}`);
      const res = await profileRoutes.request(req);

      expect(res.status).toBe(400);
    });

    it('should return 404 for unknown valid-format nano ID', async () => {
      const unknownValidNanoId = 'abcdefghijklmnopqrstu';
      const req = new Request(`http://localhost/profile/${unknownValidNanoId}`);
      const res = await profileRoutes.request(req);

      expect(res.status).toBe(404);
      
      const data = await res.json() as any;
      expect(data).toHaveProperty('error');
      expect(data.error).toBe('Profile not found');
    });

    it('should validate nano ID length (too short)', async () => {
      const shortNanoId = 'shortid';
      const req = new Request(`http://localhost/profile/${shortNanoId}`);
      const res = await profileRoutes.request(req);

      expect(res.status).toBe(400);
    });

    it('should validate nano ID length (too long)', async () => {
      const longNanoId = 'thisnanoidistoolongtobevalid';
      const req = new Request(`http://localhost/profile/${longNanoId}`);
      const res = await profileRoutes.request(req);

      expect(res.status).toBe(400);
    });

    it('should validate profile data structure', async () => {
      const validNanoId = 'ZiFx0qtfRoUaZ7PTCNlBA';
      const req = new Request(`http://localhost/profile/${validNanoId}`);
      const res = await profileRoutes.request(req);

      expect(res.status).toBe(200);
      
      const data = await res.json() as any;
      const profile = data.profile;

      // Required fields
      expect(profile).toHaveProperty('name');
      expect(profile).toHaveProperty('title');
      expect(profile).toHaveProperty('company');
      expect(profile).toHaveProperty('email');
      expect(profile).toHaveProperty('links');
      expect(profile).toHaveProperty('otherLinks');

      // Email validation
      expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

      // Links structure
      expect(typeof profile.links).toBe('object');
      
      // Other links structure
      expect(Array.isArray(profile.otherLinks)).toBe(true);
      if (profile.otherLinks.length > 0) {
        profile.otherLinks.forEach((link: any) => {
          expect(link).toHaveProperty('title');
          expect(link).toHaveProperty('url');
          expect(typeof link.title).toBe('string');
          expect(typeof link.url).toBe('string');
          expect(link.url).toMatch(/^https?:\/\/.+/);
        });
      }
    });
  });
});