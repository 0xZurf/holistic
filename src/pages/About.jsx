import { Link } from 'react-router-dom';
import FadeIn from '../components/ui/FadeIn';
import SacredGeoBg from '../components/ui/SacredGeoBg';
import GoldDripDivider from '../components/ui/GoldDripDivider';

export default function About() {
  return (
    <div className="bg-dark-bg text-cream">
      <section
        className="relative overflow-hidden"
        style={{ padding: '80px clamp(16px, 4vw, 48px) 60px' }}
      >
        <SacredGeoBg opacity={0.03} />

        {/* Dragon entering from the right edge */}
        <img
          src="/images/solis-dragon.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute hidden md:block"
          style={{
            top: '50%',
            right: 0,
            transform: 'translate(35%, -50%)',
            width: 'min(70vw, 900px)',
            height: 'auto',
            opacity: 0.55,
            zIndex: 1,
            maskImage:
              'linear-gradient(to left, rgba(0,0,0,1) 35%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'linear-gradient(to left, rgba(0,0,0,1) 35%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0) 100%)',
          }}
        />

        <div className="relative z-10 max-w-[1100px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="font-accent uppercase tracking-[0.3em] text-[11px] text-gold-dim">
                Our Story
              </span>
              <h1
                className="font-display font-light text-cream m-0"
                style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginTop: 12, letterSpacing: '-0.01em' }}
              >
                About the <span className="text-gold">Practitioner</span>
              </h1>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            <FadeIn direction="left">
              <div
                className="aspect-[3/4] rounded overflow-hidden border border-card-border relative"
                style={{
                  background:
                    'linear-gradient(135deg, #3d2b1a 0%, #1a1208 50%, #2a1f10 100%)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=800&fit=crop"
                  alt="Practitioner"
                  className="w-full h-full object-cover opacity-90"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.7) 100%)',
                  }}
                />
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <div className="font-body text-warm-gray space-y-6 leading-relaxed">
                <p>
                  With over a decade of experience in holistic wellness, I believe in treating
                  the whole person — mind, body, and spirit. My practice combines ancient
                  wisdom with modern science to create transformative healing experiences.
                </p>
                <p>
                  My journey began with a deep curiosity about the connection between physical
                  health and emotional well-being. Through years of study and practice, I've
                  developed an integrative approach that honors each individual's unique path
                  to wellness.
                </p>
                <p>
                  Whether through one-on-one consulting, immersive retreats, or carefully
                  curated wellness products, my mission is to empower you with the tools and
                  knowledge to live your most vibrant life.
                </p>
                <Link to="/services" className="btn-primary">
                  Explore Services
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      <GoldDripDivider />
    </div>
  );
}
