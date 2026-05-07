import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import useCart from '../../hooks/useCart';
import { formatPrice } from '../../lib/formatters';
import { triggerCartToast } from '../ui/CartToast';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  function handleAdd(e) {
    e.preventDefault();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
    });
    triggerCartToast(product.title);
  }

  return (
    <div className="group">
      <Link to={`/shop/${product.slug}`}>
        <Card>
          <Card.Image src={product.image_url} alt={product.title} className="aspect-square" />
          <Card.Body>
            <h3 className="font-display text-lg font-semibold text-charcoal mb-1">
              {product.title}
            </h3>
            <p className="text-sm text-charcoal/60 leading-relaxed mb-3">{product.description}</p>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-charcoal">{formatPrice(product.price)}</span>
              {product.compare_at_price && (
                <span className="text-sm text-charcoal/40 line-through">
                  {formatPrice(product.compare_at_price)}
                </span>
              )}
            </div>
          </Card.Body>
        </Card>
      </Link>
      <div className="mt-3">
        <Button size="sm" className="w-full" onClick={handleAdd}>Add to Cart</Button>
      </div>
    </div>
  );
}
