import { useParams } from 'react-router-dom';
import RetreatDetail from '../components/retreats/RetreatDetail';

const mockRetreats = {
  'desert-renewal': {
    title: 'Desert Renewal Retreat',
    description: 'A transformative 3-day journey of self-discovery amidst the healing energy of the desert landscape.',
    body: '<p>Immerse yourself in the breathtaking beauty of Sedona for three days of deep healing and personal transformation. This intimate retreat brings together a small group of like-minded seekers for an unforgettable experience.</p><p>Activities include guided meditation at sunrise, energy healing sessions, nature walks through red rock canyons, nourishing whole-food meals, and evening sharing circles.</p>',
    image_url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1510137600163-2729bc6959a4?w=400&h=400&fit=crop',
    ],
    location: 'Sedona, AZ',
    start_date: '2026-07-15',
    end_date: '2026-07-18',
    price: 125000,
    capacity: 12,
    spots_remaining: 5,
  },
};

export default function RetreatPage() {
  const { slug } = useParams();
  const retreat = mockRetreats[slug];

  if (!retreat) {
    return (
      <div className="section-padding text-center">
        <div className="container-main">
          <h1 className="font-display text-3xl text-charcoal">Retreat not found</h1>
        </div>
      </div>
    );
  }

  return <RetreatDetail retreat={retreat} />;
}
