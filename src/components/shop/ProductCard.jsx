import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import useCart from '../../hooks/useCart';
import { formatPrice } from '../../lib/formatters';
import { useCartToast } from '../ui/CartToast';

const CATEGORY_GRADIENTS = {
  Supplements: 'linear-gradient(160deg, #2a2010 0%, #1a1508 100%)',
  Teas: 'linear-gradient(160deg, #1a2a20 0%, #0f1a14 100%)',
  Skincare: 'linear-gradient(160deg, #2a1f3a 0%, #1a1028 100%)',
  Tools: 'linear-gradient(160deg, #2a2520 0%, #1a1814 100%)',
  default: 'linear-gradient(160deg, #2a2520 0%, #1a1814 100%)',
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const cartToast = useCartToast();
  const gradient = CATEGORY_GRADIENTS[product.category] || CATEGORY_GRADIENTS.default;

  function handleAdd(e) {
    e.preventDefault();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
    });
    cartToast(product.title);
  }

  return (
    <div className="group flex flex-col h-full">
      <Link
        to={`/shop/${product.slug}`}
        className="block bg-card-dark border border-card-border rounded overflow-hidden transition-all duration-[400ms] hover:-translate-y-1 hover:border-gold-border no-underline"
      >
        <div
          className="relative flex items-center justify-center aspect-square"
          style={{ background: gradient }}
        >
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
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
                'linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.6) 100%)',
            }}
          />
        </div>
        <div style={{ padding: '16px 18px 18px' }}>
          {product.category && (
            <div className="font-accent uppercase tracking-[0.2em] text-[10px] text-gold-dim mb-1.5">
              {product.category}
            </div>
          )}
          <h3 className="font-display font-medium text-cream text-[18px] m-0 mb-2 leading-tight">
            {product.title}
          </h3>
          <p className="font-body text-sm text-warm-gray leading-relaxed mb-3 line-clamp-2">
            {product.description}
          </p>
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
      <div className="mt-3">
        <Button size="sm" className="w-full" onClick={handleAdd}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
