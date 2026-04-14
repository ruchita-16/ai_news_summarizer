📰 AI News Summarizer
An intelligent full-stack web application that fetches real-time news and uses AI to generate concise summaries and sentiment analysis, helping users quickly understand current events.

🚀 Features
Fetch latest news from external APIs
AI-powered news summarization
Sentiment analysis (Positive / Negative / Neutral)
Category-based filtering
Save articles for later reading
Responsive and modern UI
🛠️ Tech Stack

Frontend
React.js
TypeScript
Tailwind CSS / ShadCN UI

Backend
Node.js
Express.js

APIs & AI
News API
Hugging Face API

📁 Project Structure
AI News Summarizer/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── services/
│ ├── config/
│ └── server.js
│
├── frontend/
│ ├── src/
│ ├── components/
│ └── index.html
│
└── README.md

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/YOUR_USERNAME/ai-news-summarizer.git

cd ai-news-summarizer

2. Setup Backend
cd backend
npm install

Create a .env file inside backend:
NEWS_API_KEY=your_news_api_key
HF_API_KEY=your_huggingface_api_key
PORT=5000

Run backend:
npm start 
node server.js

3. Setup Frontend
cd frontend
npm install
npm run dev

🌐 Usage
Open browser at: http://localhost:3000

Browse latest news
Click Summarize to generate AI summary
View sentiment analysis
🚀 Future Improvements
User authentication
Advanced analytics dashboard
Multi-language support
Bookmark/history system
Faster AI response

🤝 Contributing
Contributions are welcome!
Feel free to fork this repo and submit a pull request.

👩‍💻 Author
Ruchita Rathod
GitHub: https://github.com/ruchita-16
