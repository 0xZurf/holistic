import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-sage text-white hover:bg-sage/90 shadow-md hover:shadow-lg',
  secondary: 'bg-earth text-cream hover:bg-earth/90 shadow-md hover:shadow-lg',
  outline: 'border-2 border-sage text-sage hover:bg-sage hover:text-white',
  ghost: 'text-sage hover:bg-sage/10',
  gold: 'bg-gold text-white hover:bg-gold/90 shadow-md hover:shadow-lg',
};

const sizes = {
  sm: 'px-4 py-2 text-sm min-h-[36px]',
  md: 'px-6 py-3 text-sm min-h-[44px]',
  lg: 'px-8 py-4 text-base min-h-[48px]',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  className = '',
  ...props
}) {
  const classes = `inline-flex items-center justify-center font-medium rounded-xl tracking-wide uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;

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
