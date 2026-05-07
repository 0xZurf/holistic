import useApi from '../../hooks/useApi';
import { getRetreats } from '../../lib/api';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import FadeIn from '../ui/FadeIn';
import { RetreatSpotlightSkeleton } from '../ui/Skeleton';
import { formatDateRange, formatPrice } from '../../lib/formatters';

export default function RetreatSpotlight() {
  const { data, loading } = useApi(getRetreats);
  const nextRetreat = (data || [])[0];

  if (!loading && !nextRetreat) return null;

  return (
    <section className="section-padding bg-sand">
      <div className="container-main">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="font-accent text-sage text-lg mb-2">Next Retreat</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal">
              Upcoming Experience
            </h2>
          </div>
        </FadeIn>

        {loading ? (
          <RetreatSpotlightSkeleton />
        ) : (
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-64 sm:h-80 lg:h-full">
                <img
                  src={nextRetreat.image_url}
                  alt={nextRetreat.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="clay">{nextRetreat.location}</Badge>
                  <Badge variant="sage">{nextRetreat.spots_remaining} spots left</Badge>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal mb-4">
                  {nextRetreat.title}
                </h3>
                <p className="text-charcoal/60 leading-relaxed mb-4">{nextRetreat.description}</p>
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-charcoal/70">
                  <span>{formatDateRange(nextRetreat.start_date, nextRetreat.end_date)}</span>
                  <span className="font-semibold text-charcoal">{formatPrice(nextRetreat.price)}</span>
                </div>
                <Button to={`/retreats/${nextRetreat.slug}`}>Learn More</Button>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
