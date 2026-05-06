import { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, error, className = '', ...props }, ref) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-charcoal/70 mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-4 py-3 min-h-[44px] rounded-xl border bg-white text-charcoal placeholder:text-charcoal/30 transition-colors focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage ${
          error ? 'border-red-400' : 'border-sand'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

export default Input;
