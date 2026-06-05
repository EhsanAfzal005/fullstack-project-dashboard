export default function Skeleton({ className = '', variant = 'rect' }) {
  const base = 'animate-pulse bg-slate-200 dark:bg-slate-700 rounded';

  if (variant === 'circle') {
    return <div className={`${base} rounded-full ${className}`} />;
  }

  if (variant === 'text') {
    return <div className={`${base} h-4 ${className}`} />;
  }

  return <div className={`${base} ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-3/4" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-4 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonStat() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800 p-6">
      <div className="flex items-center gap-4">
        <Skeleton variant="circle" className="h-12 w-12" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" className="w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
}
