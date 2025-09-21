import React, { useState, useEffect } from "react";
import "./NewsAggregator.css"; // <-- import your CSS here at the top

function NewsAggregator() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [articles, setArticles] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [step, setStep] = useState("title"); // "title" or "description"

  useEffect(() => {
    if (!selectedTopic) return;

    const fetchNews = async () => {
      try {
        const res = await fetch(`/news?topic=${selectedTopic.toLowerCase()}`);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };
    fetchNews();
  }, [selectedTopic]);

  const handleAddClick = () => {
    setShowAddForm(true);
    setStep("title");
    setTitleInput("");
    setDescInput("");
  };

  const handleTitleSubmit = (e) => {
    if (e.key === "Enter") {
      if (!titleInput.trim()) return alert("Enter a title");
      setStep("description");
    }
  };

  const handleDescriptionSubmit = async () => {
    if (!descInput.trim()) return alert("Enter a description");
    const newsItem = {
      title: titleInput,
      description: descInput,
      topic: selectedTopic,
      url: "#",
    };
    try {
      const res = await fetch("/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsItem),
      });
      const data = await res.json();
      setArticles([data, ...articles]);
      setShowAddForm(false);
      setTitleInput("");
      setDescInput("");
    } catch (err) {
      console.error("Error adding news:", err);
    }
  };

  return (
    <div className="container">
      <h1>Latest News</h1>

      <div className="topic-section">
        <label>Select Topic:</label>
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="">--Select Topic--</option>
          <option value="General">General (India)</option>
          <option value="Business">Business (India)</option>
          <option value="Entertainment">Entertainment (India)</option>
          <option value="Health">Health (India)</option>
          <option value="Science">Science (India)</option>
          <option value="Sports">Sports (India)</option>
          <option value="Technology">Technology (India)</option>
          <option value="International">International</option>
        </select>
      </div>

      {selectedTopic && (
        <button onClick={handleAddClick}>Add News</button>
      )}

      {showAddForm && (
        <div className="add-news-form">
          {step === "title" && (
            <input
              type="text"
              placeholder="Enter Title"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onKeyDown={handleTitleSubmit}
              autoFocus
            />
          )}
          {step === "description" && (
            <>
              <textarea
                rows="3"
                placeholder="Enter Description"
                value={descInput}
                onChange={(e) => setDescInput(e.target.value)}
                autoFocus
              />
              <button onClick={handleDescriptionSubmit}>Submit News</button>
            </>
          )}
        </div>
      )}

      <div className="news-container">
        {articles.length === 0 && selectedTopic && (
          <p>No news found.</p>
        )}
        {articles.map((article, idx) => (
          <div className="news-item" key={idx}>
            <div className="news-title">
              {article.title}{" "}
              <span
                className={`label ${
                  article.url && article.url !== "#" ? "live" : "added"
                }`}
              >
                {article.url && article.url !== "#" ? "Live" : "Added"}
              </span>
            </div>
            <div className="news-desc">{article.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsAggregator;
