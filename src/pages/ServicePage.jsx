import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { getService } from '../lib/api';
import ServiceDetail from '../components/services/ServiceDetail';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function ServicePage() {
  const { slug } = useParams();
  const { data: service, loading } = useApi(() => getService(slug), [slug]);

  if (loading) {
    return (
      <div className="bg-dark-bg min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="bg-dark-bg text-center" style={{ padding: '120px 16px' }}>
        <h1 className="font-display font-light text-cream text-3xl m-0">
          Service not found
        </h1>
      </div>
    );
  }

  return <ServiceDetail service={service} />;
}
