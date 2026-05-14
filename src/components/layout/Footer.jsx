import { Link } from 'react-router-dom';
import SolisLogo from '../ui/SolisLogo';

const linkGroups = [
  {
    title: 'Navigate',
    links: [
      { to: '/retreats', label: 'Retreats' },
      { to: '/services', label: 'Services' },
      { to: '/shop', label: 'Apothecary' },
      { to: '/contact', label: 'Consultations' },
      { to: '/about', label: 'About' },
    ],
  },
  {
    title: 'Support',
    links: [
      { to: '/contact', label: 'Contact' },
      { to: '/contact', label: 'FAQ' },
      { to: '/contact', label: 'Shipping' },
      { to: '/contact', label: 'Returns' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-card-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-12">
        <div className="flex flex-wrap gap-10 justify-between mb-10">
          {/* Brand */}
          <div className="max-w-[280px]">
            <div className="flex items-center gap-3 mb-4">
              <SolisLogo size={32} />
              <span className="font-accent uppercase tracking-[0.2em] text-sm text-gold">
                Solis Imperium
              </span>
            </div>
            <p className="font-body text-[13px] text-warm-gray leading-relaxed">
              Sacred wellness for the modern imperium. Ancient codes, contemporary practice.
            </p>
          </div>

          {/* Link columns */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <div className="font-accent uppercase tracking-[0.2em] text-[11px] text-gold-dim mb-4">
                {group.title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link, idx) => (
                  <li key={`${link.label}-${idx}`}>
                    <Link
                      to={link.to}
                      className="font-body text-[13px] text-sand hover:text-gold transition-colors no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div>
            <div className="font-accent uppercase tracking-[0.2em] text-[11px] text-gold-dim mb-4">
              Connect
            </div>
            <div className="flex gap-3">
              {['IG', 'TW', 'YT'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full border border-card-border flex items-center justify-center font-accent text-[10px] text-sand hover:text-gold hover:border-gold-border transition-all"
                  aria-label={s}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-card-border pt-6 flex flex-wrap justify-between gap-3">
          <span className="font-body text-xs text-warm-gray">
            &copy; {new Date().getFullYear()} Solis Imperium. All rights reserved.
          </span>
          <div className="flex gap-5">
            <Link to="/contact" className="font-body text-xs text-warm-gray hover:text-gold transition-colors">
              Privacy
            </Link>
            <Link to="/contact" className="font-body text-xs text-warm-gray hover:text-gold transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
