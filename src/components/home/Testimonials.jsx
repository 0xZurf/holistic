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
    <section
      className="relative bg-obsidian overflow-hidden"
      style={{ padding: '80px clamp(16px, 4vw, 48px)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="font-accent uppercase tracking-[0.3em] text-[11px] text-gold-dim">
              Transmissions
            </span>
            <h2
              className="font-display font-light text-cream m-0"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginTop: 12 }}
            >
              Words from the <span className="text-gold">Collective</span>
            </h2>
          </div>
        </FadeIn>

        {loading ? (
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
          >
            {testimonials.map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.1}>
                <TestimonialCard testimonial={t} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
