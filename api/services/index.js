import { getDb } from '../_lib/db.js';
import { services } from '../../db/schema.js';
import { eq, asc } from 'drizzle-orm';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const db = getDb();
  const rows = await db
    .select()
    .from(services)
    .where(eq(services.is_active, 1))
    .orderBy(asc(services.sort_order));

  res.status(200).json(rows);
}
