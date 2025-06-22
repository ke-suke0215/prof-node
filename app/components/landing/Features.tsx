export function Features() {
  return (
    <section className="py-12 sm:py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
            たった数分で、最高の出会いを演出
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            シンプルで直感的な操作。相手に簡単共有。
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="fade-in-section text-center sm:col-span-2 md:col-span-1">
            <div className="flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-white shadow-md mx-auto mb-4 sm:mb-6 border border-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600 sm:w-8 sm:h-8"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              簡単プロフィール設定
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600 px-2">
              ガイドに従って入力するだけ。あなたの今を魅力的に見せることができます。
            </p>
          </div>
          <div className="fade-in-section text-center">
            <div className="flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-white shadow-md mx-auto mb-4 sm:mb-6 border border-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600 sm:w-8 sm:h-8"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              ワンクリック共有
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600 px-2">
              生成されたURを使えば、いつでもどこでもあなたのプロフィールを共有できます。
            </p>
          </div>
          <div className="fade-in-section text-center sm:col-span-2 md:col-span-1">
            <div className="flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-white shadow-md mx-auto mb-4 sm:mb-6 border border-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600 sm:w-8 sm:h-8"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              洗練されたデザイン
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600 px-2">
              受け取った相手に好印象を与える、モダンでシンプルなレイアウト。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
