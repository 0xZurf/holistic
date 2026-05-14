import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SolisLogo from '../ui/SolisLogo';

export default function MobileNav({ open, onClose, links }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(10,10,10,0.78)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 transform transition-transform duration-300 bg-card-dark border-l border-gold-border ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-card-border">
          <Link to="/" onClick={onClose} className="flex items-center gap-2 no-underline">
            <SolisLogo size={28} />
            <span className="font-accent uppercase tracking-[0.2em] text-[11px] text-gold">
              Solis Imperium
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-sand hover:text-gold transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `px-4 py-3 rounded-sm font-accent uppercase tracking-[0.15em] text-[13px] transition-colors min-h-[44px] flex items-center border ${
                  isActive
                    ? 'text-gold border-gold-border bg-gold/[0.04]'
                    : 'text-sand border-transparent hover:text-gold hover:border-gold-border'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/cart"
            onClick={onClose}
            className="px-4 py-3 rounded-sm font-accent uppercase tracking-[0.15em] text-[13px] text-sand hover:text-gold border border-transparent hover:border-gold-border transition-colors min-h-[44px] flex items-center"
          >
            Cart
          </Link>
        </nav>
      </div>
    </>
  );
}
