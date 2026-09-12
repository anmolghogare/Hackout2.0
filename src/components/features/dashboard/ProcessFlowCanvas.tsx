import React, { useState } from 'react';
import { ProcessStage, ViewMode } from '../../../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import {
  Flame,
  AlertTriangle,
  Zap,
  Layers,
  Sparkles,
  ChevronRight,
  Info,
} from 'lucide-react';
import { formatINR, formatNumber } from '../../../lib/utils';
import { cn } from '../../../lib/utils';

export interface ProcessFlowCanvasProps {
  stages?: ProcessStage[];
  viewMode?: ViewMode;
  onSelectStageForSimulation?: (stageIdx: number) => void;
}

const DEFAULT_STAGES: ProcessStage[] = [
  {
    name: '1. RAW MATERIAL',
    desc: 'Virgin Polymer Resin (100T/mo)',
    currentMonthlyCO2: 10,
    financialMonthlyCost: 750000,
    sharePercentage: 10,
    status: 'NORMAL',
    provenanceFormula: 'CO₂ = 2.80 tCO₂e/T × ResinTons × (1 - PCR_Substitution)',
  },
  {
    name: '2. FURNACE HEATING',
    desc: 'Heavy Furnace Oil (1400°C)',
    currentMonthlyCO2: 48,
    financialMonthlyCost: 1400000,
    sharePercentage: 48,
    status: 'RED ALERT',
    alertPriority: 'PRIORITY 1',
    provenanceFormula: 'CO₂ = HeavyOil_Liters × 3.12 kgCO₂e/L × (1 - 0.44 × FuelShift)',
  },
  {
    name: '3. PROCESSING LINE',
    desc: 'Extrusion Line Operations',
    currentMonthlyCO2: 25,
    financialMonthlyCost: 500000,
    sharePercentage: 25,
    status: 'EVALUATE',
    provenanceFormula: 'CO₂ = Electricity_kWh × CEA_Grid_Factor (0.82 kgCO₂e/kWh)',
  },
  {
    name: '4. WASTE SCRAP',
    desc: 'Off-cut Trim Scrap (12T/mo)',
    currentMonthlyCO2: 17,
    financialMonthlyCost: 200000,
    sharePercentage: 17,
    status: 'RED ALERT',
    alertPriority: 'PRIORITY 2',
    provenanceFormula: 'CO₂ = UnrecycledScrapTons × LandfillFactor (1.41 tCO₂e/T)',
  },
];

