import Button from '../ui/Button';
import ProductGallery from './ProductGallery';
import useCart from '../../hooks/useCart';
import { formatPrice } from '../../lib/formatters';
import { useCartToast } from '../ui/CartToast';

export default function ProductDetail({ product }) {
  const { addItem } = useCart();
  const cartToast = useCartToast();
  const images = [product.image_url, ...(product.gallery || [])];

  function handleAdd() {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
    });
    cartToast(product.title);
  }

  return (
    <div className="bg-dark-bg text-cream" style={{ padding: '80px clamp(16px, 4vw, 48px)' }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <ProductGallery images={images} title={product.title} />

          <div>
            {product.category && (
              <span className="inline-block font-accent uppercase tracking-[0.15em] text-[11px] text-gold border border-gold-border px-3 py-1.5 rounded-sm mb-4">
                {product.category}
              </span>
            )}
            <h1
              className="font-display font-light text-cream m-0 mb-5"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.01em' }}
            >
              {product.title}
            </h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-[28px] text-gold">
                {formatPrice(product.price)}
              </span>
              {product.compare_at_price && (
                <span className="font-body text-lg text-warm-gray line-through">
                  {formatPrice(product.compare_at_price)}
                </span>
              )}
            </div>

            {product.inventory_count !== undefined && (
              <p className="font-body text-sm text-warm-gray mb-6">
                {product.inventory_count > 0
                  ? `${product.inventory_count} in stock`
                  : 'Out of stock'}
              </p>
            )}

            <div
              className="font-body text-warm-gray leading-relaxed mb-10"
              style={{ lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: product.body }}
            />

            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleAdd}
              disabled={product.inventory_count === 0}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
