import React, { useState } from 'react';
import { SavedScenario, SliderInputs, ViewMode } from '../../../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Layers, Plus, Trash2, Play } from 'lucide-react';
import { formatNumber } from '../../../lib/utils';

export interface ScenarioSandboxProps {
  scenarios: SavedScenario[];
  onSaveCurrentScenario: (name: string) => void;
  onDeleteScenario: (id: string) => void;
  onLoadScenario: (inputs: SliderInputs) => void;
  viewMode?: ViewMode;
}

export const ScenarioSandbox: React.FC<ScenarioSandboxProps> = ({
  scenarios,
  onSaveCurrentScenario,
  onDeleteScenario,
  onLoadScenario,
  viewMode = 'carbon',
}) => {
  const [newPlanName, setNewPlanName] = useState('');

  const handleSave = () => {
    if (!newPlanName.trim()) return;
    onSaveCurrentScenario(newPlanName);
    setNewPlanName('');
  };

  return (
    <Card className="mb-8 theme-transition">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Layers className="w-5 h-5 text-emerald-500" />
              </div>
              <span>Scenario Sandbox & Side-by-Side Comparison Matrix</span>
            </CardTitle>
            <CardDescription className="mt-1">
              Save, contrast, and evaluate alternative decarbonization scenarios against baseline facility metrics and payback periods.
            </CardDescription>
          </div>

          {/* Quick Save Current Plan Input */}
          <div className="flex items-center space-x-2 self-start sm:self-center">
            <input
              type="text"
              value={newPlanName}
              onChange={(e) => setNewPlanName(e.target.value)}
              placeholder="Name current plan (e.g. Plan C)..."
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            />
            <Button variant="primary" size="sm" onClick={handleSave} className="flex items-center space-x-1 shrink-0 font-bold">
              <Plus className="w-4 h-4" />
              <span>Save Scenario</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Comparative Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Baseline Reference Card */}
          <div className="p-6 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline">Baseline Benchmark</Badge>
                <span className="text-[11px] font-mono text-slate-400">Current Status</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1 font-heading">
                Status Quo Operations
              </h4>
              <p className="text-xs text-slate-400 mb-4 font-mono">100% Furnace Oil • 0% PCR Blend • Landfill Scrap</p>

              <div className="space-y-3 py-3 border-y border-slate-200/80 dark:border-white/[0.06] text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly Footprint</span>
                  <span className="font-bold text-rose-500">100.0 tCO₂e / mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly Baseline Cost</span>
                  <span className="font-bold text-slate-900 dark:text-white">₹28,50,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Capex Required</span>
                  <span className="font-bold text-slate-400">₹0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payback Period</span>
                  <span className="font-bold text-slate-400">N/A</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2 text-center text-xs text-slate-400 font-mono">
              Reference Benchmark
            </div>
          </div>

          {/* Saved Scenarios List */}
          {scenarios.map((sc) => (
            <div
              key={sc.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#0D0F18] border border-slate-200/80 dark:border-white/[0.08] hover:border-emerald-500/40 shadow-xs flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="normal">{sc.createdAt}</Badge>
                  <button
                    onClick={() => onDeleteScenario(sc.id)}
                    className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                    title="Delete Scenario"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1 font-heading">
                  {sc.name}
                </h4>
                <p className="text-xs text-slate-400 mb-4 font-mono">
                  Fuel: {sc.sliderInputs.fuelShiftPct}% | PCR: {sc.sliderInputs.pcrResinPct}% | Scrap: {sc.sliderInputs.scrapRecyclePct}%
                </p>

                <div className="space-y-3 py-3 border-y border-slate-200/80 dark:border-white/[0.06] text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Annual CO₂ Cut</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      -{formatNumber(sc.savedKpi.co2ReductionPercentage)}% ({formatNumber(sc.savedKpi.monthlyCO2SavedTons * 12)} tCO₂e/yr)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Annual Net ROI</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {sc.savedKpi.financialSavings.totalNetSavingsDisplay}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Capex Estimate</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {sc.capexEst}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payback Period</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {sc.paybackMonths}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onLoadScenario(sc.sliderInputs)}
                  className="w-full flex items-center justify-center space-x-1.5 font-bold"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Load Into Active Simulator</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
