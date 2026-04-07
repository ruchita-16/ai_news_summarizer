import axios from "axios";

const DEFAULT_IMAGE = "https://placehold.co/640x360/151522/e9d5ff?text=NewsAI";
const CATEGORY_RULES = [
  { name: "AI", keywords: ["ai", "artificial intelligence", "openai", "chatgpt", "machine learning", "llm", "robotics"] },
  { name: "Tech", keywords: ["tech", "technology", "software", "startup", "apple", "google", "microsoft", "meta", "nvidia"] },
  { name: "Business", keywords: ["business", "market", "finance", "economy", "stock", "trade", "profit", "company"] },
  { name: "Sports", keywords: ["sports", "cricket", "football", "soccer", "tennis", "ipl", "fifa", "olympics"] },
  { name: "World", keywords: ["world", "global", "india", "china", "iran", "europe", "asia", "war", "diplomacy"] },
];

const normalizeText = (value = "") => value.toLowerCase().replace(/\s+/g, " ").trim();

const deriveCategory = (article, query = "") => {
  const haystack = normalizeText(
    `${article.title || ""} ${article.description || ""} ${article.content || ""} ${article.source?.name || ""} ${query}`
  );

  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((keyword) => haystack.includes(keyword))) {
      return rule.name;
    }
  }

  return "World";
};

export const fetchNewsFromAPI = async (query = "india") => {
  try {
    const API_KEY = process.env.NEWS_API_KEY;
    const safeQuery = String(query || "india").trim() || "india";

    if (!API_KEY) {
      throw new Error("NEWS_API_KEY is missing");
    }

    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: safeQuery,
        apiKey: API_KEY,
        pageSize: 30,
        sortBy: "publishedAt",
        searchIn: "title,description",
      },
      timeout: 15000,
    });

    const uniqueArticles = new Map();

    for (const article of response.data?.articles || []) {
      const title = article?.title?.trim();
      const url = article?.url?.trim();
      if (!title || !url || title.toLowerCase().includes("[removed]")) {
        continue;
      }

      const key = url || title.toLowerCase();
      if (uniqueArticles.has(key)) {
        continue;
      }

      uniqueArticles.set(key, {
        title,
        description: article.description?.trim() || "No description available.",
        content: article.content?.trim() || article.description?.trim() || title,
        image: article.urlToImage || DEFAULT_IMAGE,
        url,
        source: article.source?.name || "General",
        category: deriveCategory(article, safeQuery),
        publishedAt: article.publishedAt || null,
      });
    }

    return Array.from(uniqueArticles.values());
  } catch (error) {
    console.error("Failed to fetch news from NewsAPI:", error.response?.data || error.message);
    throw new Error("Failed to fetch news");
  }
};
