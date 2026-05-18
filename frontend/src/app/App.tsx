import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NewsCard, NewsArticle } from './components/NewsCard';
import { SummaryModal } from './components/SummaryModal';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { toast, Toaster } from 'sonner';
import { fetchNews, summarizeArticle } from '../api/news';

const FALLBACK_IMAGE = 'https://placehold.co/640x360/151522/e9d5ff?text=NewsAI';
const CATEGORY_QUERY_MAP: Record<string, string> = {
  All: 'india',
  Tech: 'technology',
  Business: 'business',
  Sports: 'sports',
  AI: 'artificial intelligence',
  World: 'world news',
};

const normalizeArticles = (items: any[]): NewsArticle[] => {
  const seen = new Set<string>();

  return items
    .map((item: any, index: number) => {
      const title = String(item.title || '').trim();
      const url = String(item.url || '').trim();
      const id = url || `${title}-${index}`;

      return {
        id,
        title: title || 'Untitled article',
        description: String(item.description || 'No description available').trim(),
        image: String(item.image || item.urlToImage || FALLBACK_IMAGE).trim() || FALLBACK_IMAGE,
        category: String(item.category || 'World').trim() || 'World',
        source: String(item.source || item.source?.name || 'General').trim() || 'General',
        sentiment: 'neutral' as const,
        summary: String(item.summary || '').trim(),
        url,
      };
    })
    .filter((item) => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState('india');
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    handleSearch('india', 'All');
  }, []);

  const filteredArticles = articles;

  const handleSummarize = async (article: NewsArticle) => {
    setIsLoading(true);
    const toastId = toast.loading('Generating AI summary...');

    try {
      const data = await summarizeArticle(`${article.title}. ${article.description}. ${article.summary || ''}`);
      const updatedArticle = {
        ...article,
        summary: data.summary || 'No summary available',
        sentiment: data.sentiment || 'neutral',
      } as NewsArticle;

      setArticles((prev) => prev.map((item) => (item.id === article.id ? updatedArticle : item)));
      setSelectedArticle(updatedArticle);
      toast.success('AI Summary ready!', { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error('Failed to summarize', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveArticle = (article: NewsArticle) => {
    const prev: NewsArticle[] = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    const updated = [article, ...prev.filter((a) => a.id !== article.id)].slice(0, 20);

    localStorage.setItem('savedArticles', JSON.stringify(updated));
    window.dispatchEvent(new Event('savedArticlesUpdated'));
    toast.success('Article saved!');
  };

  const performFetch = async (query: string, category: string) => {
    const safeQuery = query.trim() || CATEGORY_QUERY_MAP[category] || 'india';
    setActiveQuery(safeQuery);
    setActiveCategory(category);
    setIsLoading(true);

    const prevSearches: string[] = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const updatedSearches = [safeQuery, ...prevSearches.filter((item) => item !== safeQuery)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    window.dispatchEvent(new Event('savedArticlesUpdated'));

    try {
      const data = await fetchNews(safeQuery);
      const formatted = normalizeArticles(data);
      setArticles(formatted);

      if (formatted.length === 0) {
        toast.warning('No news found');
      } else {
        toast.success(`Fetched ${formatted.length} articles`);
      }
    } catch (error) {
      console.error(error);
      setArticles([]);
      toast.error('Failed to fetch news');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string, category: string = 'All') => {
    await performFetch(query, category);
  };

  const handleCategoryChange = async (category: string) => {
    const query = category === 'All' ? activeQuery || 'india' : CATEGORY_QUERY_MAP[category] || category;
    await performFetch(query, category);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Toaster position="top-right" theme="dark" />

      <Navbar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      <Hero onSearch={(query) => handleSearch(query, 'All')} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {activeCategory === 'All' ? 'Latest News' : `${activeCategory} News`}
                </h2>
                <p className="text-gray-400">
                  {filteredArticles.length} articles found for "{activeQuery}"
                </p>
              </div>
            </div>

            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <NewsCard key={article.id} article={article} onSummarize={handleSummarize} onSave={handleSaveArticle} />
                ))}
              </div>
            )}

            {filteredArticles.length === 0 && !isLoading && (
              <div className="text-center py-20">
                <span className="text-4xl">News</span>
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-gray-400">Try another category or search term.</p>
              </div>
            )}
          </div>

          <div className="hidden xl:block">
            <Sidebar onSearch={(query) => handleSearch(query, 'All')} />
          </div>
        </div>
      </main>

      <Footer />
      <SummaryModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
}
