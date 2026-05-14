import { useState } from 'react';

export default function ProductGallery({ images, title }) {
  const [active, setActive] = useState(0);
  const cleaned = (images || []).filter(Boolean);

  return (
    <div>
      <div
        className="relative aspect-square rounded overflow-hidden border border-card-border mb-4"
        style={{
          background:
            'linear-gradient(135deg, #2a2520 0%, #1a1814 50%, #1a1814 100%)',
        }}
      >
        {cleaned[active] && (
          <img
            src={cleaned[active]}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.45) 100%)',
          }}
        />
      </div>
      {cleaned.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {cleaned.map((url, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`aspect-square rounded overflow-hidden border transition-colors ${
                i === active ? 'border-gold' : 'border-card-border hover:border-gold-border'
              }`}
            >
              <img src={url} alt={`${title} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
