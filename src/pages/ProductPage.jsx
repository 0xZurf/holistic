import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { getProduct } from '../lib/api';
import ProductDetail from '../components/shop/ProductDetail';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function ProductPage() {
  const { slug } = useParams();
  const { data: product, loading } = useApi(() => getProduct(slug), [slug]);

  if (loading) return <LoadingSpinner className="py-24" />;

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
