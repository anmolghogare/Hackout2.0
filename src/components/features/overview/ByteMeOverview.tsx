import React from 'react';
import { TabId } from '../../../types';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { OverviewHero } from './OverviewHero';
import {
  Sparkles,
  Zap,
  Activity,
  Flame,
  Recycle,
  ArrowRight,
  ChevronRight,
  Building2,
  TrendingDown,
  Coins,
  FileCheck,
  ShieldCheck,
  Compass,
  AlertCircle,
} from 'lucide-react';

export interface ByteMeOverviewProps {
  onNavigate: (tab: TabId) => void;
  onStartJudgeTour?: () => void;
  onOpenBRSRModal?: () => void;
}

export const ByteMeOverview: React.FC<ByteMeOverviewProps> = ({
  onNavigate,
  onStartJudgeTour,
  onOpenBRSRModal,
}) => {
  const keyProofMetrics = [
    { label: 'Total Capex Investment', value: '\u20b920.3L', subtext: '5 ranked interventions', icon: Coins },
    { label: 'Net Annual Carbon Cut', value: '195 tCO\u2082e', subtext: 'Verified Scope 1 & 2', icon: TrendingDown },
    { label: 'Capital Payback Period', value: '10.5 mos', subtext: 'Balance-sheet ROI', icon: Zap },
    { label: 'Footprint Reduction', value: '42.0%', subtext: 'vs factory baseline', icon: Activity },
    { label: 'Landfill Waste Diverted', value: '85.0%', subtext: 'Polymer scrap monetized', icon: Recycle },
  ];

  const coreFunctionalities = [
    { num: '01', title: 'Digital Factory Process Simulation', tagline: 'Physics-Based Empirical Process Pipeline', description: 'Simulate material and energy flow across Input Feedstock, High-Temperature Thermal Furnaces, Polymer Extrusion, and Byproduct Recovery with live mass-energy balance calculations.', mechanism: 'Simulates 4 sequential stages with real-time empirical equations for specific heat and grid power draw.', impactMetric: 'Pinpoints 48 tCO\u2082e/mo furnace leak', isAlert: false, tabTarget: 'simulation' as TabId, actionLabel: 'Launch Twin Pipeline', icon: Flame },
    { num: '02', title: 'Emission Hotspots & Red Alert System', tagline: 'Automated Thermal Leak-Point Diagnostics', description: 'Continuous telemetry monitoring identifies physical heat breaches, including 1,418\u00b0C kiln burner thermal overshoots and 380\u00b0C refractory wall radiation losses costing \u20b912,400 daily.', mechanism: 'Calibrated against FLIR thermal infrared imaging curves and Zone 3 flue gas sensor telemetry.', impactMetric: 'CRITICAL ALERT: \u20b93.72L/mo fuel loss', isAlert: true, tabTarget: 'analytics_hub' as TabId, actionLabel: 'Inspect Hotspots', icon: AlertCircle },
    { num: '03', title: 'AI Sustainability Copilot', tagline: 'Server-Side Natural Language Carbon Reasoning', description: 'Accepts natural language operational queries and returns structured, costed action plans grounded strictly in facility telemetry, IPCC 2006 guidelines, and CEA India Grid v19 factors.', mechanism: 'Server-side key vault with deterministic zero-hallucination fallback engine for 99.9% uptime.', impactMetric: 'Zero hallucinated metrics', isAlert: false, tabTarget: 'copilot' as TabId, actionLabel: 'Launch AI Copilot', icon: Sparkles },
    { num: '04', title: 'Fuel & Material Substitution What-If Scale', tagline: 'Live Capital Waterfall & Abatement Curve', description: 'Interactive empirical sliders allowing plant managers to model fuel shifts (Biomass, RDF), temperature setpoint tuning, rooftop solar integration, and post-consumer recycled (PCR) resin blends.', mechanism: 'Calculates dynamic carbon abatement curves, monthly operational savings, and net payback schedule.', impactMetric: 'Instant split ROI comparison', isAlert: false, tabTarget: 'simulator_hub' as TabId, actionLabel: 'Run What-If Simulator', icon: Zap },
    { num: '05', title: 'Material & Energy Sankey Flow', tagline: 'Algorithmic Circular Waste & Energy Stream Visualizer', description: 'Visualizes facility input materials, thermal energy dissipation, and byproduct flows to identify Scope 1-3 decarbonization pathways.', mechanism: 'Calculates material mass balance, waste diversion %, and thermal efficiency metrics.', impactMetric: 'Scope 1-3 Flow Map', isAlert: false, tabTarget: 'sankey' as TabId, actionLabel: 'Explore Sankey Flow', icon: Recycle },
  ];

  const roiActionItems = [
    { rank: 1, name: 'Kiln Burner Air-Fuel Ratio Tuning & Setpoint Fix', type: 'Process Optimization', capex: '\u20b90.80L', annualCO2: '48.0 tCO\u2082e', annualSavings: '\u20b93.72L', payback: '2.6 mos' },
    { rank: 2, name: 'B2B Polymer Trim Scrap Cluster Off-Take Match', type: 'Circular Economy', capex: '\u20b92.00L', annualCO2: '32.0 tCO\u2082e', annualSavings: '\u20b93.00L', payback: '8.0 mos' },
    { rank: 3, name: 'Furnace Heavy Oil to Biomass Pellet Fuel Shift', type: 'Fuel Switch', capex: '\u20b96.00L', annualCO2: '52.0 tCO\u2082e', annualSavings: '\u20b94.80L', payback: '15.0 mos' },
    { rank: 4, name: '150 kW On-Site Rooftop Solar Net-Metering', type: 'Renewable Power', capex: '\u20b98.00L', annualCO2: '37.0 tCO\u2082e', annualSavings: '\u20b93.60L', payback: '26.7 mos' },
    { rank: 5, name: 'Refractory Shell Ceramic Fiber Insulation', type: 'Thermal Retrofit', capex: '\u20b93.50L', annualCO2: '26.0 tCO\u2082e', annualSavings: '\u20b91.44L', payback: '29.1 mos' },
  ];

  const stakeholders = [
    { role: 'Plant & Operations Managers', tag: 'Manufacturing Ops', benefit: 'Eliminate uninsulated furnace radiation and receive proactive burner overshoot alerts to avoid costly downtime.', kpi: 'Cut Thermal OPEX by ~28%', action: 'Inspect Twin Pipeline', target: 'simulation' as TabId },
    { role: 'ESG & Compliance Directors', tag: 'Regulatory & Audit', benefit: 'Instantly generate verified SEBI BRSR Principle 6 Core audit packs and ISO 14064 GHG Scope 1-3 reports.', kpi: '1-Click Audit Filing', action: 'Open BRSR Roadmap', target: 'roadmap' as TabId },
    { role: 'CFOs & Financial Controllers', tag: 'Capital Allocation', benefit: 'Translate carbon metrics into balance-sheet savings in \u20b9 INR with real-time payback schedules and tax credit models.', kpi: 'Sub-11 Month Payback', action: 'Calculate Live ROI', target: 'simulator_hub' as TabId },
    { role: 'Circular Economy Recyclers', tag: 'Secondary Materials', benefit: 'Source pre-qualified industrial polymer trim scrap directly from local manufacturers at discounted feedstock pricing.', kpi: '85% Landfill Diversion', action: 'View Waste Sankey', target: 'circular' as TabId },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fadeIn pb-16 text-slate-900 dark:text-slate-100 font-sans">
      <OverviewHero onNavigate={onNavigate} onStartJudgeTour={onStartJudgeTour} />

      <section className="space-y-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">The Industrial SME Decarbonization Dilemma</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Why Indian manufacturing SMEs struggle with traditional ESG tools and carbon reporting.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{
            num: '01', title: 'Unseen Thermal Leak Points', body: 'Kilns and furnaces operate with uncalibrated air-fuel ratios and damaged refractory shell insulation, leaking up to 48 tCO\u2082e/mo in wasted fossil fuel without operator awareness.'
          }, {
            num: '02', title: 'Surging Peak Grid Tariffs', body: 'State DISCOM peak electricity rates surge to \u20b98.50/kWh during evening windows (0.82 kgCO\u2082e/kWh grid factor). SMEs lack dynamic load-shifting simulators to avoid costly demand spikes.'
          }, {
            num: '03', title: 'SEBI BRSR Compliance Burden', body: 'Mandatory SEBI BRSR Principle 6 Core disclosures require strict Scope 1-3 audit packs. Manual consulting takes months and costs lakhs, pricing out mid-market manufacturers.'
          }].map((card) => (
            <div key={card.num} className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0E131F] p-5 space-y-3 shadow-xs">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-500">{card.num}</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{card.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">5 Core Platform Functionalities</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Empirical modeling, automated leak detection, and algorithmic byproduct monetization.</p>
          </div>
        </div>
        <div className="space-y-4">
          {coreFunctionalities.map((func) => {
            const Icon = func.icon;
            return (
              <Card key={func.num} className="p-6 transition-all duration-200 hover:border-emerald-500/40">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">{func.num}</div>
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">{func.title}</h3>
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">\u2022 {func.tagline}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{func.description}</p>
                    </div>
                  </div>
                  <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 shrink-0">
                    <div className={func.isAlert ? 'px-3 py-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-xs font-semibold border border-rose-500/20' : 'px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-semibold border border-emerald-500/20'}>{func.impactMetric}</div>
                    <Button variant="outline" size="sm" onClick={() => onNavigate(func.tabTarget)} className="flex items-center space-x-1.5 text-xs">
                      <span>{func.actionLabel}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">Verified Facility Impact Proof Metrics</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {keyProofMetrics.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-5 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">{stat.label}</span>
                  <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{stat.value}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{stat.subtext}</div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Costed Decarbonization Action Plan</h2>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800/80 text-slate-500 font-mono uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Rank</th>
                  <th className="py-3.5 px-4">Intervention</th>
                  <th className="py-3.5 px-4 text-right">Capex</th>
                  <th className="py-3.5 px-4 text-right">CO\u2082 Cut / yr</th>
                  <th className="py-3.5 px-4 text-right">Annual Savings</th>
                  <th className="py-3.5 px-4 text-right">Payback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {roiActionItems.map((item) => (
                  <tr key={item.rank} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30">
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">#{item.rank}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">{item.name}</td>
                    <td className="py-3.5 px-4 text-right font-mono">{item.capex}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600">{item.annualCO2}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold">{item.annualSavings}</td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-500">{item.payback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stakeholders.map((s, idx) => (
          <Card key={idx} className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 border border-slate-200 dark:border-slate-700/80">{s.tag}</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{s.role}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{s.benefit}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => onNavigate(s.target)} className="w-full text-xs flex items-center justify-center space-x-1">
              <span>{s.action}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </Card>
        ))}
      </section>
    </div>
  );
};
