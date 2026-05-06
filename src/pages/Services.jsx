import { useState } from 'react';
import useApi from '../hooks/useApi';
import { getServices } from '../lib/api';
import ServiceCard from '../components/services/ServiceCard';
import Badge from '../components/ui/Badge';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { SERVICE_CATEGORIES } from '../lib/constants';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data, loading } = useApi(getServices);
  const services = data || [];

  const filtered = activeCategory === 'All'
    ? services
    : services.filter((s) => s.category === activeCategory);

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

        {loading ? (
          <LoadingSpinner className="py-12" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
