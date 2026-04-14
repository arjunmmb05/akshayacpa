from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

app = Flask(__name__)
CORS(app)

# MongoDB Setup
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGODB_URI)
db = client["akshaya_db"]
content_collection = db["website_content"]

DEFAULT_DATA = {
    "hero": {
        "title": "Akshaya e Centre Chandappura",
        "subtitle": "Experience the next generation of e-Governance. We simplify bureaucracy for you.",
        "ctaText": "Explore 100+ Services"
    },
    "notifications": ["Aadhaar enrollment starts at 10 AM daily.", "New Passport Seva appointments available."],
    "services": [
        {"title": "Aadhaar Services", "description": "Enrollment and Corrections.", "icon": "shield", "documents": ["Birth Certificate", "Address Proof"]},
        {"title": "Passport Seva", "description": "New applications and renewals.", "icon": "globe", "documents": ["SSLC Certificate", "Address Proof"]}
    ],
    "posts": [],
    "gallery": [],
    "reviews": [],
    "contact": {
        "address": "Chandappura, Pilathara - Mathamangalam Road, Kerala 670504",
        "phone": "+91 85478 02350",
        "email": "akshayakn984@gmail.com",
        "hours": "Mon - Sat: 9:30 AM - 6:00 PM"
    }
}

@app.route('/api/content', methods=['GET'])
def get_content():
    try:
        content = content_collection.find_one({"_id": "site_data"})
        if not content:
            return jsonify(DEFAULT_DATA)
        content.pop('_id', None)
        return jsonify(content)
    except Exception as e:
        print("Database error:", e)
        # Force fallback to DEFAULT_DATA if MongoDB is offline or blocked
        return jsonify(DEFAULT_DATA)

@app.route('/api/content', methods=['POST'])
def update_content():
    try:
        new_data = request.json
        content_collection.replace_one({"_id": "site_data"}, new_data, upsert=True)
        return jsonify({"message": "Content updated successfully!"}), 200
    except Exception as e:
        error_msg = f"{type(e).__name__}: {str(e)}"
        return jsonify({"error": error_msg}), 500

@app.route('/api/reviews', methods=['POST'])
def add_review():
    try:
        review = request.json
        content_collection.update_one(
            {"_id": "site_data"},
            {"$push": {"reviews": review}}
        )
        return jsonify({"message": "Review added successfully!"}), 200
    except Exception as e:
        return jsonify({"error": "Failed to save review to database."}), 500

@app.route('/api/send-email', methods=['POST'])
def send_email():
    # TEMPORARILY DISABLED SMTP: Saving directly to Database
    try:
        inquiry = request.json
        inquiry['date'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        content_collection.update_one(
            {"_id": "site_data"},
            {"$push": {"inquiries": inquiry}}
        )
        return jsonify({"message": "Inquiry saved to Admin Panel!"}), 200
    except Exception as e:
        return jsonify({"error": "Failed to save inquiry to database."}), 500

# Required by Vercel Serverless
def handler(event, context):
    return app(event, context)
