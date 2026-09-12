import React from 'react';
import { TabId } from '../../../types';
import { Button } from '../../ui/Button';
import {
  ArrowRight,
  Building2,
  Compass,
  Zap,
  TrendingDown,
  Recycle,
  Coins,
} from 'lucide-react';

export interface OverviewHeroProps {
  onNavigate: (tab: TabId) => void;
  onStartJudgeTour?: () => void;
}

const quickStats = [
  { label: 'CO₂ Reduction', value: '42%', sub: 'vs baseline', icon: TrendingDown },
  { label: 'OPEX Savings', value: '₹16.56L', sub: 'per year', icon: Coins },
  { label: 'Payback Period', value: '10.5 mos', sub: 'avg · 5 actions', icon: Zap },
  { label: 'Scrap Diverted', value: '85%', sub: 'from landfill', icon: Recycle },
];

export const OverviewHero: React.FC<OverviewHeroProps> = ({ onNavigate, onStartJudgeTour }) => {
  return (
    <section className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0E131F] shadow-xs overflow-hidden">

      {/* Top row: Hero + Integrated Hotspot */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">

        {/* LEFT: Facility + headline + CTAs */}
        <div className="p-6 md:p-8 space-y-5 border-b xl:border-b-0 xl:border-r border-slate-100 dark:border-slate-800/70">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Pilot Facility: Apex Packaging Pvt. Ltd. (Pune, India)</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 text-xs font-mono">
              <Building2 className="w-3.5 h-3.5" />
              <span>Plastics &amp; Packaging SME</span>
            </span>
          </div>

          <div className="space-y-2.5">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Industrial Emission Leak-Point Detector &amp;{' '}
              <span className="text-emerald-600 dark:text-emerald-400">Circular Recommender</span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              ByteMe identifies hidden carbon leak points in SME factories and recommends costed,
              ROI-ranked circular interventions to cut emissions by 42% with a sub-11-month financial payback.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-0.5">
            <Button variant="primary" size="lg" onClick={() => onNavigate('simulation')} className="flex items-center space-x-2 shadow-xs">
              <span>Launch Digital Twin Pipeline</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => onNavigate('simulator_hub')} className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>What-If ROI Simulator</span>
            </Button>
            {onStartJudgeTour && (
              <Button variant="outline" size="lg" onClick={onStartJudgeTour} className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>60s Guided Tour</span>
              </Button>
            )}
          </div>
        </div>

        {/* RIGHT: Priority Hotspot — flush, seamless */}
        <div className="bg-rose-50/60 dark:bg-rose-500/[0.06] p-6 md:p-8 flex flex-col justify-between gap-5">
          <div className="flex items-start justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Priority Hotspot
            </span>
            <span className="text-[11px] font-mono text-rose-500/80 dark:text-rose-400/70 pt-0.5">Zone 2 · Furnace</span>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
              Uncalibrated oil burner leak
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              1,418°C overshoot and uninsulated refractory shell. This is your highest-ROI fix.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl bg-white/70 dark:bg-slate-950/30 border border-rose-100 dark:border-rose-500/20 px-3.5 py-2.5">
              <div className="text-[10px] font-mono uppercase tracking-wide text-slate-400 mb-0.5">Loss</div>
              <div className="text-base font-extrabold text-rose-600 dark:text-rose-400 font-mono">48 tCO₂e/mo</div>
            </div>
            <div className="rounded-xl bg-white/70 dark:bg-slate-950/30 border border-rose-100 dark:border-rose-500/20 px-3.5 py-2.5">
              <div className="text-[10px] font-mono uppercase tracking-wide text-slate-400 mb-0.5">OPEX Drain</div>
              <div className="text-base font-extrabold text-rose-600 dark:text-rose-400 font-mono">₹3.72L/mo</div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('analytics_hub')}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white text-xs font-bold py-2.5 transition-colors"
          >
            Inspect &amp; fix first
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom: Live Stats Strip */}
      <div className="border-t border-slate-100 dark:border-slate-800/70 grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800/70">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="px-5 py-3.5 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 shrink-0">
                <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-extrabold font-mono text-emerald-700 dark:text-emerald-400 leading-none">{stat.value}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{stat.label}</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate">{stat.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
