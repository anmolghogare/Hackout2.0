import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 hover:border-emerald-500/50 transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-xs cursor-pointer shrink-0',
        className
      )}
      title={`Switch to ${isDark ? 'Day' : 'Night'} Mode`}
      aria-label="Toggle theme mode"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold text-amber-300">☀️ Day Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-slate-700 shrink-0" />
          <span className="text-xs font-semibold text-slate-700">🌙 Night Mode</span>
        </>
      )}
    </button>
  );
};
