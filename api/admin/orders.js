import { verifySession } from '../_lib/auth.js';
import { getDb } from '../_lib/db.js';
import { orders } from '../../db/schema.js';
import { eq, desc } from 'drizzle-orm';

export default async function handler(req, res) {
  if (!verifySession(req)) return res.status(401).json({ error: 'Unauthorized' });

  const db = getDb();
  const { id, status } = req.query;

  if (id) {
    if (req.method === 'GET') {
      const [row] = await db.select().from(orders).where(eq(orders.id, id));
      if (!row) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(row);
    }
    if (req.method === 'PUT') {
      const now = new Date().toISOString();
      await db.update(orders).set({ ...req.body, updated_at: now }).where(eq(orders.id, id));
      return res.status(200).json({ success: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'GET') {
    let query = db.select().from(orders).orderBy(desc(orders.created_at));
    if (status) {
      query = db.select().from(orders).where(eq(orders.status, status)).orderBy(desc(orders.created_at));
    }
    const rows = await query;
    return res.status(200).json(rows);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
