import type { Route } from './+types/login';

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
          {/* Google認証ボタン */}
          <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors mb-4">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
            Googleでログイン
          </button>

          {/* 区切り線 */}
          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-3 text-sm text-gray-500 bg-white">または</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* メール/パスワードフォーム */}
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                placeholder="メールアドレスを入力"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                placeholder="パスワードを入力"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ログイン
            </button>
          </form>

          {/* ユーザー登録リンク */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              アカウントをお持ちでない方は
              <button className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                こちら
              </button>
            </p>
          </div>

          {/* パスワードを忘れた場合 */}
          <div className="text-center mt-3">
            <button className="text-sm text-blue-600 hover:text-blue-700">
              パスワードをお忘れの方はこちら
            </button>
          </div>
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
