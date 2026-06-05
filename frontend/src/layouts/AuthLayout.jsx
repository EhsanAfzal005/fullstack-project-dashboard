import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import ThemeToggle from '../components/ui/ThemeToggle';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex flex-col transition-colors duration-300">
      {/* Simple top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <LayoutDashboard className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            ProjectHub
          </span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Centered card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
