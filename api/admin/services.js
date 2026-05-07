import { verifySession } from '../_lib/auth.js';
import { getDb } from '../_lib/db.js';
import { syncStripeProduct } from '../_lib/stripe.js';
import { services } from '../../db/schema.js';
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

      try {
        const [existing] = await db.select().from(services).where(eq(services.id, id));
        if (existing && process.env.STRIPE_SECRET_KEY) {
          const merged = { ...existing, ...update };
          update.stripe_price_id = await syncStripeProduct(merged, 'service');
        }
      } catch (e) {
        console.error('Stripe sync error:', e.message);
      }

      await db.update(services).set(update).where(eq(services.id, id));
      return res.status(200).json({ success: true });
    }
    if (req.method === 'DELETE') {
      await db.delete(services).where(eq(services.id, id));
      return res.status(200).json({ success: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'GET') {
    const rows = await db.select().from(services).orderBy(asc(services.sort_order));
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    const now = new Date().toISOString();
    const data = { id: ulid(), ...req.body, created_at: now, updated_at: now };

    try {
      if (process.env.STRIPE_SECRET_KEY) {
        data.stripe_price_id = await syncStripeProduct(data, 'service');
      }
    } catch (e) {
      console.error('Stripe sync error:', e.message);
    }

    await db.insert(services).values(data);
    return res.status(201).json(data);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
