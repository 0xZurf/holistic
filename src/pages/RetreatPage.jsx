import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { getRetreat } from '../lib/api';
import RetreatDetail from '../components/retreats/RetreatDetail';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function RetreatPage() {
  const { slug } = useParams();
  const { data: retreat, loading } = useApi(() => getRetreat(slug), [slug]);

  if (loading) {
    return (
      <div className="bg-dark-bg min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!retreat) {
    return (
      <div className="bg-dark-bg text-center" style={{ padding: '120px 16px' }}>
        <h1 className="font-display font-light text-cream text-3xl m-0">
          Retreat not found
        </h1>
      </div>
    );
  }

  return <RetreatDetail retreat={retreat} />;
}
