import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatDateRange, formatPrice } from '../../lib/formatters';

export default function RetreatCard({ retreat }) {
  return (
    <Link to={`/retreats/${retreat.slug}`} className="group">
      <Card>
        <Card.Image src={retreat.image_url} alt={retreat.title} className="h-56 sm:h-64" />
        <Card.Body>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="clay">{retreat.location}</Badge>
            <Badge variant={retreat.spots_remaining <= 3 ? 'gold' : 'sage'}>
              {retreat.spots_remaining} spots left
            </Badge>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-charcoal mb-2">
            {retreat.title}
          </h3>
          <p className="text-sm text-charcoal/60 leading-relaxed mb-4">{retreat.description}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-charcoal/50">
              {formatDateRange(retreat.start_date, retreat.end_date)}
            </span>
            <span className="font-semibold text-charcoal">{formatPrice(retreat.price)}</span>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}
