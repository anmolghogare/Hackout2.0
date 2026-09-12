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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 theme-transition">
      {/* Metric 1: Baseline Footprint vs Monthly Baseline Operational Cost */}
      <Card
        className={`border-l-4 transition-all duration-300 ${
          isFinancial ? 'border-l-amber-500 bg-amber-500/5' : 'border-l-slate-500'
        }`}
      >
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {isFinancial ? 'Baseline Energy & Material Cost' : 'Baseline Carbon Footprint'}
            </p>
            <h4 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mt-1">
              {isFinancial
                ? formatINR(kpiData.baselineMonthlyCostINR || 2850000)
                : `${kpiData.baselineMonthlyCO2} tCO₂e/mo`}
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Apex Packaging Facility</p>
          </div>
          <div
            className={`p-3 rounded-2xl ${
              isFinancial ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}
          >
            {isFinancial ? <Coins className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
          </div>
        </CardContent>
      </Card>

      {/* Metric 2: Monthly CO2 Saved vs Monthly Net Cashflow Savings */}
      <Card
        className={`border-l-4 transition-all duration-300 ${
          isFinancial ? 'border-l-purple-500 bg-purple-500/5' : 'border-l-emerald-500'
        }`}
      >
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-wider ${
                isFinancial ? 'text-purple-500' : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {isFinancial ? 'Monthly Cashflow ROI' : 'CO₂ Saved / Month'}
            </p>
            <h4
              className={`text-2xl font-bold font-heading mt-1 ${
                isFinancial ? 'text-purple-600 dark:text-purple-400' : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {isFinancial
                ? formatINR(Math.round((kpiData.financialSavings.totalNetSavingsVal || 650000) / 12))
                : `${formatNumber(kpiData.monthlyCO2SavedTons)} Tons`}
            </h4>
            <p className="text-[11px] opacity-80 mt-0.5">
              {isFinancial ? 'Direct Operational Margin' : 'Verified Abatement'}
            </p>
          </div>
          <div
            className={`p-3 rounded-2xl ${
              isFinancial ? 'bg-purple-500/10 text-purple-500' : 'bg-emerald-500/10 text-emerald-500'
            }`}
          >
            {isFinancial ? <DollarSign className="w-6 h-6" /> : <Leaf className="w-6 h-6" />}
          </div>
        </CardContent>
      </Card>

      {/* Metric 3: Footprint Cut % vs Financial Cost Reduction % */}
      <Card
        className={`border-l-4 transition-all duration-300 ${
          isFinancial ? 'border-l-blue-500 bg-blue-500/5' : 'border-l-cyan-500'
        }`}
      >
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-wider ${
                isFinancial ? 'text-blue-500' : 'text-cyan-600 dark:text-cyan-400'
              }`}
            >
              {isFinancial ? 'Cost Reduction %' : 'Footprint Cut %'}
            </p>
            <h4
              className={`text-2xl font-bold font-heading mt-1 ${
                isFinancial ? 'text-blue-600 dark:text-blue-400' : 'text-cyan-600 dark:text-cyan-400'
              }`}
            >
              -{formatNumber(kpiData.co2ReductionPercentage)}%
            </h4>
            <p className="text-[11px] opacity-80 mt-0.5">
              {isFinancial ? 'Energy & Material Efficiency' : 'Net Intensity Reduction'}
            </p>
          </div>
          <div
            className={`p-3 rounded-2xl ${
              isFinancial ? 'bg-blue-500/10 text-blue-500' : 'bg-cyan-500/10 text-cyan-500'
            }`}
          >
            <TrendingDown className="w-6 h-6" />
          </div>
        </CardContent>
      </Card>

      {/* Metric 4: Est. Annual Net Savings */}
      <Card className="border-l-4 border-l-purple-500">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Est. Annual Net ROI
            </p>
            <h4 className="text-xl font-bold font-heading text-purple-600 dark:text-purple-400 mt-1 truncate">
              {kpiData.financialSavings.totalNetSavingsDisplay}
            </h4>
            <p className="text-[11px] text-purple-600/80 dark:text-purple-400/80 mt-0.5">
              Payback ~10.5 Months
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
            <Zap className="w-6 h-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
