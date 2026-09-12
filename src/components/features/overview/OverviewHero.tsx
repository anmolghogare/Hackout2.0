import React from 'react';
import { TabId } from '../../../types';
import { Button } from '../../ui/Button';
import { ArrowRight, Building2, Compass, Zap } from 'lucide-react';

export interface OverviewHeroProps {
  onNavigate: (tab: TabId) => void;
  onStartJudgeTour?: () => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({ onNavigate, onStartJudgeTour }) => {
  return (
    <section className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0E131F] p-6 md:p-8 shadow-xs">
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.72fr)] gap-6 xl:gap-8 items-stretch">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Pilot Facility: Apex Packaging Pvt. Ltd. (Pune, India)</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 text-xs font-mono">
              <Building2 className="w-3.5 h-3.5" />
              <span>Plastics & Packaging SME</span>
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-[2.55rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Industrial Emission Leak-Point Detector &{' '}
              <span className="text-emerald-600 dark:text-emerald-400">Circular Recommender</span>
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              ByteMe identifies hidden carbon leak points in SME factories and recommends costed, ROI-ranked circular interventions to cut emissions by 42% with a sub-11-month financial payback.
            </p>
          </div>

          <div className="pt-1 flex flex-wrap items-center gap-3">
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

        <aside className="rounded-2xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/80 dark:bg-rose-500/[0.08] p-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Priority hotspot
              </span>
              <span className="text-[10px] font-mono text-rose-600/80 dark:text-rose-300">Zone 2 · Furnace</span>
            </div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
              Uncalibrated oil burner leak
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              1,418°C overshoot and uninsulated shell. Fix this first.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="rounded-xl bg-white/80 dark:bg-slate-950/40 border border-rose-100 dark:border-rose-500/20 px-3 py-2">
                <div className="text-[10px] font-mono uppercase tracking-wide text-slate-400">Loss</div>
                <div className="text-sm font-extrabold text-rose-600 dark:text-rose-400">48 tCO₂e/mo</div>
              </div>
              <div className="rounded-xl bg-white/80 dark:bg-slate-950/40 border border-rose-100 dark:border-rose-500/20 px-3 py-2">
                <div className="text-[10px] font-mono uppercase tracking-wide text-slate-400">OPEX drain</div>
                <div className="text-sm font-extrabold text-rose-600 dark:text-rose-400">₹3.72L/mo</div>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('analytics_hub')}
            className="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold py-2.5 transition-colors"
          >
            Inspect & fix first
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </aside>
      </div>
    </section>
  );
};
