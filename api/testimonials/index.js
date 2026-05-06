import { getDb } from '../_lib/db.js';
import { testimonials } from '../../db/schema.js';
import { eq, and, asc } from 'drizzle-orm';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const db = getDb();
  const { featured } = req.query;

  let conditions = [eq(testimonials.is_active, 1)];
  if (featured === '1') {
    conditions.push(eq(testimonials.is_featured, 1));
  }

  const rows = await db
    .select()
    .from(testimonials)
    .where(and(...conditions))
    .orderBy(asc(testimonials.sort_order));

  res.status(200).json(rows);
}
