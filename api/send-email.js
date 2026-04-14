import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;

async function getDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db('akshaya_db').collection('website_content');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // SMTP disabled — saving inquiry directly to database
  try {
    const collection = await getDB();
    const inquiry = req.body;
    inquiry.date = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    await collection.updateOne(
      { _id: 'site_data' },
      { $push: { inquiries: inquiry } },
      { upsert: true }
    );

    return res.status(200).json({ message: 'Inquiry saved to Admin Panel!' });
  } catch (err) {
    console.error('DB Error:', err);
    return res.status(500).json({ error: `${err.constructor.name}: ${err.message}` });
  }
}
