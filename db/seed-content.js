import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { ulid } from 'ulid';
import { getClient } from './client.js';

const now = new Date().toISOString();

const services = [
  {
    title: 'Nutritional Consulting',
    slug: 'nutritional-consulting',
    description: 'Personalized nutrition plans tailored to your unique body chemistry and wellness goals.',
    body: '<p>Our nutritional consulting service takes a comprehensive approach to your dietary needs. Through detailed assessment and personalized planning, we create a nutrition roadmap that supports your unique health journey.</p><p>Each session includes a thorough review of your current diet, health goals, and any specific concerns. We work together to build sustainable eating habits that nourish both body and mind.</p>',
    image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
    price: 15000,
    price_label: 'Starting at $150/session',
    duration: '60 minutes',
    category: 'Nutrition',
  },
  {
    title: 'Energy Healing',
    slug: 'energy-healing',
    description: 'Restore balance and vitality through Reiki and chakra alignment techniques.',
    body: '<p>Energy healing works with the subtle energy systems of the body to release blockages and restore natural flow. Our certified practitioners use Reiki and chakra balancing techniques refined over decades of practice.</p><p>Each session is tailored to your specific needs, addressing physical tension, emotional stress, and energetic imbalances. Many clients report deep relaxation, clarity, and a renewed sense of wellbeing after just one session.</p>',
    image_url: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400&h=300&fit=crop',
    price: 12000,
    price_label: '$120/session',
    duration: '90 minutes',
    category: 'Energy Healing',
  },
  {
    title: 'Holistic Life Coaching',
    slug: 'life-coaching',
    description: 'Discover clarity and purpose with guided sessions focused on your whole-life wellbeing.',
    body: '<p>Holistic life coaching goes beyond traditional goal-setting to address every dimension of your life — physical, emotional, mental, and spiritual. Together we identify what matters most to you and create an actionable path forward.</p><p>Sessions blend proven coaching methodologies with mindfulness practices, helping you overcome limiting beliefs, build resilience, and step confidently into the life you envision.</p>',
    image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    price: 17500,
    price_label: '$175/session',
    duration: '60 minutes',
    category: 'Life Coaching',
  },
  {
    title: 'Guided Meditation',
    slug: 'guided-meditation',
    description: 'Deep relaxation and mindfulness practices for stress relief and mental clarity.',
    body: '<p>Our guided meditation sessions are designed to help you cultivate a sustainable mindfulness practice. Whether you are a complete beginner or an experienced meditator, each session meets you where you are.</p><p>Techniques include breathwork, body scanning, visualization, and mantra meditation. You will leave each session with practical tools you can use in your daily life to manage stress and enhance clarity.</p>',
    image_url: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&h=300&fit=crop',
    price: 8000,
    price_label: '$80/session',
    duration: '45 minutes',
    category: 'Meditation',
  },
];

const retreats = [
  {
    title: 'Desert Renewal Retreat',
    slug: 'desert-renewal',
    description: 'A transformative 3-day journey of self-discovery amidst the healing energy of the desert landscape.',
    body: '<p>Immerse yourself in the breathtaking beauty of Sedona for three days of deep healing and personal transformation. This intimate retreat brings together a small group of like-minded seekers for an unforgettable experience.</p><p>Activities include guided meditation at sunrise, energy healing sessions, nature walks through red rock canyons, nourishing whole-food meals, and evening sharing circles.</p>',
    image_url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1510137600163-2729bc6959a4?w=400&h=400&fit=crop',
    ]),
    location: 'Sedona, AZ',
    start_date: '2026-07-15',
    end_date: '2026-07-18',
    price: 125000,
    capacity: 12,
    spots_remaining: 5,
  },
  {
    title: 'Mountain Mindfulness Retreat',
    slug: 'mountain-mindfulness',
    description: 'Reconnect with nature and your inner self through guided meditation, yoga, and forest bathing.',
    body: '<p>Nestled in the Blue Ridge Mountains, this 4-day retreat offers a sanctuary for deep inner work and reconnection with nature. Small group size ensures personalized attention and meaningful connections.</p><p>Daily schedule includes morning yoga, guided forest bathing, meditation workshops, wholesome farm-to-table meals, and free time to explore the surrounding trails and waterfalls.</p>',
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
    gallery: JSON.stringify([]),
    location: 'Asheville, NC',
    start_date: '2026-09-20',
    end_date: '2026-09-24',
    price: 185000,
    capacity: 8,
    spots_remaining: 3,
  },
];

