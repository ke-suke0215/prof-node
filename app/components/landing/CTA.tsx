export function CTA() {
  return (
    <section className="py-12 sm:py-20 md:py-32 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
          さあ、あなただけの
          <br className="sm:hidden" />
          Web名刺を始めよう。
        </h2>
        <div className="mt-6 sm:mt-8">
          <button className="inline-block bg-blue-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-10 rounded-lg text-lg sm:text-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 border-none cursor-pointer">
            今すぐ無料で作成
          </button>
        </div>
      </div>
    </section>
  );
}
