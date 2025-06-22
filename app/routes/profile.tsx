import type { LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';
import { z } from 'zod';

// nano IDのバリデーションスキーマ
const nanoIdSchema = z.string().length(21);

// プロフィールデータの型定義
interface ProfileData {
  name: string;
  title: string;
  company: string;
  email: string;
  links: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    qiita?: string;
    zenn?: string;
  };
  otherLinks: Array<{
    title: string;
    url: string;
  }>;
}

// 固定のプロフィールデータ（ZiFx0qtfRoUaZ7PTCNlBA用）
const FIXED_PROFILE_DATA: ProfileData = {
  name: 'Taro Yamada',
  title: 'Frontend Engineer',
  company: 'Tech Innovate Inc.',
  email: 'taro.yamada@example.com',
  links: {
    github: 'https://github.com/taroyamada',
    twitter: 'https://twitter.com/taroyamada',
    linkedin: 'https://linkedin.com/in/taroyamada',
    qiita: 'https://qiita.com/taroyamada',
    zenn: 'https://zenn.dev/taroyamada',
  },
  otherLinks: [
    {
      title: 'My Portfolio',
      url: 'https://portfolio.example.com',
    },
    {
      title: 'My Blog',
      url: 'https://blog.example.com',
    },
  ],
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { nanoId } = params;

  try {
    // nano IDのバリデーション
    const validatedNanoId = nanoIdSchema.parse(nanoId);

    // 特定のnano IDのみ許可
    if (validatedNanoId !== 'ZiFx0qtfRoUaZ7PTCNlBA') {
      throw new Response('Profile not found', { status: 404 });
    }

    return { profile: FIXED_PROFILE_DATA };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Response('Invalid profile ID', { status: 400 });
    }
    throw error;
  }
};

export default function ProfilePage() {
  const { profile } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 animate-gradient">
      <div
        id="profile-card-wrapper"
        className="relative w-full max-w-md mx-auto"
      >
        {/* Main Profile Card */}
        <div
          id="profile-card"
          className="relative w-full mx-auto rounded-2xl overflow-hidden shadow-xl transition-all duration-300 backdrop-blur-lg bg-white/70 border border-white/20"
        >
          <div className="p-8 md:p-10">
            {/* Header: Name, Title, Company */}
            <div className="text-center mb-8 pt-4">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                {profile.name}
              </h1>
              <p className="text-lg text-gray-600 mt-2">{profile.title}</p>
              <p className="text-md text-gray-500">@ {profile.company}</p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center items-center space-x-6 mb-8">
              {/* GitHub */}
              {profile.links.github && (
                <a
                  href={profile.links.github}
                  className="text-gray-500 hover:text-gray-900 transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                  aria-label="GitHub Profile"
                  title="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6.1a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.7 2.7 5.8 5.5 6.1-.6.5-1 1.4-1 2.8v3.5"></path>
                  </svg>
                </a>
              )}

              {/* Twitter/X */}
              {profile.links.twitter && (
                <a
                  href={profile.links.twitter}
                  className="text-gray-500 hover:text-gray-900 transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                  aria-label="X Profile"
                  title="X (Twitter)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}

              {/* LinkedIn */}
              {profile.links.linkedin && (
                <a
                  href={profile.links.linkedin}
                  className="text-gray-500 hover:text-blue-600 transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              )}

              {/* Qiita */}
              {profile.links.qiita && (
                <a
                  href={profile.links.qiita}
                  className="text-gray-500 hover:text-green-600 transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                  aria-label="Qiita Profile"
                  title="Qiita"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5.11 3.003h13.78v4.133h-4.133v9.643H9.243v-9.643H5.11V3.003zm9.644 13.777v4.133H5.11v-4.133h9.644z" />
                  </svg>
                </a>
              )}

              {/* Zenn */}
              {profile.links.zenn && (
                <a
                  href={profile.links.zenn}
                  className="text-gray-500 hover:text-blue-500 transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                  aria-label="Zenn Profile"
                  title="Zenn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                  >
                    <path d="M111.99,32.05a8,8,0,0,0-8.23,6.23l-32,128.1a8,8,0,1,0,15.74,3.92L119.34,64h63.49a8,8,0,0,0,7.9-6.69l16.17-64.66a8,8,0,0,0-7.9-9.31H176a8,8,0,0,0,0,16h11.23l-3.32,13.29h-64Zm40,112.08-32,64.05a8,8,0,0,0,14.26,7.14L157.34,176h35.49a8,8,0,0,0,0-16H163.7l22.63-45.26a8,8,0,0,0-14.26-7.14Z" />
                  </svg>
                </a>
              )}
            </div>

            {/* Email & Contact */}
            <div className="mb-8 px-4">
              <div className="flex items-center bg-gray-100/70 border border-gray-200/80 rounded-lg p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400 mr-3"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="text-gray-700 text-sm">{profile.email}</span>
                <button
                  onClick={() => {
                    if (
                      typeof window !== 'undefined' &&
                      window.navigator?.clipboard
                    ) {
                      window.navigator.clipboard.writeText(profile.email);
                      window.alert('メールアドレスをコピーしました！');
                    }
                  }}
                  className="ml-auto text-gray-400 hover:text-gray-800 transition-colors"
                  aria-label="Copy email address"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Other Links Section */}
            {profile.otherLinks.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-center mb-4">
                  Other Links
                </h2>
                <div className="space-y-3 px-4">
                  {profile.otherLinks.map(
                    (link: { title: string; url: string }, index: number) => (
                      <a
                        key={index}
                        href={link.url}
                        className="block bg-white/60 border border-gray-200/80 rounded-lg p-4 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="font-semibold text-gray-800">
                          {link.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {link.url}
                        </p>
                      </a>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// エラー境界の設定
export function ErrorBoundary() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-red-100 to-pink-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-8">Profile not found</p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
