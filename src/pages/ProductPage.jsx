import { useParams } from 'react-router-dom';
import ProductDetail from '../components/shop/ProductDetail';

const mockProducts = {
  'adaptogen-blend': {
    title: 'Adaptogen Blend',
    description: 'A premium blend of ashwagandha, reishi, and lion\'s mane for stress resilience.',
    body: '<p>Our Adaptogen Blend brings together three powerful adaptogens revered for centuries in traditional medicine. Each ingredient is sustainably sourced and third-party tested for purity.</p><p>Ashwagandha helps the body manage stress, Reishi supports immune function, and Lion\'s Mane promotes cognitive clarity. Together, they create a synergistic formula for whole-body resilience.</p>',
    image_url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
    ],
    price: 3900,
    compare_at_price: 4900,
    category: 'Supplements',
    inventory_count: 25,
  },
};

export default function ProductPage() {
  const { slug } = useParams();
  const product = mockProducts[slug];

  if (!product) {
    return (
      <div className="section-padding text-center">
        <div className="container-main">
          <h1 className="font-display text-3xl text-charcoal">Product not found</h1>
        </div>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
