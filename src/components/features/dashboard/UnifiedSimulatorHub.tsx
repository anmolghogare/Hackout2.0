import React, { useState } from 'react';
import { SliderInputs, ViewMode } from '../../../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { SlidersHorizontal, RotateCcw, Zap, Thermometer, Flame, Recycle, Sparkles, ShieldCheck, Layers } from 'lucide-react';
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
      label: '⚡ Peak Load Optimization',
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
    { label: 'Net Optimized', val: finalEmissions, color: 'bg-emerald-500', isTotal: true },
  ];

  return (
    <Card className="mb-8 theme-transition">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <SlidersHorizontal className="w-5 h-5 text-emerald-500" />
              </div>
              <span>Unified Decarbonization Playground & Live ROI Hub</span>
            </CardTitle>
            <CardDescription className="mt-1">
              Real-time operational sliders, animated ISO 14064 compliance gauge, before/after split viewer, and dynamic waterfall accounting.
            </CardDescription>
          </div>

          {/* Compliance Progress Gauge (ISO 14064) */}
          <div className="flex items-center space-x-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] shrink-0">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3.5" className="text-slate-200 dark:text-white/[0.1] fill-none" />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  strokeWidth="3.5"
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
              <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold tracking-wider">
                ISO 14064 COMPLIANCE
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isoComplianceScore >= 80 ? 'Gold Standard Tier' : 'Optimization Active'}</span>
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Preset Scenario Quick-Action Chips */}
        <div>
          <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider block mb-2.5">
            Select Preset Decarbonization Scenario:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => onApplyPreset(preset.inputs)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/[0.04] hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200/80 dark:border-white/[0.08] hover:border-emerald-500/30 transition-all flex items-center space-x-1.5 shadow-xs"
              >
                <span>{preset.label}</span>
              </button>
            ))}
            <button
              onClick={onReset}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-200/70 dark:bg-white/[0.08] hover:bg-slate-300 dark:hover:bg-white/[0.12] text-slate-700 dark:text-slate-200 transition-all flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Live ROI Counter Header Bar */}
        <div className="p-6 rounded-2xl bg-slate-50/90 dark:bg-[#111624] border border-slate-200/80 dark:border-emerald-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                Simulated Net Carbon Abatement
              </span>
              <h3 className="text-2xl font-extrabold font-heading text-emerald-600 dark:text-emerald-400 mt-0.5">
                {formatNumber(monthlyCO2SavedTons)} tCO₂e / mo <span className="text-xs font-mono font-normal text-slate-400">(-{co2ReductionPercentage}% cut)</span>
              </h3>
            </div>
          </div>

          <div className="text-left sm:text-right w-full sm:w-auto">
            <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
              Simulated Annual Balance-Sheet ROI
            </span>
            <h3 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white mt-0.5 font-mono">
              {financialSavings.totalNetSavingsDisplay}
            </h3>
          </div>
        </div>

        {/* 2-Column Controls & Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls Sliders */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
              Operational Substitution & Efficiency Sliders
            </h4>

            {/* Slider 1 */}
            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-emerald-500" />
                  <span>Furnace Oil ➔ Biomass / PNG Fuel Shift</span>
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{sliderInputs.fuelShiftPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={sliderInputs.fuelShiftPct}
                onChange={(e) => onSliderChange('fuelShiftPct', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Slider 2 */}
            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
                  <Thermometer className="w-4 h-4 text-emerald-500" />
                  <span>Furnace Temperature Optimization</span>
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">-{sliderInputs.tempReductionPct}°C</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={sliderInputs.tempReductionPct}
                onChange={(e) => onSliderChange('tempReductionPct', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Slider 3 */}
            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-emerald-500" />
                  <span>PCR Secondary Polymer Blend</span>
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{sliderInputs.pcrResinPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={sliderInputs.pcrResinPct}
                onChange={(e) => onSliderChange('pcrResinPct', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Slider 4 */}
            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
                  <Recycle className="w-4 h-4 text-emerald-500" />
                  <span>Scrap Recycling & Closed-Loop Trade</span>
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{sliderInputs.scrapRecyclePct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={sliderInputs.scrapRecyclePct}
                onChange={(e) => onSliderChange('scrapRecyclePct', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          {/* Interactive Before/After Split View Slider */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0D0F18] text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                  Baseline vs Optimized Split
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Slider Split: {splitPos}%
                </span>
              </div>

              {/* Split View Graphic */}
              <div className="relative h-40 rounded-xl overflow-hidden border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-[#080B12]">
                {/* Before (Left Side) */}
                <div
                  className="absolute inset-y-0 left-0 bg-slate-200/60 dark:bg-slate-900/80 p-4 border-r-2 border-emerald-500 transition-all"
                  style={{ width: `${splitPos}%` }}
                >
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">
                    BEFORE (BASELINE)
                  </span>
                  <p className="text-lg font-bold text-slate-900 dark:text-white font-heading mt-1">100.0 tCO₂e/mo</p>
                  <p className="text-xs text-slate-500 mt-1 font-mono">₹28.5L Monthly Cost</p>
                </div>

                {/* After (Right Side) */}
                <div
                  className="absolute inset-y-0 right-0 bg-emerald-500/10 dark:bg-emerald-950/40 p-4 text-right transition-all"
                  style={{ width: `${100 - splitPos}%` }}
                >
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold block">
                    AFTER (SIMULATED)
                  </span>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-heading mt-1">
                    {finalEmissions} tCO₂e/mo
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-mono font-semibold">
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
                className="w-full mt-4 h-2 bg-slate-200 dark:bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400 font-mono flex justify-between">
              <span>Baseline: 100.0 tCO₂e</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                Net Abatement: -{co2ReductionPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Carbon Waterfall Chart */}
        <div className="p-6 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08]">
          <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-emerald-500" />
            <span>Dynamic Carbon Abatement Waterfall Chart</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
            {waterfallSteps.map((step, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white dark:bg-[#0D0F18] border border-slate-200/80 dark:border-white/[0.08] text-center flex flex-col justify-between shadow-xs"
              >
                <span className="text-xs font-medium text-slate-500 truncate">{step.label}</span>
                <span
                  className={`text-base font-extrabold font-heading mt-2 font-mono ${
                    step.val < 0
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : step.isTotal
                      ? 'text-slate-900 dark:text-white'
                      : 'text-rose-500'
                  }`}
                >
                  {step.val > 0 ? `+${step.val}` : step.val} t
                </span>
                <div className={`h-1.5 w-full rounded-full mt-2.5 ${step.color}`} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
