import { fetchNewsFromAPI } from "../services/newsService.js";

export const getNews = async (req, res) => {
  const { query } = req.query;

  try {
    const articles = await fetchNewsFromAPI(query);
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};