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
  Activity,
  Flame,
  Leaf,
  BarChart3,
} from 'lucide-react';

export interface OverviewHeroProps {
  onNavigate: (tab: TabId) => void;
  onStartJudgeTour?: () => void;
}

const quickStats = [
  { label: 'CO₂ Reduction', value: '42%', sub: 'vs factory baseline', icon: TrendingDown, bar: 42, color: 'bg-emerald-500' },
  { label: 'OPEX Savings', value: '₹16.56L', sub: 'per year · all 5 actions', icon: Coins, bar: 68, color: 'bg-emerald-500' },
  { label: 'Payback Period', value: '10.5 mos', sub: 'avg across 5 ranked fixes', icon: Zap, bar: 78, color: 'bg-amber-400' },
  { label: 'Scrap Diverted', value: '85%', sub: 'landfill → circular market', icon: Recycle, bar: 85, color: 'bg-emerald-500' },
];

const highlights = [
  { icon: Flame, label: 'Thermal Leak Detected', value: '48 tCO₂e/mo', accent: 'text-rose-500' },
  { icon: Activity, label: 'Sensor Arrays Active', value: '12 Live Nodes', accent: 'text-blue-500' },
  { icon: Leaf, label: 'Scope 1+2 Tracked', value: '465 tCO₂e/yr', accent: 'text-emerald-500' },
  { icon: BarChart3, label: 'Interventions Ranked', value: '5 ROI Actions', accent: 'text-violet-500' },
];

export const OverviewHero: React.FC<OverviewHeroProps> = ({ onNavigate, onStartJudgeTour }) => {
  return (
    <section className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0E131F] shadow-xs overflow-hidden">

      {/* ── Hero Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">

        {/* LEFT: Creative hero content */}
        <div className="relative p-6 md:p-8 space-y-6 border-b xl:border-b-0 xl:border-r border-slate-100 dark:border-slate-800/70 overflow-hidden">

          {/* Subtle background gradient orb */}
          <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full bg-emerald-500/[0.06] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-10 w-40 h-40 rounded-full bg-blue-500/[0.04] blur-2xl pointer-events-none" />

          {/* Facility chips */}
          <div className="relative flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Pilot Facility: Apex Packaging Pvt. Ltd. (Pune, India)</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 text-xs font-mono">
              <Building2 className="w-3.5 h-3.5" />
              <span>Plastics &amp; Packaging SME</span>
            </span>
          </div>

          {/* Headline */}
          <div className="relative space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900 dark:bg-white/10 text-white dark:text-slate-200 text-[11px] font-mono font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Carbon Intelligence Platform · v2.0
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.4rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Find &amp; Fix Your Factory's{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-emerald-600 dark:text-emerald-400">Carbon Leak Points</span>
                <span className="absolute bottom-0 left-0 right-0 h-[6px] bg-emerald-500/20 rounded-full -z-0" />
              </span>{' '}
              — Before They Cost You More
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              ByteMe runs a live digital twin of your factory, pinpoints{' '}
              <span className="font-semibold text-slate-800 dark:text-slate-200">thermal leak points, peak tariff spikes &amp; scrap waste</span>,
              and delivers a ranked action plan with exact INR savings and CO₂ cuts — in minutes.
            </p>
          </div>

          {/* Live highlights row */}
          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-2">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.label} className="flex flex-col gap-1 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] px-3 py-2.5">
                  <Icon className={`w-3.5 h-3.5 ${h.accent}`} />
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono leading-tight">{h.value}</div>
                  <div className="text-[10px] text-slate-400 leading-tight">{h.label}</div>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="relative flex flex-wrap items-center gap-3">
            <Button variant="primary" size="lg" onClick={() => onNavigate('simulation')} className="flex items-center space-x-2 shadow-xs">
              <span>Launch Digital Twin</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => onNavigate('simulator_hub')} className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>What-If ROI Simulator</span>
            </Button>
            {onStartJudgeTour && (
              <Button variant="outline" size="lg" onClick={onStartJudgeTour} className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>60s Tour</span>
              </Button>
            )}
          </div>
        </div>

        {/* RIGHT: Priority Hotspot — flush, seamless */}
        <div className="bg-rose-50/70 dark:bg-rose-500/[0.07] p-6 md:p-8 flex flex-col justify-between gap-5">
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
              1,418°C overshoot and uninsulated refractory shell. Fix this first for fastest ROI.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl bg-white/70 dark:bg-slate-950/30 border border-rose-100 dark:border-rose-500/20 px-3.5 py-2.5">
              <div className="text-[10px] font-mono uppercase tracking-wide text-slate-400 mb-0.5">CO₂ Loss</div>
              <div className="text-base font-extrabold text-rose-600 dark:text-rose-400 font-mono">48 tCO₂e/mo</div>
            </div>
            <div className="rounded-xl bg-white/70 dark:bg-slate-950/30 border border-rose-100 dark:border-rose-500/20 px-3.5 py-2.5">
              <div className="text-[10px] font-mono uppercase tracking-wide text-slate-400 mb-0.5">OPEX Drain</div>
              <div className="text-base font-extrabold text-rose-600 dark:text-rose-400 font-mono">₹3.72L/mo</div>
            </div>
          </div>

          {/* Mini severity bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span>Thermal severity</span>
              <span className="text-rose-500 font-bold">CRITICAL — 94%</span>
            </div>
            <div className="h-2 rounded-full bg-rose-100 dark:bg-rose-500/10 overflow-hidden">
              <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-rose-400 to-rose-600 animate-pulse" />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span>Fix capex required</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹0.80L only</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full w-[8%] rounded-full bg-emerald-500" />
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

      {/* ── Bottom: Stats Strip with Mini Bars ── */}
      <div className="border-t border-slate-100 dark:border-slate-800/70 grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800/70">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="px-5 py-4 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 shrink-0">
                  <Icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-base font-extrabold font-mono text-emerald-700 dark:text-emerald-400 leading-none">{stat.value}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{stat.label}</div>
                </div>
              </div>
              {/* Mini bar */}
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${stat.color} transition-all`}
                    style={{ width: `${stat.bar}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate">{stat.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
