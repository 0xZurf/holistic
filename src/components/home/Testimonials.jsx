import useApi from '../../hooks/useApi';
import { getTestimonials } from '../../lib/api';
import TestimonialCard from './TestimonialCard';
import FadeIn from '../ui/FadeIn';
import { TestimonialSkeleton } from '../ui/Skeleton';

export default function Testimonials() {
  const { data, loading } = useApi(() => getTestimonials(true));
  const testimonials = data || [];

  if (!loading && !testimonials.length) return null;

  return (
    <section className="section-padding bg-sand">
      <div className="container-main">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="font-accent text-sage text-lg mb-2">Kind Words</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal">
              What Our Clients Say
            </h2>
          </div>
        </FadeIn>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, i) => (
              <FadeIn key={t.id} delay={i * 100}>
                <TestimonialCard testimonial={t} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
