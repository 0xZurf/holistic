import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Link } from 'react-router-dom';

const featured = [
  {
    slug: 'nutritional-consulting',
    title: 'Nutritional Consulting',
    description: 'Personalized nutrition plans tailored to your unique body chemistry and wellness goals.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
    category: 'Nutrition',
  },
  {
    slug: 'energy-healing',
    title: 'Energy Healing',
    description: 'Restore balance and vitality through Reiki and chakra alignment techniques.',
    image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400&h=300&fit=crop',
    category: 'Energy Healing',
  },
  {
    slug: 'life-coaching',
    title: 'Holistic Life Coaching',
    description: 'Discover clarity and purpose with guided sessions focused on your whole-life wellbeing.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    category: 'Life Coaching',
  },
];

export default function FeaturedServices() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="font-accent text-sage text-lg mb-2">What We Offer</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal">
            Our Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {featured.map((service) => (
            <Link key={service.slug} to={`/services/${service.slug}`} className="group">
              <Card>
                <Card.Image src={service.image} alt={service.title} className="h-48 sm:h-56" />
                <Card.Body>
                  <Badge className="mb-3">{service.category}</Badge>
                  <h3 className="font-display text-xl font-semibold text-charcoal mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{service.description}</p>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button to="/services" variant="outline">View All Services</Button>
        </div>
      </div>
    </section>
  );
}
