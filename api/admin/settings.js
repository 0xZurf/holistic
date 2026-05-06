import { verifySession } from '../_lib/auth.js';
import { getDb } from '../_lib/db.js';
import { site_settings } from '../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ error: 'Method not allowed' });
  if (!verifySession(req)) return res.status(401).json({ error: 'Unauthorized' });

  const db = getDb();
  const settings = req.body;
  const now = new Date().toISOString();

  for (const [key, value] of Object.entries(settings)) {
    await db
      .insert(site_settings)
      .values({ key, value, updated_at: now })
      .onConflictDoUpdate({ target: site_settings.key, set: { value, updated_at: now } });
  }

  res.status(200).json({ success: true });
}
