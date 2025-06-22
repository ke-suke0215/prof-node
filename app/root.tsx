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
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;
  let isNotFound = false;

  if (isRouteErrorResponse(error)) {
    isNotFound = error.status === 404;
    message = isNotFound ? '404' : 'Error';
    details = isNotFound
      ? 'ページが見つかりませんでした'
      : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div
      id="aurora-wrapper"
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="text-center fade-in-section opacity-100 transform-none">
        <div className="glass-header rounded-3xl p-8 max-w-md mx-auto shadow-xl">
          {isNotFound ? (
            <>
              <div className="text-8xl font-bold text-blue-600 mb-4 animate-pulse">
                404
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                ページが見つかりません
              </h1>
              <p className="text-gray-600 mb-8">
                お探しのページは存在しないか、移動された可能性があります。
              </p>
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                ホームに戻る
              </a>
            </>
          ) : (
            <>
              <div className="text-6xl font-bold text-red-600 mb-4">
                {message}
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                エラーが発生しました
              </h1>
              <p className="text-gray-600 mb-8">{details}</p>
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011 1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                ホームに戻る
              </a>
            </>
          )}
        </div>
        {stack && (
          <div className="mt-8 glass-header rounded-2xl p-4 max-w-4xl mx-auto">
            <pre className="text-left text-sm text-gray-700 overflow-x-auto">
              <code>{stack}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
