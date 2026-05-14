import { Link } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { getProducts } from '../../lib/api';
import FadeIn from '../ui/FadeIn';
import { CardGridSkeleton } from '../ui/Skeleton';
import { formatPrice } from '../../lib/formatters';

const CATEGORY_GRADIENTS = {
  Supplements: 'linear-gradient(160deg, #2a2010 0%, #1a1508 100%)',
  Teas: 'linear-gradient(160deg, #1a2a20 0%, #0f1a14 100%)',
  Skincare: 'linear-gradient(160deg, #2a1f3a 0%, #1a1028 100%)',
  Tools: 'linear-gradient(160deg, #2a2520 0%, #1a1814 100%)',
  default: 'linear-gradient(160deg, #2a2520 0%, #1a1814 100%)',
};

function ProductCard({ product }) {
  const gradient = CATEGORY_GRADIENTS[product.category] || CATEGORY_GRADIENTS.default;
  return (
    <Link
      to={`/shop/${product.slug}`}
      className="group block bg-card-dark border border-card-border rounded overflow-hidden transition-all duration-[400ms] hover:-translate-y-1 hover:border-gold-border no-underline"
    >
      <div
        className="relative flex items-center justify-center"
        style={{ height: 200, background: gradient }}
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        ) : (
          <div
            className="rounded-full border border-gold-border flex items-center justify-center"
            style={{ width: 80, height: 80 }}
          >
            <div
              className="rounded-full"
              style={{
                width: 40,
                height: 40,
                background:
                  'radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 70%)',
              }}
            />
          </div>
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.7) 100%)',
          }}
        />
      </div>
      <div style={{ padding: '16px 18px 18px' }}>
        {product.category && (
          <div className="font-accent uppercase tracking-[0.2em] text-[10px] text-gold-dim mb-1.5">
            {product.category}
          </div>
        )}
        <h4 className="font-display font-medium text-cream text-[18px] m-0 mb-2">
          {product.title}
        </h4>
        <div className="flex items-baseline gap-2">
          <span className="font-body text-[15px] text-gold">
            {formatPrice(product.price)}
          </span>
          {product.compare_at_price && (
            <span className="font-body text-[13px] text-warm-gray line-through">
              {formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function ProductHighlights() {
  const { data, loading } = useApi(getProducts);
  const highlighted = (data || []).slice(0, 4);

  return (
    <section className="relative bg-dark-bg" style={{ padding: '80px clamp(16px, 4vw, 48px)' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
          <FadeIn>
            <div>
              <span className="font-accent uppercase tracking-[0.3em] text-[11px] text-gold-dim">
                Apothecary
              </span>
              <h2
                className="font-display font-light text-cream m-0"
                style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginTop: 12 }}
              >
                Featured <span className="text-gold">Curations</span>
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link to="/shop" className="btn-secondary" style={{ padding: '12px 28px' }}>
              Shop the Apothecary
            </Link>
          </FadeIn>
        </div>

        {loading ? (
          <CardGridSkeleton
            count={4}
            columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            imageClass="h-48"
          />
        ) : (
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            }}
          >
            {highlighted.map((product, i) => (
              <FadeIn key={product.slug} delay={i * 0.1}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
