import useApi from '../hooks/useApi';
import { getRetreats } from '../lib/api';
import RetreatCard from '../components/retreats/RetreatCard';
import FadeIn from '../components/ui/FadeIn';
import SacredGeoBg from '../components/ui/SacredGeoBg';
import { CardGridSkeleton } from '../components/ui/Skeleton';

export default function Retreats() {
  const { data, loading } = useApi(getRetreats);
  const retreats = data || [];

  return (
    <div
      className="relative bg-dark-bg overflow-hidden"
      style={{ padding: '80px clamp(16px, 4vw, 48px)' }}
    >
      <SacredGeoBg opacity={0.025} />
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="font-accent uppercase tracking-[0.3em] text-[11px] text-gold-dim">
              Immersive Experiences
            </span>
            <h1
              className="font-display font-light text-cream m-0"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginTop: 12, letterSpacing: '-0.01em' }}
            >
              Upcoming <span className="text-gold">Retreats</span>
            </h1>
          </div>
        </FadeIn>

        {loading ? (
          <CardGridSkeleton count={4} columns="grid-cols-1 lg:grid-cols-2" imageClass="h-64" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {retreats.map((retreat, i) => (
              <FadeIn key={retreat.id} delay={i * 0.1}>
                <RetreatCard retreat={retreat} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
