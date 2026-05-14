import { Link } from 'react-router-dom';
import { formatDateRange, formatPrice } from '../../lib/formatters';

export default function RetreatCard({ retreat }) {
  const lowSpots = retreat.spots_remaining <= 3;
  return (
    <Link
      to={`/retreats/${retreat.slug}`}
      className="group block bg-card-dark border border-card-border rounded overflow-hidden transition-all duration-[400ms] hover:-translate-y-1 hover:border-gold-border no-underline h-full"
    >
      <div
        className="relative overflow-hidden"
        style={{
          height: 280,
          background:
            'linear-gradient(135deg, #3d2b1a 0%, #1a1208 50%, #2a1f10 100%)',
        }}
      >
        {retreat.image_url && (
          <img
            src={retreat.image_url}
            alt={retreat.title}
            className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-95 transition-opacity duration-500"
            loading="lazy"
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 30%, rgba(10,10,10,0.9) 100%)',
          }}
        />
        <div className="absolute top-4 right-4">
          <span
            className={`inline-block font-accent uppercase tracking-[0.15em] text-[10px] px-3 py-1.5 rounded-sm border ${
              lowSpots
                ? 'text-gold-light border-gold bg-obsidian/60'
                : 'text-gold border-gold-border bg-obsidian/60'
            }`}
          >
            {retreat.spots_remaining} spots left
          </span>
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <div className="font-accent uppercase tracking-[0.2em] text-[10px] text-sand mb-1.5">
            {retreat.location}
          </div>
          <h3 className="font-display font-medium text-cream text-[24px] leading-tight m-0">
            {retreat.title}
          </h3>
        </div>
      </div>

      <div className="px-6 pt-5 pb-6">
        <p className="font-body text-sm text-warm-gray leading-relaxed mb-5">
          {retreat.description}
        </p>
        <div className="flex items-center justify-between font-body text-[13px]">
          <span className="text-sand">
            {formatDateRange(retreat.start_date, retreat.end_date)}
          </span>
          <span className="text-gold font-medium">{formatPrice(retreat.price)}</span>
        </div>
      </div>
    </Link>
  );
}
