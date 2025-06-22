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
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-red-100 to-pink-100">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="text-center p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 mb-8">{message}</p>
          {showHomeButton && (
            <Button asChild>
              <a href="/">Go Home</a>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
