import { getDb } from '../_lib/db.js';
import { products } from '../../db/schema.js';
import { eq, and, asc } from 'drizzle-orm';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const db = getDb();
  const { category } = req.query;

  let conditions = [eq(products.is_active, 1)];
  if (category) {
    conditions.push(eq(products.category, category));
  }

  const rows = await db
    .select()
    .from(products)
    .where(and(...conditions))
    .orderBy(asc(products.sort_order));

  res.status(200).json(rows);
}
