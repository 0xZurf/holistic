import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

let showToastFn = null;

export function triggerCartToast(title) {
  showToastFn?.(title);
}

export default function CartToast() {
  const [visible, setVisible] = useState(false);
  const [itemTitle, setItemTitle] = useState('');

  const show = useCallback((title) => {
    setItemTitle(title);
    setVisible(true);
  }, []);

  useEffect(() => {
    showToastFn = show;
    return () => { showToastFn = null; };
  }, [show]);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 bg-earth text-cream rounded-xl shadow-lg px-5 py-3 flex items-center gap-3 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <span className="text-sm font-medium">{itemTitle} added to cart</span>
      <Link
        to="/cart"
        className="text-sm font-semibold text-gold hover:text-gold/80 transition-colors ml-1"
        onClick={() => setVisible(false)}
      >
        View
      </Link>
    </div>
  );
}
