import Button from '../components/ui/Button';
import SacredGeoBg from '../components/ui/SacredGeoBg';

export default function NotFound() {
  return (
    <div
      className="relative bg-dark-bg text-center overflow-hidden"
      style={{ padding: '120px clamp(16px, 4vw, 48px)' }}
    >
      <SacredGeoBg opacity={0.04} />
      <div className="relative z-10 max-w-[640px] mx-auto">
        <h1
          className="font-display font-light text-gold m-0 mb-2"
          style={{ fontSize: 'clamp(96px, 16vw, 180px)', lineHeight: 1, opacity: 0.4 }}
        >
          404
        </h1>
        <h2
          className="font-display font-light text-cream m-0 mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.01em' }}
        >
          Page Not Found
        </h2>
        <p className="font-body text-warm-gray mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button to="/">Back to Home</Button>
      </div>
    </div>
  );
}
