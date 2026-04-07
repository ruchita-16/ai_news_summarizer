import { ExternalLink, Sparkles } from 'lucide-react';
import { useState } from 'react';

const FALLBACK_IMAGE = 'https://placehold.co/640x360/151522/e9d5ff?text=NewsAI';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  summary?: string;
  url: string;
  source?: string;
}

interface NewsCardProps {
  article: NewsArticle;
  onSummarize: (article: NewsArticle) => void;
  onSave: (article: NewsArticle) => void;
}

export function NewsCard({ article, onSummarize, onSave }: NewsCardProps) {
  const [imageSrc, setImageSrc] = useState(article.image || FALLBACK_IMAGE);

  const sentimentConfig = {
    positive: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Positive' },
    negative: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Negative' },
    neutral: { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', label: 'Neutral' },
  };

  const sentiment = sentimentConfig[article.sentiment] || sentimentConfig.neutral;

  return (
    <div className="group relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-1">
      <button
        onClick={() => onSave(article)}
        className="absolute top-3 left-3 z-10 bg-black/60 hover:bg-black/80 text-white px-2 py-1 rounded text-xs"
      >
        Save
      </button>
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <img
          src={imageSrc}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImageSrc(FALLBACK_IMAGE)}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs border backdrop-blur-sm ${sentiment.color}`}>
            {sentiment.label}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 flex-wrap">
          <span className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300">
            {article.category}
          </span>
          {article.source && (
            <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
              {article.source}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-400 text-sm mb-6 line-clamp-3">
          {article.description || 'No description available'}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => onSummarize(article)}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Summarize
          </button>
          <button
            onClick={() => article.url && window.open(article.url, '_blank', 'noopener,noreferrer')}
            disabled={!article.url}
            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 text-sm font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ExternalLink className="w-4 h-4" />
            Read More
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 pointer-events-none transition-all duration-300"></div>
    </div>
  );
}
