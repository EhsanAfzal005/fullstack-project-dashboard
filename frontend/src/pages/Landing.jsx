import { Link, Navigate } from 'react-router-dom';
import { LayoutDashboard, CheckCircle2, BarChart3, ShieldCheck } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

export default function Landing() {
  const { isAuthenticated, loading } = useAuth();

  if (!loading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    {
      title: 'Project Management',
      description: 'Organize your tasks, track progress, and hit your deadlines with our intuitive Kanban-style boards.',
      icon: LayoutDashboard,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/50',
    },
    {
      title: 'Advanced Analytics',
      description: 'Gain insights into your productivity with beautiful, interactive charts and real-time statistics.',
      icon: BarChart3,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/50',
    },
    {
      title: 'Secure by Design',
      description: 'Enterprise-grade security with JWT authentication, rate limiting, and encrypted data storage.',
      icon: ShieldCheck,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/50',
    },
    {
      title: 'Real-time Updates',
      description: 'Stay in sync across all your devices. Changes reflect instantly with zero refresh required.',
      icon: CheckCircle2,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/50',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <LayoutDashboard className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            ProjectHub
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link to="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      <section className="container mx-auto px-6 pt-20 pb-24 text-center sm:pt-32 sm:pb-32">
        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-7xl">
          Manage your projects with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
            confidence.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400 sm:text-xl leading-relaxed">
          The all-in-one dashboard for modern teams. Track progress, analyze metrics,
          and deliver results faster than ever before.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8">
              Start for free
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base h-12 px-8">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-800/50 py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Powerful features designed to help you stay organized and focused.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="rounded-2xl p-8 border border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-colors"
              >
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg}`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 text-center text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} ProjectHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
