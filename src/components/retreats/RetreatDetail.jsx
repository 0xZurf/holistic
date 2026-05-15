import { Link } from 'react-router-dom';
import { formatDateRange, formatPrice } from '../../lib/formatters';

export default function RetreatDetail({ retreat }) {
  const lowSpots = retreat.spots_remaining <= 3;
  return (
    <div className="bg-dark-bg text-cream">
      {/* Hero image */}
      <div
        className="relative overflow-hidden"
        style={{
          height: 'clamp(320px, 55vw, 520px)',
          background:
            'linear-gradient(135deg, #3d2b1a 0%, #1a1208 50%, #2a1f10 100%)',
        }}
      >
        {retreat.image_url && (
          <img
            src={retreat.image_url}
            alt={retreat.title}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.25) 0%, rgba(15,14,12,0.98) 100%)',
          }}
        />
      </div>

      <div style={{ padding: '0 clamp(16px, 4vw, 48px) 80px' }}>
        <div className="max-w-[960px] mx-auto -mt-36 relative z-10">
          <div className="bg-card-dark border border-card-border rounded p-6 sm:p-10">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="font-accent uppercase tracking-[0.15em] text-[11px] text-gold border border-gold-border px-3 py-1.5 rounded-sm">
                {retreat.location}
              </span>
              <span
                className={`font-accent uppercase tracking-[0.15em] text-[11px] px-3 py-1.5 rounded-sm border ${
                  lowSpots
                    ? 'text-gold-light border-gold'
                    : 'text-gold border-gold-border'
                }`}
              >
                {retreat.spots_remaining} of {retreat.capacity} spots left
              </span>
            </div>

            <h1
              className="font-display font-light text-cream m-0 mb-5"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.01em' }}
            >
              {retreat.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-8 font-body text-[13px]">
              <span className="text-sand">
                {formatDateRange(retreat.start_date, retreat.end_date)}
              </span>
              <span className="text-warm-gray">{retreat.location}</span>
              <span className="font-display text-gold text-lg">
                {formatPrice(retreat.price)}
              </span>
            </div>

            {retreat.gallery && retreat.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-10">
                {retreat.gallery.map((url, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded overflow-hidden border border-card-border relative"
                  >
                    <img
                      src={url}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to bottom, rgba(10,10,10,0) 60%, rgba(10,10,10,0.55) 100%)',
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div
              className="cms-content mb-10"
              dangerouslySetInnerHTML={{ __html: retreat.body }}
            />

            <Link to="/contact" className="btn-primary">
              Reserve Your Spot
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
