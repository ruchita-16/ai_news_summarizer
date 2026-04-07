const BASE_URL = "http://localhost:5000";

export const fetchNews = async (query) => {
  const safeQuery = String(query || "india").trim() || "india";
  const response = await fetch(`${BASE_URL}/news?query=${encodeURIComponent(safeQuery)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const summarizeArticle = async (text) => {
  const response = await fetch(`${BASE_URL}/ai/summarize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to summarize article");
  }

  return response.json();
};
