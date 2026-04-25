export const LoadingSkeleton = () => {
  return (
    <div className="space-y-3">
      <div className="h-8 w-1/3 animate-pulse rounded-lg bg-white/15" />
      <div className="h-52 animate-pulse rounded-2xl bg-white/10" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
      <div className="h-4 w-4/6 animate-pulse rounded bg-white/10" />
    </div>
  );
};
