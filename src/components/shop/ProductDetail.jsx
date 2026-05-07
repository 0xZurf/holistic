import Badge from '../ui/Badge';
import Button from '../ui/Button';
import ProductGallery from './ProductGallery';
import useCart from '../../hooks/useCart';
import { formatPrice } from '../../lib/formatters';
import { triggerCartToast } from '../ui/CartToast';

export default function ProductDetail({ product }) {
  const { addItem } = useCart();
  const images = [product.image_url, ...(product.gallery || [])];

  function handleAdd() {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
    });
    triggerCartToast(product.title);
  }

  return (
    <div className="section-padding">
      <div className="container-main max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery images={images} title={product.title} />

          <div>
            <Badge className="mb-3">{product.category}</Badge>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-2xl font-semibold text-charcoal">
                {formatPrice(product.price)}
              </span>
              {product.compare_at_price && (
                <span className="text-lg text-charcoal/40 line-through">
                  {formatPrice(product.compare_at_price)}
                </span>
              )}
            </div>

            {product.inventory_count !== undefined && (
              <p className="text-sm text-charcoal/60 mb-6">
                {product.inventory_count > 0
                  ? `${product.inventory_count} in stock`
                  : 'Out of stock'}
              </p>
            )}

            <div
              className="prose prose-charcoal max-w-none mb-8 text-charcoal/70 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.body }}
            />

            <Button
              variant="gold"
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
