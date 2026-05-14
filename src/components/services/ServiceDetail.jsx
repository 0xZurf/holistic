import { Link } from 'react-router-dom';

export default function ServiceDetail({ service }) {
  return (
    <div className="bg-dark-bg text-cream">
      {/* Hero image */}
      <div
        className="relative overflow-hidden"
        style={{
          height: 'clamp(280px, 50vw, 480px)',
          background:
            'linear-gradient(135deg, #3d2b1a 0%, #1a1208 50%, #2a1f10 100%)',
        }}
      >
        {service.image_url && (
          <img
            src={service.image_url}
            alt={service.title}
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

      <div
        className="relative"
        style={{ padding: '0 clamp(16px, 4vw, 48px) 80px' }}
      >
        <div className="max-w-[900px] mx-auto -mt-32 relative z-10">
          <div className="bg-card-dark border border-card-border rounded p-6 sm:p-10">
            {service.category && (
              <span className="inline-block font-accent uppercase tracking-[0.15em] text-[11px] text-gold border border-gold-border px-3 py-1.5 rounded-sm mb-5">
                {service.category}
              </span>
            )}
            <h1
              className="font-display font-light text-cream m-0 mb-5"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.01em' }}
            >
              {service.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-8 font-body text-[13px] text-sand">
              {service.duration && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gold-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {service.duration}
                </div>
              )}
              {service.price_label && (
                <span className="font-display text-cream text-lg">
                  {service.price_label}
                </span>
              )}
            </div>

            <div
              className="font-body text-warm-gray leading-relaxed mb-10 prose-headings:font-display prose-headings:text-cream prose-strong:text-cream prose-a:text-gold"
              style={{ lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: service.body }}
            />

            <Link to="/contact" className="btn-primary">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
