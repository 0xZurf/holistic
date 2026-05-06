export default function SectionDivider({ flip = false, color = 'cream', className = '' }) {
  const fills = {
    cream: '#FAF6F0',
    sand: '#E8DCC8',
    white: '#FFFFFF',
    earth: '#5C4033',
  };

  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-12 sm:h-16 lg:h-20"
        fill={fills[color] || fills.cream}
      >
        <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </div>
  );
}
