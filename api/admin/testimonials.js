import { verifySession } from '../_lib/auth.js';
import { getDb } from '../_lib/db.js';
import { testimonials } from '../../db/schema.js';
import { eq, asc } from 'drizzle-orm';
import { ulid } from 'ulid';

export default async function handler(req, res) {
  if (!verifySession(req)) return res.status(401).json({ error: 'Unauthorized' });

  const db = getDb();
  const { id } = req.query;

  if (id) {
    if (req.method === 'PUT') {
      const now = new Date().toISOString();
      await db.update(testimonials).set({ ...req.body, updated_at: now }).where(eq(testimonials.id, id));
      return res.status(200).json({ success: true });
    }
    if (req.method === 'DELETE') {
      await db.delete(testimonials).where(eq(testimonials.id, id));
      return res.status(200).json({ success: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'GET') {
    const rows = await db.select().from(testimonials).orderBy(asc(testimonials.sort_order));
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    const now = new Date().toISOString();
    const data = { id: ulid(), ...req.body, created_at: now, updated_at: now };
    await db.insert(testimonials).values(data);
    return res.status(201).json(data);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
