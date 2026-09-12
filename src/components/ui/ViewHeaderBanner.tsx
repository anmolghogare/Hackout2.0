import React from 'react';
import { Sparkles, HelpCircle, ArrowRight, LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ViewHeaderBannerProps {
  category: string;
  title: string;
  description: string;
  howToInteract: string[];
  keyMetrics: { label: string; value: string; hint?: string }[];
  icon: LucideIcon;
  badgeText?: string;
  badgeVariant?: 'emerald' | 'cyan' | 'purple' | 'amber' | 'rose';
  className?: string;
}

export const ViewHeaderBanner: React.FC<ViewHeaderBannerProps> = ({
  category,
  title,
  description,
  howToInteract,
  keyMetrics,
  icon: Icon,
  badgeText,
  badgeVariant = 'emerald',
  className = '',
}) => {
  const variantStyles = {
    emerald: 'border-emerald-500/30 dark:border-emerald-500/30 from-emerald-500/[0.06] dark:from-emerald-500/10 via-teal-500/[0.03] dark:via-teal-500/5 to-transparent',
    cyan: 'border-cyan-500/30 dark:border-cyan-500/30 from-cyan-500/[0.06] dark:from-cyan-500/10 via-blue-500/[0.03] dark:via-blue-500/5 to-transparent',
    purple: 'border-purple-500/30 dark:border-purple-500/30 from-purple-500/[0.06] dark:from-purple-500/10 via-indigo-500/[0.03] dark:via-indigo-500/5 to-transparent',
    amber: 'border-amber-500/30 dark:border-amber-500/30 from-amber-500/[0.06] dark:from-amber-500/10 via-orange-500/[0.03] dark:via-orange-500/5 to-transparent',
    rose: 'border-rose-500/30 dark:border-rose-500/30 from-rose-500/[0.06] dark:from-rose-500/10 via-red-500/[0.03] dark:via-red-500/5 to-transparent',
  };

  const iconBgStyles = {
    emerald: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    purple: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
    amber: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    rose: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
  };

  return (
    <div
      className={cn(
        'rounded-3xl p-6 sm:p-8 bg-gradient-to-r backdrop-blur-2xl border transition-all duration-300 shadow-xl mb-8',
        'bg-white dark:bg-[#0d1322] border-slate-200/80 dark:border-white/[0.08]',
        variantStyles[badgeVariant],
        className
      )}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Category, Title, Description */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center space-x-2.5">
            <div className={cn('p-2.5 rounded-2xl border shadow-md', iconBgStyles[badgeVariant])}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                {category}
              </span>
              {badgeText && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10">
                  {badgeText}
                </span>
              )}
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
            {title}
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {description}
          </p>

          {/* How to Interact Pills */}
          <div className="pt-2">
            <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              How to Interact:
            </span>
            <div className="flex flex-wrap gap-2">
              {howToInteract.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/[0.08] text-xs text-slate-700 dark:text-slate-300 font-medium shadow-xs"
                >
                  <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-white/10 text-[10px] font-bold flex items-center justify-center text-slate-600 dark:text-slate-400">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Key Metrics to Watch Grid */}
        <div className="flex flex-col justify-center lg:min-w-[280px] p-5 rounded-2xl bg-slate-50/90 dark:bg-black/30 border border-slate-200/80 dark:border-white/[0.08] shrink-0 space-y-3 shadow-xs">
          <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Target Telemetry to Watch</span>
          </span>

          <div className="space-y-2.5">
            {keyMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.05] shadow-xs"
              >
                <div>
                  <span className="text-xs text-slate-600 dark:text-slate-400 block font-medium">{metric.label}</span>
                  {metric.hint && <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{metric.hint}</span>}
                </div>
                <span className="text-sm font-heading font-bold text-slate-900 dark:text-white font-mono">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
