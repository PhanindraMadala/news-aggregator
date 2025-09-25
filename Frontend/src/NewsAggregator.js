import React, { useState } from 'react';
import './NewsAggregator.css';

function NewsAggregator() {
  const [topic, setTopic] = useState('');
  const [news, setNews] = useState([]);
  const [selected, setSelected] = useState(false);

  const topics = ['Technology', 'Sports', 'Business', 'Entertainment', 'Health'];

  const fetchNews = async () => {
    if (!topic) return;
    try {
      const response = await fetch(`http://localhost:8080/api/news/${topic}`);
      const data = await response.json();
      setNews(data.articles || []);
      setSelected(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="news-container">
      {!selected ? (
        <div className="topic-selector">
          <h1>Select a Topic</h1>
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">--Choose a topic--</option>
            {topics.map((t) => (
              <option key={t} value={t.toLowerCase()}>{t}</option>
            ))}
          </select>
          <button onClick={fetchNews} disabled={!topic}>Get News</button>
        </div>
      ) : (
        <div className="news-list">
          <button onClick={() => setSelected(false)}>Back</button>
          {news.length === 0 && <p>No news found for "{topic}"</p>}
          {news.map((article, idx) => (
            <div key={idx} className="news-card">
              {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsAggregator;
