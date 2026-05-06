import { getDb } from '../_lib/db.js';
import { retreats } from '../../db/schema.js';
import { eq, asc } from 'drizzle-orm';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const db = getDb();
  const rows = await db
    .select()
    .from(retreats)
    .where(eq(retreats.is_active, 1))
    .orderBy(asc(retreats.sort_order));

  res.status(200).json(rows);
}
