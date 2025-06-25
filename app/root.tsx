import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import { ErrorPage } from './components/profile/error-page';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  { rel: 'icon', type: 'image/png', href: '/favicon.png' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <ErrorPage
          title="404"
          message="お探しのページが見つかりませんでした"
          showHomeButton={true}
        />
      );
    }

    return (
      <ErrorPage
        title="エラー"
        message={error.statusText || '予期しないエラーが発生しました'}
        showHomeButton={true}
      />
    );
  }

  if (import.meta.env.DEV && error && error instanceof Error) {
    return (
      <main className="pt-16 p-4 container mx-auto">
        <h1>開発エラー</h1>
        <p>{error.message}</p>
        <pre className="w-full p-4 overflow-x-auto">
          <code>{error.stack}</code>
        </pre>
      </main>
    );
  }

  return (
    <ErrorPage
      title="エラー"
      message="予期しないエラーが発生しました"
      showHomeButton={true}
    />
  );
}
