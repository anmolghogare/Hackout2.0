import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Flame, Activity, TrendingUp, AlertTriangle, Sparkles } from 'lucide-react';
import { ViewMode } from '../../../types';

export interface AdvancedAnalyticsHubProps {
  onOpenAnomalyCopilot?: (anomaly: any) => void;
  viewMode?: ViewMode;
}

type NodeId = 'polymer' | 'furnace' | 'extrusion' | 'scrap';

const NODES: {
  id: NodeId;
  scope: string;
  title: string;
  metric: string;
  detail: string;
  share: number;
  tone: 'ok' | 'alert' | 'power' | 'circular';
}[] = [
  { id: 'polymer', scope: 'Scope 3 · Supplier', title: 'Raw Resin Storage Silo', metric: '100T LLDPE', detail: '2.80 tCO₂e / T embodied', share: 10, tone: 'ok' },
  { id: 'furnace', scope: 'Critical hotspot · 1,418°C', title: 'Zone 2 Heavy Oil Burner', metric: '48.0 tCO₂e / mo', detail: '₹3.72L / mo uninsulated radiation', share: 48, tone: 'alert' },
  { id: 'extrusion', scope: 'Scope 2 · Electricity', title: 'Extruder Drive Motors', metric: '32,500 kWh / mo', detail: '25.0 tCO₂e grid load', share: 25, tone: 'power' },
  { id: 'scrap', scope: 'Circular offtake', title: 'Trim Scrap Yard', metric: '12T trim / mo', detail: '17.0 tCO₂e if landfilled', share: 17, tone: 'circular' },
];

const REVIEWS: Record<NodeId, { verdict: string; steps: string[]; recover: string }> = {
  polymer: {
    verdict: 'Embodied resin carbon is secondary. Keep 20% PCR so Scope 3 does not rebound when the furnace is fixed.',
    steps: ['Hold PCR blend at ≥20%', 'Prefer Pune supplier over Vapi haul'],
    recover: 'Avoids +14% resin spike',
  },
  furnace: {
    verdict: 'Primary bottleneck. Uncalibrated oil burner at 1,418°C is 48% of plant tCO₂e and ₹3.72L/mo OPEX.',
    steps: ['Retune air-fuel / PID this week (₹0.8L capex, 2.6 mo payback)', 'Shift 50% thermal load to biomass briquettes', 'Add ceramic fiber lining on the shell'],
    recover: 'Recovers ₹3.72L/mo',
  },
  extrusion: {
    verdict: 'Motors are a real Scope 2 load but not the leak. Peak DISCOM tariff is the risk, not heat loss.',
    steps: ['Shift 30% kWh off 18:00–22:00 peak', 'VFDs on the two largest drives'],
    recover: 'Cuts peak ₹ without touching heat',
  },
  scrap: {
    verdict: '12T trim is inventory, not a thermal leak. Landfill is the only carbon event.',
    steps: ['Contract B2B pipe offtake at ₹25k/T', 'Do not bale to municipal landfill'],
    recover: '+₹3.0L/yr scrap sales',
  },
};

const toneClass = {
  ok: 'border-emerald-200 dark:border-emerald-500/30 bg-white dark:bg-[#0E131F]',
  alert: 'border-rose-300 dark:border-rose-500/40 bg-rose-50 dark:bg-rose-500/[0.08]',
  power: 'border-cyan-200 dark:border-cyan-500/30 bg-white dark:bg-[#0E131F]',
  circular: 'border-violet-200 dark:border-violet-500/30 bg-white dark:bg-[#0E131F]',
};

const dotClass = { ok: 'bg-emerald-500', alert: 'bg-rose-500 animate-pulse', power: 'bg-cyan-500', circular: 'bg-violet-500' };

