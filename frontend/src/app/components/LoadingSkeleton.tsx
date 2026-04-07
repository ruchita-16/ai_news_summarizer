export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 animate-pulse"
        >
          <div className="h-48 bg-white/10"></div>
          <div className="p-6 space-y-4">
            <div className="h-4 bg-white/10 rounded w-20"></div>
            <div className="h-6 bg-white/10 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-white/10 rounded"></div>
              <div className="h-4 bg-white/10 rounded w-5/6"></div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 h-10 bg-white/10 rounded-lg"></div>
              <div className="flex-1 h-10 bg-white/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
