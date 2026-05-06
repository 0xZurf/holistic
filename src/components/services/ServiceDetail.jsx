import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function ServiceDetail({ service }) {
  return (
    <div>
      <div className="relative h-64 sm:h-80 lg:h-96 grain-overlay">
        <img
          src={service.image_url}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
      </div>

      <div className="section-padding">
        <div className="container-main max-w-3xl -mt-20 relative">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10">
            <Badge className="mb-4">{service.category}</Badge>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal mb-4">
              {service.title}
            </h1>

            <div className="flex flex-wrap gap-6 mb-8 text-sm text-charcoal/70">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {service.duration}
              </div>
              <div className="font-semibold text-charcoal text-base">
                {service.price_label}
              </div>
            </div>

            <div
              className="prose prose-charcoal max-w-none mb-8 text-charcoal/70 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: service.body }}
            />

            <Button variant="gold" size="lg">Book Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
