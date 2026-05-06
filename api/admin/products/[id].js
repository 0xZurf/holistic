import { verifySession } from '../../_lib/auth.js';
import { getDb } from '../../_lib/db.js';
import { products } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  if (!verifySession(req)) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.query;
  const db = getDb();

  if (req.method === 'PUT') {
    const now = new Date().toISOString();
    const update = { ...req.body, updated_at: now };
    if (update.gallery && typeof update.gallery !== 'string') {
      update.gallery = JSON.stringify(update.gallery);
    }
    await db.update(products).set(update).where(eq(products.id, id));
    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    await db.delete(products).where(eq(products.id, id));
    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
