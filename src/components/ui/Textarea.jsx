import { forwardRef } from 'react';

const Textarea = forwardRef(function Textarea({ label, error, className = '', rows = 4, ...props }, ref) {
  return (
    <div className={className}>
      {label && (
        <label className="block font-accent uppercase tracking-[0.15em] text-[11px] text-gold-dim mb-2">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full px-4 py-3 rounded-sm border bg-card-dark text-cream placeholder:text-warm-gray/60 font-body text-sm transition-colors duration-300 focus:outline-none focus:border-gold-border resize-y ${
          error ? 'border-red-500/60' : 'border-card-border'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400/80">{error}</p>}
    </div>
  );
});

export default Textarea;
