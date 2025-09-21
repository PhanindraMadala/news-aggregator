import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [step, setStep] = useState(1);

  // Fetch news from backend
  const fetchNews = async (topic) => {
    if (!topic) return;
    try {
      const res = await fetch(`http://127.0.0.1:5000/news?topic=${topic}`);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Topic change
  const handleTopicChange = (e) => {
    const topic = e.target.value;
    setSelectedTopic(topic);
    setShowAdd(false);
    setStep(1);
    setNewTitle("");
    setNewDesc("");
    fetchNews(topic);
  };

  // Add news step
  const handleAddClick = () => {
    if (!selectedTopic) return alert("Select a topic first");
    setShowAdd(true);
    setStep(1);
    setNewTitle("");
    setNewDesc("");
  };

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return alert("Enter a title");
    setStep(2);
  };

  const handleDescSubmit = async (e) => {
    e.preventDefault();
    if (!newDesc.trim()) return alert("Enter description");

    const newsItem = {
      title: newTitle,
      description: newDesc,
      topic: selectedTopic,
    };

    try {
      await fetch("http://127.0.0.1:5000/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsItem),
      });
      fetchNews(selectedTopic);
      setShowAdd(false);
      setStep(1);
      setNewTitle("");
      setNewDesc("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Latest News</h1>

      <label htmlFor="topic">Select Topic:</label>
      <select id="topic" value={selectedTopic} onChange={handleTopicChange}>
        <option value="">--Select Topic--</option>
        <option value="General">General</option>
        <option value="Business">Business</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Health">Health</option>
        <option value="Science">Science</option>
        <option value="Sports">Sports</option>
        <option value="Technology">Technology</option>
        <option value="International">International</option>
      </select>

      <button onClick={handleAddClick} disabled={!selectedTopic}>
        Add News
      </button>

      {showAdd && step === 1 && (
        <form onSubmit={handleTitleSubmit} className="add-form">
          <input
            type="text"
            placeholder="Enter Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit">Next</button>
        </form>
      )}

      {showAdd && step === 2 && (
        <form onSubmit={handleDescSubmit} className="add-form">
          <textarea
            placeholder="Enter Description"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            rows="3"
          />
          <button type="submit">Submit News</button>
        </form>
      )}

      <div className="news-container">
        {articles.length === 0 && <p>No news found.</p>}
        {articles.map((article, i) => (
          <div className="news-card" key={i}>
            <h2>{article.title}</h2>
            <span
              className={`label ${
                article.url && article.url !== "#" ? "live" : "added"
              }`}
            >
              {article.url && article.url !== "#" ? "Live" : "Added"}
            </span>
            <p>{article.description || article.content}</p>
            {article.url && (
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
