import { verifySession } from '../../_lib/auth.js';
import { getDb } from '../../_lib/db.js';
import { services } from '../../../db/schema.js';
import { asc } from 'drizzle-orm';
import { ulid } from 'ulid';

export default async function handler(req, res) {
  if (!verifySession(req)) return res.status(401).json({ error: 'Unauthorized' });

  const db = getDb();

  if (req.method === 'GET') {
    const rows = await db.select().from(services).orderBy(asc(services.sort_order));
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    const now = new Date().toISOString();
    const data = { id: ulid(), ...req.body, created_at: now, updated_at: now };
    await db.insert(services).values(data);
    return res.status(201).json(data);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
