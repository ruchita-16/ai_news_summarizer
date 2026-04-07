import express from "express";
import { summarizeArticle } from "../controllers/aiController.js";

const router = express.Router();

// ✅ ADD TRY-CATCH WRAPPER (SAFE ROUTE)
router.post("/summarize", async (req, res) => {
  try {
    await summarizeArticle(req, res);
  } catch (error) {
    console.error("ROUTE ERROR:", error);
    res.status(500).json({
      summary: "Failed to generate summary",
      sentiment: "neutral",
    });
  }
});

export default router;