export function CTA() {
  return (
    <section className="relative py-12 sm:py-20 md:py-32 bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-100 overflow-hidden">
      {/* 装飾的な背景要素 */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/10 via-cyan-100/15 to-blue-200/20"></div>
      <div className="absolute -top-16 -left-16 w-80 h-80 bg-gradient-to-br from-cyan-200/15 to-blue-300/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-gradient-to-tl from-sky-200/15 to-indigo-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-cyan-100/25 to-blue-200/30 rounded-full blur-2xl"></div>
      <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-tr from-sky-100/25 to-cyan-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-gradient-to-bl from-cyan-100/25 to-sky-200/30 rounded-full blur-xl"></div>
      <div className="relative container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
          さあ、あなただけの
          <br className="sm:hidden" />
          Web名刺を始めよう。
        </h2>
        <div className="mt-6 sm:mt-8">
          <a
            href="/login"
            className="inline-block bg-blue-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-10 rounded-lg text-lg sm:text-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 border-none cursor-pointer"
          >
            今すぐ無料で作成
          </a>
        </div>
      </div>
    </section>
  );
}
