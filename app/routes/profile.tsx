import type { LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';
import { hc } from 'hono/client';
import server from '../../server/index';
import type { AppType } from '../../server/index';

import { ProfileLayout } from '~/components/profile/profile-layout';
import { ProfileCard } from '~/components/profile/profile-card';
import { ErrorPage } from '~/components/profile/error-page';

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const { nanoId } = params;

  try {
    // Hono RPCクライアントをカスタムfetchで作成
    // server.fetch()を使って内部ディスパッチを行う
    const customFetch = (input: RequestInfo | URL, init?: RequestInit) => {
      const request = new Request(input, init);
      return server.fetch(
        request,
        context.cloudflare.env,
        context.cloudflare.ctx
      );
    };

    // カスタムfetchを使ったHono RPCクライアント
    const apiClient = hc<AppType>('http://internal', {
      fetch: customFetch,
    });

    // 型安全なRPC呼び出し
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (apiClient as any).api.profile[':id'].$get({
      param: { id: nanoId },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Response('Profile not found', { status: 404 });
      }
      throw new Response('Failed to fetch profile', {
        status: response.status,
      });
    }

    const data = await response.json();
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
