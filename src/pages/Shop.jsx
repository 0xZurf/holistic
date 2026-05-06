import { useState } from 'react';
import ProductCard from '../components/shop/ProductCard';
import Badge from '../components/ui/Badge';
import { PRODUCT_CATEGORIES } from '../lib/constants';

const mockProducts = [
  {
    id: '1',
    slug: 'adaptogen-blend',
    title: 'Adaptogen Blend',
    description: 'A premium blend of ashwagandha, reishi, and lion\'s mane for stress resilience.',
    image_url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
    price: 3900,
    compare_at_price: 4900,
    category: 'Supplements',
  },
  {
    id: '2',
    slug: 'calm-tea-collection',
    title: 'Calm Tea Collection',
    description: 'Hand-selected herbal teas for relaxation, featuring chamomile, lavender, and passionflower.',
    image_url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop',
    price: 2400,
    compare_at_price: null,
    category: 'Teas',
  },
  {
    id: '3',
    slug: 'rose-face-oil',
    title: 'Botanical Rose Face Oil',
    description: 'Luxurious cold-pressed rosehip and jojoba oil blend for radiant, nourished skin.',
    image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
    price: 4200,
    compare_at_price: null,
    category: 'Skincare',
  },
  {
    id: '4',
    slug: 'crystal-set',
    title: 'Healing Crystal Set',
    description: 'Curated set of amethyst, rose quartz, and clear quartz for energy work.',
    image_url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop',
    price: 5500,
    compare_at_price: 6500,
    category: 'Tools',
  },
  {
    id: '5',
    slug: 'meditation-cushion',
    title: 'Organic Meditation Cushion',
    description: 'Handcrafted buckwheat-filled zafu cushion in natural linen.',
    image_url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=400&fit=crop',
    price: 6800,
    compare_at_price: null,
    category: 'Tools',
  },
  {
    id: '6',
    slug: 'detox-blend',
    title: 'Daily Detox Blend',
    description: 'Organic greens powder with spirulina, chlorella, and moringa for daily cleansing.',
    image_url: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=400&fit=crop',
    price: 3400,
    compare_at_price: null,
    category: 'Supplements',
  },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? mockProducts
    : mockProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="section-padding">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="font-accent text-sage text-lg mb-2">Curated for You</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-charcoal">
            Wellness Shop
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="min-h-[44px] px-4"
            >
              <Badge variant={activeCategory === cat ? 'sage' : 'charcoal'}>
                {cat}
              </Badge>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
