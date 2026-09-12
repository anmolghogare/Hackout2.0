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
  Users,
  Target,
  ChevronRight,
  PlayCircle,
  Globe,
  Radio,
  Clock,
  RefreshCw,
  Thermometer,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '../../ui/Button';
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
  // Time-based greeting state
  const [greeting, setGreeting] = useState('');
  const [userRole, setUserRole] = useState('Operations Lead');
  const [lastRefreshed, setLastRefreshed] = useState('Just now');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 17) {
      setGreeting('Good afternoon');
    } else if (hour < 22) {
      setGreeting('Good evening');
    } else {
      setGreeting('Good night');
    }
  }, []);

  const handleRefreshStats = () => {
    setLastRefreshed(
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    );
  };

  // Critical real-time events for Right Column
  const criticalAlerts = [
    {
      id: 'kiln-overshoot',
      severity: 'p1',
      title: 'Kiln Thermal Overshoot Spike',
      location: 'Stage 02 Furnace Burner #2',
      metric: '1,418°C',
      threshold: 'Max: 1,350°C (+68°C Overshoot)',
      impact: '48 tCO₂e/mo waste',
      tabTarget: 'analytics_hub' as TabId,
      actionLabel: 'Fix Setpoint in 3D Analytics',
      badgeColor: 'bg-red-500 text-white animate-pulse',
      icon: Thermometer,
    },
    {
      id: 'uninsulated-furnace',
      severity: 'warning',
      title: 'Uninsulated Furnace Shell Radiation',
      location: 'Kiln Section B Refractory Shell',
      metric: '380°C Outer Shell Temp',
      threshold: 'Target: < 120°C',
      impact: '₹1,20,000/mo thermal loss',
      tabTarget: 'simulation' as TabId,
      actionLabel: 'Inspect Twin Pipeline',
      badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/40',
      icon: ShieldAlert,
    },
    {
      id: 'grid-peak-tariff',
      severity: 'warning',
      title: 'Peak Grid Tariff Window Active',
      location: 'Substation Transformer #1',
      metric: '₹8.50 / kWh Rate',
      threshold: 'Shift 35% load to biomass generator',
      impact: 'Potential ₹45,000 daily spike',
      tabTarget: 'simulator_hub' as TabId,
      actionLabel: 'Simulate Load Shift',
      badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/40',
      icon: Zap,
    },
    {
      id: 'fuel-bill-unlogged',
      severity: 'hazard',
      title: 'Unverified HFO Fuel Invoice Log',
      location: 'Data Intake Queue',
      metric: '12 KL Delivery Note Pending',
      threshold: 'SEBI Scope 1 Audit gap',
      impact: 'BRSR Compliance Pending',
      tabTarget: 'intake' as TabId,
      actionLabel: 'Scan Bill via OCR',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      icon: Scan,
    },
  ];

  // Target Audience profiles
  const targetAudience = [
    {
      role: 'Plant & Operations Managers',
      tag: 'Manufacturing Ops',
      icon: Flame,
      color: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
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
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
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
      color: 'bg-slate-800 text-slate-300 border-slate-700',
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
      color: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
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
      badgeColor: 'text-slate-300 border-slate-700 bg-slate-800',
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
      badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
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
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* 3-COLUMN GRID SYSTEM LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ============================================================ */}
        {/* LEFT COLUMN: Minimalist Statistics Panel (3 cols) */}
        {/* ============================================================ */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl p-5 bg-[#0d1322] border border-slate-800 shadow-xl space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <h3 className="text-xs font-bold font-heading uppercase tracking-wider text-slate-200">
                  Site Overview Statistics
                </h3>
              </div>
              <span className="text-[9px] font-mono font-extrabold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                Live
              </span>
            </div>

            {/* Quick Plant Context Tag */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">Active Plant Telemetry</span>
              <p className="text-xs font-bold text-white font-heading truncate">
                Apex Packaging Pvt. Ltd.
              </p>
              <span className="text-[10px] text-emerald-400 font-mono block">Pune Unit #4 • 4 Sensor Nodes</span>
            </div>

            {/* Compact Metric Widgets */}
            <div className="space-y-4">
              {/* Metric 1: Live Logistics Flow */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Live Logistics Flow</span>
                  <span className="font-mono font-bold text-white">142.5 T/day</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[78%]" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Target: 150 T/d</span>
                  <span className="text-emerald-400 font-bold">78% Capacity</span>
                </div>
              </div>

              {/* Metric 2: Grid Load & Power Factor */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Grid Load & Power Factor</span>
                  <span className="font-mono font-bold text-emerald-400">420 kW • PF 0.96</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-400 rounded-full w-[65%]" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>CEA Grid Factor</span>
                  <span className="text-slate-300">0.82 kgCO₂e/kWh</span>
                </div>
              </div>

              {/* Metric 3: Network & Sensor Uptime */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Network Sensor Uptime</span>
                  <span className="font-mono font-bold text-emerald-400">99.94%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full w-[99.9%]" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Latency: 14ms</span>
                  <span className="text-emerald-400 font-bold">4 Nodes Nominal</span>
                </div>
              </div>

              {/* Metric 4: Safety & Hazard Clock */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Safety Incident Clock</span>
                  <span className="font-mono font-bold text-white">412 Days Zero LTI</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-[100%]" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>ISO 45001 Compliant</span>
                  <span className="text-blue-400 font-bold">Optimal</span>
                </div>
              </div>
            </div>

            {/* Baseline Footprint & Net ROI summary */}
            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-center font-mono">
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-[9px] text-slate-400 uppercase block">Baseline</span>
                <span className="text-xs font-bold text-rose-400">100 tCO₂e/mo</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-[9px] text-slate-400 uppercase block">Net ROI</span>
                <span className="text-xs font-bold text-emerald-400">₹6.5L / yr</span>
              </div>
            </div>

            {/* Live refresh trigger */}
            <button
              onClick={handleRefreshStats}
              className="w-full py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10.5px] font-mono flex items-center justify-center space-x-1.5 transition-colors border border-slate-800"
            >
              <RefreshCw className="w-3 h-3 text-emerald-400" />
              <span>Refreshed: {lastRefreshed}</span>
            </button>
          </div>
        </aside>

        {/* ============================================================ */}
        {/* CENTER COLUMN: Main Workflow & Operational Cards (6 cols) */}
        {/* ============================================================ */}
        <main className="lg:col-span-6 space-y-6">
          {/* STAKEHOLDER ALIGNMENT OPERATIONAL DECISION CARDS */}
          <section className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {targetAudience.map((audience, idx) => {
                const Icon = audience.icon;
                return (
                  <Card
                    key={idx}
                    className="p-4 flex flex-col justify-between bg-slate-900/70 border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-md group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className={cn('p-2 rounded-xl border shadow-sm', audience.color)}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                          {audience.tag}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold font-heading text-white mb-1 group-hover:text-emerald-400 transition-colors">
                        {audience.role}
                      </h4>

                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        {audience.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-500">Key Outcome</span>
                        <span className="text-emerald-400 font-bold">{audience.metrics}</span>
                      </div>

                      <button
                        onClick={() => onNavigate(audience.tabTarget)}
                        className="w-full py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center space-x-1 transition-colors border border-slate-700"
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

          {/* MAIN HERO PRODUCT PRESENTATION CARD */}
          <section className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#0c101c] via-[#090d18] to-[#060912] border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ByteMe v2.0 • Carbon Decision Intelligence</span>
                </span>
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white/[0.05] text-slate-300 border border-white/10 text-xs font-mono font-medium">
                  <Globe className="w-3 h-3 text-slate-400" />
                  <span>SME Manufacturing</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white leading-tight">
                Transforming Industrial Emission Leaks into{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  Measurable Financial ROI
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Indian SME manufacturers face mounting pressure from SEBI BRSR mandates and rising fuel costs. <strong className="text-white font-semibold">ByteMe</strong> bridges compliance with balance-sheet profitability through an automated digital twin, physics-backed thermal diagnostics, and real-time circular byproduct trading.
              </p>

              {/* Call-to-Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {onStartJudgeTour && (
                  <Button
                    variant="primary"
                    onClick={onStartJudgeTour}
                    className="flex items-center space-x-2 px-5 py-2.5 text-xs font-bold shadow-md"
                  >
                    <PlayCircle className="w-4 h-4 fill-current" />
                    <span>Start 3-Min Judge Tour</span>
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => onNavigate('simulation')}
                  className="flex items-center space-x-2 px-5 py-2.5 text-xs font-medium"
                >
                  <Flame className="w-4 h-4 text-rose-500" />
                  <span>Digital Twin Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => onNavigate('simulator_hub')}
                  className="flex items-center space-x-2 px-5 py-2.5 text-xs font-medium"
                >
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>ROI Simulator</span>
                </Button>
              </div>
            </div>
          </section>

          {/* CORE PLATFORM MODULES GRID */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold font-heading text-white uppercase tracking-wider">
                  Interactive Platform Modules
                </h3>
              </div>
              <span className="text-xs text-slate-400">Click any card to launch tool</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featurePillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Card
                    key={pillar.id}
                    onClick={() => onNavigate(pillar.id)}
                    className="group p-4 cursor-pointer hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between bg-slate-900/70 border-slate-800"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={cn('text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full border', pillar.badgeColor)}>
                          {pillar.badge}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold font-heading text-white mb-0.5 group-hover:text-emerald-400 transition-colors">
                        {pillar.title}
                      </h4>
                      <span className="text-[11px] text-emerald-400 font-mono block mb-2 font-medium">
                        {pillar.headline}
                      </span>

                      <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
                        {pillar.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-500 text-[10.5px] truncate max-w-[150px]">
                        {pillar.benefit}
                      </span>
                      <div className="flex items-center space-x-1 text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                        <span className="text-xs">Launch</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* TARGET AUDIENCE PROFILES */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold font-heading text-white uppercase tracking-wider">
                  Who Is ByteMe Built For?
                </h3>
              </div>
              <span className="text-xs text-slate-400">Role-specific workflows</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {targetAudience.map((audience, idx) => {
                const Icon = audience.icon;
                return (
                  <Card
                    key={idx}
                    className="p-4 flex flex-col justify-between bg-slate-900/60 border-slate-800"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className={cn('p-2 rounded-xl border shadow-sm', audience.color)}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                          {audience.tag}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold font-heading text-white mb-1">
                        {audience.role}
                      </h4>

                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        {audience.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-500">Key Outcome</span>
                        <span className="text-emerald-400 font-bold">{audience.metrics}</span>
                      </div>

                      <button
                        onClick={() => onNavigate(audience.tabTarget)}
                        className="w-full py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center space-x-1 transition-colors border border-slate-700"
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
        </main>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: Red-Glowing Hotspot & Critical Alert Section (3 cols) */}
        {/* ============================================================ */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl p-5 bg-[#160a0c] border border-red-500/60 shadow-[0_0_25px_rgba(255,59,48,0.25)] space-y-4 relative overflow-hidden">
            {/* Ambient Red Glow Halo Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header with Pulsing Red Beacon */}
            <div className="flex items-center justify-between border-b border-red-500/30 pb-3">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF3B30]" />
                </span>
                <h3 className="text-xs font-bold font-heading uppercase tracking-wider text-red-400">
                  Urgent Hotspots & Hazards
                </h3>
              </div>
              <span className="text-[9px] font-mono font-extrabold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 uppercase animate-pulse">
                Active Alerts
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug">
              Real-time physical anomaly detection & energy leak alerts requiring immediate operator intervention.
            </p>

            {/* Alerts List */}
            <div className="space-y-3">
              {criticalAlerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div
                    key={alert.id}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-red-500/30 space-y-2 hover:border-red-500/70 transition-all shadow-md group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                          {alert.title}
                        </h4>
                      </div>
                      <span className={cn('text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0', alert.badgeColor)}>
                        {alert.severity === 'p1' ? 'P1 HIGH' : 'WARN'}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 font-mono space-y-0.5">
                      <div className="text-slate-300 font-semibold">{alert.location}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-400 font-bold">{alert.metric}</span>
                        <span className="text-[10px] text-slate-500">{alert.impact}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 italic">{alert.threshold}</div>
                    </div>

                    {/* Direct Actionable CTA button */}
                    <button
                      onClick={() => onNavigate(alert.tabTarget)}
                      className="w-full py-1.5 px-3 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-200 hover:text-white text-[11px] font-bold flex items-center justify-center space-x-1.5 transition-colors border border-red-500/40"
                    >
                      <span>{alert.actionLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* SEBI Compliance Alert Card */}
            <div className="p-3 rounded-xl bg-slate-950/90 border border-emerald-500/30 text-xs space-y-2">
              <div className="flex items-center justify-between text-emerald-400 font-bold font-mono text-[11px]">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SEBI BRSR Principle 6 Core</span>
                </div>
                <span>94.2% Audit</span>
              </div>
              <p className="text-[10.5px] text-slate-400 leading-tight">
                Verified ISO 14064 GHG accounting ready for filing.
              </p>
              {onOpenBRSRModal && (
                <button
                  onClick={onOpenBRSRModal}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30 transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Export BRSR Audit Pack</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

