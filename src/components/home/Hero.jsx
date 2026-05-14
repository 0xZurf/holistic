import { Link } from 'react-router-dom';
import SacredGeoBg from '../ui/SacredGeoBg';

export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-center text-center overflow-hidden"
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.08) 0%, #0f0e0c 70%)',
        padding: '120px clamp(16px, 4vw, 48px) 80px',
      }}
    >
      <SacredGeoBg opacity={0.035} />

      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-[900px]">
        <div className="font-accent uppercase tracking-[0.35em] text-[12px] text-gold-dim mb-8">
          Sacred Wellness for the Modern Imperium
        </div>
        <h1
          className="font-display font-light text-cream m-0"
          style={{
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            marginBottom: 24,
          }}
        >
          Radiance, Realized:
          <br />
          <span className="text-gold">Immeasurable Integration</span>
          <br />
          for the Global Imperium.
        </h1>
        <p
          className="font-body text-warm-gray mx-auto"
          style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}
        >
          Where ancient solar codes meet modern healing science. Retreats, energy work,
          sacred botanicals, and holistic consulting for those ready to embody their highest
          frequency.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/services" className="btn-primary">
            Explore Offerings
          </Link>
          <Link to="/about" className="btn-secondary">
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
