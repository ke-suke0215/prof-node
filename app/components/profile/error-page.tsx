import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';

interface ErrorPageProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

export function ErrorPage({
  title = '404',
  message = 'Profile not found',
  showHomeButton = true,
}: ErrorPageProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-sky-100/30 to-cyan-100/20 backdrop-blur-sm"></div>
      <Card className="relative w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="text-center p-12">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-blue-900 mb-4">{title}</h1>
          <p className="text-lg text-blue-700 mb-8 leading-relaxed">{message}</p>
          {showHomeButton && (
            <Button 
              asChild 
              className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              <a href="/">ホームに戻る</a>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
