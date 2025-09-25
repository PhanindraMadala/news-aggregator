from flask import Flask, jsonify
import requests
import os

app = Flask(__name__)

NEWS_API_KEY = os.getenv("NEWS_API_KEY", "your_api_key_here")

@app.route("/api/news/<topic>", methods=["GET"])
def get_news(topic):
    url = f"https://newsapi.org/v2/top-headlines?country=us&category={topic}&apiKey={NEWS_API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())
    return jsonify({"error": "Failed to fetch news"}), 500

if __name__ == "__main__":
    # Run on 8080 so frontend matches
    app.run(host="0.0.0.0", port=8080)
