import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { ulid } from 'ulid';
import bcrypt from 'bcryptjs';
import { getClient } from './client.js';

const now = new Date().toISOString();

async function seedAdmin() {
  const client = getClient();
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local');
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);

  const existing = await client.execute({
    sql: `SELECT id FROM admin_users WHERE email = ?`,
    args: [email],
  });

  if (existing.rows.length > 0) {
    await client.execute({
      sql: `UPDATE admin_users SET password_hash = ? WHERE email = ?`,
      args: [hash, email],
    });
    console.log(`Updated password for admin user: ${email}`);
  } else {
    await client.execute({
      sql: `INSERT INTO admin_users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)`,
      args: [ulid(), email, hash, now],
    });
    console.log(`Created admin user: ${email}`);
  }

  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error('Admin seed failed:', err);
  process.exit(1);
});
