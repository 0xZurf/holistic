export default function SolisLogo({ size = 40, color = '#c9a84c' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="4" fill={color} />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 30 + 16 * Math.cos(rad);
        const y1 = 30 + 16 * Math.sin(rad);
        const x2 = 30 + 24 * Math.cos(rad);
        const y2 = 30 + 24 * Math.sin(rad);
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}
