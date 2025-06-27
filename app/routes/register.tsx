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
    { title: 'ユーザー登録 - ProfNode' },
    {
      name: 'description',
      content: 'ProfNodeに登録して、あなただけのデジタル名刺を作成しましょう。',
    },
  ];
}

export default function Register() {
  return (
    <AuthLayout
      title="ProfNodeに登録"
      subtitle=""
      description="新規登録(無料)して利用を開始しましょう。"
    >
      <div className="space-y-6">
        {/* OAuth Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <OAuthButton provider="google">
            <GoogleIcon />
            Googleで登録
          </OAuthButton>

          <OAuthButton provider="github">
            <GitHubIcon />
            GitHubで登録
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
              登録する
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            すでにアカウントをお持ちですか？{' '}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              ログイン
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
