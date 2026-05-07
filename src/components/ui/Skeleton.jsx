function Base({ className = '' }) {
  return <div className={`animate-pulse bg-sand/70 rounded-xl ${className}`} />;
}

export function CardSkeleton({ imageClass = 'h-48' }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <Base className={`${imageClass} rounded-none`} />
      <div className="p-5 sm:p-6 space-y-3">
        <Base className="h-4 w-20" />
        <Base className="h-6 w-3/4" />
        <Base className="h-4 w-full" />
        <Base className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 3, columns = 'grid-cols-1 md:grid-cols-3', imageClass = 'h-48' }) {
  return (
    <div className={`grid ${columns} gap-6 sm:gap-8`}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} imageClass={imageClass} />
      ))}
    </div>
  );
}

export function RetreatSpotlightSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white rounded-2xl shadow-lg overflow-hidden">
      <Base className="h-64 sm:h-80 lg:h-96 rounded-none" />
      <div className="p-6 sm:p-8 lg:p-10 space-y-4">
        <div className="flex gap-2">
          <Base className="h-6 w-24" />
          <Base className="h-6 w-28" />
        </div>
        <Base className="h-8 w-3/4" />
        <Base className="h-4 w-full" />
        <Base className="h-4 w-full" />
        <Base className="h-4 w-2/3" />
        <Base className="h-12 w-36 mt-4" />
      </div>
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Base key={i} className="h-5 w-5 rounded-full" />
        ))}
      </div>
      <Base className="h-4 w-full" />
      <Base className="h-4 w-full" />
      <Base className="h-4 w-3/4" />
      <div className="flex items-center gap-3 pt-2">
        <Base className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Base className="h-4 w-24" />
          <Base className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}
