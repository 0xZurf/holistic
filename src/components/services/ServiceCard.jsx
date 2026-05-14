import { Link } from 'react-router-dom';

const CATEGORY_GRADIENTS = {
  'Nutrition': 'linear-gradient(135deg, #2a2010 0%, #1a1508 50%, #1a1a08 100%)',
  'Energy Healing': 'linear-gradient(135deg, #1a2a2a 0%, #0f1a1a 50%, #1a2520 100%)',
  'Life Coaching': 'linear-gradient(135deg, #3d2b1a 0%, #1a1208 50%, #2a1f10 100%)',
  'Meditation': 'linear-gradient(135deg, #2a1f3a 0%, #1a1028 50%, #251520 100%)',
  default: 'linear-gradient(135deg, #2a2520 0%, #1a1814 50%, #1a1814 100%)',
};

export default function ServiceCard({ service }) {
  const gradient = CATEGORY_GRADIENTS[service.category] || CATEGORY_GRADIENTS.default;
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group block bg-card-dark border border-card-border rounded overflow-hidden transition-all duration-[400ms] hover:-translate-y-1 hover:border-gold-border no-underline h-full"
    >
      <div
        className="relative overflow-hidden"
        style={{ height: 220, background: gradient }}
      >
        {service.image_url && (
          <img
            src={service.image_url}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-95 transition-opacity duration-500"
            loading="lazy"
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.85) 100%)',
          }}
        />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display font-medium text-cream text-[22px] leading-tight m-0">
            {service.title}
          </h3>
        </div>
      </div>

      <div className="px-5 pt-4 pb-5">
        <p className="font-body text-sm text-warm-gray leading-relaxed mb-4">
          {service.description}
        </p>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {service.category && (
            <span className="inline-block font-accent uppercase tracking-[0.15em] text-[11px] text-gold border border-gold-border px-3 py-1.5 rounded-sm">
              {service.category}
            </span>
          )}
          <div className="flex items-center gap-3 font-body text-[13px]">
            {service.duration && <span className="text-warm-gray">{service.duration}</span>}
            {service.price_label && (
              <span className="text-gold">{service.price_label}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
