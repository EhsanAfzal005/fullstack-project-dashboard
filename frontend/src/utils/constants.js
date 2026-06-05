export const PROJECT_STATUSES = ['Pending', 'In Progress', 'Completed'];

export const STATUS_COLORS = {
  Pending: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
    chart: '#f59e0b',
  },
  'In Progress': {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-400',
    dot: 'bg-blue-500',
    chart: '#3b82f6',
  },
  Completed: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
    chart: '#10b981',
  },
};

export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'updatedAt', label: 'Last Updated' },
  { value: 'title', label: 'Title' },
  { value: 'status', label: 'Status' },
];

export const DEFAULT_PAGE_SIZE = 9;

export const AVATAR_COLORS = [
  'bg-violet-500',
  'bg-indigo-500',
  'bg-blue-500',
  'bg-cyan-500',
  'bg-teal-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
];
