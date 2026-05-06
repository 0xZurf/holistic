import { getDb } from '../_lib/db.js';
import { products } from '../../db/schema.js';
import { eq, and } from 'drizzle-orm';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { slug } = req.query;
  const db = getDb();

  const [row] = await db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.is_active, 1)));

  if (!row) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(row);
}
