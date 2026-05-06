import Button from '../components/ui/Button';

export default function CheckoutSuccess() {
  return (
    <div className="section-padding text-center">
      <div className="container-main max-w-2xl">
        <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="font-display text-4xl font-semibold text-charcoal mb-4">
          Thank You!
        </h1>
        <p className="text-charcoal/60 text-lg mb-8 leading-relaxed">
          Your order has been confirmed. You'll receive a confirmation email shortly with your order details.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button to="/shop">Continue Shopping</Button>
          <Button to="/" variant="outline">Back to Home</Button>
        </div>
      </div>
    </div>
  );
}
