import React from 'react';
import { TabId } from '../../../types';
import { Card, CardContent } from '../../ui/Card';
import {
  Building2,
  Sparkles,
  Zap,
  Activity,
  Flame,
  Scan,
  Layers,
  Recycle,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  Coins,
  CheckCircle2,
  Users,
  Target,
  FileCheck,
  ChevronRight,
  PlayCircle,
  HelpCircle,
  Globe,
  Award,
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { cn } from '../../../lib/utils';

export interface ByteMeOverviewProps {
  onNavigate: (tab: TabId) => void;
  onStartJudgeTour?: () => void;
}

export const ByteMeOverview: React.FC<ByteMeOverviewProps> = ({
  onNavigate,
  onStartJudgeTour,
}) => {
  // Target audience profiles
  const targetAudience = [
    {
      role: 'Plant & Operations Managers',
      tag: 'Manufacturing Ops',
      icon: Flame,
      color: 'from-amber-500/20 to-rose-500/20 text-rose-400 border-rose-500/30',
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
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
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
      color: 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30',
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
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
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
      badge: 'Visualizer',
      badgeColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
      icon: Flame,
      headline: 'Interactive Material-to-Output Telemetry',
      summary:
        'Track material flows through Input, Thermal Processing, and Recovery stages with animated SVG particle streams and radial hotspot drilldowns.',
      benefit: 'Pinpoints the exact 48 tCO₂e/mo furnace burner leak point.',
    },
    {
      id: 'simulator_hub' as TabId,
      title: 'Unified What-If ROI Simulator',
      badge: 'Interactive',
      badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      icon: Zap,
      headline: 'Live Dynamic Recalculation & Waterfall',
      summary:
        'Move operational sliders for fuel shift, temperature tuning, and PCR resin to recalculate real-time carbon abatement and financial cash flow.',
      benefit: 'Instant split comparison between baseline and optimized metrics.',
    },
    {
      id: 'analytics_hub' as TabId,
      title: '3D Thermal Hotspot Diagnostics',
      badge: 'Analytics',
      badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      icon: Activity,
      headline: 'Heatmap Gradients & Anomaly Detection',
      summary:
        'Interactive 3D furnace thermal mapping, temperature distribution histograms, and multi-sensor correlation matrices with AI leak alerts.',
      benefit: 'Detects 1418°C burner spikes before thermal insulation breaches.',
    },
    {
      id: 'intake' as TabId,
      title: 'OCR Smart Bill Scanner',
      badge: 'Data Intake',
      badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
      icon: Scan,
      headline: 'Zero-Effort Utility Ingestion',
      summary:
        'Upload electricity, fuel oil, and natural gas utility invoices to automatically extract billing line-items, consumption kWh, and emission factors.',
      benefit: 'Eliminates tedious manual spreadsheet data entry.',
    },
    {
      id: 'sandbox' as TabId,
      title: 'Scenario Sandbox Comparison',
      badge: 'Planning',
      badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      icon: Layers,
      headline: 'Multi-Scenario Sensitivity Matrix',
      summary:
        'Save and compare alternative decarbonization scenarios (Conservative, Aggressive Net-Zero, Regulatory Cap) side-by-side.',
      benefit: 'Confidently present risk-adjusted scenarios to executive boards.',
    },
    {
      id: 'circular' as TabId,
      title: 'B2B Circular Waste Stream Sankey',
      badge: 'Logistics',
      badgeColor: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
      icon: Recycle,
      headline: 'Algorithmic Byproduct Monetization',
      summary:
        'Interactive Sankey diagram visualizing waste diversion flows alongside a geographical B2B cluster network for raw material trading.',
      benefit: 'Monetizes 12 Tons/mo of polymer trim scrap at ₹25,000/Ton.',
    },
  ];

  return (
    <div className="space-y-12 animate-fadeIn pb-8">
      {/* ============================================================ */}
      {/* 1. HERO PRODUCT PRESENTATION & MISSION STATEMENT */}
      {/* ============================================================ */}
      <section className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-br from-[#121626] via-[#0E111C] to-[#0A0C14] border border-white/[0.09] shadow-2xl">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Top Pill Tags */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>ByteMe v2.0 • Industrial Carbon Intelligence</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-white/[0.05] text-slate-300 border border-white/10 text-xs font-mono">
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>Built for Indian SME Manufacturers</span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white leading-tight">
            Transforming Industrial Emission Leaks into{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Measurable Financial ROI
            </span>
          </h1>

          {/* Narrative Body */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Indian SME manufacturers face mounting pressure from SEBI BRSR Principle 6 mandates and rising fuel costs, but lack multi-million rupee ESG consulting budgets. <strong className="text-white font-semibold">ByteMe</strong> bridges compliance with balance-sheet profitability through an automated digital twin, physics-backed thermal diagnostics, and real-time circular byproduct trading.
          </p>

          {/* Reference Facility Context Ribbon */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-mono">Active Demonstration Context</span>
                <span className="text-sm font-bold text-white font-heading">
                  Apex Packaging Pvt. Ltd. (Pune Unit #4 Telemetry)
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-xs font-mono">
              <div>
                <span className="text-slate-400 block">Baseline Footprint</span>
                <span className="text-sm font-bold text-rose-400">100 tCO₂e / mo</span>
              </div>
              <div className="border-l border-white/10 pl-6">
                <span className="text-slate-400 block">Identified Net ROI</span>
                <span className="text-sm font-bold text-emerald-400">₹6,50,000 / yr</span>
              </div>
            </div>
          </div>

          {/* Action Call-to-Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-4">


            <Button
              variant="outline"
              onClick={() => onNavigate('simulation')}
              className="flex items-center space-x-2 px-6 py-3.5 text-sm border-white/20 hover:border-emerald-500/50"
            >
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Explore Digital Twin Pipeline</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              variant="secondary"
              onClick={() => onNavigate('simulator_hub')}
              className="flex items-center space-x-2 px-6 py-3.5 text-sm bg-white/10 hover:bg-white/15 text-white"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Open ROI Simulator</span>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. TARGET AUDIENCE & WHO BYTEME IS BUILT FOR */}
      {/* ============================================================ */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/[0.08] pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase mb-1">
              <Users className="w-4 h-4" />
              <span>Stakeholder Alignment</span>
            </div>
            <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
              Who Is ByteMe Built For?
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Tailored decision intelligence addressing the exact friction points of each industrial operational role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetAudience.map((audience, idx) => {
            const Icon = audience.icon;
            return (
              <Card
                key={idx}
                className="group relative p-6 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn('p-3 rounded-2xl border shadow-md', audience.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                      {audience.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-heading text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {audience.role}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {audience.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Key Outcome</span>
                    <span className="text-emerald-400 font-bold">{audience.metrics}</span>
                  </div>

                  <button
                    onClick={() => onNavigate(audience.tabTarget)}
                    className="w-full py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors border border-white/[0.06]"
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

      {/* ============================================================ */}
      {/* 3. CORE ARCHITECTURE PILLARS & FEATURE EXPLORER */}
      {/* ============================================================ */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/[0.08] pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase mb-1">
              <Target className="w-4 h-4" />
              <span>Interactive Platform Features</span>
            </div>
            <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
              Explore ByteMe's Core Modules
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Click any feature card below to navigate directly into its live dedicated functional view.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featurePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={pillar.id}
                onClick={() => onNavigate(pillar.id)}
                className="group p-6 cursor-pointer hover:border-emerald-500/50 hover:bg-[#161A2B] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={cn('text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border', pillar.badgeColor)}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-heading text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <span className="text-xs text-emerald-400/90 font-mono block mb-2.5">
                    {pillar.headline}
                  </span>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {pillar.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px] truncate max-w-[200px]">
                    {pillar.benefit}
                  </span>
                  <div className="flex items-center space-x-1 text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. VALUE PROPOSITION: WHY BYTEME STANDS APART */}
      {/* ============================================================ */}
      <section className="rounded-3xl p-8 bg-gradient-to-r from-[#111422] to-[#141829] border border-white/[0.08] shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-3 lg:border-r border-white/[0.08] lg:pr-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Why Indian SMEs Trust Us
            </span>
            <h3 className="text-xl font-heading font-extrabold text-white">
              Deterministic Physics, Zero Hallucinations
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generic carbon software relies on vague national averages. ByteMe combines CEA National Grid Factors (0.82 kgCO₂e/kWh), Heavy Furnace Oil combustion formulas (3.12 kgCO₂e/L), and polymer degradation rates for audit-grade calculations.
            </p>
          </div>

          <div className="space-y-3 lg:border-r border-white/[0.08] lg:pr-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Audit & Regulatory Ready
            </span>
            <h3 className="text-xl font-heading font-extrabold text-white">
              Instant SEBI BRSR Principle 6 Core
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Export comprehensive regulatory filing documentation compliant with SEBI regulations and ISO 14064 standards with verified mathematical provenance for every gram of CO₂.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              AI Copilot Assistant
            </span>
            <h3 className="text-xl font-heading font-extrabold text-white">
              Autonomous Guidance & Presets
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our floating bottom-right assistant understands natural language commands like "Shift 50% furnace fuel to biomass", "Open BRSR report", or "Take me to Sankey visualizer" without friction.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
