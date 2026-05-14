import { Link } from 'react-router-dom';

const base =
  'inline-flex items-center justify-center font-accent uppercase tracking-[0.15em] rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';

const variants = {
  primary:
    'text-dark-bg font-semibold bg-gradient-to-br from-gold to-gold-light hover:brightness-105 border-0',
  gold:
    'text-dark-bg font-semibold bg-gradient-to-br from-gold to-gold-light hover:brightness-105 border-0',
  secondary:
    'text-gold border border-gold-border bg-transparent hover:bg-gold/[0.06] hover:border-gold',
  outline:
    'text-gold border border-gold-border bg-transparent hover:bg-gold/[0.06] hover:border-gold',
  ghost: 'text-gold hover:text-gold-light bg-transparent border-0',
};

const sizes = {
  sm: 'px-5 py-2.5 text-[11px] min-h-[36px]',
  md: 'px-7 py-3 text-[13px] min-h-[44px]',
  lg: 'px-9 py-3.5 text-[13px] min-h-[48px]',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  className = '',
  ...props
}) {
  const classes = `${base} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
