import { useParams } from 'react-router-dom';
import ServiceDetail from '../components/services/ServiceDetail';

const mockServices = {
  'nutritional-consulting': {
    title: 'Nutritional Consulting',
    description: 'Personalized nutrition plans tailored to your unique body chemistry and wellness goals.',
    body: '<p>Our nutritional consulting service takes a comprehensive approach to your dietary needs. Through detailed assessment and personalized planning, we create a nutrition roadmap that supports your unique health journey.</p><p>Each session includes a thorough review of your current diet, health goals, and any specific concerns. We work together to build sustainable eating habits that nourish both body and mind.</p>',
    image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=800&fit=crop',
    price: 15000,
    price_label: 'Starting at $150/session',
    duration: '60 minutes',
    category: 'Nutrition',
  },
};

export default function ServicePage() {
  const { slug } = useParams();
  const service = mockServices[slug];

  if (!service) {
    return (
      <div className="section-padding text-center">
        <div className="container-main">
          <h1 className="font-display text-3xl text-charcoal">Service not found</h1>
        </div>
      </div>
    );
  }

  return <ServiceDetail service={service} />;
}
