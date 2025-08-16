import type { LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';
import { hc } from 'hono/client';
import type { AppType } from '../../server/index';

import { ProfileLayout } from '~/components/profile/profile-layout';
import { ProfileCard } from '~/components/profile/profile-card';
import { ErrorPage } from '~/components/profile/error-page';

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { nanoId } = params;

  try {
    // Hono RPCクライアントを使用してAPIコール
    const url = new URL(request.url);
    // 静的インポートに変更（Cloudflare Workers環境での互換性のため）
    const client = hc<AppType>(url.origin);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await (client as any).api.profile[':id'].$get({
      param: { id: nanoId as string },
    });

    if (!res.ok) {
      if (res.status === 404) {
        throw new Response('Profile not found', { status: 404 });
      }
      throw new Response('Failed to fetch profile', {
        status: res.status,
      });
    }

    const data = await res.json();
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
