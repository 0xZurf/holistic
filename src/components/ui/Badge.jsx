const variants = {
  gold: 'text-gold border-gold-border',
  sage: 'text-gold border-gold-border',
  earth: 'text-gold border-gold-border',
  clay: 'text-gold border-gold-border',
  charcoal: 'text-sand border-card-border',
  muted: 'text-warm-gray border-card-border',
};

export default function Badge({ children, variant = 'gold', className = '' }) {
  return (
    <span
      className={`inline-block font-accent uppercase tracking-[0.15em] text-[10px] sm:text-[11px] px-3 py-1 border rounded-sm ${
        variants[variant] || variants.gold
      } ${className}`}
    >
      {children}
    </span>
  );
}
