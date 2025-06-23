import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';

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

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  // For 404 errors, use the enhanced design with shadcn/ui components
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <>
        <style>{`
          @keyframes aurora-flow {
            0%, 100% { 
              background-position: 0% 50%; 
              opacity: 0.8;
            }
            25% { 
              background-position: 100% 0%; 
              opacity: 1;
            }
            50% { 
              background-position: 100% 100%; 
              opacity: 0.6;
            }
            75% { 
              background-position: 0% 100%; 
              opacity: 0.9;
            }
          }
          
          @keyframes float-404 {
            0%, 100% { 
              transform: translateY(0px) scale(1);
            }
            25% { 
              transform: translateY(-20px) scale(1.02);
            }
            50% { 
              transform: translateY(-10px) scale(1.05);
            }
            75% { 
              transform: translateY(-15px) scale(1.01);
            }
          }
          
          @keyframes shimmer {
            0% { 
              background-position: -200% 0; 
            }
            100% { 
              background-position: 200% 0; 
            }
          }
          
          @keyframes particle-float {
            0%, 100% { 
              transform: translate(0, 0) rotate(0deg); 
              opacity: 0.3;
            }
            33% { 
              transform: translate(30px, -30px) rotate(120deg); 
              opacity: 0.8;
            }
            66% { 
              transform: translate(-20px, -60px) rotate(240deg); 
              opacity: 0.5;
            }
          }
          
          .aurora-bg {
            background: linear-gradient(-45deg, #f0f9ff, #e0f2fe, #dbeafe, #e0e7ff, #f0f9ff, #cffafe);
            background-size: 400% 400%;
            animation: aurora-flow 15s ease infinite;
          }
          
          .float-404 {
            animation: float-404 6s ease-in-out infinite;
          }
          
          .shimmer-text {
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.8),
              transparent
            );
            background-size: 200% 100%;
            animation: shimmer 3s infinite;
          }
          
          .particle {
            animation: particle-float 8s infinite linear;
          }
        `}</style>

        <div className="aurora-bg min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="particle absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-200/40 rounded-full"
              style={{ animationDelay: '0s', animationDuration: '12s' }}
            ></div>
            <div
              className="particle absolute top-1/3 right-1/4 w-6 h-6 bg-blue-200/30 rounded-full"
              style={{ animationDelay: '2s', animationDuration: '10s' }}
            ></div>
            <div
              className="particle absolute bottom-1/3 left-1/3 w-3 h-3 bg-sky-300/50 rounded-full"
              style={{ animationDelay: '4s', animationDuration: '14s' }}
            ></div>
            <div
              className="particle absolute top-1/2 right-1/3 w-5 h-5 bg-cyan-300/35 rounded-full"
              style={{ animationDelay: '1s', animationDuration: '11s' }}
            ></div>
            <div
              className="particle absolute bottom-1/4 right-1/5 w-2 h-2 bg-blue-300/60 rounded-full"
              style={{ animationDelay: '3s', animationDuration: '9s' }}
            ></div>
          </div>

          {/* Main content using shadcn/ui Card */}
          <div className="relative max-w-lg w-full">
            <Card className="relative bg-white/80 backdrop-blur-xl border-white/40 shadow-2xl rounded-3xl overflow-hidden">
              {/* Card background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 via-blue-50/40 to-sky-100/30 rounded-3xl"></div>
              <div className="absolute inset-0 shimmer-text rounded-3xl"></div>

              <CardHeader className="relative text-center pb-4">
                {/* 404 with enhanced animation */}
                <div className="float-404 mb-4">
                  <CardTitle className="text-9xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-400 tracking-tighter leading-none">
                    404
                  </CardTitle>
                  {/* Glow effect behind 404 */}
                  <div className="absolute inset-0 text-9xl md:text-[10rem] font-black text-cyan-300/20 blur-xl -z-10 flex items-center justify-center">
                    404
                  </div>
                </div>

                {/* Elegant divider */}
                <div className="flex items-center justify-center mb-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent w-24"></div>
                  <div className="mx-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent w-24"></div>
                </div>
              </CardHeader>

              <CardContent className="relative text-center pb-4">
                <CardDescription className="text-2xl text-gray-700 font-light mb-2 tracking-wide">
                  ページが見つかりません
                </CardDescription>
                <CardDescription className="text-sm text-gray-500 font-normal">
                  お探しのページは存在しないか、移動された可能性があります
                </CardDescription>
              </CardContent>

              <CardFooter className="relative justify-center pb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 gap-3"
                >
                  <Link to="/">
                    {/* Home icon */}
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    ホームに戻る
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Card reflection effect */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cyan-100/20 to-transparent rounded-3xl transform translate-y-8 blur-xl opacity-60"></div>
          </div>
        </div>
      </>
    );
  }

  // For other errors, use the original simple design
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
