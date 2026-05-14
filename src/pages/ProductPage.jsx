import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { getProduct } from '../lib/api';
import ProductDetail from '../components/shop/ProductDetail';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function ProductPage() {
  const { slug } = useParams();
  const { data: product, loading } = useApi(() => getProduct(slug), [slug]);

  if (loading) {
    return (
      <div className="bg-dark-bg min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-dark-bg text-center" style={{ padding: '120px 16px' }}>
        <h1 className="font-display font-light text-cream text-3xl m-0">
          Product not found
        </h1>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
