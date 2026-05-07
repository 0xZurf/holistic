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
      <div className="section-padding text-center">
        <div className="container-main max-w-2xl">
          <h1 className="font-display text-4xl font-semibold text-charcoal mb-4">Your Cart</h1>
          <p className="text-charcoal/60 mb-8">Your cart is empty.</p>
          <Button to="/shop">Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-main max-w-3xl">
        <h1 className="font-display text-4xl font-semibold text-charcoal mb-8">Your Cart</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-8 border-t border-sand pt-6">
          <div className="flex items-center justify-between mb-6">
            <span className="font-display text-xl text-charcoal">Total</span>
            <span className="font-display text-2xl font-semibold text-charcoal">
              {formatPrice(total)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button to="/shop" variant="outline" className="flex-1">
              Continue Shopping
            </Button>
            <Button
              variant="gold"
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
