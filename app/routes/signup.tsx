import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';

export function meta() {
  return [
    { title: 'アカウント作成 - ProfNode' },
    {
      name: 'description',
      content: 'ProfNodeの新規アカウントを作成してWeb名刺を始めましょう。',
    },
  ];
}

export default function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/10 via-cyan-100/15 to-blue-200/20"></div>
      <div className="absolute -top-16 -left-16 w-80 h-80 bg-gradient-to-br from-cyan-200/15 to-blue-300/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-gradient-to-tl from-sky-200/15 to-indigo-300/20 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/95 border-white/50 shadow-2xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">
              アカウントを作成
            </CardTitle>
            <CardDescription>無料でWeb名刺を始めましょう</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* OAuth Buttons */}
            <div className="space-y-3">
              {/* Google OAuth Button */}
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-gray-50"
                size="lg"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285f4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34a853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#fbbc05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#ea4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Googleでアカウント作成
              </Button>

              {/* GitHub OAuth Button */}
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-gray-50"
                size="lg"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHubでアカウント作成
              </Button>
            </div>

            <div className="relative">
              <Separator className="my-4" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-sm text-muted-foreground">
                  またはメールアドレスで登録
                </span>
              </div>
            </div>

            {/* Email/Password Sign-up Form */}
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">お名前</Label>
                <Input id="name" type="text" placeholder="山田 太郎" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="8文字以上"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-confirm">パスワード（確認）</Label>
                <Input
                  id="password-confirm"
                  type="password"
                  placeholder="パスワードを再入力"
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                アカウント作成
              </Button>
            </form>

            <Separator />

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                すでにアカウントをお持ちの方は{' '}
                <a
                  href="/login"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  ログイン
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Terms and Privacy */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            アカウントを作成することで、
            <button className="text-primary underline-offset-4 hover:underline">
              利用規約
            </button>
            と
            <button className="text-primary underline-offset-4 hover:underline">
              プライバシーポリシー
            </button>
            に同意したものとみなされます。
          </p>
        </div>
      </div>
    </div>
  );
}
