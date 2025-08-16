import type { LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';
import {
  nanoIdSchema,
  profileSchema,
  type ProfileData,
} from '../../server/schemas/profile';

import { ProfileLayout } from '~/components/profile/profile-layout';
import { ProfileCard } from '~/components/profile/profile-card';
import { ErrorPage } from '~/components/profile/error-page';

// 固定のプロフィールデータ（サーバー側と同じデータ）
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
    // バリデーション
    const validatedId = nanoIdSchema.parse(nanoId);

    // 特定のnano IDのみ許可
    if (validatedId !== 'ZiFx0qtfRoUaZ7PTCNlBA') {
      throw new Response('Profile not found', { status: 404 });
    }

    // プロフィールデータの検証
    const validatedProfile = profileSchema.parse(FIXED_PROFILE_DATA);

    return { profile: validatedProfile };
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    console.error('Profile validation error:', error);
    throw new Response('Profile not found', { status: 404 });
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
