import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { formatPrice } from '../../lib/formatters';

const highlighted = [
  {
    slug: 'adaptogen-blend',
    title: 'Adaptogen Blend',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
    price: 3900,
    compare_at_price: 4900,
  },
  {
    slug: 'calm-tea-collection',
    title: 'Calm Tea Collection',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop',
    price: 2400,
    compare_at_price: null,
  },
  {
    slug: 'rose-face-oil',
    title: 'Botanical Rose Face Oil',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
    price: 4200,
    compare_at_price: null,
  },
  {
    slug: 'crystal-set',
    title: 'Healing Crystal Set',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop',
    price: 5500,
    compare_at_price: 6500,
  },
];

export default function ProductHighlights() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="font-accent text-sage text-lg mb-2">Curated for You</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal">
            Featured Products
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {highlighted.map((product) => (
            <Link key={product.slug} to={`/shop/${product.slug}`} className="group">
              <Card>
                <Card.Image src={product.image} alt={product.title} className="aspect-square" />
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

        <div className="text-center">
          <Button to="/shop" variant="outline">Shop All Products</Button>
        </div>
      </div>
    </section>
  );
}
