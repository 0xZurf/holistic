import { forwardRef } from 'react';

const Textarea = forwardRef(function Textarea({ label, error, className = '', rows = 4, ...props }, ref) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-charcoal/70 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full px-4 py-3 rounded-xl border bg-white text-charcoal placeholder:text-charcoal/30 transition-colors focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage resize-y ${
          error ? 'border-red-400' : 'border-sand'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

export default Textarea;
