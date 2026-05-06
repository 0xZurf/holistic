import TestimonialCard from './TestimonialCard';

const mockTestimonials = [
  {
    id: '1',
    name: 'Sarah M.',
    title: 'Yoga Instructor',
    body: 'The nutritional consulting completely transformed my relationship with food. I feel more energized and balanced than ever before.',
    image_url: null,
    rating: 5,
  },
  {
    id: '2',
    name: 'James K.',
    title: null,
    body: 'The Desert Renewal Retreat was a life-changing experience. I came home with a renewed sense of purpose and clarity.',
    image_url: null,
    rating: 5,
  },
  {
    id: '3',
    name: 'Elena R.',
    title: 'Wellness Coach',
    body: 'I recommend the adaptogen blend to all my clients. The quality is exceptional and the results speak for themselves.',
    image_url: null,
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-sand">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="font-accent text-sage text-lg mb-2">Kind Words</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {mockTestimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
