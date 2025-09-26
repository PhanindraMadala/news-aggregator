from flask import Flask, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

NEWS_API_KEY = os.getenv("NEWS_API_KEY", "your_api_key_here")

@app.route("/api/news/<topic>", methods=["GET"])
def get_news(topic):
    url = f"https://newsapi.org/v2/everything?q={topic}&apiKey={NEWS_API_KEY}"
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
