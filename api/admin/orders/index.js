import { verifySession } from '../../_lib/auth.js';
import { getDb } from '../../_lib/db.js';
import { orders } from '../../../db/schema.js';
import { eq, desc } from 'drizzle-orm';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!verifySession(req)) return res.status(401).json({ error: 'Unauthorized' });

  const db = getDb();
  const { status } = req.query;

  let query = db.select().from(orders).orderBy(desc(orders.created_at));
  if (status) {
    query = db.select().from(orders).where(eq(orders.status, status)).orderBy(desc(orders.created_at));
  }

  const rows = await query;
  res.status(200).json(rows);
}
