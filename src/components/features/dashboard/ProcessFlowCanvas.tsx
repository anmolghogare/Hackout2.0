import React, { useState } from 'react';
import { ProcessStage, ViewMode } from '../../../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Flame, AlertTriangle, ArrowRight, X, Info, Zap, DollarSign, Leaf, Sparkles, Layers } from 'lucide-react';
import { formatINR, formatNumber } from '../../../lib/utils';

export interface ProcessFlowCanvasProps {
  stages: ProcessStage[];
  viewMode: ViewMode;
}

export const ProcessFlowCanvas: React.FC<ProcessFlowCanvasProps> = ({ stages, viewMode }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<{
    title: string;
    share: number;
    color: string;
    co2: string;
    cost: string;
    drivers: string[];
    formula: string;
    payback: string;
  } | null>(null);

  const isFinancial = viewMode === 'financial';

  const hotspots = [
    {
      title: 'Virgin Polymer Resin Input',
      share: 62,
      color: '#3b82f6',
      co2: '62.0 tCO₂e/mo',
      cost: '₹7.50 L/mo',
      drivers: [
        'Virgin LLDPE Resin cost baseline',
        'Material embodied footprint (2.80 tCO₂e/Ton)',
        'Scope 3 upstream supply chain intensity',
      ],
      formula: 'CO₂ = 2.80 × PolymerTons × (1 - PCR_Blend%)',
      payback: 'Est. 7.5 Months (PCR Substitution)',
    },
    {
      title: 'Heavy Furnace Oil Combustion',
      share: 28,
      color: '#ef4444',
      co2: '28.0 tCO₂e/mo',
      cost: '₹14.00 L/mo',
      drivers: [
        'High temperature thermal process (1400°C)',
        'Furnace oil burner thermal loss & overshoot',
        'Scope 1 direct stationary combustion',
      ],
      formula: 'CO₂ = HeavyOil_Liters × 3.12 kgCO₂e/L × (1 - 0.44 × FuelShift)',
      payback: 'Est. 10.0 Months (PNG/Biomass Shift)',
    },
    {
      title: 'Extrusion Line Electricity',
      share: 10,
      color: '#10b981',
      co2: '10.0 tCO₂e/mo',
      cost: '₹5.00 L/mo',
      drivers: [
        'Extruder motor drive efficiency',
        'Grid carbon intensity (CEA factor 0.82)',
        'Scope 2 indirect electricity emissions',
      ],
      formula: 'CO₂ = Electricity_kWh × CEA_Grid_Factor (0.82 kgCO₂e/kWh)',
      payback: 'Est. 4.2 Months (Variable Speed Drive)',
    },
  ];

  return (
    <Card className="mb-8 overflow-hidden theme-transition">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Flame className={`w-5 h-5 ${isFinancial ? 'text-amber-500' : 'text-rose-500'}`} />
              <span>Digital Twin Process Flow Canvas & Multi-Layer Diagnostics</span>
            </CardTitle>
            <CardDescription>
              Interactive 4-stage manufacturing line with glowing particle-stream connectors, dynamic ambient halos, and radial breakdown wheel.
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold border border-emerald-500/20 flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Live Particle Stream</span>
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* 1. Digital Twin SVG Particle Stream Node Flow Canvas */}
        <div className="relative p-6 rounded-2xl bg-slate-900/90 dark:bg-[#091121] border border-slate-800 mb-8 shadow-inner overflow-x-auto">
          {/* Connector Flow Background Canvas */}
          <div className="min-w-[700px] flex items-center justify-between relative py-6">
            {/* SVG Connecting Flow Streams with Animated Particles */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <linearGradient id="streamGradCrimson" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="streamGradTeal" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="streamGradGold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Line 1 -> 2 */}
              <path
                d="M 170 50 L 250 50"
                stroke={isFinancial ? 'url(#streamGradGold)' : 'url(#streamGradCrimson)'}
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 170 50 L 250 50"
                stroke={isFinancial ? '#f59e0b' : '#ef4444'}
                strokeWidth="4"
                fill="none"
                className="animate-particle-fast"
              />

              {/* Line 2 -> 3 */}
              <path
                d="M 390 50 L 470 50"
                stroke={isFinancial ? 'url(#streamGradGold)' : 'url(#streamGradTeal)'}
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M 390 50 L 470 50"
                stroke={isFinancial ? '#8b5cf6' : '#10b981'}
                strokeWidth="3"
                fill="none"
                className="animate-particle-normal"
              />

              {/* Line 3 -> 4 */}
              <path
                d="M 610 50 L 690 50"
                stroke={isFinancial ? 'url(#streamGradGold)' : 'url(#streamGradCrimson)'}
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 610 50 L 690 50"
                stroke={isFinancial ? '#f59e0b' : '#ef4444'}
                strokeWidth="4"
                fill="none"
                className="animate-particle-fast"
              />
            </svg>

            {/* 4 Digital Twin Nodes */}
            {stages.map((stage, idx) => {
              const isRedAlert = stage.status === 'RED ALERT';
              const isEvaluate = stage.status === 'EVALUATE';

              return (
                <div
                  key={idx}
                  className={`relative z-10 w-44 p-4 rounded-xl border backdrop-blur-md transition-all duration-300 ${
                    isRedAlert
                      ? isFinancial
                        ? 'ambient-halo-financial bg-amber-950/40 border-amber-500'
                        : 'ambient-halo-danger bg-rose-950/40 border-rose-500'
                      : isEvaluate
                      ? 'bg-amber-950/20 border-amber-500/50'
                      : 'bg-slate-800/80 border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold font-mono text-slate-400 tracking-wider">
                      STAGE 0{idx + 1}
                    </span>
                    <Badge
                      variant={
                        isRedAlert ? 'alert' : isEvaluate ? 'warning' : 'normal'
                      }
                    >
                      {stage.status}
                    </Badge>
                  </div>

                  <h5 className="text-xs font-bold text-white mb-1 font-heading truncate">
                    {stage.name}
                  </h5>
                  <p className="text-[10px] text-slate-400 mb-3 truncate">{stage.desc}</p>

                  <div className="pt-2 border-t border-slate-700/60 flex justify-between items-center text-xs">
                    <span className="text-slate-400 text-[10px]">
                      {isFinancial ? 'Monthly Cost' : 'Carbon Intensity'}
                    </span>
                    <span className="font-mono font-bold text-emerald-400">
                      {isFinancial
                        ? formatINR(stage.financialMonthlyCost || 500000)
                        : `${stage.currentMonthlyCO2} tCO₂`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Radial Breakdown Wheel & Multi-Layer Diagnostics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Radial breakdown chart */}
          <div className="lg:col-span-1 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2 font-heading">
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>Multi-Layer Hotspot Wheel</span>
            </h4>

            {/* Interactive SVG Donut Wheel */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Slice 1: 62% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#3b82f6"
                  strokeWidth="15"
                  strokeDasharray="155.8 251.3"
                  strokeDashoffset="0"
                  fill="none"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedHotspot(hotspots[0])}
                />
                {/* Slice 2: 28% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#ef4444"
                  strokeWidth="15"
                  strokeDasharray="70.3 251.3"
                  strokeDashoffset="-155.8"
                  fill="none"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedHotspot(hotspots[1])}
                />
                {/* Slice 3: 10% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#10b981"
                  strokeWidth="15"
                  strokeDasharray="25.1 251.3"
                  strokeDashoffset="-226.1"
                  fill="none"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedHotspot(hotspots[2])}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-xs font-mono text-slate-400 uppercase">Total Intensity</span>
                <span className="text-xl font-extrabold font-heading text-slate-900 dark:text-white">
                  100 tCO₂e
                </span>
                <span className="text-[10px] text-emerald-500 font-bold">Click Slices</span>
              </div>
            </div>

            {/* Slice legend */}
            <div className="w-full space-y-2 mt-4 text-xs">
              {hotspots.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedHotspot(item)}
                  className="w-full flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium text-slate-700 dark:text-slate-200">{item.title}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{item.share}%</span>
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostic Slide-out Drawer / Detail View */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            {selectedHotspot ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                  <div>
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">
                      Localized Hotspot Diagnostic
                    </span>
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                      {selectedHotspot.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedHotspot(null)}
                    className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-500">Monthly Emission</span>
                    <p className="text-lg font-bold font-heading text-rose-500">{selectedHotspot.co2}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-500">Monthly Financial Cost</span>
                    <p className="text-lg font-bold font-heading text-purple-500">{selectedHotspot.cost}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Primary Operational Drivers
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {selectedHotspot.drivers.map((d, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800">
                  <span className="text-slate-500 text-[10px] block mb-1">EMPIRICAL REGRESSION FORMULA</span>
                  <p className="text-emerald-400">{selectedHotspot.formula}</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex justify-between items-center text-xs">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Estimated Payback Period:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedHotspot.payback}</span>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-3">
                <Sparkles className="w-10 h-10 text-emerald-500/60 animate-bounce" />
                <h4 className="font-bold text-slate-700 dark:text-slate-200 font-heading">
                  Interactive Multi-Layer Diagnostics
                </h4>
                <p className="text-xs max-w-md">
                  Click on any slice of the radial breakdown wheel on the left to inspect localized activity drivers, empirical formulas, and immediate payback estimates.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
