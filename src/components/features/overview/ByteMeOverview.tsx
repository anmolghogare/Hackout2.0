import React, { useState, useEffect } from 'react';
import { TabId } from '../../../types';
import { Card } from '../../ui/Card';
import {
  Sparkles,
  Zap,
  Activity,
  Flame,
  Scan,
  Layers,
  Recycle,
  ShieldCheck,
  ArrowRight,
  Coins,
  Target,
  ChevronRight,
  Clock,
  RefreshCw,
  Leaf,
  X,
} from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface ByteMeOverviewProps {
  onNavigate: (tab: TabId) => void;
  onStartJudgeTour?: () => void;
  onOpenBRSRModal?: () => void;
}

export const ByteMeOverview: React.FC<ByteMeOverviewProps> = ({
  onNavigate,
}) => {
  const [lastRefreshed, setLastRefreshed] = useState('Just now');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefreshStats = () => {
    setLastRefreshed(
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    );
  };

  // Target Audience profiles
  const targetAudience = [
    {
      role: 'Plant & Operations Managers',
      tag: 'Manufacturing Ops',
      icon: Flame,
      color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
      description:
        'Eliminate uninsulated furnace radiation, track kiln thermal loss, and receive proactive alerts before high-temperature burner overshoots trigger costly downtime.',
      metrics: 'Cut Thermal Fuel OPEX by ~28%',
      tabTarget: 'simulation' as TabId,
      actionLabel: 'Inspect Twin Pipeline',
    },
    {
      role: 'ESG & Compliance Directors',
      tag: 'Regulatory & Audit',
      icon: ShieldCheck,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      description:
        'Instantly compile verified SEBI BRSR Principle 6 Core audit packs and ISO 14064 GHG Scope 1-3 reports with zero external consulting overhead.',
      metrics: '1-Click Audit Readiness',
      tabTarget: 'roadmap' as TabId,
      actionLabel: 'Open BRSR Roadmap',
    },
    {
      role: 'CFOs & Financial Controllers',
      tag: 'Capital & Cashflow',
      icon: Coins,
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
      description:
        'Translate abstract carbon emissions into actionable balance-sheet savings in ₹ INR. Evaluate real-time payback schedules and subsidy tax credits.',
      metrics: 'Payback Under 10.5 Months',
      tabTarget: 'simulator_hub' as TabId,
      actionLabel: 'Calculate Live ROI',
    },
    {
      role: 'Circular Economy Recyclers',
      tag: 'Supply Chain & Waste',
      icon: Recycle,
      color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30',
      description:
        'Transform off-cut plastic and polymer trim waste into recurring revenue through algorithmic B2B off-take matchmaking within industrial clusters.',
      metrics: 'Divert 100% Scrap Landfill',
      tabTarget: 'circular' as TabId,
      actionLabel: 'View Sankey Stream',
    },
  ];

  // Core platform pillars
  const featurePillars = [
    {
      id: 'simulation' as TabId,
      title: 'Digital Twin Process Pipeline',
      badge: 'Telemetry',
      badgeColor: 'text-rose-600 dark:text-rose-400 border-rose-500/30 bg-rose-500/10',
      icon: Flame,
      headline: 'Interactive Material-to-Output Telemetry',
      summary:
        'Track material flows through Input, Thermal Processing, and Recovery stages with animated SVG particle streams and radial hotspot drilldowns.',
      benefit: 'Pinpoints furnace thermal leak points.',
    },
    {
      id: 'simulator_hub' as TabId,
      title: 'Unified What-If ROI Simulator',
      badge: 'Interactive',
      badgeColor: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      icon: Zap,
      headline: 'Live Dynamic Recalculation & Waterfall',
      summary:
        'Move operational sliders for fuel shift, temperature tuning, and PCR resin to recalculate real-time carbon abatement and financial cash flow.',
      benefit: 'Instant split baseline vs optimized comparison.',
    },
    {
      id: 'analytics_hub' as TabId,
      title: '3D Thermal Hotspot Diagnostics',
      badge: 'Analytics',
      badgeColor: 'text-indigo-600 dark:text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
      icon: Activity,
      headline: 'Heatmap Gradients & Anomaly Detection',
      summary:
        'Interactive 3D furnace thermal mapping, temperature distribution histograms, and multi-sensor correlation matrices with AI leak alerts.',
      benefit: 'Detects 1418°C burner thermal spikes.',
    },
    {
      id: 'intake' as TabId,
      title: 'OCR Smart Bill Scanner',
      badge: 'Data Intake',
      badgeColor: 'text-teal-600 dark:text-teal-400 border-teal-500/30 bg-teal-500/10',
      icon: Scan,
      headline: 'Zero-Effort Utility Ingestion',
      summary:
        'Upload electricity, fuel oil, and natural gas utility invoices to automatically extract billing line-items, consumption kWh, and emission factors.',
      benefit: 'Eliminates manual spreadsheet data entry.',
    },
    {
      id: 'sandbox' as TabId,
      title: 'Scenario Sandbox Comparison',
      badge: 'Planning',
      badgeColor: 'text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10',
      icon: Layers,
      headline: 'Multi-Scenario Sensitivity Matrix',
      summary:
        'Save and compare alternative decarbonization scenarios (Conservative, Aggressive Net-Zero, Regulatory Cap) side-by-side.',
      benefit: 'Presents risk-adjusted scenarios to boards.',
    },
    {
      id: 'circular' as TabId,
      title: 'B2B Circular Waste Stream Sankey',
      badge: 'Logistics',
      badgeColor: 'text-cyan-600 dark:text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      icon: Recycle,
      headline: 'Algorithmic Byproduct Monetization',
      summary:
        'Interactive Sankey diagram visualizing waste diversion flows alongside a geographical B2B cluster network for raw material trading.',
      benefit: 'Monetizes polymer trim scrap at ₹25,000/Ton.',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* SINGLE UNIFIED VERTICAL BOX CONTAINER */}
      <div className="w-full rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 p-5 sm:p-8 space-y-8 shadow-xl text-slate-900 dark:text-white transition-colors duration-300">
        
        {/* TOP HEADER & LIVE TELEMETRY BAR */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-sm shrink-0">
              <Leaf className="w-6 h-6 text-emerald-500 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                  LIVE TELEMETRY ACTIVE
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Apex Packaging • Unit #4 Pune</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-heading tracking-tight mt-1 text-slate-900 dark:text-white">
                ByteMe Carbon Decision Intelligence
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-end md:self-auto font-mono text-xs">
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
              <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>

            <button
              onClick={handleRefreshStats}
              className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-800 flex items-center space-x-1.5 font-bold"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-500" />
              <span>{lastRefreshed}</span>
            </button>

            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="py-1.5 px-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30 transition-colors flex items-center space-x-1"
            >
              <span>Platform Info</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 1. QUAD SITE TELEMETRY METRIC GRID */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold font-heading uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>Real-Time Facility Metrics</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              4 Monitored Nodes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block">Plant Status</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white font-heading truncate">
                Apex Packaging Unit #4
              </p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono block font-semibold">
                ● Operational • 4 Sensors
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block">Grid Load & Power Factor</span>
              <p className="text-sm font-black text-cyan-600 dark:text-cyan-400 font-mono">
                420 kW • PF 0.96
              </p>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block">
                CEA Grid: 0.82 kgCO₂e/kWh
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block">Monthly Net Carbon</span>
              <p className="text-sm font-black text-rose-600 dark:text-rose-400 font-mono">
                100 tCO₂e / mo
              </p>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block">
                IPCC 2006 Standard
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block">Financial ROI Opportunity</span>
              <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
                ₹6.5L / yr Savings
              </p>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block">
                Payback: 10.5 Months
              </span>
            </div>
          </div>
        </section>

        {/* 2. SERVER-SIDE AI CORE ARCHITECTURE SHOWCASE CARDS */}
        <section className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-emerald-950/40 border border-emerald-500/30 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-heading font-black text-slate-900 dark:text-white tracking-tight">
                  Server-Side AI Core Architecture
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Zero-hallucination industrial intelligence grounded in IPCC 2006 guidelines & CEA India Grid v19 factors.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 shrink-0 self-start sm:self-center">
              ✨ Server-Side AI Engine Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                    1. Natural Language Q&A Engine
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  POST /api/copilot/query
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Accepts natural language operational queries (e.g. <em>"How can I reduce emissions by 20% without raising cost?"</em>) and returns structured action plans with CO₂ reductions, ₹ cost/savings, and payback schedules.
              </p>
              <div className="text-[11px] font-mono pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-slate-500">Citation Standards:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">IPCC 2006 & CEA India v19</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <Recycle className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                    2. AI Circular Economy Matcher
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                  POST /api/circular/analyze-product
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Analyzes added industrial scrap, predicts recipient buyer industries, calculates 30% feedstock discount, avoided landfill fees (₹1,500/Ton), and annual sales revenue.
              </p>
              <div className="text-[11px] font-mono pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-slate-500">Economic Impact:</span>
                <span className="text-teal-600 dark:text-teal-400 font-semibold">+₹3.0L/yr Revenue • 85% Diversion</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                    3. AI Workflow & Leak Monitor
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                  Telemetry Engine
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Continuous process pipeline monitoring that pinpoints 1,418°C furnace overshoots and 380°C refractory shell radiation heat loss, predicting fuel shifts before thermal efficiency drops.
              </p>
              <div className="text-[11px] font-mono pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-slate-500">Monitored Hotspot:</span>
                <span className="text-rose-600 dark:text-rose-400 font-semibold">Stage 2 Furnace (48 tCO₂e/mo)</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                    4. Server-Side Security & Key Vault
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                  Enterprise Ready
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Server-side execution ensures API keys (e.g. Gemini LLM) are never exposed to browser clients. Integrates a deterministic zero-hallucination fallback engine for 99.9% uptime.
              </p>
              <div className="text-[11px] font-mono pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-slate-500">Security Architecture:</span>
                <span className="text-amber-600 dark:text-amber-400 font-semibold">100% Server-Side Protection</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ROLE-SPECIFIC OPERATIONAL WORKFLOW CARDS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <Target className="w-4 h-4 text-emerald-500" />
              <span>Role-Specific Operational Workflows</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Select Role Workflow</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {targetAudience.map((audience, idx) => {
              const Icon = audience.icon;
              return (
                <Card
                  key={idx}
                  className="p-4 flex flex-col justify-between bg-slate-50 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-sm group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={cn('p-2 rounded-xl border shadow-xs', audience.color)}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                        {audience.tag}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {audience.role}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                      {audience.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500">Key Outcome</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{audience.metrics}</span>
                    </div>

                    <button
                      onClick={() => onNavigate(audience.tabTarget)}
                      className="w-full py-1.5 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center space-x-1 transition-colors border border-slate-300 dark:border-slate-700"
                    >
                      <span>{audience.actionLabel}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 4. INTERACTIVE PLATFORM MODULES GRID */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span>Interactive Platform Modules & Tools</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Click to launch module</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featurePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={pillar.id}
                  onClick={() => onNavigate(pillar.id)}
                  className="group p-5 cursor-pointer hover:border-emerald-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between bg-slate-50 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <span className={cn('text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full border', pillar.badgeColor)}>
                        {pillar.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white mb-0.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {pillar.title}
                    </h4>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono block mb-2 font-medium">
                      {pillar.headline}
                    </span>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                      {pillar.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 text-[10.5px] truncate max-w-[160px]">
                      {pillar.benefit}
                    </span>
                    <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                      <span>Launch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </div>

      {/* ABOUT US MODAL OVERLAY */}
      {isAboutModalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsAboutModalOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-emerald-500/40 shadow-2xl rounded-2xl p-6 sm:p-7 text-slate-900 dark:text-slate-100 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">About ByteMe Carbon Intelligence</h3>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">Industrial SME Carbon-to-ROI Engine</span>
                </div>
              </div>
              <button
                onClick={() => setIsAboutModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <p className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 font-medium">
                <strong className="text-slate-900 dark:text-white font-semibold">ByteMe</strong> is an AI-powered carbon decision intelligence platform designed specifically for Indian SME manufacturers facing rising energy tariffs and strict SEBI BRSR Principle 6 mandates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold block text-[11.5px]">1-Click SEBI Audit</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[10.5px]">Instant BRSR Principle 6 Core & ISO 14064 GHG report packs.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold block text-[11.5px]">3D Thermal Hotspots</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[10.5px]">Physics-backed furnace telemetry and anomaly leak alerts.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setIsAboutModalOpen(false)}
                className="py-2 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs font-heading transition-colors"
              >
                Close Platform Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
