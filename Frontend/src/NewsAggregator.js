import React, { useState } from 'react';
import './NewsAggregator.css';

function NewsAggregator() {
  const [topic, setTopic] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const topics = ["technology", "sports", "business", "entertainment", "health", "science"];

  const fetchNews = async (selectedTopic) => {
    setLoading(true);
    try {
      const response = await fetch(`http://backend:8080/api/news/${selectedTopic}`);

      const data = await response.json();
      setNews(data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setLoading(false);
  };

  const handleTopicChange = (e) => {
    const selectedTopic = e.target.value;
    setTopic(selectedTopic);
    if (selectedTopic) fetchNews(selectedTopic);
  };

  return (
    <div className="container">
      <div className="selector">
        <h1>Select News Topic</h1>
        <select value={topic} onChange={handleTopicChange}>
          <option value="">--Choose a topic--</option>
          {topics.map((t) => (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
      </div>

      {loading && <p>Loading news...</p>}

      <div className="news-list">
        {news.map((article, index) => (
          <div key={index} className="news-item">
            <h3>{article.title}</h3>
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsAggregator;
