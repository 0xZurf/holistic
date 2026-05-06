import { forwardRef } from 'react';

const Select = forwardRef(function Select({ label, error, options = [], placeholder, className = '', ...props }, ref) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-charcoal/70 mb-1.5">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`w-full px-4 py-3 min-h-[44px] rounded-xl border bg-white text-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%232C2C2C%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center] pr-10 ${
          error ? 'border-red-400' : 'border-sand'
        }`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

export default Select;
