import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { formatDateRange, formatPrice } from '../../lib/formatters';

export default function RetreatDetail({ retreat }) {
  return (
    <div>
      <div className="relative h-64 sm:h-80 lg:h-[28rem] grain-overlay">
        <img
          src={retreat.image_url}
          alt={retreat.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
      </div>

      <div className="section-padding">
        <div className="container-main max-w-4xl -mt-20 relative">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="clay">{retreat.location}</Badge>
              <Badge variant={retreat.spots_remaining <= 3 ? 'gold' : 'sage'}>
                {retreat.spots_remaining} of {retreat.capacity} spots left
              </Badge>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal mb-4">
              {retreat.title}
            </h1>

            <div className="flex flex-wrap gap-6 mb-8 text-sm text-charcoal/70">
              <span>{formatDateRange(retreat.start_date, retreat.end_date)}</span>
              <span>{retreat.location}</span>
              <span className="font-semibold text-charcoal text-base">
                {formatPrice(retreat.price)}
              </span>
            </div>

            {retreat.gallery && retreat.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-8">
                {retreat.gallery.map((url, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden">
                    <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            <div
              className="prose prose-charcoal max-w-none mb-8 text-charcoal/70 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: retreat.body }}
            />

            <Button variant="gold" size="lg">Reserve Your Spot</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
