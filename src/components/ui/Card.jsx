export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`bg-card-dark border border-card-border rounded overflow-hidden ${
        hover
          ? 'transition-all duration-400 ease-out hover:-translate-y-1 hover:border-gold-border'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Image = function CardImage({ src, alt, className = '' }) {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div
          className="w-full h-full"
          style={{
            background:
              'linear-gradient(135deg, #2a2520 0%, #1a1814 50%, #1a1814 100%)',
          }}
        />
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.85) 100%)',
        }}
      />
    </div>
  );
};

Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`p-5 sm:p-6 ${className}`}>{children}</div>;
};
