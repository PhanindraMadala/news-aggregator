from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import feedparser

app = Flask(__name__, template_folder='templates')
CORS(app)

# In-memory news list
articles = []

# RSS feed URLs
RSS_FEEDS = {
    "General": "https://www.ndtv.com/rss/ndtvnews-top-stories",
    "Business": "https://www.moneycontrol.com/rss/business.xml",
    "Entertainment": "https://www.hollywoodreporter.com/t/rss",
    "Health": "https://www.hindustantimes.com/health/rss.xml",
    "Science": "https://www.thehindu.com/sci-tech/science/feeder/default.rss",
    "Sports": "https://www.espn.com/espn/rss/news",
    "Technology": "https://www.gadgets360.com/rss",
    "International": "https://www.bbc.com/news/world/rss.xml"
}

def fetch_rss_news(url, topic_name):
    feed = feedparser.parse(url)
    articles_list = []
    for entry in feed.entries[:10]:
        articles_list.append({
            "title": entry.title,
            "description": getattr(entry, "summary", "No Description"),
            "url": entry.link,
            "topic": topic_name
        })
    return articles_list

@app.route('/')
def home():
    return render_template('news_aggregator.html')

@app.route('/news', methods=['GET'])
def get_news():
    topic = request.args.get('topic', 'General').capitalize()
    # Added news for this topic
    filtered_articles = [a for a in articles if a['topic'] == topic]
    # Live news from RSS
    rss_url = RSS_FEEDS.get(topic, RSS_FEEDS["General"])
    live_news = fetch_rss_news(rss_url, topic)
    combined_news = filtered_articles + live_news
    return jsonify({"articles": combined_news})

@app.route('/news', methods=['POST'])
def add_news():
    data = request.get_json()
    new_article = {
        "title": data.get("title", "No Title"),
        "description": data.get("description", "No Description"),
        "topic": data.get("topic", "General").capitalize(),
        "url": "#"  # no link for added news
    }
    articles.insert(0, new_article)
    return jsonify(new_article), 201

if __name__ == '__main__':
    app.run(debug=True)
