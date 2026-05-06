export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden ${
        hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-md' : 'shadow-md'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Image = function CardImage({ src, alt, className = '' }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
};

Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`p-5 sm:p-6 ${className}`}>{children}</div>;
};
