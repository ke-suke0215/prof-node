import type { LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';
import { z } from 'zod';

import { ProfileLayout } from '~/components/profile/profile-layout';
import { ProfileCard } from '~/components/profile/profile-card';
import { ErrorPage } from '~/components/profile/error-page';

// nano IDのバリデーションスキーマ
const nanoIdSchema = z.string().length(21);

// プロフィールデータの型定義
interface ProfileData {
  name: string;
  subName?: string;
  title: string;
  company: string;
  email: string;
  links: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    qiita?: string;
    zenn?: string;
  };
  otherLinks: Array<{
    title: string;
    url: string;
  }>;
}

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

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { nanoId } = params;

  try {
    // nano IDのバリデーション
    const validatedNanoId = nanoIdSchema.parse(nanoId);

    // 特定のnano IDのみ許可
    if (validatedNanoId !== 'ZiFx0qtfRoUaZ7PTCNlBA') {
      throw new Response('Profile not found', { status: 404 });
    }

    return { profile: FIXED_PROFILE_DATA };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Response('Invalid profile ID', { status: 400 });
    }
    throw error;
  }
};

export default function ProfilePage() {
  const { profile } = useLoaderData<typeof loader>();

  return (
    <ProfileLayout>
      <ProfileCard profile={profile} />
    </ProfileLayout>
  );
}

// エラー境界の設定
export function ErrorBoundary() {
  return <ErrorPage />;
}
