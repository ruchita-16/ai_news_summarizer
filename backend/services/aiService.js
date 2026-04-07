import fetch from "node-fetch";

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

const cleanText = (text) => {
  if (!text) return "";
  return text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
};

const fallbackSummary = (text) => {
  const sentences = text.split(". ");
  return sentences.slice(0, 2).join(". ") + ".";
};

export const summarizeText = async (text) => {
  try {
    const cleaned = cleanText(text);

    if (!cleaned || cleaned.length < 50) {
      return "Not enough content to summarize.";
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: cleaned,
        }),
      }
    );

    const data = await response.json();

    console.log("HF RESPONSE:", data);

    if (data?.error) {
      console.log("HF ERROR:", data.error);
      return fallbackSummary(cleaned);
    }

    if (Array.isArray(data) && data[0]?.summary_text) {
      return cleanText(data[0].summary_text);
    }

    return fallbackSummary(cleaned);

  } catch (err) {
    console.error("HF CRASH:", err);
    return fallbackSummary(text);
  }
};

// ✅ SENTIMENT (KEEP YOUR VERSION)
export const analyzeSentiment = async (text) => {
  const lower = text.toLowerCase();

  if (
    lower.includes("growth") ||
    lower.includes("success") ||
    lower.includes("profit") ||
    lower.includes("win")
  ) {
    return "positive";
  }

  if (
    lower.includes("loss") ||
    lower.includes("crisis") ||
    lower.includes("fail") ||
    lower.includes("decline")
  ) {
    return "negative";
  }

  return "neutral";
};