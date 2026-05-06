import { verifySession } from '../_lib/auth.js';
import { getDb } from '../_lib/db.js';
import { orders, services, retreats, products } from '../../db/schema.js';
import { eq, and, gte, count, sum, desc } from 'drizzle-orm';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!verifySession(req)) return res.status(401).json({ error: 'Unauthorized' });

  const db = getDb();
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [orderStats] = await db
    .select({ total: count(), revenue: sum(orders.total) })
    .from(orders)
    .where(eq(orders.status, 'paid'));

  const [monthlyStats] = await db
    .select({ total: count(), revenue: sum(orders.total) })
    .from(orders)
    .where(and(eq(orders.status, 'paid'), gte(orders.created_at, monthStart)));

  const [activeServices] = await db.select({ total: count() }).from(services).where(eq(services.is_active, 1));
  const [activeRetreats] = await db.select({ total: count() }).from(retreats).where(eq(retreats.is_active, 1));
  const [activeProducts] = await db.select({ total: count() }).from(products).where(eq(products.is_active, 1));

  const recentOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.created_at))
    .limit(10);

  res.status(200).json({
    orders: {
      all_time: { count: orderStats.total, revenue: orderStats.revenue || 0 },
      this_month: { count: monthlyStats.total, revenue: monthlyStats.revenue || 0 },
    },
    counts: {
      services: activeServices.total,
      retreats: activeRetreats.total,
      products: activeProducts.total,
    },
    recent_orders: recentOrders,
  });
}
