import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

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
        className={`fixed inset-0 bg-charcoal/40 z-50 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-cream z-50 shadow-xl transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-sand">
          <span className="font-display text-xl font-semibold text-earth">Menu</span>
          <button
            onClick={onClose}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
                `px-4 py-3 rounded-lg text-base font-medium transition-colors min-h-[44px] flex items-center ${
                  isActive
                    ? 'bg-sage/10 text-sage'
                    : 'text-charcoal/70 hover:bg-sand/50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/cart"
            onClick={onClose}
            className="px-4 py-3 rounded-lg text-base font-medium text-charcoal/70 hover:bg-sand/50 transition-colors min-h-[44px] flex items-center"
          >
            Cart
          </Link>
        </nav>
      </div>
    </>
  );
}
