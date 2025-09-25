import React, { useState, useEffect } from 'react';

function App() {
  const [topic, setTopic] = useState('technology'); // default topic
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/news/${topic}`) // backend URL
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles || []); // NewsAPI returns { articles: [...] }
      })
      .catch(err => console.error(err));
  }, [topic]);

  return (
    <div>
      <h1>News Aggregator App</h1>

      <select value={topic} onChange={e => setTopic(e.target.value)}>
        <option value="technology">Technology</option>
        <option value="sports">Sports</option>
        <option value="business">Business</option>
        <option value="health">Health</option>
        <option value="entertainment">Entertainment</option>
      </select>

      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
