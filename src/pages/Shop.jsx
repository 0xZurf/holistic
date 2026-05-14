import { useState } from 'react';
import useApi from '../hooks/useApi';
import { getProducts } from '../lib/api';
import ProductCard from '../components/shop/ProductCard';
import FadeIn from '../components/ui/FadeIn';
import { CardGridSkeleton } from '../components/ui/Skeleton';
import { PRODUCT_CATEGORIES } from '../lib/constants';

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data, loading } = useApi(getProducts);
  const products = data || [];

  const filtered =
    activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-dark-bg" style={{ padding: '80px clamp(16px, 4vw, 48px)' }}>
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="text-center mb-10">
            <span className="font-accent uppercase tracking-[0.3em] text-[11px] text-gold-dim">
              Curated for the Imperium
            </span>
            <h1
              className="font-display font-light text-cream m-0"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginTop: 12, letterSpacing: '-0.01em' }}
            >
              The <span className="text-gold">Apothecary</span>
            </h1>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {PRODUCT_CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`min-h-[40px] px-4 py-1.5 font-accent uppercase tracking-[0.15em] text-[11px] border rounded-sm transition-colors ${
                    active
                      ? 'text-gold border-gold-border bg-gold/[0.06]'
                      : 'text-sand border-card-border hover:text-gold hover:border-gold-border'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {loading ? (
          <CardGridSkeleton
            count={6}
            columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            imageClass="aspect-square"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((product, i) => (
              <FadeIn key={product.id} delay={i * 0.08}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
