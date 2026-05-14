import { useRef } from 'react';

export default function ImageUpload({ value, onChange, label = 'Image', className = '' }) {
  const inputRef = useRef(null);

  function handleChange(e) {
    const file = e.target.files?.[0];
    if (file) onChange(file);
  }

  return (
    <div className={className}>
      {label && (
        <label className="block font-accent uppercase tracking-[0.15em] text-[11px] text-gold-dim mb-2">{label}</label>
      )}
      <div
        onClick={() => inputRef.current?.click()}
        className="border border-dashed border-card-border rounded-sm p-6 text-center cursor-pointer hover:border-gold-border bg-card-dark transition-colors"
      >
        {value ? (
          <img
            src={typeof value === 'string' ? value : URL.createObjectURL(value)}
            alt="Preview"
            className="mx-auto max-h-48 rounded-sm object-cover"
          />
        ) : (
          <div className="text-warm-gray">
            <svg className="w-10 h-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
            <p className="font-body text-sm">Click to upload</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
