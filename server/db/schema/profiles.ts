import { pgTable, serial, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  // 主キー（自動インクリメント）
  id: serial('id').primaryKey(),
  
  // Supabase認証のユーザーID（auth.users.idへの参照）
  authUuid: uuid('auth_uuid')
    .notNull()
    .unique()
    .$default(() => crypto.randomUUID()),
  
  // プロフィールURL用の一意識別子（例: /{nano_id}）
  nanoId: varchar('nano_id', { length: 21 })
    .notNull()
    .unique(),
  
  // レコード作成日時
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  
  // レコード更新日時
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;