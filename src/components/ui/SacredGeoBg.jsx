export default function SacredGeoBg({ opacity = 0.04 }) {
  const gold = '#c9a84c';
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <svg
        viewBox="0 0 600 600"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '120%',
          height: '120%',
          opacity,
        }}
      >
        <circle cx="300" cy="300" r="200" fill="none" stroke={gold} strokeWidth="0.5" />
        <circle cx="300" cy="300" r="150" fill="none" stroke={gold} strokeWidth="0.3" />
        <circle cx="300" cy="300" r="100" fill="none" stroke={gold} strokeWidth="0.3" />
        <circle cx="300" cy="100" r="200" fill="none" stroke={gold} strokeWidth="0.3" />
        <circle cx="300" cy="500" r="200" fill="none" stroke={gold} strokeWidth="0.3" />
        <circle cx="127" cy="200" r="200" fill="none" stroke={gold} strokeWidth="0.3" />
        <circle cx="473" cy="200" r="200" fill="none" stroke={gold} strokeWidth="0.3" />
        <circle cx="127" cy="400" r="200" fill="none" stroke={gold} strokeWidth="0.3" />
        <circle cx="473" cy="400" r="200" fill="none" stroke={gold} strokeWidth="0.3" />
        <line x1="300" y1="0" x2="300" y2="600" stroke={gold} strokeWidth="0.2" />
        <line x1="0" y1="300" x2="600" y2="300" stroke={gold} strokeWidth="0.2" />
        <line x1="0" y1="0" x2="600" y2="600" stroke={gold} strokeWidth="0.15" />
        <line x1="600" y1="0" x2="0" y2="600" stroke={gold} strokeWidth="0.15" />
      </svg>
    </div>
  );
}
