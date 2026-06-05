import { Loader2 } from 'lucide-react';

export default function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2
        className={`${sizes[size]} animate-spin text-indigo-600 dark:text-indigo-400`}
      />
    </div>
  );
}

export function FullPageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600 dark:text-indigo-400 mx-auto" />
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Loading...</p>
      </div>
    </div>
  );
}
