import React from 'react';
import { KPIData } from '../../../types';
import { Card, CardContent } from '../../ui/Card';
import { Leaf, TrendingDown, DollarSign, AlertTriangle } from 'lucide-react';
import { formatNumber } from '../../../lib/utils';

export interface KPICardsProps {
  kpiData: KPIData;
}

export const KPICards: React.FC<KPICardsProps> = ({ kpiData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Metric 1: Baseline CO2 */}
      <Card className="border-l-4 border-l-slate-500">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Baseline Footprint
            </p>
            <h4 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mt-1">
              {kpiData.baselineMonthlyCO2}{' '}
              <span className="text-xs font-normal text-slate-500">tCO₂e/mo</span>
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Apex Packaging Facility</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </CardContent>
      </Card>

      {/* Metric 2: Monthly CO2 Saved */}
      <Card className="border-l-4 border-l-emerald-500">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              CO₂ Saved / Month
            </p>
            <h4 className="text-2xl font-bold font-heading text-emerald-600 dark:text-emerald-400 mt-1">
              {formatNumber(kpiData.monthlyCO2SavedTons)}{' '}
              <span className="text-xs font-normal opacity-80">Tons</span>
            </h4>
            <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
              Verified Abatement
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <Leaf className="w-6 h-6" />
          </div>
        </CardContent>
      </Card>

      {/* Metric 3: Carbon Reduction % */}
      <Card className="border-l-4 border-l-cyan-500">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Footprint Cut %
            </p>
            <h4 className="text-2xl font-bold font-heading text-cyan-600 dark:text-cyan-400 mt-1">
              -{formatNumber(kpiData.co2ReductionPercentage)}%
            </h4>
            <p className="text-[11px] text-cyan-600/80 dark:text-cyan-400/80 mt-0.5">
              Net Intensity Reduction
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500">
            <TrendingDown className="w-6 h-6" />
          </div>
        </CardContent>
      </Card>

      {/* Metric 4: Financial Net Savings */}
      <Card className="border-l-4 border-l-purple-500">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Est. Net Savings
            </p>
            <h4 className="text-xl font-bold font-heading text-purple-600 dark:text-purple-400 mt-1 truncate">
              {kpiData.financialSavings.totalNetSavingsDisplay}
            </h4>
            <p className="text-[11px] text-purple-600/80 dark:text-purple-400/80 mt-0.5">
              Energy + Scrap ROI
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
            <DollarSign className="w-6 h-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
