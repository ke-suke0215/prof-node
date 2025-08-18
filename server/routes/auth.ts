import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { createDb } from '../db';
import { ProfileService } from '../services/profile.service';
import { authMiddleware } from '../middleware/auth';
import type { AuthContext } from '../middleware/auth';

const auth = new Hono<AuthContext>();

// 認証ミドルウェアを適用
auth.use('*', authMiddleware);

// サインアップ後のプロフィール作成スキーマ
const createProfileSchema = z.object({
  authUuid: z.string().uuid(),
});

// プロフィール作成エンドポイント（サインアップ時の手動実行用）
auth.post('/profile', zValidator('json', createProfileSchema), async (c) => {
  try {
    const { authUuid } = c.req.valid('json');
    
    const db = createDb(c.env.DATABASE_URL);
    const profileService = new ProfileService(db);
    
    const created = await profileService.createProfile(authUuid);
    
    if (!created) {
      return c.json({ 
        success: false, 
        error: 'Profile already exists' 
      }, 422);
    }
    
    return c.json({ 
      success: true, 
      message: 'Profile created successfully'
    });
    
  } catch (error) {
    console.error('Profile creation error:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to create profile' 
    }, 500);
  }
});


export default auth;