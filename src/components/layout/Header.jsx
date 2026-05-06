import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MobileNav from './MobileNav';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/retreats', label: 'Retreats' },
  { to: '/shop', label: 'Shop' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sand">
      <div className="container-main flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        <Link to="/" className="font-display text-2xl sm:text-3xl font-semibold text-earth tracking-wide">
          Holistic
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide uppercase transition-colors hover:text-sage ${
                  isActive ? 'text-sage' : 'text-charcoal/70'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/cart"
            className="text-sm font-medium tracking-wide uppercase text-charcoal/70 hover:text-sage transition-colors"
          >
            Cart
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </header>
  );
}
