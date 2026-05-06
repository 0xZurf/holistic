import { useState } from 'react';
import useApi from '../hooks/useApi';
import { getProducts } from '../lib/api';
import ProductCard from '../components/shop/ProductCard';
import Badge from '../components/ui/Badge';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { PRODUCT_CATEGORIES } from '../lib/constants';

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data, loading } = useApi(getProducts);
  const products = data || [];

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

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

        {loading ? (
          <LoadingSpinner className="py-12" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
