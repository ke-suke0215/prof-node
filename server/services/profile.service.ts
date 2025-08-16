import { eq } from 'drizzle-orm';
import { createDrizzleClient, type DrizzleClient } from '../db/client';
import { profiles } from '../db/schema/profiles';

export class ProfileService {
  private db: DrizzleClient;

  constructor(connectionString: string) {
    this.db = createDrizzleClient(connectionString);
  }

  /**
   * nano IDでプロフィールの基本情報を取得
   * @param nanoId - 取得するプロフィールのnano ID
   * @returns プロフィールの基本情報、存在しない場合null
   */
  async getProfileByNanoId(nanoId: string): Promise<typeof profiles.$inferSelect | null> {
    try {
      const result = await this.db
        .select()
        .from(profiles)
        .where(eq(profiles.nanoId, nanoId))
        .limit(1);

      return result[0] || null;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw new Error('Failed to fetch profile');
    }
  }
}