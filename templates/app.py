from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

app = Flask(__name__, template_folder='news-aggregator/templates')
CORS(app)  # allow React frontend to fetch

# In-memory news list
articles = [
    {"title": "News 1", "description": "Description 1", "topic": "General"},
    {"title": "News 2", "description": "Description 2", "topic": "General"}
]

@app.route('/')
def home():
    return render_template('news_aggregator.html')

@app.route('/news', methods=['GET'])
def get_news():
    return jsonify({"articles": articles})

@app.route('/news', methods=['POST'])
def add_news():
    data = request.get_json()
    articles.insert(0, data)  # add new news at top
    return jsonify(data), 201

if __name__ == '__main__':
    app.run(debug=True)
