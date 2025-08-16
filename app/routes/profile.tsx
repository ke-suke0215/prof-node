import type { LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';
import server from '../../server/index';

import { ProfileLayout } from '~/components/profile/profile-layout';
import { ProfileCard } from '~/components/profile/profile-card';
import { ErrorPage } from '~/components/profile/error-page';

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const { nanoId } = params;

  try {
    // 同一Worker内でのHono内部ディスパッチ（HTTPではない）
    const request = new Request(`http://internal/api/profile/${nanoId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Honoサーバーの内部呼び出し（ネットワークを経由しない）
    const response = await server.fetch(
      request,
      context.cloudflare.env,
      context.cloudflare.ctx
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Response('Profile not found', { status: 404 });
      }
      throw new Response('Failed to fetch profile', {
        status: response.status,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await response.json()) as { profile: any };
    return { profile: data.profile };
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    console.error('Profile fetch error:', error);
    throw new Response('Internal server error', { status: 500 });
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
