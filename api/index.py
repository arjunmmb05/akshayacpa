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
    content = content_collection.find_one({"_id": "site_data"})
    if not content:
        # If DB is empty, return default data
        return jsonify(DEFAULT_DATA)
    content.pop('_id', None)
    return jsonify(content)

@app.route('/api/content', methods=['POST'])
def update_content():
    new_data = request.json
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

@app.route('/api/send-email', methods=['POST'])
def send_email():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")

    if not all([name, email, message, smtp_user, smtp_pass]):
        return jsonify({"error": "Missing Info"}), 400

    try:
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = "akshayakn984@gmail.com"
        msg['Subject'] = f"New Inquiry from {name}"
        msg.attach(MIMEText(f"From: {name} ({email})\n\n{message}", 'plain'))

        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)
        server.quit()
        return jsonify({"message": "Sent!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
