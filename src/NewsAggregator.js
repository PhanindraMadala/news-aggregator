import React, { useState, useEffect } from "react";
import "./NewsAggregator.css";

function NewsAggregator() {
  const [articles, setArticles] = useState([]);
  const [topic, setTopic] = useState("");
  const [addingTitle, setAddingTitle] = useState("");
  const [addingDesc, setAddingDesc] = useState("");
  const [showDescInput, setShowDescInput] = useState(false);

  // Fetch news from Flask backend + NewsAPI
  const fetchNews = async (selectedTopic) => {
    if(!selectedTopic) return;
    try {
      const res = await fetch(`http://127.0.0.1:5000/news?topic=${selectedTopic}`);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch(err) {
      console.error("Error fetching news:", err);
    }
  };

  // Handle topic change
  const handleTopicChange = (e) => {
    const selected = e.target.value;
    setTopic(selected);
    fetchNews(selected);
    setShowDescInput(false);
    setAddingTitle("");
    setAddingDesc("");
  };

  // Two-step add news
  const startAddNews = () => {
    if(!topic) return alert("Select a topic first!");
    setShowDescInput(false);
    setAddingTitle("");
    setAddingDesc("");
  };

  const submitTitle = (e) => {
    if(e.key === "Enter"){
      if(!addingTitle.trim()) return alert("Enter a title!");
      setShowDescInput(true);
    }
  };

  const submitNews = async () => {
    if(!addingDesc.trim()) return alert("Enter description!");
    const newArticle = { title: addingTitle, description: addingDesc, topic };
    try {
      await fetch("http://127.0.0.1:5000/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArticle)
      });
      setAddingTitle("");
      setAddingDesc("");
      setShowDescInput(false);
      fetchNews(topic);
    } catch(err){
      console.error(err);
    }
  };

  return (
    <div className="news-wrapper">
      <h1>Latest News</h1>
      <div>
        <label>Select Topic: </label>
        <select value={topic} onChange={handleTopicChange}>
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
        <button onClick={startAddNews}>Add News</button>
      </div>

      {addingTitle !== null && !showDescInput && addingTitle !== "" && (
        <input
          type="text"
          placeholder="Enter Title and press Enter"
          value={addingTitle}
          onChange={(e)=>setAddingTitle(e.target.value)}
          onKeyDown={submitTitle}
        />
      )}

      {showDescInput && (
        <div className="add-form">
          <textarea
            rows="3"
            placeholder="Enter Description"
            value={addingDesc}
            onChange={(e)=>setAddingDesc(e.target.value)}
          />
          <button onClick={submitNews}>Submit News</button>
        </div>
      )}

      <div className="news-container">
        {articles.map((article, i) => (
          <div className="news-card" key={i}>
            <h2>{article.title} <span className={`label ${article.url && article.url!=="#"? "live":"added"}`}>{article.url && article.url!=="#"? "Live":"Added"}</span></h2>
            <p>{article.description}</p>
            {article.url && article.url!=="#" && <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsAggregator;
