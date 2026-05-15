import { Link } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { getRetreats } from '../../lib/api';
import FadeIn from '../ui/FadeIn';
import SacredGeoBg from '../ui/SacredGeoBg';
import { RetreatSpotlightSkeleton } from '../ui/Skeleton';
import { formatDateRange } from '../../lib/formatters';

function ExperienceCard({ retreat }) {
  return (
    <Link
      to={`/retreats/${retreat.slug}`}
      className="group flex flex-wrap items-center gap-8 bg-card-dark border border-card-border rounded transition-all duration-[400ms] hover:-translate-y-0.5 hover:border-gold-border no-underline"
      style={{ padding: '28px 32px' }}
    >
      <div
        className="flex items-center justify-center flex-shrink-0 rounded-full border border-gold-border"
        style={{ width: 72, height: 72 }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.2">
          <circle cx="12" cy="12" r="5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
            const r = (a * Math.PI) / 180;
            return (
              <line
                key={a}
                x1={12 + 7.5 * Math.cos(r)}
                y1={12 + 7.5 * Math.sin(r)}
                x2={12 + 10 * Math.cos(r)}
                y2={12 + 10 * Math.sin(r)}
              />
            );
          })}
        </svg>
      </div>

      <div className="flex-1 min-w-[200px]" style={{ flex: '1 1 300px' }}>
        <h3 className="font-display font-medium text-cream text-[22px] leading-tight mb-1.5 m-0">
          {retreat.title}
        </h3>
        <p className="font-body text-sm text-warm-gray leading-relaxed m-0">
          {retreat.description}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0 min-w-[160px]">
        <div className="font-body text-[13px] text-sand">
          {formatDateRange(retreat.start_date, retreat.end_date)}
        </div>
        <div className="font-body text-[12px] text-warm-gray">{retreat.location}</div>
        {typeof retreat.spots_remaining === 'number' && (
          <span className="font-accent uppercase tracking-[0.15em] text-[10px] text-gold border border-gold-border rounded-sm px-3 py-1">
            {retreat.spots_remaining} spots left
          </span>
        )}
      </div>
    </Link>
  );
}

export default function RetreatSpotlight() {
  const { data, loading } = useApi(getRetreats);
  const experiences = (data || []).slice(0, 3);

  if (!loading && experiences.length === 0) return null;

  return (
    <section
      className="relative bg-obsidian overflow-hidden"
      style={{ padding: '80px clamp(16px, 4vw, 48px)' }}
    >
      {/* Gold drips top-to-bottom background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'url(/images/solis-dripps.png)',
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center top',
          opacity: 0.18,
          mixBlendMode: 'screen',
        }}
      />
      <SacredGeoBg opacity={0.02} />
      <div className="max-w-[1200px] mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="font-accent uppercase tracking-[0.3em] text-[11px] text-gold-dim">
              What's Next
            </span>
            <h2
              className="font-display font-light text-cream m-0"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginTop: 12 }}
            >
              Upcoming <span className="text-gold">Experiences</span>
            </h2>
          </div>
        </FadeIn>

        {loading ? (
          <RetreatSpotlightSkeleton />
        ) : (
          <div className="flex flex-col gap-5">
            {experiences.map((retreat, i) => (
              <FadeIn key={retreat.id || retreat.slug} delay={i * 0.1}>
                <ExperienceCard retreat={retreat} />
              </FadeIn>
            ))}
          </div>
        )}

        <FadeIn delay={0.4}>
          <div className="text-center mt-12">
            <Link to="/retreats" className="btn-secondary">
              View All Experiences
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
