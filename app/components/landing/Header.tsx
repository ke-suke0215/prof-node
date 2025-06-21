export function Header() {
  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-xl text-gray-800">ProfNode</div>
        <div>
          <button className="text-gray-600 hover:text-blue-600 mr-4 bg-transparent border-none cursor-pointer">
            ログイン
          </button>
          <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer border-none">
            無料で始める
          </button>
        </div>
      </div>
    </header>
  );
}
