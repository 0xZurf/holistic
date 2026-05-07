import { getDb } from './_lib/db.js';
import { getStripe } from './_lib/stripe.js';
import { testimonials, site_settings, products, orders } from '../db/schema.js';
import { eq, and, asc, inArray } from 'drizzle-orm';
import { Resend } from 'resend';
import { ulid } from 'ulid';

export const config = { api: { bodyParser: false } };

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  const { resource } = req.query;

  if (resource === 'testimonials' && req.method === 'GET') {
    const db = getDb();
    const { featured } = req.query;
    let conditions = [eq(testimonials.is_active, 1)];
    if (featured === '1') conditions.push(eq(testimonials.is_featured, 1));
    const rows = await db.select().from(testimonials).where(and(...conditions)).orderBy(asc(testimonials.sort_order));
    return res.status(200).json(rows);
  }

  if (resource === 'settings' && req.method === 'GET') {
    const db = getDb();
    const rows = await db.select().from(site_settings);
    const settings = {};
    for (const row of rows) settings[row.key] = row.value;
    return res.status(200).json(settings);
  }

  if (resource === 'contact' && req.method === 'POST') {
    const body = JSON.parse((await readBody(req)).toString());
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const subjectLabels = { general: 'General Inquiry', services: 'Services Inquiry', retreats: 'Retreat Inquiry' };
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL],
      subject: `${subjectLabels[subject] || subject} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subjectLabels[subject] || subject}\n\nMessage:\n${message}`,
      replyTo: email,
    });
    return res.status(200).json({ success: true });
  }

  if (resource === 'checkout' && req.method === 'POST') {
    const body = JSON.parse((await readBody(req)).toString());
    const { items } = body;
    if (!items?.length) return res.status(400).json({ error: 'Cart is empty' });

    const db = getDb();
    const stripe = getStripe();

    const productIds = items.map(i => i.id);
    const dbProducts = await db.select().from(products).where(inArray(products.id, productIds));
    const productMap = Object.fromEntries(dbProducts.map(p => [p.id, p]));

    const line_items = [];
    for (const item of items) {
      const dbProduct = productMap[item.id];
      if (!dbProduct) return res.status(400).json({ error: `Product not found: ${item.id}` });
      if (dbProduct.inventory_count !== null && dbProduct.inventory_count < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for ${dbProduct.title}` });
      }
      line_items.push({
        price_data: {
          currency: 'usd',
          unit_amount: dbProduct.price,
          product_data: {
            name: dbProduct.title,
            description: dbProduct.description || undefined,
            images: dbProduct.image_url ? [dbProduct.image_url] : undefined,
          },
        },
        quantity: item.quantity,
      });
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      shipping_address_collection: { allowed_countries: ['US'] },
      metadata: {
        items: JSON.stringify(items.map(i => ({ id: i.id, quantity: i.quantity }))),
      },
    });

    return res.status(200).json({ url: session.url });
  }

  if (resource === 'webhook' && req.method === 'POST') {
    const stripe = getStripe();
    const rawBody = await readBody(req);
    const sig = req.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return res.status(400).json({ error: `Webhook signature verification failed` });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const db = getDb();
      const now = new Date().toISOString();

      const itemsMeta = JSON.parse(session.metadata?.items || '[]');
      const productIds = itemsMeta.map(i => i.id);
      const dbProducts = await db.select().from(products).where(inArray(products.id, productIds));
      const productMap = Object.fromEntries(dbProducts.map(p => [p.id, p]));

      const orderItems = itemsMeta.map(i => ({
        id: i.id,
        title: productMap[i.id]?.title || 'Unknown',
        price: productMap[i.id]?.price || 0,
        quantity: i.quantity,
      }));

      await db.insert(orders).values({
        id: ulid(),
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent,
        customer_email: session.customer_details?.email,
        customer_name: session.customer_details?.name,
        items: JSON.stringify(orderItems),
        total: session.amount_total,
        status: 'paid',
        shipping_address: session.shipping_details ? JSON.stringify(session.shipping_details) : null,
        created_at: now,
        updated_at: now,
      });

      for (const item of itemsMeta) {
        const product = productMap[item.id];
        if (product && product.inventory_count > 0) {
          await db.update(products)
            .set({ inventory_count: Math.max(0, product.inventory_count - item.quantity), updated_at: now })
            .where(eq(products.id, item.id));
        }
      }
    }

    return res.status(200).json({ received: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
