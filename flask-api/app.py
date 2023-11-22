from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Connect to MongoDB (make sure MongoDB is running)
client = MongoClient('mongodb://root:password@mongodb:27017/')
db = client['network_speed']
collection = db['speed_results']

@app.route('/api/results', methods=['GET'])
def get_speed_results():
    results = list(collection.find({}, {'_id': 0}))
    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
