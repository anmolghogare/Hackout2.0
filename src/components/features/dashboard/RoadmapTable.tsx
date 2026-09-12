import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { BarChart3, Calendar, ShieldCheck, Zap, Coins } from 'lucide-react';
import { ViewMode } from '../../../types';

export interface RoadmapTableProps {
  viewMode?: ViewMode;
}

export const RoadmapTable: React.FC<RoadmapTableProps> = ({ viewMode = 'carbon' }) => {
  const isFinancial = viewMode === 'financial';

  const items = [
    {
      phase: 'Phase 1',
      timeline: 'Q1 (1 to 3 Months)',
      stream: 'Off-Cut Polymer Scrap Waste Stream',
      initiative: '100% Trim Scrap Segregation & Local B2B Off-take Contract (Apex Pipe Mfg)',
      investmentCost: '₹40,000 (Setup)',
      annualSavings: '₹3,00,000',
      co2Reduction: '172.8 tCO₂e / yr',
      paybackPeriod: '0.2 Months',
      status: 'In Progress' as const,
      avgPaybackNum: 0.2,
    },
    {
      phase: 'Phase 2',
      timeline: 'Q2 (3 to 6 Months)',
      initiative: 'PCR Polymer Resin Substitution (20% Blend Integration with Resintech)',
      stream: 'Raw Material Virgin Polymer Input',
      investmentCost: '₹15,00,000',
      annualSavings: '₹2,40,000',
      co2Reduction: '48.0 tCO₂e / yr',
      paybackPeriod: '7.5 Months',
      status: 'Planned' as const,
      avgPaybackNum: 7.5,
    },
    {
      phase: 'Phase 3',
      timeline: 'Q3/Q4 (6 to 12 Months)',
      initiative: 'Furnace Burner Retrofit: Heavy Fuel Oil ➔ Biomass Briquettes / PNG Shift',
      stream: 'Heavy Furnace Oil Thermal Energy',
      investmentCost: '₹35,00,000',
      annualSavings: '₹4,20,000',
      co2Reduction: '253.2 tCO₂e / yr',
      paybackPeriod: '10.0 Months',
      status: 'Planned' as const,
      avgPaybackNum: 10.0,
    },
    {
      phase: 'Phase 4',
      timeline: 'Q4 (9 to 12 Months)',
      initiative: 'Smart Variable Frequency Drives (VFD) & Extruder Insulation Jacket',
      stream: 'Processing Line Extrusion Motors',
      investmentCost: '₹8,50,000',
      annualSavings: '₹1,80,000',
      co2Reduction: '28.5 tCO₂e / yr',
      paybackPeriod: '10.5 Months',
      status: 'Planned' as const,
      avgPaybackNum: 10.5,
    },
  ];

  return (
    <Card className="mb-8 theme-transition">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <BarChart3 className="w-5 h-5 text-emerald-500" />
              </div>
              <span>Executive Financial & Environmental Decarbonization Roadmap</span>
            </CardTitle>
            <CardDescription className="mt-1">
              Prioritized decarbonization initiatives ranked by capital payback velocity (~10.5 months average) and verified carbon reduction.
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2 self-start sm:self-center">
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 font-mono">
              Avg Payback: ~10.5 Months
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Roadmap Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Total Cumulative Capex</span>
            <p className="text-lg font-bold font-mono text-slate-900 dark:text-white">₹58.9 Lakhs</p>
            <span className="text-[11px] text-slate-500 font-mono">Phased across 4 quarters</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Total Recurring Savings</span>
            <p className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">₹11.4 Lakhs / yr</p>
            <span className="text-[11px] text-slate-500 font-mono">OPEX & waste monetization</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Total Annual Abatement</span>
            <p className="text-lg font-bold font-mono text-slate-900 dark:text-white">502.5 tCO₂e / yr</p>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">50.2% Net Plant Cut</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-white/[0.08]">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-white/[0.08] text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/90 dark:bg-white/[0.02]">
                <th className="p-4">Phase & Timeline</th>
                <th className="p-4">Operational Stream</th>
                <th className="p-4">Engineering Action</th>
                <th className="p-4">Capex Est. (INR)</th>
                <th className="p-4">Annual Net ROI</th>
                <th className="p-4">Annual CO₂ Cut</th>
                <th className="p-4">Payback</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-white/[0.06]">
              {items.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/80 dark:hover:bg-white/[0.03] transition-colors"
                >
                  <td className="p-4 whitespace-nowrap">
                    <div className="font-bold text-slate-900 dark:text-white font-heading">{row.phase}</div>
                    <div className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5 font-mono">
                      <Calendar className="w-3 h-3 text-emerald-500" />
                      <span>{row.timeline}</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-slate-500 font-medium">
                    {row.stream}
                  </td>
                  <td className="p-4 max-w-xs font-medium text-slate-800 dark:text-slate-200 text-xs">
                    {row.initiative}
                  </td>
                  <td className="p-4 font-mono text-xs text-slate-600 dark:text-slate-300">
                    {row.investmentCost}
                  </td>
                  <td className="p-4 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    +{row.annualSavings}
                  </td>
                  <td className="p-4 font-mono text-xs font-semibold text-slate-900 dark:text-slate-200">
                    {row.co2Reduction}
                  </td>
                  <td className="p-4 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {row.paybackPeriod}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <Badge
                      variant={
                        row.status === 'In Progress'
                          ? 'normal'
                          : row.status === 'Completed'
                          ? 'success'
                          : 'outline'
                      }
                    >
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
