import { verifySession } from '../_lib/auth.js';
import { getDb } from '../_lib/db.js';
import { syncStripeProduct } from '../_lib/stripe.js';
import { retreats } from '../../db/schema.js';
import { eq, asc } from 'drizzle-orm';
import { ulid } from 'ulid';

export default async function handler(req, res) {
  if (!verifySession(req)) return res.status(401).json({ error: 'Unauthorized' });

  const db = getDb();
  const { id } = req.query;

  if (id) {
    if (req.method === 'PUT') {
      const now = new Date().toISOString();
      const update = { ...req.body, updated_at: now };
      if (update.gallery && typeof update.gallery !== 'string') update.gallery = JSON.stringify(update.gallery);

      try {
        const [existing] = await db.select().from(retreats).where(eq(retreats.id, id));
        if (existing && process.env.STRIPE_SECRET_KEY) {
          const merged = { ...existing, ...update };
          update.stripe_price_id = await syncStripeProduct(merged, 'retreat');
        }
      } catch (e) {
        console.error('Stripe sync error:', e.message);
      }

      await db.update(retreats).set(update).where(eq(retreats.id, id));
      return res.status(200).json({ success: true });
    }
    if (req.method === 'DELETE') {
      await db.delete(retreats).where(eq(retreats.id, id));
      return res.status(200).json({ success: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'GET') {
    const rows = await db.select().from(retreats).orderBy(asc(retreats.sort_order));
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    const now = new Date().toISOString();
    const data = {
      id: ulid(), ...req.body,
      gallery: typeof req.body.gallery === 'string' ? req.body.gallery : JSON.stringify(req.body.gallery || []),
      created_at: now, updated_at: now,
    };

    try {
      if (process.env.STRIPE_SECRET_KEY) {
        data.stripe_price_id = await syncStripeProduct(data, 'retreat');
      }
    } catch (e) {
      console.error('Stripe sync error:', e.message);
    }

    await db.insert(retreats).values(data);
    return res.status(201).json(data);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
