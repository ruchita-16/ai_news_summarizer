import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import newsRoutes from "./routes/newsRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

// ✅ DEBUG ENV (VERY IMPORTANT)
console.log("HF KEY:", process.env.HUGGINGFACE_API_KEY);

// ✅ MIDDLEWARE
app.use(cors({origin: "*"}));
app.use(express.json({ limit: "1mb" })); // prevent large payload crash

// ✅ ROUTES
app.use("/news", newsRoutes);
app.use("/ai", aiRoutes);

// ✅ HEALTH CHECK
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ GLOBAL ERROR HANDLER (IMPORTANT)
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    error: "Something went wrong on server",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});