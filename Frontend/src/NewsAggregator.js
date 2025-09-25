const fetchNews = async (selectedTopic) => {
  setLoading(true);
  try {
    // Docker Compose lo backend service name use cheyyali
    const response = await fetch(`http://backend:8080/api/news/${selectedTopic}`);
    const data = await response.json();
    setNews(data.articles || []);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
  setLoading(false);
};
