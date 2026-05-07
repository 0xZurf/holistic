import useApi from '../hooks/useApi';
import { getRetreats } from '../lib/api';
import RetreatCard from '../components/retreats/RetreatCard';
import FadeIn from '../components/ui/FadeIn';
import { CardGridSkeleton } from '../components/ui/Skeleton';

export default function Retreats() {
  const { data, loading } = useApi(getRetreats);
  const retreats = data || [];

  return (
    <div className="section-padding">
      <div className="container-main">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="font-accent text-sage text-lg mb-2">Immersive Experiences</p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-charcoal">
              Upcoming Retreats
            </h1>
          </div>
        </FadeIn>

        {loading ? (
          <CardGridSkeleton count={4} columns="grid-cols-1 lg:grid-cols-2" imageClass="h-56" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {retreats.map((retreat, i) => (
              <FadeIn key={retreat.id} delay={i * 100}>
                <RetreatCard retreat={retreat} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
