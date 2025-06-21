export function Header() {
  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <div className="font-bold text-lg sm:text-xl text-gray-800">ProfNode</div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="text-gray-600 hover:text-blue-600 bg-transparent border-none cursor-pointer text-sm sm:text-base px-2 sm:px-0">
            ログイン
          </button>
          <button className="bg-blue-600 text-white font-bold py-2 px-3 sm:px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer border-none text-sm sm:text-base">
            無料で始める
          </button>
        </div>
      </div>
    </header>
  );
}
