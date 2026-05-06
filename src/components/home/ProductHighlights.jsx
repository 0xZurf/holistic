import { Link } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { getProducts } from '../../lib/api';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';
import { formatPrice } from '../../lib/formatters';

export default function ProductHighlights() {
  const { data, loading } = useApi(getProducts);
  const highlighted = (data || []).slice(0, 4);

  return (
    <section className="section-padding bg-cream">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="font-accent text-sage text-lg mb-2">Curated for You</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal">
            Featured Products
          </h2>
        </div>

        {loading ? (
          <LoadingSpinner className="py-12" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {highlighted.map((product) => (
              <Link key={product.slug} to={`/shop/${product.slug}`} className="group">
                <Card>
                  <Card.Image src={product.image_url} alt={product.title} className="aspect-square" />
                  <Card.Body>
                    <h3 className="font-display text-lg font-semibold text-charcoal mb-2">
                      {product.title}
                    </h3>
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
            ))}
          </div>
        )}

        <div className="text-center">
          <Button to="/shop" variant="outline">Shop All Products</Button>
        </div>
      </div>
    </section>
  );
}
