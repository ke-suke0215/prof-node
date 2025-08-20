import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { Button } from '../components/ui/button';

export function meta() {
  return [
    { title: 'ダッシュボード - ProfNode' },
    {
      name: 'description',
      content: 'ProfNodeダッシュボード - あなたのデジタル名刺を管理しましょう。',
    },
  ];
}

export default function Dashboard() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  ProfNode Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {user?.email}
                </span>
                <Button
                  onClick={handleSignOut}
                  variant="secondary"
                  size="sm"
                >
                  ログアウト
                </Button>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  ダッシュボードへようこそ！
                </h2>
                <p className="text-gray-600 mb-6">
                  認証が正常に完了しました。ここからあなたのデジタル名刺を管理できるようになります。
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-800">
                        アカウントの認証が完了しました。プロフィールの設定を開始できます。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-md font-medium text-gray-900 mb-2">
                      次のステップ
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• プロフィール情報の編集</li>
                      <li>• ソーシャルリンクの追加</li>
                      <li>• 公開URLの確認</li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-md font-medium text-gray-900 mb-2">
                      ユーザー情報
                    </h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">メールアドレス:</span> {user?.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">ユーザーID:</span> {user?.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}