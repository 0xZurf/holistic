import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function ServiceCard({ service }) {
  return (
    <Link to={`/services/${service.slug}`} className="group">
      <Card>
        <Card.Image src={service.image_url} alt={service.title} className="h-48 sm:h-56" />
        <Card.Body>
          <Badge className="mb-3">{service.category}</Badge>
          <h3 className="font-display text-xl font-semibold text-charcoal mb-2">
            {service.title}
          </h3>
          <p className="text-sm text-charcoal/60 leading-relaxed mb-3">{service.description}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-charcoal/50">{service.duration}</span>
            <span className="font-semibold text-sage">{service.price_label}</span>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}
