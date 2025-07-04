import type { Route } from './+types/login';
import { AuthLayout } from '../components/auth/AuthLayout';
import {
  OAuthButton,
  GoogleIcon,
  GitHubIcon,
} from '../components/auth/OAuthButton';
import { FormField, Divider } from '../components/auth/AuthForm';
import { Button } from '../components/ui/button';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ログイン - ProfNode' },
    {
      name: 'description',
      content: 'ProfNodeにログインして、あなたのデジタル名刺を管理しましょう。',
    },
  ];
}

export default function Login() {
  return (
    <AuthLayout
      title="ProfNodeにログイン"
      subtitle=""
      description="お帰りなさい。ログインして続行してください。"
    >
      <div className="space-y-6">
        {/* OAuth Buttons */}
        <div className="space-y-3">
          <OAuthButton provider="google">
            <GoogleIcon />
            Googleでログイン
          </OAuthButton>

          <OAuthButton provider="github">
            <GitHubIcon />
            GitHubでログイン
          </OAuthButton>
        </div>

        <Divider>または</Divider>

        {/* Email Form */}
        <form className="space-y-4 sm:space-y-6">
          <FormField
            id="email"
            label="メールアドレス"
            type="email"
            autoComplete="email"
            placeholder="your@example.com"
            required
          />

          <FormField
            id="password"
            label="パスワード"
            type="password"
            autoComplete="current-password"
            placeholder="パスワードを入力"
            required
          />

          <div>
            <Button type="submit" variant="primary" size="auth-submit">
              ログイン
            </Button>
          </div>
        </form>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            アカウントをお持ちでない方は{' '}
            <a
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              新規登録
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
