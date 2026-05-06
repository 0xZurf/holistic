import useApi from '../hooks/useApi';
import { getRetreats } from '../lib/api';
import RetreatCard from '../components/retreats/RetreatCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Retreats() {
  const { data, loading } = useApi(getRetreats);
  const retreats = data || [];

  return (
    <div className="section-padding">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="font-accent text-sage text-lg mb-2">Immersive Experiences</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-charcoal">
            Upcoming Retreats
          </h1>
        </div>

        {loading ? (
          <LoadingSpinner className="py-12" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {retreats.map((retreat) => (
              <RetreatCard key={retreat.id} retreat={retreat} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
