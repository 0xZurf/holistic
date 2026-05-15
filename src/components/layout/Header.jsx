import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MobileNav from './MobileNav';
import SolisLogo from '../ui/SolisLogo';
import useCart from '../../hooks/useCart';

const leftLinks = [
  { to: '/retreats', label: 'Retreats' },
  { to: '/services', label: 'Services' },
  { to: '/shop', label: 'Apothecary' },
];

const rightLinks = [
  { to: '/contact', label: 'Consultations' },
  { to: '/about', label: 'About' },
];

const allNavLinks = [
  { to: '/', label: 'Home' },
  ...leftLinks,
  ...rightLinks,
];

const linkClasses = ({ isActive }) =>
  `font-accent uppercase tracking-[0.12em] text-[13px] transition-colors duration-300 no-underline ${
    isActive ? 'text-gold' : 'text-sand hover:text-gold'
  }`;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.25)' : '1px solid transparent',
        transition: 'all 0.4s ease',
        padding: '0 clamp(16px, 4vw, 48px)',
      }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[112px]">
        {/* Left links (desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          {leftLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Centered Logo */}
        <Link
          to="/"
          className="flex flex-col items-center gap-0.5 no-underline"
          aria-label="Solis Imperium home"
        >
          <SolisLogo size={72} />
          <span className="font-accent uppercase tracking-[0.25em] text-[10px] text-gold">
            Solis Imperium
          </span>
        </Link>

        {/* Right links + cart (desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          {rightLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/cart"
            className="font-accent uppercase tracking-[0.12em] text-[13px] text-sand hover:text-gold transition-colors duration-300 no-underline flex items-center gap-1.5"
            aria-label={`Cart${count > 0 ? `, ${count} items` : ''}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span>Cart ({count})</span>
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/cart"
            className="relative p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-sand hover:text-gold transition-colors"
            aria-label={`Cart${count > 0 ? `, ${count} items` : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {count > 0 && (
              <span
                className="absolute top-0 right-0 font-accent text-[10px] text-dark-bg flex items-center justify-center"
                style={{
                  width: 18,
                  height: 18,
                  background: 'linear-gradient(135deg, #c9a84c, #e8d48b)',
                  borderRadius: 2,
                }}
              >
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-cream"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={allNavLinks} />
    </header>
  );
}
