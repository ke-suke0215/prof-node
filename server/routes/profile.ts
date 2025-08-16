import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import {
  nanoIdSchema,
  profileSchema,
  type ProfileData,
} from '../schemas/profile';

const app = new Hono();

// 固定のプロフィールデータ（ZiFx0qtfRoUaZ7PTCNlBA用）
const FIXED_PROFILE_DATA: ProfileData = {
  name: 'Keisuke Isoda',
  subName: '磯田 圭佑',
  title: 'Software Engineer',
  company: '株式会社LegalOn Technologies',
  email: 'keisuke.yohs.0215.1209@gmail.com',
  links: {
    github: 'https://github.com/ke-suke0215',
    twitter: 'https://x.com/02ke____sk15',
    linkedin: 'https://www.linkedin.com/in/keisuke-isoda-3b7677341/',
  },
  otherLinks: [
    {
      title: 'Qiita',
      url: 'https://qiita.com/ke_suke0215',
    },
  ],
};

const paramSchema = z.object({
  id: nanoIdSchema,
});

// プロフィール取得エンドポイント: GET /api/profile/{id}
app.get('/profile/:id', zValidator('param', paramSchema), async (c) => {
  try {
    const { id } = c.req.valid('param');

    // 特定のnano IDのみ許可
    if (id !== 'ZiFx0qtfRoUaZ7PTCNlBA') {
      return c.json({ error: 'Profile not found' }, 404);
    }

    // プロフィールデータの検証
    const validatedProfile = profileSchema.parse(FIXED_PROFILE_DATA);

    return c.json({ profile: validatedProfile });
  } catch (error) {
    console.error('Profile validation error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
