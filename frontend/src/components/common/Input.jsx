import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({
  label,
  error,
  icon: Icon,
  type = 'text',
  className = '',
  id,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </div>
        )}
        <input
          id={id}
          type={inputType}
          className={`
            w-full rounded-lg border bg-white px-3 py-2.5 text-sm
            text-slate-900 placeholder-slate-400
            transition-all duration-200
            focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20
            dark:bg-slate-800 dark:border-slate-600 dark:text-white
            dark:placeholder-slate-500 dark:focus:border-indigo-400
            dark:focus:ring-indigo-400/20
            ${Icon ? 'pl-10' : ''}
            ${isPassword ? 'pr-10' : ''}
            ${
              error
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-500'
                : 'border-slate-300 dark:border-slate-600'
            }
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-rose-500 dark:text-rose-400">{error}</p>
      )}
    </div>
  );
}
