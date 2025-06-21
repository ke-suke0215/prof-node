export function CTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">
          さあ、あなただけの
          <br className="sm:hidden" />
          Web名刺を始めよう。
        </h2>
        <div className="mt-8">
          <button className="inline-block bg-blue-600 text-white font-bold py-4 px-10 rounded-lg text-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 border-none cursor-pointer">
            今すぐ無料で作成
          </button>
        </div>
      </div>
    </section>
  );
}
