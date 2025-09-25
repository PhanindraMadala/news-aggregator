import React, { useState } from 'react';
import './NewsAggregator.css';

function App() {
  const [topic, setTopic] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/news/${topic}`);
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="selector-container">
        <h1>Select a News Topic</h1>
        <input
          type="text"
          placeholder="Enter topic e.g. Technology"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button onClick={fetchNews}>Fetch News</button>
      </div>

      {loading && <p className="loading">Loading...</p>}

      <div className="articles-container">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            {article.urlToImage && (
              <img src={article.urlToImage} alt="news" />
            )}
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
