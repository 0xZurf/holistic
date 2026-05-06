import { getDb } from './_lib/db.js';
import { site_settings } from '../db/schema.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const db = getDb();
  const rows = await db.select().from(site_settings);

  const settings = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }

  res.status(200).json(settings);
}
