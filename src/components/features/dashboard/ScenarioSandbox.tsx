import React, { useState } from 'react';
import { SavedScenario, SliderInputs, ViewMode } from '../../../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Layers, Plus, Trash2, Play, CheckCircle2, TrendingDown, DollarSign, Leaf, Sparkles } from 'lucide-react';
import { formatINR, formatNumber } from '../../../lib/utils';

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
  const isFinancial = viewMode === 'financial';

  const handleSave = () => {
    onSaveCurrentScenario(newPlanName);
    setNewPlanName('');
  };

  return (
    <Card className="mb-8 theme-transition">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-emerald-500" />
              <span>Scenario Sandbox & Side-by-Side Comparison Matrix</span>
            </CardTitle>
            <CardDescription>
              Save, contrast, and evaluate alternative engineering plans against baseline metrics and payback periods.
            </CardDescription>
          </div>

          {/* Quick Save Current Plan Input */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newPlanName}
              onChange={(e) => setNewPlanName(e.target.value)}
              placeholder="Name current plan (e.g. Plan C)..."
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Button variant="primary" size="sm" onClick={handleSave} className="flex items-center space-x-1 shrink-0">
              <Plus className="w-4 h-4" />
              <span>Save Plan</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Comparative Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Baseline Reference Card */}
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/80 flex flex-col justify-between opacity-90">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">Baseline Benchmark</Badge>
                <span className="text-[11px] font-mono text-slate-400">Current Status</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1 font-heading">
                Status Quo Operations
              </h4>
              <p className="text-xs text-slate-500 mb-4">100% Furnace Oil, 0% PCR Blend, Landfill Scrap</p>

              <div className="space-y-3 py-3 border-y border-slate-200 dark:border-slate-700/60 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Footprint</span>
                  <span className="font-mono font-bold text-rose-500">100.0 tCO₂e/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Baseline Cost</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">₹28,50,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Capex Required</span>
                  <span className="font-mono font-bold text-slate-500">₹0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payback Period</span>
                  <span className="font-mono font-bold text-slate-500">N/A</span>
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
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-lg flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
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
                <p className="text-xs text-slate-500 mb-4 font-mono">
                  Fuel: {sc.sliderInputs.fuelShiftPct}% | PCR: {sc.sliderInputs.pcrResinPct}% | Scrap: {sc.sliderInputs.scrapRecyclePct}%
                </p>

                <div className="space-y-3 py-3 border-y border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Annual CO₂ Cut</span>
                    <span className="font-mono font-bold text-emerald-500">
                      -{formatNumber(sc.savedKpi.co2ReductionPercentage)}% ({formatNumber(sc.savedKpi.monthlyCO2SavedTons * 12)} tCO₂e/yr)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Annual Net ROI</span>
                    <span className="font-mono font-bold text-purple-500">
                      {sc.savedKpi.financialSavings.totalNetSavingsDisplay}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Capex Estimate</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                      {sc.capexEst}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payback Period</span>
                    <span className="font-mono font-bold text-cyan-500">
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
                  className="w-full flex items-center justify-center space-x-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Load Plan into Live Sliders</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
