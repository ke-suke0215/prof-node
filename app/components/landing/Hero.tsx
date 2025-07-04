export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-100 overflow-hidden">
      {/* 装飾的な背景要素 */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/10 via-cyan-100/15 to-blue-200/20"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-cyan-200/15 to-blue-300/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-sky-200/15 to-indigo-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-cyan-100/25 to-blue-200/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-tr from-sky-100/25 to-cyan-200/30 rounded-full blur-xl"></div>
      <div className="relative container mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 md:pt-32 md:pb-24 flex flex-col md:flex-row items-center text-center md:text-left">
        <div className="md:w-1/2 lg:w-2/5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
            あなたのスキルを、
            <br className="hidden md:block" />
            一枚のリンクに。
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
            ProfNodeは、あなたのプロフィールやSNS、ポートフォリオを一つにまとめ、簡単に共有できるデジタル名刺サービスです。
          </p>
          <div className="mt-6 sm:mt-8">
            <a
              href="/register"
              className="inline-block bg-blue-600 text-white font-bold py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 border-none cursor-pointer text-center"
            >
              今すぐ無料で作成
            </a>
          </div>
        </div>

        <div className="relative md:w-1/2 lg:w-3/5 mt-12 md:mt-0 flex justify-center items-center">
          <div className="relative w-full h-64 sm:h-80 md:h-96">
            {/* Mobile and Desktop: Always use overlapping cards layout */}
            <div className="relative">
              {/* Card 1 (Background card) */}
              <div
                className="hero-card absolute w-48 sm:w-56 md:w-64 lg:w-72 h-auto bg-white/95 backdrop-filter backdrop-blur-md border border-gray-200/80 rounded-2xl shadow-lg p-4 sm:p-5 md:p-6"
                style={{
                  transform: 'rotate(-5deg)',
                  top: '15%',
                  left: 'calc(50% - 120px)', // Mobile center
                  // Desktop positioning handled by media query below
                }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gray-200 mx-auto mb-3"></div>
                <div className="h-4 md:h-5 w-3/4 bg-gray-300 rounded-md mx-auto mb-2"></div>
                <div className="h-3 md:h-4 w-1/2 bg-gray-200 rounded-md mx-auto"></div>
                <div className="flex justify-center space-x-3 sm:space-x-4 mt-3 sm:mt-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-300"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-300"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-300"></div>
                </div>
              </div>

              {/* Card 2 (Foreground card - Jiro Suzuki) */}
              <div
                className="hero-card absolute w-52 sm:w-60 md:w-72 lg:w-80 h-auto bg-white/98 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8"
                style={{
                  transform: 'rotate(3deg)',
                  top: '30%',
                  left: 'calc(50% - 104px)', // Mobile center
                  // Desktop positioning handled by media query below
                }}
              >
                <div className="text-center">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    Jiro Suzuki
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Backend Engineer
                  </p>
                  <div className="flex justify-center items-center space-x-3 sm:space-x-4 md:space-x-5 mt-3 sm:mt-4 md:mt-5">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z" />
                    </svg>
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.25 6.5 1.75 1.75 0 0 1 6.5 8.25zM19 19h-3v-4.74c0-1.42-.6-2.26-1.9-2.26-1.3 0-2.1 1-2.1 2.23V19h-3v-9h2.9v1.3a3.1 3.1 0 0 1 2.8-1.5c2 0 3.4 1.3 3.4 4.2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
