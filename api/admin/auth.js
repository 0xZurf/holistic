import bcrypt from 'bcryptjs';
import { getDb } from '../_lib/db.js';
import { createSessionCookie, clearSessionCookie } from '../_lib/auth.js';
import { admin_users } from '../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { action } = req.query;

  if (action === 'logout') {
    res.setHeader('Set-Cookie', clearSessionCookie());
    return res.status(200).json({ success: true });
  }

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  const db = getDb();
  const [user] = await db.select().from(admin_users).where(eq(admin_users.email, email));
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  res.setHeader('Set-Cookie', createSessionCookie(user.id));
  res.status(200).json({ success: true });
}
