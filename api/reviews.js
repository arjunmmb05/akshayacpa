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

  try {
    const collection = await getDB();
    const review = req.body;
    review.date = new Date().toISOString();

    await collection.updateOne(
      { _id: 'site_data' },
      { $push: { reviews: review } },
      { upsert: true }
    );

    return res.status(200).json({ message: 'Review added successfully!' });
  } catch (err) {
    console.error('DB Error:', err);
    return res.status(500).json({ error: `${err.constructor.name}: ${err.message}` });
  }
}
