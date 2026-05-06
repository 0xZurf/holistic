import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { getService } from '../lib/api';
import ServiceDetail from '../components/services/ServiceDetail';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function ServicePage() {
  const { slug } = useParams();
  const { data: service, loading } = useApi(() => getService(slug), [slug]);

  if (loading) return <LoadingSpinner className="py-24" />;

  if (!service) {
    return (
      <div className="section-padding text-center">
        <div className="container-main">
          <h1 className="font-display text-3xl text-charcoal">Service not found</h1>
        </div>
      </div>
    );
  }

  return <ServiceDetail service={service} />;
}
