import { Clock, Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';

type Article = {
  title: string;
};

type SidebarProps = {
  onSearch: (query: string) => void;
};

export function Sidebar({ onSearch }: SidebarProps) {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const getLocalStorage = (key: string) => {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
      } catch {
        return [];
      }
    };

    const loadData = () => {
      setSavedArticles(getLocalStorage("savedArticles"));
      setRecentSearches(getLocalStorage("recentSearches"));
    };

    loadData();

    // ✅ REALTIME UPDATE LISTENER
    window.addEventListener("savedArticlesUpdated", loadData);

    return () => {
      window.removeEventListener("savedArticlesUpdated", loadData);
    };
  }, []);

  return (
    <div className="w-80 space-y-6">

      {/* Saved Articles */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bookmark className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Saved Articles</h3>
        </div>

        <div className="space-y-3">
          {savedArticles.length === 0 ? (
            <p className="text-gray-400 text-sm">No saved articles</p>
          ) : (
            savedArticles.map((article, index) => (
              <div
                key={index}
                className="p-3 bg-white/5 border border-white/10 rounded-lg"
              >
                <p className="text-sm text-white line-clamp-2">
                  {article.title}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Searches */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Recent Searches</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {recentSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => onSearch(search)} // ✅ CLICK WORKS
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full text-sm"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}