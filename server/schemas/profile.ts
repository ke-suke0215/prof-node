import { z } from 'zod';

// nano IDのバリデーションスキーマ
export const nanoIdSchema = z.string().length(21);

// プロフィールデータの型定義
export const profileSchema = z.object({
  name: z.string(),
  subName: z.string().optional(),
  title: z.string(),
  company: z.string(),
  email: z.string().email(),
  links: z.object({
    github: z.string().url().optional(),
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    qiita: z.string().url().optional(),
    zenn: z.string().url().optional(),
  }),
  otherLinks: z.array(
    z.object({
      title: z.string(),
      url: z.string().url(),
    })
  ),
});

export type ProfileData = z.infer<typeof profileSchema>;
