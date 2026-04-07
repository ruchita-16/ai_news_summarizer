import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavbarProps {
  activeCategory: string;
  activeQuery: string;
  onCategoryChange: (category: string) => void;
  onSearchSubmit: (query: string) => void;
}

export function Navbar({ activeCategory, activeQuery, onCategoryChange, onSearchSubmit }: NavbarProps) {
  const categories = ['All', 'Tech', 'Business', 'Sports', 'AI', 'World'];
  const [inputValue, setInputValue] = useState(activeQuery);

  useEffect(() => {
    setInputValue(activeQuery);
  }, [activeQuery]);

  const submitSearch = () => {
    const query = inputValue.trim();
    if (!query) {
      return;
    }
    onSearchSubmit(query);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              NewsAI
            </span>
          </div>

          <div className="flex-1 max-w-md relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={inputValue}
                placeholder="Search news..."
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    submitSearch();
                  }
                }}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
            </div>
            <button
              onClick={submitSearch}
              className="px-4 py-2 rounded-lg bg-white/5 text-gray-200 hover:bg-white/10 transition-all"
            >
              Go
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:hidden flex items-center gap-2 mt-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
