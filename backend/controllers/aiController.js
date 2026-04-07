import { summarizeText, analyzeSentiment } from "../services/aiService.js";

export const summarizeArticle = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const summary = await summarizeText(text);
    const sentiment = await analyzeSentiment(text);

    res.json({ summary, sentiment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI processing failed" });
  }
};