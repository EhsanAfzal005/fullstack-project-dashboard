import Card from '../common/Card';

export default function StatCard({ icon: Icon, label, value, color, trend }) {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      icon: 'text-indigo-600 dark:text-indigo-400',
      value: 'text-indigo-600 dark:text-indigo-400',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      icon: 'text-emerald-600 dark:text-emerald-400',
      value: 'text-emerald-600 dark:text-emerald-400',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      icon: 'text-blue-600 dark:text-blue-400',
      value: 'text-blue-600 dark:text-blue-400',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      icon: 'text-amber-600 dark:text-amber-400',
      value: 'text-amber-600 dark:text-amber-400',
    },
  };

  const colors = colorMap[color] || colorMap.indigo;

  return (
    <Card hover className="p-6">
      <div className="flex items-center gap-4">
        <div className={`rounded-xl p-3 ${colors.bg}`}>
          <Icon className={`h-6 w-6 ${colors.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className={`text-2xl font-bold ${colors.value}`}>{value}</p>
        </div>
      </div>
    </Card>
  );
}