export const ProcessFlowCanvas: React.FC<ProcessFlowCanvasProps> = ({
  stages = [],
  viewMode = 'carbon',
  onSelectStageForSimulation,
}) => {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(1);
  const [hoveredStageIdx, setHoveredStageIdx] = useState<number | null>(null);

  const isFinancial = viewMode === 'financial';
  const displayStages = (stages && stages.length > 0) ? stages : DEFAULT_STAGES;

  // Hotspot details
  const hotspotBreakdowns = [
    {
      title: '1. Virgin Polymer Resin Input',
      share: 62,
      color: '#3b82f6',
      co2: '10.0 tCO₂e/mo',
      cost: '₹7,50,000 / mo',
      scope: 'Scope 3 (Upstream Supply Chain)',
      stageZone: 'INPUT STAGE',
      drivers: [
        'Virgin LLDPE resin baseline consumption (100 Tons/mo)',
        'Upstream embodied carbon intensity (2.80 tCO₂e/Ton)',
        'Petrochemical extraction & pelletization footprint',
      ],
      formula: 'CO₂ = 2.80 × PolymerTons × (1 - PCR_Blend%)',
      payback: 'Est. 7.5 Months (PCR Substitution)',
      actionPreset: 'Blend 20% Post-Consumer Recycled Resin',
    },
    {
      title: '2. Heavy Furnace Oil Combustion (1418°C)',
      share: 28,
      color: '#ef4444',
      co2: '48.0 tCO₂e/mo',
      cost: '₹14,00,000 / mo',
      scope: 'Scope 1 (Direct Stationary Combustion)',
      stageZone: 'THERMAL PROCESSING',
      drivers: [
        'High temperature thermal burner overshoot at 1418°C',
        'Heavy Furnace Oil (HFO) combustion (3.12 kgCO₂e/Liter)',
        'Burner uninsulated ceramic shell thermal dissipation',
      ],
      formula: 'CO₂ = HeavyOil_Liters × 3.12 kgCO₂e/L × (1 - 0.44 × FuelShift)',
      payback: 'Est. 10.0 Months (PNG / Biomass Briquette Shift)',
      actionPreset: 'Shift 50% Thermal Load to Biomass Briquettes',
    },
    {
      title: '3. Extrusion Line Drive Motors',
      share: 25,
      color: '#06b6d4',
      co2: '25.0 tCO₂e/mo',
      cost: '₹5,00,000 / mo',
      scope: 'Scope 2 (Indirect Electricity Grid)',
      stageZone: 'PROCESSING LINE',
      drivers: [
        'Extruder motor drive electric load (32,500 kWh/mo)',
        'CEA National Grid Factor (0.82 kgCO₂e/kWh)',
        'Constant-speed mechanical drives during idle cycles',
      ],
      formula: 'CO₂ = Electricity_kWh × CEA_Grid_Factor (0.82 kgCO₂e/kWh)',
      payback: 'Est. 4.2 Months (Variable Speed Drives & Jackets)',
      actionPreset: 'Install Variable Frequency Drives (VFDs)',
    },
    {
      title: '4. Off-Cut Trim Scrap Landfill',
      share: 17,
      color: '#8b5cf6',
      co2: '17.0 tCO₂e/mo',
      cost: '₹2,00,000 / mo',
      scope: 'Scope 3 (Downstream Waste)',
      stageZone: 'OUTPUT & RECOVERY',
      drivers: [
        '12 Tons/mo of off-cut polymer trim scrap dumped at municipal landfill',
        'Landfill decomposition & methane generation factor (1.41 tCO₂e/Ton)',
        'Un-monetized secondary raw material value',
      ],
      formula: 'CO₂ = UnrecycledScrapTons × LandfillFactor (1.41 tCO₂e/T)',
      payback: 'Est. 0.2 Months (Immediate B2B Off-take Contract)',
      actionPreset: 'Trade 12T Scrap to Apex Pipe Mfg at ₹25,000/Ton',
    },
  ];

  const currentStage = displayStages[activeStageIdx] || displayStages[0];
  const activeBreakdown = hotspotBreakdowns[activeStageIdx] || hotspotBreakdowns[0];

  return (
    <Card className="mb-10 overflow-hidden theme-transition shadow-xl border border-slate-200/80 dark:border-white/[0.08]">
      <CardHeader className="p-6 pb-4 border-b border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2.5 mb-1">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Flame className="w-5 h-5 text-emerald-500" />
              </div>
              <CardTitle className="text-lg font-heading font-extrabold text-slate-900 dark:text-white">
                Interactive Digital Twin Process Telemetry Pipeline
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
              Full lifecycle material telemetry: Input ➔ Thermal Processing ➔ Circular Recovery with real-time particle streams and SHAP diagnostics.
            </CardDescription>
          </div>

          {/* Legend Badges */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            <span className="text-xs px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono font-bold border border-rose-500/20 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Red Alert (Priority 1)</span>
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold border border-emerald-500/20 flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Telemetry Active</span>
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 space-y-8">
        {/* ============================================================ */}
        {/* PIPELINE VISUALIZER: INPUT -> PROCESSING -> OUTPUT */}
        {/* ============================================================ */}
        <div className="relative rounded-2xl p-6 sm:p-8 bg-slate-50/90 dark:bg-[#0C0E17] border border-slate-200/80 dark:border-white/[0.08] shadow-xs overflow-x-auto">
          {/* Section Headers: Input -> Processing -> Output */}
          <div className="min-w-[860px] grid grid-cols-4 gap-4 mb-3 text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
            <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>1. INPUT STAGE</span>
            </div>
            <div className="col-span-2 flex items-center justify-center space-x-1.5 text-rose-600 dark:text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>2. THERMAL & MECHANICAL PROCESSING (CRITICAL LEAK ZONE)</span>
            </div>
            <div className="text-right flex items-center justify-end space-x-1.5 text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>3. OUTPUT & RECOVERY</span>
            </div>
          </div>

          {/* SVG Pipeline Canvas with Glowing Particles */}
          <div className="min-w-[860px] relative py-6">
            {/* SVG Connecting Flow Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <linearGradient id="pipeGradCrimson" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="pipeGradTeal" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <marker id="arrowHeadRose" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 1, 8 4, 0 7" fill="#ef4444" />
                </marker>
                <marker id="arrowHeadCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 1, 8 4, 0 7" fill="#10b981" />
                </marker>
                <marker id="arrowHeadPurple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 1, 8 4, 0 7" fill="#10b981" />
                </marker>
              </defs>

              {/* Pipeline Track 1 -> 2 (Input to Thermal) */}
              <path
                d="M 180 80 L 255 80"
                stroke="url(#pipeGradCrimson)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                markerEnd="url(#arrowHeadRose)"
              />
              <path
                d="M 180 80 L 255 80"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="6 6"
                strokeDashoffset="12"
                fill="none"
                className="animate-[pulse_1.5s_infinite]"
              />

              {/* Pipeline Track 2 -> 3 (Thermal to Motors) */}
              <path
                d="M 435 80 L 510 80"
                stroke="url(#pipeGradTeal)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                markerEnd="url(#arrowHeadCyan)"
              />
              <path
                d="M 435 80 L 510 80"
                stroke="#ef4444"
                strokeWidth="3"
                strokeDasharray="6 6"
                fill="none"
                className="animate-[pulse_1.5s_infinite]"
              />

              {/* Pipeline Track 3 -> 4 (Motors to Output Recovery) */}
              <path
                d="M 690 80 L 765 80"
                stroke="url(#pipeGradCrimson)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                markerEnd="url(#arrowHeadPurple)"
              />
              <path
                d="M 690 80 L 765 80"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="6 6"
                fill="none"
                className="animate-[pulse_1.5s_infinite]"
              />
            </svg>

            {/* 4 Interactive Process Nodes */}
            <div className="relative z-10 grid grid-cols-4 gap-6">
              {displayStages.map((stage, idx) => {
                const isSelected = activeStageIdx === idx;
                const isRedAlert = stage.status === 'RED ALERT';
                const isEvaluate = stage.status === 'EVALUATE';

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStageIdx(idx)}
                    onMouseEnter={() => setHoveredStageIdx(idx)}
                    onMouseLeave={() => setHoveredStageIdx(null)}
                    className={cn(
                      'p-5 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-xl relative group flex flex-col justify-between shadow-xs',
                      isSelected
                        ? 'bg-white dark:bg-[#181C2C] ring-2 ring-emerald-500 shadow-md'
                        : 'bg-white/95 dark:bg-[#121522] hover:bg-slate-50 dark:hover:bg-[#161A2A]',
                      isRedAlert
                        ? isSelected
                          ? 'border-rose-500'
                          : 'border-rose-300 dark:border-rose-500/40 hover:border-rose-500'
                        : isEvaluate
                        ? 'border-amber-300 dark:border-amber-500/40 hover:border-amber-500'
                        : 'border-slate-200 dark:border-white/[0.08] hover:border-emerald-500/40'
                    )}
                  >
                    {/* Header */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                          STAGE 0{idx + 1}
                        </span>
                        <Badge variant={isRedAlert ? 'alert' : isEvaluate ? 'warning' : 'normal'}>
                          {stage.status}
                        </Badge>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading mb-1 group-hover:text-emerald-500 transition-colors">
                        {stage.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                        {stage.desc}
                      </p>
                    </div>

                    {/* Telemetry Metrics */}
                    <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-[11px]">Carbon Share</span>
                        <span
                          className={cn(
                            'font-bold',
                            isRedAlert ? 'text-rose-600 dark:text-rose-400 font-extrabold' : 'text-emerald-600 dark:text-emerald-400'
                          )}
                        >
                          {stage.sharePercentage}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-[11px]">Intensity</span>
                        <span className="text-slate-900 dark:text-white font-bold">
                          {isFinancial
                            ? formatINR(stage.financialMonthlyCost || 750000)
                            : `${stage.currentMonthlyCO2} tCO₂e/mo`}
                        </span>
                      </div>

                      {stage.alertPriority && (
                        <div className="mt-2 pt-1 text-[10px] text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider flex items-center space-x-1">
                          <AlertTriangle className="w-3 h-3 text-rose-500" />
                          <span>{stage.alertPriority}: ACTION REQUIRED</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MULTI-LAYER DRILLDOWN & INTERACTIVE RADIAL BREAKDOWN WHEEL */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Radial Wheel (Left Column) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] flex flex-col items-center justify-between shadow-xs">
            <div className="w-full text-left mb-4">
              <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>Multi-Layer Hotspot Wheel</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Click any slice to expand localized activity drivers.
              </p>
            </div>

            {/* Radial SVG Donut Chart */}
            <div className="relative w-48 h-48 flex items-center justify-center my-4">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Slice 1: 62% Virgin Resin */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#3b82f6"
                  strokeWidth="14"
                  strokeDasharray="155.8 251.3"
                  strokeDashoffset="0"
                  fill="none"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setActiveStageIdx(0)}
                />
                {/* Slice 2: 28% Heavy Furnace Oil */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#ef4444"
                  strokeWidth="14"
                  strokeDasharray="70.3 251.3"
                  strokeDashoffset="-155.8"
                  fill="none"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setActiveStageIdx(1)}
                />
                {/* Slice 3: 10% Scrap Waste */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#10b981"
                  strokeWidth="14"
                  strokeDasharray="25.1 251.3"
                  strokeDashoffset="-226.1"
                  fill="none"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setActiveStageIdx(3)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                  Baseline
                </span>
                <span className="text-xl font-black font-heading text-slate-900 dark:text-white mt-0.5">
                  100 tCO₂e
                </span>
                <span className="text-[10px] text-emerald-500 font-bold font-mono">
                  Apex Facility
                </span>
              </div>
            </div>

            {/* Slices legend buttons */}
            <div className="w-full space-y-2 text-xs font-medium">
              {hotspotBreakdowns.map((h, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStageIdx(i)}
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-xl transition-all',
                    activeStageIdx === i
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'bg-white dark:bg-[#161928] border border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-300 hover:border-emerald-500/30'
                  )}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: h.color }} />
                    <span className="truncate">{h.title}</span>
                  </div>
                  <span className="font-mono font-bold">{h.share}%</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Node Diagnostic Detail Drawer (Right Column) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between shadow-xs">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-bold text-emerald-500 font-mono uppercase tracking-wider">
                      {activeBreakdown.stageZone}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs text-slate-400 font-mono">{activeBreakdown.scope}</span>
                  </div>
                  <h3 className="text-lg font-extrabold font-heading text-slate-900 dark:text-white">
                    {activeBreakdown.title}
                  </h3>
                </div>

                <Badge variant={currentStage.status === 'RED ALERT' ? 'alert' : 'normal'}>
                  {currentStage.status}
                </Badge>
              </div>

              {/* Intensity & Cost Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-sm">
                <div className="p-4 rounded-xl bg-white dark:bg-[#0D0F18] border border-slate-200 dark:border-white/[0.08]">
                  <span className="text-xs text-slate-400 block mb-1">MONTHLY CARBON</span>
                  <span className="text-lg font-extrabold text-rose-500">{activeBreakdown.co2}</span>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#0D0F18] border border-slate-200 dark:border-white/[0.08]">
                  <span className="text-xs text-slate-400 block mb-1">MONTHLY OPEX COST</span>
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white">{activeBreakdown.cost}</span>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#0D0F18] border border-slate-200 dark:border-white/[0.08]">
                  <span className="text-xs text-slate-400 block mb-1">PAYBACK ESTIMATE</span>
                  <span className="text-lg font-extrabold text-emerald-500 font-sans">
                    {activeBreakdown.payback.split('(')[0]}
                  </span>
                </div>
              </div>

              {/* Activity Drivers */}
              <div>
                <h5 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-3">
                  Localized Operational Drivers:
                </h5>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {activeBreakdown.drivers.map((d, i) => (
                    <li key={i} className="flex items-start space-x-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                      <span className="leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mathematical Equation Provenance */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#090C14] border border-slate-200 dark:border-white/[0.08] text-xs font-mono">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1 flex items-center space-x-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-500" />
                  <span>EMPIRICAL REGRESSION FORMULA</span>
                </span>
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold">{activeBreakdown.formula}</p>
              </div>
            </div>

            {/* Bottom Recommendation Action */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-300">
                <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  Recommended Action:{' '}
                  <strong className="text-slate-900 dark:text-white">{activeBreakdown.actionPreset}</strong>
                </span>
              </div>

              <button
                onClick={() =>
                  onSelectStageForSimulation && onSelectStageForSimulation(activeStageIdx)
                }
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs flex items-center space-x-1.5 transition-all"
              >
                <span>Optimize in Live Simulator</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
