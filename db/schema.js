import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const services = sqliteTable('services', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  body: text('body').notNull().default(''),
  image_url: text('image_url').notNull().default(''),
  price: integer('price').notNull(),
  price_label: text('price_label'),
  duration: text('duration'),
  category: text('category').notNull().default(''),
  is_active: integer('is_active').notNull().default(1),
  sort_order: integer('sort_order').notNull().default(0),
  stripe_price_id: text('stripe_price_id'),
  created_at: text('created_at').notNull(),
  updated_at: text('updated_at').notNull(),
});

export const retreats = sqliteTable('retreats', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  body: text('body').notNull().default(''),
  image_url: text('image_url').notNull().default(''),
  gallery: text('gallery').notNull().default('[]'),
  location: text('location').notNull().default(''),
  start_date: text('start_date'),
  end_date: text('end_date'),
  price: integer('price').notNull(),
  capacity: integer('capacity').notNull().default(0),
  spots_remaining: integer('spots_remaining').notNull().default(0),
  is_active: integer('is_active').notNull().default(1),
  sort_order: integer('sort_order').notNull().default(0),
  stripe_price_id: text('stripe_price_id'),
  created_at: text('created_at').notNull(),
  updated_at: text('updated_at').notNull(),
});

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  body: text('body').notNull().default(''),
  image_url: text('image_url').notNull().default(''),
  gallery: text('gallery').notNull().default('[]'),
  price: integer('price').notNull(),
  compare_at_price: integer('compare_at_price'),
  category: text('category').notNull().default(''),
  inventory_count: integer('inventory_count').notNull().default(0),
  is_active: integer('is_active').notNull().default(1),
  sort_order: integer('sort_order').notNull().default(0),
  stripe_price_id: text('stripe_price_id'),
  created_at: text('created_at').notNull(),
  updated_at: text('updated_at').notNull(),
});

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  stripe_session_id: text('stripe_session_id'),
  stripe_payment_intent: text('stripe_payment_intent'),
  customer_email: text('customer_email'),
  customer_name: text('customer_name'),
  items: text('items').notNull().default('[]'),
  total: integer('total').notNull(),
  status: text('status').notNull().default('pending'),
  shipping_address: text('shipping_address'),
  notes: text('notes'),
  created_at: text('created_at').notNull(),
  updated_at: text('updated_at').notNull(),
});

export const testimonials = sqliteTable('testimonials', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  title: text('title'),
  body: text('body').notNull(),
  image_url: text('image_url'),
  rating: integer('rating'),
  is_featured: integer('is_featured').notNull().default(0),
  is_active: integer('is_active').notNull().default(1),
  sort_order: integer('sort_order').notNull().default(0),
  created_at: text('created_at').notNull(),
  updated_at: text('updated_at').notNull(),
});

export const site_settings = sqliteTable('site_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull().default(''),
  updated_at: text('updated_at').notNull(),
});

export const admin_users = sqliteTable('admin_users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  created_at: text('created_at').notNull(),
});
