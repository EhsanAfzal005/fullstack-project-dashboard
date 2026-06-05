export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`
        rounded-xl border border-slate-200 dark:border-slate-700/60
        bg-white dark:bg-slate-800
        shadow-sm
        ${hover ? 'transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-y-0.5' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
