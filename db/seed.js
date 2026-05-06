import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { ulid } from 'ulid';
import bcrypt from 'bcryptjs';
import { getClient } from './client.js';

const now = new Date().toISOString();

async function seed() {
  const client = getClient();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env');
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);
  await client.execute({ sql: `DELETE FROM admin_users`, args: [] });
  await client.execute({
    sql: `INSERT INTO admin_users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)`,
    args: [ulid(), email, hash, now],
  });
  console.log('Admin user seeded.');

  const settings = [
    ['brand_name', 'Holistic'],
    ['tagline', 'Nurturing Mind, Body & Spirit'],
    ['contact_email', 'info@example.com'],
    ['phone', ''],
    ['address', 'Sedona, Arizona'],
    ['instagram_url', ''],
    ['facebook_url', ''],
  ];
  for (const [key, value] of settings) {
    await client.execute({
      sql: `INSERT OR IGNORE INTO site_settings (key, value, updated_at) VALUES (?, ?, ?)`,
      args: [key, value, now],
    });
  }
  console.log('Site settings seeded.');

  const testimonials = [
    {
      name: 'Sarah M.',
      title: 'Yoga Instructor',
      body: 'The nutritional consulting completely transformed my relationship with food. I feel more energized and balanced than ever before.',
      rating: 5,
      is_featured: 1,
    },
    {
      name: 'James K.',
      title: null,
      body: 'The Desert Renewal Retreat was a life-changing experience. I came home with a renewed sense of purpose and clarity.',
      rating: 5,
      is_featured: 1,
    },
    {
      name: 'Elena R.',
      title: 'Wellness Coach',
      body: 'I recommend the adaptogen blend to all my clients. The quality is exceptional and the results speak for themselves.',
      rating: 4,
      is_featured: 1,
    },
  ];
  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i];
    await client.execute({
      sql: `INSERT OR IGNORE INTO testimonials (id, name, title, body, image_url, rating, is_featured, is_active, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)`,
      args: [ulid(), t.name, t.title, t.body, null, t.rating, t.is_featured, i, now, now],
    });
  }
  console.log('Testimonials seeded.');

  console.log('Seed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
