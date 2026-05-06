import { getDb } from './_lib/db.js';
import { testimonials, site_settings } from '../db/schema.js';
import { eq, and, asc } from 'drizzle-orm';
import { Resend } from 'resend';

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
    const { name, email, subject, message } = req.body;
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

  res.status(405).json({ error: 'Method not allowed' });
}
