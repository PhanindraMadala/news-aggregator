import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/news")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="App"><h2>Loading news...</h2></div>;
  }

  if (error) {
    return <div className="App"><h2>{error}</h2></div>;
  }

  return (
    <div className="App">
      <h1>Latest News</h1>
      <div className="news-container">
        {articles.map((article, index) => (
          <div key={index} className="news-card">
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
