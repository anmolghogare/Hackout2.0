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
  Building2,
  Cpu,
  BarChart3,
  FileCheck,
} from 'lucide-react';
import { cn } from '../../../lib/utils';

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
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description:
        'Eliminate uninsulated furnace radiation, track kiln thermal loss, and receive proactive alerts before high-temperature burner overshoots trigger costly downtime.',
      metrics: 'Cut Fuel OPEX by ~28%',
      tabTarget: 'simulation' as TabId,
      actionLabel: 'Inspect Twin Pipeline',
    },
    {
      role: 'ESG & Compliance Directors',
      tag: 'Regulatory & Audit',
      icon: ShieldCheck,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
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
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description:
        'Translate abstract carbon emissions into actionable balance-sheet savings in ₹ INR. Evaluate real-time payback schedules and subsidy tax credits.',
      metrics: 'Payback < 10.5 Months',
      tabTarget: 'simulator_hub' as TabId,
      actionLabel: 'Calculate Live ROI',
    },
    {
      role: 'Circular Economy Recyclers',
      tag: 'Supply Chain & Waste',
      icon: Recycle,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description:
        'Transform off-cut plastic and polymer trim waste into recurring revenue through algorithmic B2B off-take matchmaking within industrial clusters.',
      metrics: '100% Scrap Diversion',
      tabTarget: 'circular' as TabId,
      actionLabel: 'View Sankey Stream',
    },
  ];

  // Core platform pillars
  const featurePillars = [
    {
      id: 'simulation' as TabId,
      title: 'Digital Twin Process Pipeline',
      badge: 'Process Telemetry',
      icon: Flame,
      headline: 'Interactive Material-to-Output Telemetry',
      summary:
        'Track material flows through Input, Thermal Processing, and Recovery stages with animated particle streams and radial hotspot drilldowns.',
      benefit: 'Pinpoints furnace thermal leak points (48% of footprint).',
    },
    {
      id: 'simulator_hub' as TabId,
      title: 'Unified What-If ROI Simulator',
      badge: 'Interactive Modeling',
      icon: Zap,
      headline: 'Live Dynamic Recalculation & Waterfall',
      summary:
        'Move operational sliders for fuel shift, temperature tuning, and PCR resin to recalculate real-time carbon abatement and financial cash flow.',
      benefit: 'Instant split baseline vs optimized comparison.',
    },
    {
      id: 'analytics_hub' as TabId,
      title: '3D Thermal Hotspot Diagnostics',
      badge: 'Thermal Analytics',
      icon: Activity,
      headline: 'Heatmap Gradients & Anomaly Detection',
      summary:
        'Interactive 3D furnace thermal mapping, temperature distribution histograms, and multi-sensor correlation matrices with AI leak alerts.',
      benefit: 'Detects 1418°C burner thermal spikes & shell losses.',
    },
    {
      id: 'intake' as TabId,
      title: 'OCR Smart Bill Scanner',
      badge: 'Data Intake',
      icon: Scan,
      headline: 'Zero-Effort Utility Ingestion',
      summary:
        'Upload electricity, fuel oil, and natural gas utility invoices to automatically extract billing line-items, consumption kWh, and emission factors.',
      benefit: 'Eliminates manual spreadsheet data entry completely.',
    },
    {
      id: 'sandbox' as TabId,
      title: 'Scenario Sandbox Comparison',
      badge: 'Capital Planning',
      icon: Layers,
      headline: 'Multi-Scenario Sensitivity Matrix',
      summary:
        'Save and compare alternative decarbonization scenarios (Conservative, Aggressive Net-Zero, Regulatory Cap) side-by-side with full version history.',
      benefit: 'Presents risk-adjusted scenarios to board stakeholders.',
    },
    {
      id: 'circular' as TabId,
      title: 'B2B Circular Waste Stream Sankey',
      badge: 'Circularity Logistics',
      icon: Recycle,
      headline: 'Algorithmic Byproduct Monetization',
      summary:
        'Interactive Sankey diagram visualizing waste diversion flows alongside a geographical B2B cluster network for raw material trading.',
      benefit: 'Monetizes polymer trim scrap at ₹25,000/Ton.',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* 1. EXECUTIVE HERO COMMAND BANNER */}
      <div className="rounded-3xl bg-white/95 dark:bg-[#0D0F18]/95 border border-slate-200/80 dark:border-white/[0.08] p-6 sm:p-10 shadow-xl space-y-8 text-slate-900 dark:text-white transition-all duration-300">
        
        {/* Top Header & Live Telemetry Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200/80 dark:border-white/[0.08] gap-6">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-xs shrink-0">
              <Leaf className="w-7 h-7 text-emerald-500" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                  ● Continuous Telemetry Active
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Apex Packaging • Unit #4 Pune Industrial Belt
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight mt-1 text-slate-900 dark:text-white">
                ByteMe Carbon Decision Intelligence
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl font-sans">
                Enterprise ESG & Decarbonization Operating System for Indian SME Manufacturing Facilities.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center font-mono text-xs">
            <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08]">
              <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>

            <button
              onClick={handleRefreshStats}
              className="py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200/80 dark:border-white/[0.08] flex items-center space-x-1.5 font-bold"
              title="Refresh Telemetry Counters"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-500" />
              <span>{lastRefreshed}</span>
            </button>

            {onStartJudgeTour && (
              <button
                onClick={onStartJudgeTour}
                className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-sm flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Tour</span>
              </button>
            )}

            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="py-2 px-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 transition-colors flex items-center space-x-1"
            >
              <span>Platform Info</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. REAL-TIME FACILITY TELEMETRY SCORECARD */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center space-x-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>Real-Time Facility Telemetry</span>
            </h3>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
              4 Sensor Nodes Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] space-y-2">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono block">Plant Status</span>
              <p className="text-base font-bold text-slate-900 dark:text-white font-heading truncate">
                Apex Packaging Unit #4
              </p>
              <div className="flex items-center space-x-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Operational • 4 Nodes Online</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] space-y-2">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono block">Grid Load & Power Factor</span>
              <p className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                420 kW <span className="text-slate-400 font-normal text-xs">/ PF 0.96</span>
              </p>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block">
                CEA Grid Factor: 0.82 kgCO₂e/kWh
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] space-y-2">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono block">Monthly Net Carbon</span>
              <p className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                100.0 <span className="text-slate-400 font-normal text-xs">tCO₂e / mo</span>
              </p>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block">
                Grounded in IPCC 2006 Standard
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] space-y-2">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono block">Financial ROI Opportunity</span>
              <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                ₹6.5L <span className="text-slate-400 font-normal text-xs">/ yr Net Savings</span>
              </p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono block font-semibold">
                Est. Payback: 10.5 Months
              </span>
            </div>
          </div>
        </section>

        {/* 3. SERVER-SIDE AI CORE ARCHITECTURE SHOWCASE */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-50/90 dark:bg-[#111624] border border-slate-200/80 dark:border-emerald-500/20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-white/[0.08] pb-5">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Server-Side AI Core Architecture
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Zero-hallucination industrial intelligence grounded in IPCC 2006 guidelines, CEA India Grid factors, and CPCB EPR norms.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0 self-start sm:self-center">
              ● Deterministic Grounding Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#0D0F18] border border-slate-200/80 dark:border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                    1. Natural Language Q&A Engine
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 dark:bg-white/[0.04] px-2 py-0.5 rounded border border-slate-200 dark:border-white/[0.08]">
                  POST /api/copilot/query
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Accepts natural language operational queries (e.g. <em>"How can I reduce plant carbon emissions by 25% under ₹15L Capex?"</em>) and returns structured action plans with CO₂ reductions, ₹ cost/savings, and payback schedules.
              </p>
              <div className="text-[11px] font-mono pt-2.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                <span className="text-slate-400">Citation Standards:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">IPCC 2006 & CEA India v19</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#0D0F18] border border-slate-200/80 dark:border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Recycle className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                    2. AI Circular Economy Matcher
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 dark:bg-white/[0.04] px-2 py-0.5 rounded border border-slate-200 dark:border-white/[0.08]">
                  POST /api/circular/analyze-product
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Analyzes industrial polymer scrap, predicts recipient buyer industries across regional clusters, calculates 30% feedstock discount, avoided landfill fees (₹1,500/Ton), and annual off-take revenue.
              </p>
              <div className="text-[11px] font-mono pt-2.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                <span className="text-slate-400">Economic Impact:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">+₹3.0L/yr Revenue • 85% Diversion</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#0D0F18] border border-slate-200/80 dark:border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                    3. AI Workflow & Leak Monitor
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 dark:bg-white/[0.04] px-2 py-0.5 rounded border border-slate-200 dark:border-white/[0.08]">
                  Continuous Telemetry
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Continuous process pipeline monitoring that pinpoints 1,418°C furnace overshoots and 380°C refractory shell radiation heat loss, predicting fuel shifts before thermal efficiency drops.
              </p>
              <div className="text-[11px] font-mono pt-2.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                <span className="text-slate-400">Monitored Hotspot:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Stage 2 Furnace (48 tCO₂e/mo)</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#0D0F18] border border-slate-200/80 dark:border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                    4. Server-Side Security & Key Vault
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 dark:bg-white/[0.04] px-2 py-0.5 rounded border border-slate-200 dark:border-white/[0.08]">
                  Zero-Leakage Architecture
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Server-side execution ensures credentials and AI reasoning keys are never exposed to the client browser. Integrates a deterministic zero-hallucination fallback engine for 99.9% uptime.
              </p>
              <div className="text-[11px] font-mono pt-2.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                <span className="text-slate-400">Security Architecture:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Server-Side Isolation</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ROLE-SPECIFIC OPERATIONAL WORKFLOWS */}
        <section className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/[0.08] pb-3">
            <h3 className="text-xs font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center space-x-2">
              <Target className="w-4 h-4 text-emerald-500" />
              <span>Role-Specific Operational Workflows</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Tailored for 4 Factory Stakeholders</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {targetAudience.map((audience, idx) => {
              const Icon = audience.icon;
              return (
                <Card
                  key={idx}
                  className="p-5 flex flex-col justify-between bg-slate-50/60 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 shadow-xs group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className={cn('p-2.5 rounded-xl border', audience.color)}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400">
                        {audience.tag}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {audience.role}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {audience.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.06] space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Target Outcome:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{audience.metrics}</span>
                    </div>

                    <button
                      onClick={() => onNavigate(audience.tabTarget)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:text-slate-100 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors border border-slate-700/50 dark:border-white/[0.08]"
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

        {/* 5. INTERACTIVE PLATFORM MODULES GRID */}
        <section className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/[0.08] pb-3">
            <h3 className="text-xs font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center space-x-2">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span>Interactive Platform Modules & Tools</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Direct Launch Access</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featurePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={pillar.id}
                  onClick={() => onNavigate(pillar.id)}
                  className="group p-6 cursor-pointer hover:border-emerald-500/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between bg-slate-50/60 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.08]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#111624] border border-slate-200 dark:border-white/[0.08] text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/[0.08]">
                        {pillar.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {pillar.title}
                    </h4>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono block mb-2.5 font-medium">
                      {pillar.headline}
                    </span>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {pillar.summary}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 text-[11px] truncate max-w-[200px]">
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

      {/* ABOUT US / PLATFORM INFO MODAL */}
      {isAboutModalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsAboutModalOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-white dark:bg-[#0D0F18] border border-slate-200 dark:border-white/[0.12] shadow-2xl rounded-2xl p-6 sm:p-8 text-slate-900 dark:text-slate-100 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-white/[0.08] pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">About ByteMe Carbon Intelligence</h3>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">Industrial SME Carbon-to-ROI Engine</span>
                </div>
              </div>
              <button
                onClick={() => setIsAboutModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <p className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] font-medium leading-relaxed">
                <strong className="text-slate-900 dark:text-white font-semibold">ByteMe</strong> is an institutional-grade carbon decision intelligence platform designed specifically for Indian SME manufacturers facing rising thermal fuel costs and strict SEBI BRSR Principle 6 mandates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] space-y-1">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold block text-xs">1-Click SEBI Audit</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">Instant BRSR Principle 6 Core & ISO 14064 GHG report packs.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] space-y-1">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold block text-xs">3D Thermal Hotspots</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">Physics-backed furnace telemetry and anomaly leak alerts.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] flex justify-end">
              <button
                onClick={() => setIsAboutModalOpen(false)}
                className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-heading transition-colors"
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
