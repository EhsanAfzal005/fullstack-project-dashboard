import { Filter } from 'lucide-react';
import { PROJECT_STATUSES } from '../../utils/constants';

export default function StatusFilter({ value, onChange, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Filter className="h-4 w-4 text-slate-400 dark:text-slate-500" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-full w-full appearance-none rounded-lg border bg-white py-2.5 pl-10 pr-8 text-sm
          text-slate-900 transition-all duration-200
          focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20
          dark:bg-slate-800 dark:border-slate-600 dark:text-white
          border-slate-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20
        "
      >
        <option value="">All Statuses</option>
        {PROJECT_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}
