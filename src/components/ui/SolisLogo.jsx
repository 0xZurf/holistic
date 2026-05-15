export default function SolisLogo({ size = 80, alt = 'Solis Imperium' }) {
  return (
    <img
      src="/images/Solis-Logo.png"
      alt={alt}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
    />
  );
}
