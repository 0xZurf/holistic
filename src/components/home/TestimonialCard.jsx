export default function TestimonialCard({ testimonial }) {
  return (
    <div
      className="relative bg-card-dark border border-card-border rounded"
      style={{ padding: '32px 28px' }}
    >
      <div
        aria-hidden="true"
        className="absolute font-display text-gold-dim"
        style={{ top: 16, left: 24, fontSize: 48, lineHeight: 1 }}
      >
        &ldquo;
      </div>

      <p
        className="font-body italic text-sand m-0"
        style={{ fontSize: 15, lineHeight: 1.7, margin: '16px 0 20px' }}
      >
        {testimonial.body}
      </p>

      <div className="border-t border-card-border pt-4">
        <div className="font-display font-medium text-cream text-base">
          {testimonial.name}
        </div>
        {testimonial.title && (
          <div className="font-body text-xs text-warm-gray">{testimonial.title}</div>
        )}
      </div>
    </div>
  );
}
