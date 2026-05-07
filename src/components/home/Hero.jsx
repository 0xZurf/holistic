import Button from '../ui/Button';
import FadeIn from '../ui/FadeIn';
import { SITE_NAME, SITE_TAGLINE } from '../../lib/constants';

export default function Hero() {
  return (
    <section className="relative grain-overlay bg-gradient-to-br from-earth via-earth/90 to-sage/80 text-cream overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=1600&h=900&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative container-main px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-2xl">
          <FadeIn delay={100} direction="none">
            <p className="font-accent text-gold text-xl sm:text-2xl mb-4">{SITE_TAGLINE}</p>
          </FadeIn>
          <FadeIn delay={200}>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              {SITE_NAME}
            </h1>
          </FadeIn>
          <FadeIn delay={350}>
            <p className="text-lg sm:text-xl text-cream/80 leading-relaxed mb-8 max-w-xl">
              Discover a path to wellness that honors your whole being. Through personalized consulting,
              transformative retreats, and curated wellness products.
            </p>
          </FadeIn>
          <FadeIn delay={500}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/services" variant="gold" size="lg">
                Explore Services
              </Button>
              <Button to="/about" variant="outline" size="lg" className="border-cream/40 text-cream hover:bg-cream/10 hover:text-cream">
                Our Story
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
