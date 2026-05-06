import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="section-padding text-center">
      <div className="container-main max-w-2xl">
        <h1 className="font-display text-6xl sm:text-8xl font-bold text-sage/20 mb-4">404</h1>
        <h2 className="font-display text-3xl font-semibold text-charcoal mb-4">Page Not Found</h2>
        <p className="text-charcoal/60 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button to="/">Back to Home</Button>
      </div>
    </div>
  );
}
