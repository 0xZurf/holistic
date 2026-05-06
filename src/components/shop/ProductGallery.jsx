import { useState } from 'react';

export default function ProductGallery({ images, title }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="aspect-square rounded-2xl overflow-hidden bg-sand mb-4">
        <img
          src={images[active]}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                i === active ? 'border-sage' : 'border-transparent'
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