export const AdvancedAnalyticsHub: React.FC<AdvancedAnalyticsHubProps> = ({ viewMode = 'carbon' }) => {
  const [selectedPoint, setSelectedPoint] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<NodeId>('furnace');
  const [reviewOpen, setReviewOpen] = useState(false);
  const isFinancial = viewMode === 'financial';

  const regressionPoints = [
    { fuelPct: 0, co2Tons: 100, costINR: '₹28.5L', label: '0% shift · baseline' },
    { fuelPct: 25, co2Tons: 84.6, costINR: '₹24.1L', label: '25% hybrid shift' },
    { fuelPct: 50, co2Tons: 71.2, costINR: '₹22.0L', label: '50% shift target' },
    { fuelPct: 75, co2Tons: 57.8, costINR: '₹19.5L', label: '75% PNG shift' },
    { fuelPct: 100, co2Tons: 44.4, costINR: '₹16.8L', label: '100% biomass' },
  ];

  const review = REVIEWS[selectedNode];
  const node = NODES.find((n) => n.id === selectedNode)!;

  return (
    <Card className="mb-8 theme-transition">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <span>Thermal Hotspot Diagnostics</span>
            </CardTitle>
            <CardDescription className="mt-1">
              Four plant nodes, fuel-shift curve, and an on-page AI review. No chatbot overlay.
            </CardDescription>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
            FLIR calibrated · IPCC / CEA grounded
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase font-bold tracking-wider flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" />
                Plant thermal nodes
              </span>
              <span className="text-[10px] font-mono text-slate-400">Click a node · shares sum to 100%</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {NODES.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => { setSelectedNode(n.id); setReviewOpen(false); }}
                  className={`text-left rounded-2xl border p-4 transition-all ${
                    selectedNode === n.id ? 'ring-2 ring-offset-1 ring-emerald-500/40 ' : ''
                  } ${toneClass[n.tone]}`}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className={`w-2 h-2 rounded-full ${dotClass[n.tone]}`} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{n.scope}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{n.title}</div>
                  <div className={`mt-1 text-xs font-mono font-semibold ${n.tone === 'alert' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-300'}`}>{n.metric}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{n.detail}</div>
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-white/[0.03] p-4 space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                <span>Monthly load share</span>
                <span>100 tCO₂e baseline</span>
              </div>
              <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-800">
                {NODES.map((n) => (
                  <div
                    key={n.id}
                    title={`${n.title}: ${n.share}%`}
                    className={`${n.tone === 'alert' ? 'bg-rose-500' : n.tone === 'power' ? 'bg-cyan-500' : n.tone === 'circular' ? 'bg-violet-500' : 'bg-emerald-500'} ${selectedNode === n.id ? 'opacity-100' : 'opacity-70'}`}
                    style={{ width: `${n.share}%` }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono text-slate-500">
                {NODES.map((n) => (
                  <div key={n.id} className={selectedNode === n.id ? 'text-slate-900 dark:text-white font-bold' : ''}>
                    {n.share}% {n.id}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-white/[0.03] p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Fuel-shift curve
              </h4>
              <Badge variant="normal">R² = 0.984</Badge>
            </div>
            <div className="relative h-48 rounded-xl bg-white dark:bg-[#090C14] border border-slate-200 dark:border-white/[0.08] p-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 320 170" preserveAspectRatio="none">
                <line x1="24" y1="155" x2="310" y2="155" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="24" y1="20" x2="24" y2="155" stroke="#cbd5e1" strokeWidth="1" />
                <polyline fill="none" stroke="#10b981" strokeWidth="2.5" points="40,148 100,118 160,92 220,64 280,36" />
                {regressionPoints.map((pt, i) => {
                  const cx = 40 + i * 60;
                  const cy = 148 - i * 28;
                  const on = selectedPoint === i;
                  return (
                    <g key={i} className="cursor-pointer" onClick={() => setSelectedPoint(i)}>
                      <circle cx={cx} cy={cy} r={on ? 7 : 4.5} fill={on ? '#10b981' : '#334155'} stroke="#10b981" strokeWidth="2" />
                      <text x={cx - 12} y={cy - 12} fontSize="9" fill="#94a3b8" fontFamily="ui-monospace,monospace">{isFinancial ? pt.costINR : `${pt.co2Tons}t`}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="mt-4 rounded-xl bg-white dark:bg-[#0D0F18] border border-slate-200 dark:border-white/[0.08] p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono uppercase">Selected point</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {regressionPoints[selectedPoint].label} · {isFinancial ? regressionPoints[selectedPoint].costINR : `${regressionPoints[selectedPoint].co2Tons} tCO₂e`}
                  </span>
                </div>
                <Button variant="primary" size="sm" onClick={() => setReviewOpen(true)}>
                  Diagnostic review
                </Button>
              </div>
              {reviewOpen && (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI review · {node.title}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{review.verdict}</p>
                  <ul className="space-y-1">
                    {review.steps.map((s) => (
                      <li key={s} className="text-xs text-slate-700 dark:text-slate-200 flex gap-2">
                        <span className="text-emerald-500">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">{review.recover}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50/90 dark:bg-[#111624] border border-slate-200/80 dark:border-emerald-500/20 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-500/20">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-rose-600 uppercase font-bold tracking-wider">Priority action</div>
                <h4 className="font-bold text-slate-900 dark:text-white">{node.title}</h4>
              </div>
            </div>
            <Badge variant="alert">{node.metric}</Badge>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{review.verdict}</p>
          <div className="grid sm:grid-cols-3 gap-2">
            {review.steps.map((s) => (
              <div key={s} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E131F] p-3 text-xs text-slate-700 dark:text-slate-200">{s}</div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
