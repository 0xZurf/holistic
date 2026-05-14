import { useState } from 'react';
import FadeIn from '../ui/FadeIn';
import SolisLogo from '../ui/SolisLogo';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Subscription handled via Resend integration; placeholder for now.
  }

  return (
    <section
      className="relative bg-dark-bg overflow-hidden"
      style={{ padding: '80px clamp(16px, 4vw, 48px)' }}
    >
      <div
        className="relative z-10 max-w-[640px] mx-auto text-center"
      >
        <FadeIn>
          <div className="flex justify-center">
            <SolisLogo size={48} />
          </div>
          <h2
            className="font-display font-light text-cream m-0"
            style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              margin: '20px 0 12px',
            }}
          >
            Receive the <span className="text-gold">Solar Codes</span>
          </h2>
          <p
            className="font-body text-warm-gray"
            style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}
          >
            Transmissions on holistic integration, upcoming retreats, new apothecary arrivals,
            and consciousness technology. Delivered with intention.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex gap-3 max-w-[480px] mx-auto flex-wrap sm:flex-nowrap"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 min-w-[200px] bg-card-dark border border-card-border rounded-sm text-cream font-body text-sm focus:border-gold-border focus:outline-none placeholder:text-warm-gray/60"
              style={{ padding: '14px 18px' }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '14px 28px', whiteSpace: 'nowrap' }}
            >
              Subscribe
            </button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
