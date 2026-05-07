import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MobileNav from './MobileNav';
import useCart from '../../hooks/useCart';

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
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sand">
      <div className="container-main flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        <Link to="/" className="font-display text-2xl sm:text-3xl font-semibold text-earth tracking-wide">
          Solis Imperium
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
            className="relative text-charcoal/70 hover:text-sage transition-colors"
            aria-label={`Cart${count > 0 ? `, ${count} items` : ''}`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/cart"
            className="relative p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-charcoal/70"
            aria-label={`Cart${count > 0 ? `, ${count} items` : ''}`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {count > 0 && (
              <span className="absolute top-0 right-0 bg-gold text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </header>
  );
}
