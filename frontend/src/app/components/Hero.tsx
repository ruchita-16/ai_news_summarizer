import { Search, Sparkles } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
}

export function Hero({ onSearch }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-900/20 via-blue-900/20 to-transparent py-20 px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-gray-300">Powered by Advanced AI</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
          Summarize the World in Seconds
        </h1>

        <p className="text-xl text-gray-400 mb-10">
          Get AI-powered summaries of real-time news from around the globe
        </p>

        {/* Search Input */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2">
            <input
              type="text"
              placeholder="Search for any topic..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onSearch((e.target as HTMLInputElement).value);
                }
              }}
              className="flex-1 px-6 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                onSearch(input.value);
              }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl text-white font-medium flex items-center gap-2 transition-all"
            >
              <Search className="w-4 h-4" />
              Search News
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
