import { useState } from 'react';
import Button from '../components/ui/Button';
import CartItem from '../components/shop/CartItem';
import useCart from '../hooks/useCart';
import { formatPrice } from '../lib/formatters';
import { createCheckoutSession } from '../lib/api';
import { useToast } from '../components/ui/Toast';

export default function Cart() {
  const { items, total } = useCart();
  const [loading, setLoading] = useState(false);
  const addToast = useToast();

  async function handleCheckout() {
    setLoading(true);
    try {
      const { url } = await createCheckoutSession(items);
      window.location.href = url;
    } catch (err) {
      addToast(err.message || 'Checkout failed. Please try again.', 'error');
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div
        className="bg-dark-bg text-center"
        style={{ padding: '80px clamp(16px, 4vw, 48px)' }}
      >
        <div className="max-w-[640px] mx-auto">
          <h1
            className="font-display font-light text-cream m-0 mb-4"
            style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '-0.01em' }}
          >
            Your <span className="text-gold">Cart</span>
          </h1>
          <p className="font-body text-warm-gray mb-8">Your cart is empty.</p>
          <Button to="/shop">Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-bg" style={{ padding: '80px clamp(16px, 4vw, 48px)' }}>
      <div className="max-w-[800px] mx-auto">
        <h1
          className="font-display font-light text-cream m-0 mb-10"
          style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '-0.01em' }}
        >
          Your <span className="text-gold">Cart</span>
        </h1>

        <div className="space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-10 border-t border-card-border pt-6">
          <div className="flex items-center justify-between mb-6">
            <span className="font-display font-light text-cream text-xl">Total</span>
            <span className="font-display text-gold text-2xl">
              {formatPrice(total)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button to="/shop" variant="secondary" className="flex-1">
              Continue Shopping
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Redirecting...' : 'Proceed to Checkout'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
