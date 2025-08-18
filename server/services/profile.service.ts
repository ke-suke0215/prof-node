import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import type { Database } from '../db';
import { profiles } from '../db/schema/profiles';
import type { Profile, NewProfile } from '../db/schema/profiles';

export class ProfileService {
  constructor(private db: Database) {}

  /**
   * プロフィールを作成（既存の場合はfalseを返す）
   */
  async createProfile(authUuid: string): Promise<boolean> {
    // 既存のプロフィールをチェック
    const existingProfile = await this.db
      .select()
      .from(profiles)
      .where(eq(profiles.authUuid, authUuid))
      .limit(1);
    
    if (existingProfile.length > 0) {
      return false; // 既に存在する
    }

    // 新しいプロフィールを作成
    await this.db
      .insert(profiles)
      .values({
        authUuid,
        nanoId: nanoid(),
      });
    
    return true; // 作成成功
  }
}
