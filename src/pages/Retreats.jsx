import RetreatCard from '../components/retreats/RetreatCard';

const mockRetreats = [
  {
    id: '1',
    slug: 'desert-renewal',
    title: 'Desert Renewal Retreat',
    description: 'A transformative 3-day journey of self-discovery amidst the healing energy of the desert landscape.',
    image_url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
    location: 'Sedona, AZ',
    start_date: '2026-07-15',
    end_date: '2026-07-18',
    price: 125000,
    capacity: 12,
    spots_remaining: 5,
  },
  {
    id: '2',
    slug: 'mountain-mindfulness',
    title: 'Mountain Mindfulness Retreat',
    description: 'Reconnect with nature and your inner self through guided meditation, yoga, and forest bathing.',
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
    location: 'Asheville, NC',
    start_date: '2026-09-20',
    end_date: '2026-09-24',
    price: 185000,
    capacity: 8,
    spots_remaining: 3,
  },
];

export default function Retreats() {
  return (
    <div className="section-padding">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="font-accent text-sage text-lg mb-2">Immersive Experiences</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-charcoal">
            Upcoming Retreats
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockRetreats.map((retreat) => (
            <RetreatCard key={retreat.id} retreat={retreat} />
          ))}
        </div>
      </div>
    </div>
  );
}
