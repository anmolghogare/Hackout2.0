import React from 'react';
import { KPIData, ViewMode } from '../../../types';
import { Card, CardContent } from '../../ui/Card';
import { Leaf, TrendingDown, DollarSign, AlertTriangle, Coins, Zap } from 'lucide-react';
import { formatINR, formatNumber } from '../../../lib/utils';

export interface KPICardsProps {
  kpiData: KPIData;
  viewMode?: ViewMode;
}

export const KPICards: React.FC<KPICardsProps> = ({ kpiData, viewMode = 'carbon' }) => {
  const isFinancial = viewMode === 'financial';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
        <CardContent className="p-7 flex items-start justify-between gap-5 min-h-[132px]">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
              {isFinancial ? 'Baseline Operational Cost' : 'Baseline Carbon Footprint'}
            </p>
            <h4 className="text-2xl sm:text-[28px] font-semibold font-heading tracking-tight text-slate-900 dark:text-white mt-1 truncate">
              {isFinancial
                ? formatINR(kpiData.baselineMonthlyCostINR || 2850000)
                : `${kpiData.baselineMonthlyCO2} tCO₂e/mo`}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 truncate leading-relaxed">
              Apex Packaging Facility
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
            {isFinancial ? <Coins className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-emerald-500/30 bg-emerald-500/[0.03] dark:bg-emerald-950/20">
        <CardContent className="p-7 flex items-start justify-between gap-5 min-h-[132px]">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 truncate">
              {isFinancial ? 'Monthly Cashflow ROI' : 'CO₂ Saved / Month'}
            </p>
            <h4 className="text-2xl sm:text-[28px] font-semibold font-heading tracking-tight text-emerald-700 dark:text-emerald-400 mt-1 truncate">
              {isFinancial
                ? formatINR(Math.round((kpiData.financialSavings.totalNetSavingsVal || 650000) / 12))
                : `${formatNumber(kpiData.monthlyCO2SavedTons)} Tons`}
            </h4>
            <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mt-2 truncate leading-relaxed">
              {isFinancial ? 'Direct Operational Margin' : 'Verified Abatement'}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
            {isFinancial ? <DollarSign className="w-5 h-5" /> : <Leaf className="w-5 h-5" />}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-emerald-500/30 bg-emerald-500/[0.03] dark:bg-emerald-950/20">
        <CardContent className="p-7 flex items-start justify-between gap-5 min-h-[132px]">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 truncate">
              {isFinancial ? 'Cost Reduction' : 'Footprint Cut'}
            </p>
            <h4 className="text-2xl sm:text-[28px] font-semibold font-heading tracking-tight text-emerald-700 dark:text-emerald-400 mt-1 truncate">
              -{formatNumber(kpiData.co2ReductionPercentage)}%
            </h4>
            <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mt-2 truncate leading-relaxed">
              {isFinancial ? 'Energy & Fuel Efficiency' : 'Net Intensity Cut'}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
            <TrendingDown className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-emerald-500/30 bg-emerald-500/[0.03] dark:bg-emerald-950/20">
        <CardContent className="p-7 flex items-start justify-between gap-5 min-h-[132px]">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 truncate">
              Est. Annual Net ROI
            </p>
            <h4 className="text-2xl sm:text-[28px] font-semibold font-heading tracking-tight text-emerald-700 dark:text-emerald-400 mt-1 truncate">
              {kpiData.financialSavings.totalNetSavingsDisplay}
            </h4>
            <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mt-2 truncate leading-relaxed">
              Payback ~10.5 Months
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
