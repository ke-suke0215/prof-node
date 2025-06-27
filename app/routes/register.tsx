import type { Route } from './+types/register';
import { AuthLayout } from '../components/auth/AuthLayout';
import {
  OAuthButton,
  GoogleIcon,
  GitHubIcon,
} from '../components/auth/OAuthButton';
import { FormField, Divider } from '../components/auth/AuthForm';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'アカウント登録 - ProfNode' },
    {
      name: 'description',
      content:
        'ProfNodeに新規登録して、あなただけのデジタル名刺を始めましょう。',
    },
  ];
}

export default function Register() {
  return (
    <AuthLayout
      title="アカウント作成"
      subtitle=""
      description="ProfNodeに新規登録"
    >
      <div className="space-y-6">
        {/* OAuth Buttons */}
        <div>
          <OAuthButton provider="google">
            <GoogleIcon />
            Googleでアカウント作成
          </OAuthButton>
        </div>

        <div>
          <OAuthButton provider="github">
            <GitHubIcon />
            GitHubでアカウント作成
          </OAuthButton>
        </div>

        <Divider>または</Divider>

        {/* Email Form */}
        <form className="space-y-6">
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
            autoComplete="new-password"
            placeholder="パスワードを入力"
            required
          />

          <FormField
            id="password-confirm"
            label="パスワード確認"
            type="password"
            autoComplete="new-password"
            placeholder="パスワードを再入力"
            required
          />

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              アカウントを作成
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            既にアカウントをお持ちですか？{' '}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              ログインはこちら
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
