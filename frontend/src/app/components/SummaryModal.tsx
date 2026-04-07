import { X, Copy, Bookmark, Check } from 'lucide-react';
import { useState } from 'react';
import type { NewsArticle } from './NewsCard';

interface SummaryModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export function SummaryModal({ article, onClose }: SummaryModalProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!article) return null;

  // ✅ COPY FIX
  const handleCopy = () => {
    navigator.clipboard.writeText(article.summary || article.description || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ SAVE FIX (localStorage)
  const handleSave = () => {
    const savedArticles = JSON.parse(localStorage.getItem("savedArticles") || "[]");

    const exists = savedArticles.find((a: NewsArticle) => a.id === article.id);

    if (!exists) {
      localStorage.setItem("savedArticles", JSON.stringify([...savedArticles, article]));
      setSaved(true);
    } else {
      setSaved(true);
    }

    setTimeout(() => setSaved(false), 2000);
  };

  // ✅ DYNAMIC KEY POINTS (NO MORE SAME POINTS)
  const keyPoints = (article.summary || article.description || "")
    .split('.')
    .map(s => s.trim())
    .filter(s => s.length > 20)
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-auto bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] border border-white/10 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-white/10">
            <div className="flex-1 pr-4">
              <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300 mb-3">
                AI Summary
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{article.title}</h2>
              <p className="text-gray-400 text-sm">{article.category}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Summary</h3>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-gray-300 leading-relaxed">
                  {article.summary || article.description}
                </p>
              </div>
            </div>

            {/* Key Points */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Key Points</h3>
              <div className="space-y-3">
                {keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Summary"}
              </button>

              <button
                onClick={handleSave}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white flex items-center justify-center gap-2"
              >
                {saved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                {saved ? "Saved!" : "Save Article"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}