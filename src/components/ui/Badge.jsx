const variants = {
  sage: 'bg-sage/10 text-sage',
  earth: 'bg-earth/10 text-earth',
  clay: 'bg-clay/10 text-clay',
  gold: 'bg-gold/10 text-gold',
  charcoal: 'bg-charcoal/10 text-charcoal',
};

export default function Badge({ children, variant = 'sage', className = '' }) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
