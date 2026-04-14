from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Setup
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGODB_URI)
db = client["akshaya_db"]
content_collection = db["website_content"]

# Updated initial data with Document Checklists
DEFAULT_DATA = {
    "hero": {
        "title": "Akshaya e Centre Chandappura",
        "subtitle": "Experience the next generation of e-Governance. We simplify bureaucracy for you.",
        "ctaText": "Explore 100+ Services"
    },
    "notifications": [
        "Aadhaar enrollment starts at 10 AM daily.",
        "Last date for KEAM application is approaching soon.",
        "New Passport Seva appointments available for next week."
    ],
    "services": [
        {
            "title": "Aadhaar Services", 
            "description": "Enrollment, Corrections, Bio-metric update & PVC Print.", 
            "icon": "shield",
            "documents": ["Birth Certificate / SSLC", "Address Proof", "Identity Proof (Voter ID/Passport/PAN)", "Mobile Number for OTP"]
        },
        {
            "title": "Passport Seva", 
            "description": "New passport, renewal, PCC, and appointment scheduling.", 
            "icon": "globe",
            "documents": ["SSLC Certificate (DOB)", "Address Proof (Aadhaar/Passbook)", "Self Declaration", "Old Passport (for renewal)"]
        },
        {
            "title": "PAN Card", 
            "description": "New PAN application, correction, and linking with Aadhaar.", 
            "icon": "credit-card",
            "documents": ["Aadhaar Card", "2 Passport Photos", "Identity Proof", "Address Proof"]
        },
        {
            "title": "E-District", 
            "description": "Income, Nativity, Community, Caste & Possession certificates.", 
            "icon": "file-text",
            "documents": ["Ration Card", "Aadhaar Card", "Election ID", "Land Tax Receipt (for specific certs)"]
        }
    ],
    "posts": [],
    "gallery": [],
    "reviews": [],
    "brands": [],
    "contact": {
        "address": "Chandappura, Pilathara - Mathamangalam Road, Kerala 670504",
        "phone": "+91 85478 02350",
        "email": "akshayakn984@gmail.com",
        "hours": "Mon - Sat: 9:30 AM - 6:00 PM"
    }
}

import os
import uuid
from werkzeug.utils import secure_filename
from flask import send_from_directory

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/api/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = secure_filename(file.filename)
        # Add uuid to prevent overwriting
        unique_filename = f"{uuid.uuid4().hex}_{filename}"
        file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
        file.save(file_path)
        
        # Return full URL or path
        url = request.host_url.rstrip('/') + f"/api/uploads/{unique_filename}"
        return jsonify({"url": url}), 200

@app.route('/api/content', methods=['GET'])
def get_content():
    content = content_collection.find_one({"_id": "site_data"})
    if not content:
        data = DEFAULT_DATA
    else:
        content.pop('_id', None)
        data = content

    current_time = datetime.now()
    one_week_ago = current_time - timedelta(days=7)
    
    if "posts" in data:
        valid_posts = [p for p in data["posts"] if datetime.fromisoformat(p.get("createdAt", current_time.isoformat())) >= one_week_ago]
        data["posts"] = valid_posts
        
    return jsonify(data)

@app.route('/api/content', methods=['POST'])
def update_content():
    new_data = request.json
    if "posts" in new_data:
        for post in new_data["posts"]:
            if "createdAt" not in post:
                post["createdAt"] = datetime.now().isoformat()
    content_collection.replace_one({"_id": "site_data"}, new_data, upsert=True)
    return jsonify({"message": "Content updated successfully!"}), 200

@app.route('/api/reviews', methods=['POST'])
def add_review():
    review = request.json
    content_collection.update_one(
        {"_id": "site_data"},
        {"$push": {"reviews": review}}
    )
    return jsonify({"message": "Review added successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
