import React, { useState } from 'react';
import { SliderInputs, ViewMode } from '../../../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { SlidersHorizontal, RotateCcw, Zap, Thermometer, Flame, Recycle, Sparkles, TrendingDown, DollarSign, Award, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import { formatINR, formatNumber, calculateLocalSimulation } from '../../../lib/utils';

export interface UnifiedSimulatorHubProps {
  sliderInputs: SliderInputs;
  onSliderChange: (key: keyof SliderInputs, value: number) => void;
  onApplyPreset: (preset: Partial<SliderInputs>) => void;
  onReset: () => void;
  viewMode?: ViewMode;
}

export const UnifiedSimulatorHub: React.FC<UnifiedSimulatorHubProps> = ({
  sliderInputs,
  onSliderChange,
  onApplyPreset,
  onReset,
  viewMode = 'carbon',
}) => {
  const [splitPos, setSplitPos] = useState(50); // 0 to 100% split slider
  const isFinancial = viewMode === 'financial';

  // Compute live state
  const simulation = calculateLocalSimulation(sliderInputs);
  const { monthlyCO2SavedTons, co2ReductionPercentage, financialSavings } = simulation.kpiData;

  // Compliance score calculation (0 to 100%)
  const isoComplianceScore = Math.min(100, Math.round(50 + co2ReductionPercentage * 1.7));
  const complianceColor =
    isoComplianceScore >= 80
      ? 'text-emerald-500 stroke-emerald-500'
      : isoComplianceScore >= 65
      ? 'text-amber-500 stroke-amber-500'
      : 'text-rose-500 stroke-rose-500';

  // Preset Scenario Chips
  const presets = [
    {
      label: '🌱 Net-Zero 2030 Target',
      inputs: { fuelShiftPct: 80, tempReductionPct: 15, pcrResinPct: 40, scrapRecyclePct: 100 },
    },
    {
      label: '⚡ Peak Load Emergency',
      inputs: { fuelShiftPct: 100, tempReductionPct: 20, pcrResinPct: 25, scrapRecyclePct: 90 },
    },
    {
      label: '💰 Maximum Financial ROI',
      inputs: { fuelShiftPct: 50, tempReductionPct: 10, pcrResinPct: 30, scrapRecyclePct: 100 },
    },
    {
      label: '🔄 Balanced Circularity',
      inputs: { fuelShiftPct: 60, tempReductionPct: 8, pcrResinPct: 35, scrapRecyclePct: 100 },
    },
  ];

  // Dynamic Carbon Waterfall Chart Breakdown Steps
  const baseline = 100;
  const fuelCut = Number((48 * (sliderInputs.fuelShiftPct / 100) * 0.44).toFixed(1));
  const tempCut = Number((48 * (sliderInputs.tempReductionPct / 20) * 0.18).toFixed(1));
  const pcrCut = Number((10 * (sliderInputs.pcrResinPct / 50) * 0.40).toFixed(1));
  const scrapCut = Number((17 * (sliderInputs.scrapRecyclePct / 100) * 0.85).toFixed(1));
  const finalEmissions = Number((baseline - fuelCut - tempCut - pcrCut - scrapCut).toFixed(1));

  const waterfallSteps = [
    { label: 'Baseline', val: baseline, color: 'bg-rose-500', isTotal: true },
    { label: 'Fuel Shift', val: -fuelCut, color: 'bg-emerald-500' },
    { label: 'Temp Cut', val: -tempCut, color: 'bg-amber-500' },
    { label: 'PCR Blend', val: -pcrCut, color: 'bg-cyan-500' },
    { label: 'Scrap Loop', val: -scrapCut, color: 'bg-purple-500' },
    { label: 'Net Optimized', val: finalEmissions, color: 'bg-teal-500', isTotal: true },
  ];

  return (
    <Card className="mb-8 theme-transition">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <SlidersHorizontal className="w-5 h-5 text-emerald-500" />
              <span>Unified "What-If" Decarbonization Playground & Live ROI Hub</span>
            </CardTitle>
            <CardDescription>
              Real-time slider controls, animated ISO compliance gauge, split Before/After view, and dynamic waterfall breakdown.
            </CardDescription>
          </div>

          {/* Compliance Progress Gauge (ISO 14064) */}
          <div className="flex items-center space-x-4 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shrink-0">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" className="text-slate-300 dark:text-slate-700 fill-none" />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  strokeWidth="4"
                  strokeDasharray="125.6"
                  strokeDashoffset={125.6 - (125.6 * isoComplianceScore) / 100}
                  strokeLinecap="round"
                  className={`fill-none transition-all duration-500 ${complianceColor}`}
                />
              </svg>
              <span className="absolute text-[11px] font-mono font-bold text-slate-900 dark:text-white">
                {isoComplianceScore}%
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">
                ISO 14064 COMPLIANCE SCORE
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isoComplianceScore >= 80 ? 'Verified Gold Standard' : 'In Optimization'}</span>
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Preset Scenario Quick-Action Chips */}
        <div className="mb-6">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Preset Target Scenarios:
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => onApplyPreset(preset.inputs)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/10 hover:text-emerald-500 border border-slate-200 dark:border-slate-700 transition-all flex items-center space-x-1 shadow-sm"
              >
                <span>{preset.label}</span>
              </button>
            ))}
            <button
              onClick={onReset}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 transition-all flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Live ROI Counter Header Bar */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-purple-950/40 border border-emerald-500/30 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Live Simulation Abatement
              </span>
              <h3 className="text-2xl font-extrabold font-heading text-emerald-400 animate-pulse">
                {formatNumber(monthlyCO2SavedTons)} tCO₂e/mo ({co2ReductionPercentage}% Cut)
              </h3>
            </div>
          </div>

          <div className="text-right sm:text-right w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Live Annual Cashflow ROI
            </span>
            <h3 className="text-2xl font-extrabold font-heading text-purple-400">
              {financialSavings.totalNetSavingsDisplay}
            </h3>
          </div>
        </div>

        {/* 2-Column Controls & Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Controls Sliders */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Operational Scale & Substitution Sliders
            </h4>

            {/* Slider 1 */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  <span>Furnace Oil ➔ Biomass / PNG Shift</span>
                </span>
                <span className="font-mono font-bold text-emerald-500">{sliderInputs.fuelShiftPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={sliderInputs.fuelShiftPct}
                onChange={(e) => onSliderChange('fuelShiftPct', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Slider 2 */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                  <span>Furnace Temp Cut</span>
                </span>
                <span className="font-mono font-bold text-amber-500">-{sliderInputs.tempReductionPct}°C</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={sliderInputs.tempReductionPct}
                onChange={(e) => onSliderChange('tempReductionPct', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Slider 3 */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-500" />
                  <span>PCR Polymer Blend</span>
                </span>
                <span className="font-mono font-bold text-cyan-500">{sliderInputs.pcrResinPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={sliderInputs.pcrResinPct}
                onChange={(e) => onSliderChange('pcrResinPct', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Slider 4 */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                  <Recycle className="w-3.5 h-3.5 text-purple-500" />
                  <span>Scrap Recycling Loop</span>
                </span>
                <span className="font-mono font-bold text-purple-500">{sliderInputs.scrapRecyclePct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={sliderInputs.scrapRecyclePct}
                onChange={(e) => onSliderChange('scrapRecyclePct', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          </div>

          {/* Interactive Before/After Split View Slider */}
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                  BEFORE vs AFTER SPLIT COMPARISON
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Drag slider: {splitPos}%
                </span>
              </div>

              {/* Split View Graphic */}
              <div className="relative h-36 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                {/* Before (Left Side) */}
                <div
                  className="absolute inset-y-0 left-0 bg-rose-950/50 p-4 border-r-2 border-amber-400 transition-all"
                  style={{ width: `${splitPos}%` }}
                >
                  <span className="text-[10px] font-mono text-rose-400 uppercase font-bold block">
                    BEFORE (BASELINE)
                  </span>
                  <p className="text-lg font-bold text-white font-heading mt-1">100 tCO₂e/mo</p>
                  <p className="text-xs text-slate-400 mt-1 font-mono">₹28.5L Monthly Cost</p>
                </div>

                {/* After (Right Side) */}
                <div
                  className="absolute inset-y-0 right-0 bg-emerald-950/50 p-4 text-right transition-all"
                  style={{ width: `${100 - splitPos}%` }}
                >
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                    AFTER (SIMULATED)
                  </span>
                  <p className="text-lg font-bold text-emerald-400 font-heading mt-1">
                    {finalEmissions} tCO₂e/mo
                  </p>
                  <p className="text-xs text-purple-400 mt-1 font-mono">
                    {financialSavings.totalNetSavingsDisplay}
                  </p>
                </div>
              </div>

              {/* Interactive Split Control Slider */}
              <input
                type="range"
                min="10"
                max="90"
                value={splitPos}
                onChange={(e) => setSplitPos(Number(e.target.value))}
                className="w-full mt-3 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex justify-between">
              <span>Baseline: 100 tCO₂e</span>
              <span className="text-emerald-400 font-bold">
                Net Reduction: -{co2ReductionPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Carbon Waterfall Chart */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-emerald-500" />
            <span>Dynamic Carbon Abatement Waterfall Chart</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
            {waterfallSteps.map((step, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-between shadow-sm"
              >
                <span className="text-[11px] font-medium text-slate-500 truncate">{step.label}</span>
                <span
                  className={`text-base font-extrabold font-heading mt-2 ${
                    step.value < 0
                      ? 'text-emerald-500'
                      : step.isTotal
                      ? 'text-slate-900 dark:text-white'
                      : 'text-rose-500'
                  }`}
                >
                  {step.value > 0 ? `+${step.value}` : step.value} t
                </span>
                <div className={`h-1.5 w-full rounded-full mt-2 ${step.color}`} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
