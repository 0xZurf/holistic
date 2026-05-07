import { Link } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { getProducts } from '../../lib/api';
import Card from '../ui/Card';
import Button from '../ui/Button';
import FadeIn from '../ui/FadeIn';
import { CardGridSkeleton } from '../ui/Skeleton';
import { formatPrice } from '../../lib/formatters';

export default function ProductHighlights() {
  const { data, loading } = useApi(getProducts);
  const highlighted = (data || []).slice(0, 4);

  return (
    <section className="section-padding bg-cream">
      <div className="container-main">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="font-accent text-sage text-lg mb-2">Curated for You</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal">
              Featured Products
            </h2>
          </div>
        </FadeIn>

        {loading ? (
          <CardGridSkeleton count={4} columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" imageClass="aspect-square" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {highlighted.map((product, i) => (
              <FadeIn key={product.slug} delay={i * 100}>
                <Link to={`/shop/${product.slug}`} className="group block">
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
              </FadeIn>
            ))}
          </div>
        )}

        <FadeIn>
          <div className="text-center">
            <Button to="/shop" variant="outline">Shop All Products</Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
