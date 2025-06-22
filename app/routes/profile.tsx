import type { LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';
import { z } from 'zod';

import { ProfileLayout } from '@/app/components/profile/profile-layout';
import { ProfileCard } from '@/app/components/profile/profile-card';
import { ErrorPage } from '@/app/components/profile/error-page';

// nano IDのバリデーションスキーマ
const nanoIdSchema = z.string().length(21);

// プロフィールデータの型定義
interface ProfileData {
  name: string;
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
  name: 'Taro Yamada',
  title: 'Frontend Engineer',
  company: 'Tech Innovate Inc.',
  email: 'taro.yamada@example.com',
  links: {
    github: 'https://github.com/taroyamada',
    twitter: 'https://twitter.com/taroyamada',
    linkedin: 'https://linkedin.com/in/taroyamada',
    qiita: 'https://qiita.com/taroyamada',
    zenn: 'https://zenn.dev/taroyamada',
  },
  otherLinks: [
    {
      title: 'My Portfolio',
      url: 'https://portfolio.example.com',
    },
    {
      title: 'My Blog',
      url: 'https://blog.example.com',
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
