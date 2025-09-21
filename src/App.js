import React, { useEffect, useState } from "react";
import './App.css'; // import your CSS

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/news") // your Flask API endpoint
      .then(response => response.json())
      .then(data => setArticles(data.articles || []));
  }, []);

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
