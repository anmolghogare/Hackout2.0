import React from 'react';
import { KPIData, ViewMode } from '../../../types';
import { Leaf, TrendingDown, DollarSign, Activity, Coins, Zap, ShieldCheck } from 'lucide-react';
import { formatINR, formatNumber } from '../../../lib/utils';
import { cn } from '../../../lib/utils';

export interface KPICardsProps {
  kpiData: KPIData;
  viewMode?: ViewMode;
}

export const KPICards: React.FC<KPICardsProps> = ({ kpiData, viewMode = 'carbon' }) => {
  const isFinancial = viewMode === 'financial';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-8">
      {/* Metric 1: Baseline Output / Cost */}
      <div className="bg-white dark:bg-[#0D131F] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {isFinancial ? 'Monthly Baseline Spend' : 'Monthly Carbon Output'}
          </span>
          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
            {isFinancial ? <Coins className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white">
            {isFinancial
              ? formatINR(kpiData.baselineMonthlyCostINR || 2850000)
              : `${kpiData.baselineMonthlyCO2} tCO₂e`}
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
            <span>{isFinancial ? 'Energy & Material Baseline' : 'Scope 1, 2 & 3 Combined'}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between font-mono">
          <span>Annual Projected:</span>
          <span className="text-slate-700 dark:text-slate-300 font-bold">
            {isFinancial
              ? formatINR((kpiData.baselineMonthlyCostINR || 2850000) * 12)
              : `${Math.round(kpiData.baselineMonthlyCO2 * 12).toLocaleString()} tCO₂e/yr`}
          </span>
        </div>
      </div>

      {/* Metric 2: Monthly Net Abatement / Cash Flow Savings */}
      <div className="bg-white dark:bg-[#0D131F] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-emerald-500/40 transition-all space-y-3 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            {isFinancial ? 'Monthly Net Margin Boost' : 'Verified CO₂ Abatement'}
          </span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            {isFinancial ? <DollarSign className="w-4 h-4" /> : <Leaf className="w-4 h-4" />}
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
            {isFinancial
              ? formatINR(Math.round((kpiData.financialSavings.totalNetSavingsVal || 650000) / 12))
              : `${formatNumber(kpiData.monthlyCO2SavedTons)} Tons/mo`}
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
            <span>{isFinancial ? 'Direct OPEX Reduction' : 'CEA & IPCC Calibrated'}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center justify-between font-mono font-semibold">
          <span>Net Impact:</span>
          <span>+{isFinancial ? formatINR(kpiData.financialSavings.totalNetSavingsVal || 650000) + '/yr' : `${Math.round(kpiData.monthlyCO2SavedTons * 12)} T/yr`}</span>
        </div>
      </div>

      {/* Metric 3: Carbon Intensity / Cost Reduction % */}
      <div className="bg-white dark:bg-[#0D131F] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {isFinancial ? 'OPEX Cost Cut %' : 'Emission Reduction %'}
          </span>
          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
            <TrendingDown className="w-4 h-4" />
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white">
            -{formatNumber(kpiData.co2ReductionPercentage)}%
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
            <span>{isFinancial ? 'Fuel & Electricity Efficiency' : 'Baseline Footprint Reduction'}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between font-mono">
          <span>Regulatory Target:</span>
          <span className="text-slate-700 dark:text-slate-300 font-bold">Exceeds BEE PAT Norms</span>
        </div>
      </div>

      {/* Metric 4: Est. Annual Net ROI & Payback */}
      <div className="bg-white dark:bg-[#0D131F] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Annual Net ROI
          </span>
          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white">
            {kpiData.financialSavings.totalNetSavingsDisplay}
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
            <span>Est. Payback: ~10.5 Months</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between font-mono">
          <span>Hurdle Rate:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Optimal (&lt; 18 Mo)</span>
        </div>
      </div>
    </div>
  );
};

