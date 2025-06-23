import type { Route } from './+types/login';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ログイン・ユーザー登録 - ProfNode' },
    {
      name: 'description',
      content: 'ProfNodeにログインまたは新規ユーザー登録を行います。',
    },
  ];
}

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/10 via-cyan-100/15 to-blue-200/20"></div>
      <div className="absolute -top-16 -left-16 w-80 h-80 bg-gradient-to-br from-cyan-200/15 to-blue-300/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-gradient-to-tl from-sky-200/15 to-indigo-300/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            ProfNodeへようこそ
          </h1>
          <p className="text-gray-600 text-base">
            ログインまたは新規登録してWeb名刺を始めましょう
          </p>
        </div>

        <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-xl p-8 border border-white/30">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2563eb',
                    brandAccent: '#1d4ed8',
                    brandButtonText: 'white',
                    defaultButtonBackground: '#f8fafc',
                    defaultButtonBackgroundHover: '#f1f5f9',
                    defaultButtonBorder: '#e2e8f0',
                    defaultButtonText: '#334155',
                    dividerBackground: '#e2e8f0',
                    inputBackground: '#ffffff',
                    inputBorder: '#e2e8f0',
                    inputBorderHover: '#cbd5e1',
                    inputBorderFocus: '#2563eb',
                    inputText: '#1e293b',
                    inputLabelText: '#475569',
                    inputPlaceholder: '#94a3b8',
                    messageText: '#dc2626',
                    messageTextDanger: '#dc2626',
                    anchorTextColor: '#2563eb',
                    anchorTextHoverColor: '#1d4ed8',
                  },
                  space: {
                    spaceSmall: '4px',
                    spaceMedium: '8px',
                    spaceLarge: '16px',
                    labelBottomMargin: '8px',
                    anchorBottomMargin: '4px',
                    emailInputSpacing: '4px',
                    socialAuthSpacing: '4px',
                    buttonPadding: '10px 15px',
                    inputPadding: '10px 15px',
                  },
                  fontSizes: {
                    baseBodySize: '14px',
                    baseInputSize: '14px',
                    baseLabelSize: '14px',
                    baseButtonSize: '14px',
                  },
                  fonts: {
                    bodyFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    buttonFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    inputFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    labelFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                  },
                  borderWidths: {
                    buttonBorderWidth: '1px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '8px',
                    buttonBorderRadius: '8px',
                    inputBorderRadius: '8px',
                  },
                },
              },
              style: {
                button: {
                  borderRadius: '8px',
                  fontWeight: '600',
                },
                anchor: {
                  fontWeight: '500',
                },
                container: {
                  gap: '16px',
                },
                divider: {
                  background: '#e2e8f0',
                  margin: '16px 0',
                },
                label: {
                  fontWeight: '500',
                  color: '#475569',
                },
                input: {
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  padding: '10px 12px',
                },
                message: {
                  fontSize: '13px',
                  marginTop: '4px',
                },
              },
            }}
            providers={['google']}
            redirectTo={window.location.origin + '/dashboard'}
            localization={{
              variables: {
                sign_up: {
                  email_label: 'メールアドレス',
                  password_label: 'パスワード',
                  email_input_placeholder: 'メールアドレスを入力',
                  password_input_placeholder: 'パスワードを入力',
                  button_label: 'アカウント作成',
                  loading_button_label: '作成中...',
                  social_provider_text: '{{provider}}でログイン',
                  link_text: 'アカウントをお持ちでない方はこちら',
                  confirmation_text: 'メールをご確認ください',
                },
                sign_in: {
                  email_label: 'メールアドレス',
                  password_label: 'パスワード',
                  email_input_placeholder: 'メールアドレスを入力',
                  password_input_placeholder: 'パスワードを入力',
                  button_label: 'ログイン',
                  loading_button_label: 'ログイン中...',
                  social_provider_text: '{{provider}}でログイン',
                  link_text: 'すでにアカウントをお持ちの方はこちら',
                },
                magic_link: {
                  email_input_label: 'メールアドレス',
                  email_input_placeholder: 'メールアドレスを入力',
                  button_label: 'マジックリンクを送信',
                  loading_button_label: '送信中...',
                  link_text: 'マジックリンクでログイン',
                  confirmation_text: 'メールをご確認ください',
                },
                forgotten_password: {
                  email_label: 'メールアドレス',
                  password_label: 'パスワード',
                  email_input_placeholder: 'メールアドレスを入力',
                  button_label: 'パスワード再設定メールを送信',
                  loading_button_label: '送信中...',
                  link_text: 'パスワードをお忘れの方はこちら',
                  confirmation_text: 'パスワード再設定メールを送信しました',
                },
                update_password: {
                  password_label: '新しいパスワード',
                  password_input_placeholder: '新しいパスワードを入力',
                  button_label: 'パスワードを更新',
                  loading_button_label: '更新中...',
                },
              },
            }}
          />
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            アカウントを作成することで、
            <br />
            <a
              href="/terms"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              利用規約
            </a>
            と
            <a
              href="/privacy"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              プライバシーポリシー
            </a>
            に同意したものとみなされます。
          </p>
        </div>
      </div>
    </div>
  );
}
