import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { getRetreat } from '../lib/api';
import RetreatDetail from '../components/retreats/RetreatDetail';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function RetreatPage() {
  const { slug } = useParams();
  const { data: retreat, loading } = useApi(() => getRetreat(slug), [slug]);

  if (loading) return <LoadingSpinner className="py-24" />;

  if (!retreat) {
    return (
      <div className="section-padding text-center">
        <div className="container-main">
          <h1 className="font-display text-3xl text-charcoal">Retreat not found</h1>
        </div>
      </div>
    );
  }

  return <RetreatDetail retreat={retreat} />;
}
