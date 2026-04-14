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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const collection = await getDB();

    if (req.method === 'GET') {
      const doc = await collection.findOne({ _id: 'site_data' });
      if (!doc) {
        // Database is empty — return null so frontend uses its DEFAULT_DATA
        return res.status(200).json(null);
      }
      const { _id, ...data } = doc;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const newData = req.body;
      // Remove any fields that could cause MongoDB issues
      delete newData._id;
      await collection.replaceOne(
        { _id: 'site_data' },
        { _id: 'site_data', ...newData },
        { upsert: true }
      );
      return res.status(200).json({ message: 'Content updated successfully!' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('DB Error:', err);
    return res.status(500).json({ error: `${err.constructor.name}: ${err.message}` });
  }
}