const products = [
  {
    title: 'Adaptogen Blend',
    slug: 'adaptogen-blend',
    description: "A premium blend of ashwagandha, reishi, and lion's mane for stress resilience.",
    body: "<p>Our Adaptogen Blend brings together three powerful adaptogens revered for centuries in traditional medicine. Each ingredient is sustainably sourced and third-party tested for purity.</p><p>Ashwagandha helps the body manage stress, Reishi supports immune function, and Lion's Mane promotes cognitive clarity. Together, they create a synergistic formula for whole-body resilience.</p>",
    image_url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
    gallery: JSON.stringify([
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
    ]),
    price: 3900,
    compare_at_price: 4900,
    category: 'Supplements',
    inventory_count: 25,
  },
  {
    title: 'Calm Tea Collection',
    slug: 'calm-tea-collection',
    description: 'Hand-selected herbal teas for relaxation, featuring chamomile, lavender, and passionflower.',
    body: '<p>Our Calm Tea Collection features three carefully curated blends designed to promote relaxation and restful sleep. Each tea is made from organic, whole-leaf herbs sourced from small farms.</p>',
    image_url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop',
    gallery: JSON.stringify([]),
    price: 2400,
    compare_at_price: null,
    category: 'Teas',
    inventory_count: 40,
  },
  {
    title: 'Botanical Rose Face Oil',
    slug: 'rose-face-oil',
    description: 'Luxurious cold-pressed rosehip and jojoba oil blend for radiant, nourished skin.',
    body: '<p>This luxurious face oil combines cold-pressed rosehip seed oil with jojoba and vitamin E for deep nourishment. Suitable for all skin types, it absorbs quickly without leaving a greasy residue.</p>',
    image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
    gallery: JSON.stringify([]),
    price: 4200,
    compare_at_price: null,
    category: 'Skincare',
    inventory_count: 18,
  },
  {
    title: 'Healing Crystal Set',
    slug: 'crystal-set',
    description: 'Curated set of amethyst, rose quartz, and clear quartz for energy work.',
    body: '<p>This hand-selected crystal set includes three essential stones for energy healing and meditation. Each crystal is ethically sourced, cleansed, and charged before shipping.</p>',
    image_url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop',
    gallery: JSON.stringify([]),
    price: 5500,
    compare_at_price: 6500,
    category: 'Tools',
    inventory_count: 12,
  },
  {
    title: 'Organic Meditation Cushion',
    slug: 'meditation-cushion',
    description: 'Handcrafted buckwheat-filled zafu cushion in natural linen.',
    body: '<p>Our meditation cushion is handcrafted from organic linen and filled with buckwheat hulls for firm, comfortable support. The traditional zafu shape promotes proper spinal alignment during seated meditation.</p>',
    image_url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=400&fit=crop',
    gallery: JSON.stringify([]),
    price: 6800,
    compare_at_price: null,
    category: 'Tools',
    inventory_count: 8,
  },
  {
    title: 'Daily Detox Blend',
    slug: 'detox-blend',
    description: 'Organic greens powder with spirulina, chlorella, and moringa for daily cleansing.',
    body: '<p>Start each day with a powerful dose of plant nutrition. Our Daily Detox Blend combines spirulina, chlorella, moringa, and wheatgrass for gentle, effective daily cleansing support.</p>',
    image_url: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=400&fit=crop',
    gallery: JSON.stringify([]),
    price: 3400,
    compare_at_price: null,
    category: 'Supplements',
    inventory_count: 30,
  },
];

async function seedContent() {
  const client = getClient();

  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    await client.execute({
      sql: `INSERT OR REPLACE INTO services (id, title, slug, description, body, image_url, price, price_label, duration, category, is_active, sort_order, stripe_price_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, NULL, ?, ?)`,
      args: [ulid(), s.title, s.slug, s.description, s.body, s.image_url, s.price, s.price_label, s.duration, s.category, i, now, now],
    });
  }
  console.log(`Seeded ${services.length} services.`);

  for (let i = 0; i < retreats.length; i++) {
    const r = retreats[i];
    await client.execute({
      sql: `INSERT OR REPLACE INTO retreats (id, title, slug, description, body, image_url, gallery, location, start_date, end_date, price, capacity, spots_remaining, is_active, sort_order, stripe_price_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, NULL, ?, ?)`,
      args: [ulid(), r.title, r.slug, r.description, r.body, r.image_url, r.gallery, r.location, r.start_date, r.end_date, r.price, r.capacity, r.spots_remaining, i, now, now],
    });
  }
  console.log(`Seeded ${retreats.length} retreats.`);

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    await client.execute({
      sql: `INSERT OR REPLACE INTO products (id, title, slug, description, body, image_url, gallery, price, compare_at_price, category, inventory_count, is_active, sort_order, stripe_price_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, NULL, ?, ?)`,
      args: [ulid(), p.title, p.slug, p.description, p.body, p.image_url, p.gallery, p.price, p.compare_at_price, p.category, p.inventory_count, i, now, now],
    });
  }
  console.log(`Seeded ${products.length} products.`);

  console.log('Content seed complete.');
  process.exit(0);
}

seedContent().catch((err) => {
  console.error('Content seed failed:', err);
  process.exit(1);
});
