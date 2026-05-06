import { useState } from 'react';
import ServiceCard from '../components/services/ServiceCard';
import Badge from '../components/ui/Badge';
import { SERVICE_CATEGORIES } from '../lib/constants';

const mockServices = [
  {
    id: '1',
    slug: 'nutritional-consulting',
    title: 'Nutritional Consulting',
    description: 'Personalized nutrition plans tailored to your unique body chemistry and wellness goals.',
    image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
    price: 15000,
    price_label: 'Starting at $150/session',
    duration: '60 minutes',
    category: 'Nutrition',
  },
  {
    id: '2',
    slug: 'energy-healing',
    title: 'Energy Healing',
    description: 'Restore balance and vitality through Reiki and chakra alignment techniques.',
    image_url: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400&h=300&fit=crop',
    price: 12000,
    price_label: '$120/session',
    duration: '90 minutes',
    category: 'Energy Healing',
  },
  {
    id: '3',
    slug: 'life-coaching',
    title: 'Holistic Life Coaching',
    description: 'Discover clarity and purpose with guided sessions focused on your whole-life wellbeing.',
    image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    price: 17500,
    price_label: '$175/session',
    duration: '60 minutes',
    category: 'Life Coaching',
  },
  {
    id: '4',
    slug: 'guided-meditation',
    title: 'Guided Meditation',
    description: 'Deep relaxation and mindfulness practices for stress relief and mental clarity.',
    image_url: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&h=300&fit=crop',
    price: 8000,
    price_label: '$80/session',
    duration: '45 minutes',
    category: 'Meditation',
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? mockServices
    : mockServices.filter((s) => s.category === activeCategory);

  return (
    <div className="section-padding">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="font-accent text-sage text-lg mb-2">What We Offer</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-charcoal">
            Our Services
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SERVICE_CATEGORIES.map((cat) => (
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
