import { useEffect } from 'react';
import Button from '../components/ui/Button';
import SolisLogo from '../components/ui/SolisLogo';
import useCart from '../hooks/useCart';

export default function CheckoutSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div
      className="bg-dark-bg text-center"
      style={{ padding: '80px clamp(16px, 4vw, 48px)' }}
    >
      <div className="max-w-[640px] mx-auto">
        <div className="flex justify-center mb-6">
          <SolisLogo size={96} />
        </div>
        <h1
          className="font-display font-light text-cream m-0 mb-4"
          style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '-0.01em' }}
        >
          Thank <span className="text-gold">You</span>.
        </h1>
        <p
          className="font-body text-warm-gray mx-auto mb-10"
          style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 480 }}
        >
          Your order has been confirmed. You'll receive a confirmation transmission shortly
          with your order details.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button to="/shop">Continue Shopping</Button>
          <Button to="/" variant="secondary">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
