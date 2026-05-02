# 📰 AI News Summarizer

An intelligent full-stack web application that fetches real-time news and uses AI to generate concise summaries and sentiment analysis, helping users quickly understand current events.

---

## 🌐 Live Demo

🔗 Frontend (Vercel): https://shortifynewsai.vercel.app/  
🔗 Backend (Render): https://ai-news-summarizer-fe0f.onrender.com

---

## 🚀 Features

- 📰 Fetch latest news from external APIs  
- 🤖 AI-powered news summarization  
- 😊 Sentiment analysis (Positive / Negative / Neutral)  
- 📂 Category-based filtering  
- 🔖 Save articles for later reading  
- 📱 Fully responsive modern UI  

---

## 🛠️ Tech Stack

### 🎨 Frontend
- React.js  
- TypeScript  
- Tailwind CSS  
- ShadCN UI  

### ⚙️ Backend
- Node.js  
- Express.js  

### 🔗 APIs & AI
- News API  
- Hugging Face API  

---

## 📁 Project Structure

AI-News-Summarizer/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── index.html
│
└── README.md

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-news-summarizer.git
cd ai-news-summarizer
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside backend folder:

```
NEWS_API_KEY=your_news_api_key
HF_API_KEY=your_huggingface_api_key
PORT=5000
```

Run backend:

```bash
npm start
```

or

```bash
node server.js
```

Backend runs on: http://localhost:5000

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:3000

---

## 🧠 How It Works

1. User opens the application  
2. Frontend sends request to backend  
3. Backend fetches news from News API  
4. User clicks "Summarize"  
5. Backend sends content to Hugging Face API  
6. AI returns summary and sentiment  
7. Results are displayed on UI  

---

## 🚀 Deployment

### Frontend (Vercel)
- Deployed using Vercel  
- Connected with GitHub repository  
- Auto-deploy on every push  

### Backend (Render)
- Deployed using Render  
- Environment variables configured  
- Node.js server running  

---

## 🔮 Future Improvements

- 🔐 User Authentication  
- 📊 Advanced Analytics Dashboard  
- 🌍 Multi-language support  
- 🔖 Bookmark & History system  
- ⚡ Faster AI responses  

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository  
2. Create a new branch  
3. Make changes  
4. Submit a pull request  

---

## 👩‍💻 Author

Ruchita Rathod  
GitHub: https://github.com/ruchita-16  

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
