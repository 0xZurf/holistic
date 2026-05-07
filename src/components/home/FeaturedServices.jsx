import { Link } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { getServices } from '../../lib/api';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import FadeIn from '../ui/FadeIn';
import { CardGridSkeleton } from '../ui/Skeleton';

export default function FeaturedServices() {
  const { data, loading } = useApi(getServices);
  const featured = (data || []).slice(0, 3);

  return (
    <section className="section-padding bg-cream">
      <div className="container-main">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="font-accent text-sage text-lg mb-2">What We Offer</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal">
              Our Services
            </h2>
          </div>
        </FadeIn>

        {loading ? (
          <CardGridSkeleton count={3} imageClass="h-48 sm:h-56" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
            {featured.map((service, i) => (
              <FadeIn key={service.slug} delay={i * 100}>
                <Link to={`/services/${service.slug}`} className="group block">
                  <Card>
                    <Card.Image src={service.image_url} alt={service.title} className="h-48 sm:h-56" />
                    <Card.Body>
                      <Badge className="mb-3">{service.category}</Badge>
                      <h3 className="font-display text-xl font-semibold text-charcoal mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-charcoal/60 leading-relaxed">{service.description}</p>
                    </Card.Body>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}

        <FadeIn>
          <div className="text-center">
            <Button to="/services" variant="outline">View All Services</Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
