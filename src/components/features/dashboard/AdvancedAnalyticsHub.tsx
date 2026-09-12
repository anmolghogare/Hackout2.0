import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Flame, Activity, TrendingUp, AlertTriangle, Info, Sparkles, Zap, Layers, RefreshCw } from 'lucide-react';
import { AnomalyLog, ViewMode } from '../../../types';
import { formatINR } from '../../../lib/utils';

export interface AdvancedAnalyticsHubProps {
  onOpenAnomalyCopilot?: (anomaly: AnomalyLog) => void;
  viewMode?: ViewMode;
}

export const AdvancedAnalyticsHub: React.FC<AdvancedAnalyticsHubProps> = ({
  onOpenAnomalyCopilot,
  viewMode = 'carbon',
}) => {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(1);
  const [selectedFacilityNode, setSelectedFacilityNode] = useState<string | null>('furnace');
  const isFinancial = viewMode === 'financial';

  const anomalies: AnomalyLog[] = [
    {
      id: 'anom-1',
      title: 'Raw Material Resin Embodied Carbon Spike',
      stageName: '1. RAW MATERIAL RESIN',
      spikeMetric: '+14.2% Emissions Spike',
      severity: 'MEDIUM',
      featureImportance: [
        { feature: 'Virgin LLDPE Ratio', weight: 0.65 },
        { feature: 'Supplier Logistics Distance', weight: 0.25 },
        { feature: 'Recycled Content %', weight: 0.10 },
      ],
      naturalExplanation: 'Virgin LLDPE polymer ratio increased to 100% due to temporary PCR resin supply shortage from Vapi plant.',
      mitigationSteps: ['Substitute 20% PCR resin from ResinTech', 'Re-route supplier to local Pune plant'],
    },
    {
      id: 'anom-2',
      title: 'Furnace Burner Thermal Loss & Overshoot',
      stageName: '2. FURNACE HEATING',
      spikeMetric: '+28.4% Heavy Oil Over-consumption',
      severity: 'HIGH',
      featureImportance: [
        { feature: 'Burner Temp Overshoot (>1400°C)', weight: 0.72 },
        { feature: 'Heavy Oil Sulphur Grade', weight: 0.18 },
        { feature: 'Combustion Air Ratio', weight: 0.10 },
      ],
      naturalExplanation: 'Furnace temperature overshoot at 1418°C caused 15.4 KL heavy fuel oil waste during night shift operations.',
      mitigationSteps: ['Install automated PID ceramic burner controller', 'Shift 50% thermal load to biomass briquettes'],
    },
    {
      id: 'anom-3',
      title: 'Scrap Waste Landfill Accumulation',
      stageName: '4. WASTE SCRAP DISPOSAL',
      spikeMetric: '+17.0 tCO₂e Landfill Footprint',
      severity: 'HIGH',
      featureImportance: [
        { feature: 'Off-Cut Edge Trim Scrap', weight: 0.85 },
        { feature: 'Internal Regrind Efficiency', weight: 0.15 },
      ],
      naturalExplanation: '12 Tons/mo of off-cut LLDPE trim scrap dumped at un-segregated municipal landfill without secondary off-take.',
      mitigationSteps: ['Trade 12T trim scrap to Apex Pipe Mfg via B2B Waste Exchange', 'Generate ₹3,00,000/yr scrap revenue'],
    },
  ];

  const regressionPoints = [
    { fuelPct: 0, co2Tons: 100, costINR: '₹28.5L', anomalyIdx: 0, label: '0% Shift (Baseline)' },
    { fuelPct: 25, co2Tons: 84.6, costINR: '₹24.1L', anomalyIdx: 1, label: '25% Hybrid Shift' },
    { fuelPct: 50, co2Tons: 71.2, costINR: '₹22.0L', anomalyIdx: 2, label: '50% Shift Target' },
    { fuelPct: 75, co2Tons: 57.8, costINR: '₹19.5L', anomalyIdx: 1, label: '75% PNG Shift' },
    { fuelPct: 100, co2Tons: 44.4, costINR: '₹16.8L', anomalyIdx: 0, label: '100% Green Biomass' },
  ];

  const activeAnomaly = selectedPoint !== null ? anomalies[regressionPoints[selectedPoint].anomalyIdx] : anomalies[1];

  return (
    <Card className="mb-8 theme-transition">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Activity className="w-5 h-5 text-emerald-500" />
              </div>
              <span>Advanced Thermal Hotspot Diagnostics & Regression Engine</span>
            </CardTitle>
            <CardDescription className="mt-1">
              Multi-node facility thermal intensity map, empirical fuel regression model, and explainable AI root-cause diagnostics.
            </CardDescription>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 flex items-center space-x-1.5 self-start sm:self-center">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>AI Thermal Diagnostics Active</span>
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. Facility Heatmap Canvas */}
          <div className="p-6 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] text-slate-900 dark:text-white border border-slate-200/80 dark:border-white/[0.08] shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate-400 uppercase font-bold tracking-wider flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-emerald-500" />
                  <span>PLANT THERMAL INTENSITY MAP</span>
                </span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/[0.08]">
                  Apex Pune Unit #4
                </span>
              </div>

              {/* Plant Layout Graphic */}
              <div className="relative h-64 rounded-xl bg-white dark:bg-[#090C14] border border-slate-200/80 dark:border-white/[0.08] p-4 overflow-hidden shadow-inner">
                {/* Subtle Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                {/* Node 1: Resin Storage */}
                <div
                  onClick={() => setSelectedFacilityNode('polymer')}
                  className={`absolute top-6 left-8 p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedFacilityNode === 'polymer'
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-sm'
                      : 'bg-white/95 dark:bg-[#111624] border-slate-200 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/[0.2]'
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mb-1" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white block font-heading">Resin Storage</span>
                  <span className="text-[10px] text-slate-400 font-mono">2.80 tCO₂/T</span>
                </div>

                {/* Node 2: Furnace Heating Unit (CRITICAL THERMAL HOTSPOT) */}
                <div
                  onClick={() => setSelectedFacilityNode('furnace')}
                  className={`absolute top-12 left-44 p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedFacilityNode === 'furnace'
                      ? 'bg-rose-500/10 border-rose-500 shadow-md ring-2 ring-rose-500/30'
                      : 'bg-rose-500/5 border-rose-500/30 hover:border-rose-500'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-[10px] font-extrabold font-mono text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                      HOTSPOT ALERT (1418°C)
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block font-heading">
                    Furnace Oil Burner Unit
                  </span>
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 font-mono font-bold">
                    48.0 tCO₂e/mo (48% Share)
                  </span>
                </div>

                {/* Node 3: Extrusion Line Operations */}
                <div
                  onClick={() => setSelectedFacilityNode('extrusion')}
                  className={`absolute bottom-8 left-36 p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedFacilityNode === 'extrusion'
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-sm'
                      : 'bg-white/95 dark:bg-[#111624] border-slate-200 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/[0.2]'
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mb-1" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white block font-heading">Extrusion Motors</span>
                  <span className="text-[10px] text-slate-400 font-mono">25.0 tCO₂/mo</span>
                </div>

                {/* Node 4: Scrap Yard */}
                <div
                  onClick={() => setSelectedFacilityNode('scrap')}
                  className={`absolute bottom-6 right-8 p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedFacilityNode === 'scrap'
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-sm'
                      : 'bg-white/95 dark:bg-[#111624] border-slate-200 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/[0.2]'
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mb-1" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white block font-heading">Trim Scrap Yard</span>
                  <span className="text-[10px] text-slate-400 font-mono">17.0 tCO₂/mo</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 font-mono flex justify-between">
              <span>Selected Node: <strong className="text-slate-900 dark:text-white uppercase">{selectedFacilityNode}</strong></span>
              <span className="text-rose-500 font-bold">Max Hotspot: Furnace Burner Unit</span>
            </div>
          </div>

          {/* 2. Fuel vs. Emission Regression Graph */}
          <div className="p-6 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>Fuel Shift Empirical Regression Plot</span>
                </h4>
                <Badge variant="normal">Linear Fit (R² = 0.984)</Badge>
              </div>

              {/* SVG Scatter & Line Plot */}
              <div className="relative h-48 rounded-xl bg-white dark:bg-[#090C14] border border-slate-200/80 dark:border-white/[0.08] p-4">
                <svg className="w-full h-full overflow-visible">
                  {/* Regression Line */}
                  <line x1="30" y1="150" x2="280" y2="30" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 4" />

                  {/* Interactive Points */}
                  {regressionPoints.map((pt, i) => {
                    const cx = 30 + i * 62;
                    const cy = 150 - i * 30;
                    const isSelected = selectedPoint === i;

                    return (
                      <g key={i} className="cursor-pointer" onClick={() => setSelectedPoint(i)}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isSelected ? '7' : '4.5'}
                          fill={isSelected ? '#10b981' : '#334155'}
                          stroke={isSelected ? '#ffffff' : '#10b981'}
                          strokeWidth="2"
                          className="transition-all duration-300 hover:r-7"
                        />
                        <text x={cx - 10} y={cy - 12} fontSize="9" fill="#94a3b8" fontFamily="monospace">
                          {pt.co2Tons}t
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {selectedPoint !== null && (
              <div className="mt-4 p-4 rounded-xl bg-white dark:bg-[#0D0F18] border border-slate-200/80 dark:border-white/[0.08] text-xs font-mono flex justify-between items-center shadow-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">SELECTED REGRESSION POINT</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {regressionPoints[selectedPoint].label} ({regressionPoints[selectedPoint].co2Tons} tCO₂e)
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onOpenAnomalyCopilot && onOpenAnomalyCopilot(activeAnomaly)}
                  className="flex items-center space-x-1.5"
                >
                  <span>Diagnostic Review</span>
                  <Info className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* 3. AI Copilot Anomaly Root-Cause Explainability Card */}
        <div className="p-6 rounded-2xl bg-slate-50/90 dark:bg-[#111624] border border-slate-200/80 dark:border-emerald-500/20 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <AlertTriangle className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold tracking-wider">
                  AI EXPLAINABILITY ENGINE (SHAP FEATURE IMPORTANCE)
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-base font-heading">
                  {activeAnomaly.title}
                </h4>
              </div>
            </div>

            <Badge variant="alert">{activeAnomaly.spikeMetric}</Badge>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            {activeAnomaly.naturalExplanation}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-200/80 dark:border-white/[0.06]">
            {/* Feature Importance SHAP Bars */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold tracking-wider">
                FEATURE IMPORTANCE BREAKDOWN:
              </span>
              <div className="space-y-2">
                {activeAnomaly.featureImportance.map((f, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between font-mono text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">{f.feature}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{(f.weight * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-white/[0.08] rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${f.weight * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Mitigation Steps */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold tracking-wider">
                RECOMMENDED MITIGATION STEPS:
              </span>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {activeAnomaly.mitigationSteps.map((step, i) => (
                  <li key={i} className="flex items-center space-x-2 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
