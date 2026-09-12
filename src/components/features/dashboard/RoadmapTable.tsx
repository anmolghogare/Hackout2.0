import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { BarChart3, CheckCircle2, Clock, Calendar } from 'lucide-react';

export const RoadmapTable: React.FC = () => {
  const items = [
    {
      phase: 'Phase 1',
      timeline: 'Q1 - 1 to 3 Months',
      initiative: 'Off-Cut Trim Scrap Recycling & Local B2B Off-take Contract',
      investmentCost: '₹40,000 (Setup)',
      annualSavings: '₹3,000,000',
      co2Reduction: '14.4 tCO₂e / mo',
      paybackPeriod: '0.2 Months',
      status: 'In Progress' as const,
    },
    {
      phase: 'Phase 2',
      timeline: 'Q2 - 3 to 6 Months',
      initiative: 'PCR Polymer Resin Substitution (20% Blend Integration)',
      investmentCost: '₹1,500,000',
      annualSavings: '₹2,400,000',
      co2Reduction: '4.0 tCO₂e / mo',
      paybackPeriod: '7.5 Months',
      status: 'Planned' as const,
    },
    {
      phase: 'Phase 3',
      timeline: 'Q3/Q4 - 6 to 12 Months',
      initiative: 'Furnace Burner Retrofit: Heavy Fuel Oil ➔ Biomass / PNG Fuel Shift',
      investmentCost: '₹3,500,000',
      annualSavings: '₹4,200,000',
      co2Reduction: '21.1 tCO₂e / mo',
      paybackPeriod: '10.0 Months',
      status: 'Planned' as const,
    },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-emerald-500" />
              <span>Decarbonization ROI Matrix & Phased Implementation Roadmap</span>
            </CardTitle>
            <CardDescription>
              Prioritized engineering roadmap ranked by financial payback efficiency and carbon reduction impact.
            </CardDescription>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold border border-purple-500/20">
            Total Net ROI: +₹6.5L/yr
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/30">
                <th className="p-3.5 rounded-l-xl">Phase & Timeline</th>
                <th className="p-3.5">Engineering Initiative</th>
                <th className="p-3.5">Capex Est.</th>
                <th className="p-3.5">Annual Savings</th>
                <th className="p-3.5">CO₂ Abatement</th>
                <th className="p-3.5">Payback</th>
                <th className="p-3.5 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
              {items.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-3.5 whitespace-nowrap">
                    <div className="font-bold text-slate-900 dark:text-white">{row.phase}</div>
                    <div className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-emerald-500" />
                      <span>{row.timeline}</span>
                    </div>
                  </td>
                  <td className="p-3.5 max-w-xs font-medium text-slate-800 dark:text-slate-200">
                    {row.initiative}
                  </td>
                  <td className="p-3.5 font-mono text-slate-600 dark:text-slate-300">
                    {row.investmentCost}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    +{row.annualSavings}
                  </td>
                  <td className="p-3.5 font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                    {row.co2Reduction}
                  </td>
                  <td className="p-3.5 font-mono text-purple-600 dark:text-purple-400 font-bold">
                    {row.paybackPeriod}
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
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
