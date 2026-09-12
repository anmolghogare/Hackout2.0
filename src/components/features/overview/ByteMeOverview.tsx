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
  StickyNote,
  X,
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
  const [selectedAlertForPopup, setSelectedAlertForPopup] = useState<(typeof criticalAlerts)[0] | null>(null);

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

  // Critical real-time events for Right Column with full statistical data pop-up stats
  const criticalAlerts = [
    {
      id: 'kiln-overshoot',
      severity: 'p1',
      title: 'Kiln Thermal Overshoot Spike',
      summary: 'Furnace Burner #2 spiked to 1,418°C, triggering 48 tCO₂e/mo in excessive thermal fuel waste.',
      tabTarget: 'analytics_hub' as TabId,
      actionLabel: 'Fix Setpoint in 3D Analytics',
      badgeColor: 'bg-red-500 text-white animate-pulse',
      icon: Thermometer,
      stats: {
        urgencyLevel: 'CRITICAL • P1 IMMEDIATE ACTION',
        urgencyScore: '98/100',
        peakTemperature: '1,418 °C (Limit: 1,250 °C)',
        thermalEfficiency: '54.2% (-22% deviation)',
        monthlyCarbonWaste: '48.0 tCO₂e / mo',
        financialLossRate: '₹12,400 / day (₹3.72L / mo)',
        sensorNode: 'Sensor #K2-A (Zone 3 Flue)',
        confidenceScore: '99.4% AI Telemetry Match',
        rootCause: 'Refractory shell insulation degradation & burner nozzle fuel-air ratio drift.',
      },
    },
    {
      id: 'uninsulated-furnace',
      severity: 'warning',
      title: 'Uninsulated Furnace Radiation',
      summary: 'Kiln refractory shell breach radiating 380°C heat loss costing ₹1,20,000 monthly.',
      tabTarget: 'simulation' as TabId,
      actionLabel: 'Inspect Twin Pipeline',
      badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/40',
      icon: ShieldAlert,
      stats: {
        urgencyLevel: 'HIGH WARNING • OPERATIONAL HAZARD',
        urgencyScore: '84/100',
        peakTemperature: '380 °C Surface Loss',
        thermalEfficiency: '68.5% (-14% efficiency)',
        monthlyCarbonWaste: '21.5 tCO₂e / mo',
        financialLossRate: '₹4,000 / day (₹1.20L / mo)',
        sensorNode: 'FLIR Thermal IR Array #4',
        confidenceScore: '96.8% AI Image Match',
        rootCause: 'External insulation wall cracking along main combustion line junction.',
      },
    },
    {
      id: 'grid-peak-tariff',
      severity: 'warning',
      title: 'Peak Grid Tariff Window Active',
      summary: 'High tariff window active at ₹8.50/kWh. Biomass shift advised to avoid ₹45,000 daily spike.',
      tabTarget: 'simulator_hub' as TabId,
      actionLabel: 'Simulate Load Shift',
      badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/40',
      icon: Zap,
      stats: {
        urgencyLevel: 'MODERATE • FINANCIAL TARIFF ALERT',
        urgencyScore: '76/100',
        peakTemperature: 'Grid Tariff Peak: ₹8.50/kWh',
        thermalEfficiency: 'Grid PF: 0.94 (Optimal >0.98)',
        monthlyCarbonWaste: '18.2 tCO₂e / mo',
        financialLossRate: '₹45,000 Peak Surge / day',
        sensorNode: 'Smart Tariff Meter #Grid-01',
        confidenceScore: '100% Tariff Grid Stream',
        rootCause: 'Peak hour power draw during state discom high tariff window (18:00 - 22:00 IST).',
      },
    },
    {
      id: 'fuel-bill-unlogged',
      severity: 'hazard',
      title: 'Unverified Fuel Invoice Log',
      summary: '12 KL Heavy Furnace Oil delivery note unlogged, creating a SEBI Scope 1 audit gap.',
      tabTarget: 'intake' as TabId,
      actionLabel: 'Scan Bill via OCR',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      icon: Scan,
      stats: {
        urgencyLevel: 'AUDIT RISK • SCOPE 1 DATA GAP',
        urgencyScore: '71/100',
        peakTemperature: '12 KL Delivery Unlogged',
        thermalEfficiency: 'Audit Readiness: 94.2%',
        monthlyCarbonWaste: '37.4 tCO₂e Unverified',
        financialLossRate: 'SEBI Audit Penalty Risk',
        sensorNode: 'Fuel Intake Terminal #B-2',
        confidenceScore: '92.1% Invoice OCR Alert',
        rootCause: 'Manual delivery note pending OCR scan ingestion in ByteMe intake portal.',
      },
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================================ */}
        {/* LEFT COLUMN: Minimalist Statistics Panel (3 cols) */}
        {/* ============================================================ */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl p-5 bg-[#0d1322] border border-slate-800 shadow-xl space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <h3 className="text-sm sm:text-base font-extrabold font-heading uppercase tracking-wider text-slate-100">
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
                <div className="flex items-center justify-between text-xs min-w-0">
                  <span className="text-slate-400 text-[11px] truncate pr-2">Live Logistics Flow</span>
                  <span className="font-mono font-extrabold text-white tracking-wider whitespace-nowrap shrink-0">142.5 T/day</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[78%]" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono min-w-0">
                  <span className="truncate pr-2">Target: 150 T/d</span>
                  <span className="text-emerald-400 font-bold tracking-wide whitespace-nowrap shrink-0">78% Capacity</span>
                </div>
              </div>

              {/* Metric 2: Grid Load & Power Factor */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs min-w-0">
                  <span className="text-slate-400 text-[11px] truncate pr-2">Grid Load & Power Factor</span>
                  <span className="font-mono font-extrabold text-emerald-400 tracking-wider whitespace-nowrap shrink-0">420 kW • PF 0.96</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-400 rounded-full w-[65%]" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono min-w-0">
                  <span className="truncate pr-2">CEA Grid Factor</span>
                  <span className="text-slate-200 font-bold tracking-wide whitespace-nowrap shrink-0">0.82 kgCO₂e/kWh</span>
                </div>
              </div>

              {/* Metric 3: Network & Sensor Uptime */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs min-w-0">
                  <span className="text-slate-400 text-[11px] truncate pr-2">Network Sensor Uptime</span>
                  <span className="font-mono font-extrabold text-emerald-400 tracking-wider whitespace-nowrap shrink-0">99.94%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full w-[99.9%]" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono min-w-0">
                  <span className="truncate pr-2">Latency: 14ms</span>
                  <span className="text-emerald-400 font-bold tracking-wide whitespace-nowrap shrink-0">4 Nodes Nominal</span>
                </div>
              </div>

              {/* Metric 4: Safety & Hazard Clock */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs min-w-0">
                  <span className="text-slate-400 text-[11px] truncate pr-2">Safety Incident Clock</span>
                  <span className="font-mono font-extrabold text-white tracking-wider whitespace-nowrap shrink-0">412 Days Zero LTI</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-[100%]" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono min-w-0">
                  <span className="truncate pr-2">ISO 45001 Compliant</span>
                  <span className="text-blue-400 font-bold tracking-wide whitespace-nowrap shrink-0">Optimal</span>
                </div>
              </div>
            </div>

            {/* Baseline Footprint & Net ROI summary */}
            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-center font-mono">
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 overflow-hidden">
                <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Baseline</span>
                <span className="text-xs font-black text-rose-400 tracking-wider whitespace-nowrap block">100 tCO₂e/mo</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 overflow-hidden">
                <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Net ROI</span>
                <span className="text-xs font-black text-emerald-400 tracking-wider whitespace-nowrap block">₹6.5L / yr</span>
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
        <main className="lg:col-span-6 space-y-6 w-full min-w-0 flex flex-col justify-start relative isolate">
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
                <h3 className="text-sm sm:text-base font-extrabold font-heading uppercase tracking-wider text-red-400">
                  Urgent Hotspots & Hazards
                </h3>
              </div>
              <span className="text-[9px] font-mono font-extrabold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 uppercase animate-pulse">
                Active Alerts
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug">
              Real-time physical anomaly detection & energy leak alerts. Click any hotspot to launch full statistical sticky note overlay.
            </p>

            {/* Alerts List */}
            <div className="space-y-3">
              {criticalAlerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div
                    key={alert.id}
                    onClick={() => setSelectedAlertForPopup(alert)}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-red-500/30 space-y-2.5 hover:border-amber-400/80 transition-all shadow-md group cursor-pointer relative"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                          {alert.title}
                        </h4>
                      </div>
                      <span className={cn('text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0', alert.badgeColor)}>
                        {alert.severity === 'p1' ? 'P1 HIGH' : 'WARN'}
                      </span>
                    </div>

                    {/* Issue Summary (Truncated to 1-2 short sentences / 15-20 words max) */}
                    <p className="text-[11.5px] text-slate-300 leading-snug line-clamp-2">
                      {alert.summary}
                    </p>

                    {/* Action Triggers */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAlertForPopup(alert);
                        }}
                        className="flex-1 py-1.5 px-2.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 hover:text-white text-[10.5px] font-bold flex items-center justify-center space-x-1 transition-colors border border-amber-500/40"
                      >
                        <StickyNote className="w-3 h-3 text-amber-400" />
                        <span>Telemetry Sticky Note</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(alert.tabTarget);
                        }}
                        className="py-1.5 px-2.5 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-200 hover:text-white text-[10.5px] font-bold flex items-center justify-center space-x-1 transition-colors border border-red-500/40"
                      >
                        <span>{alert.actionLabel}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
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

      {/* ============================================================ */}
      {/* INTERACTIVE STICKY-NOTE POP-UP OVERLAY (Isolated Fixed Container Modal) */}
      {/* ============================================================ */}
      {selectedAlertForPopup && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedAlertForPopup(null)}
        >
          <div
            className="relative max-w-lg w-full bg-gradient-to-b from-[#211d13] via-[#1a1710] to-[#14110b] border-2 border-amber-500/70 shadow-[0_0_60px_rgba(245,158,11,0.3)] rounded-2xl p-6 sm:p-7 text-slate-100 transform rotate-[-0.5deg] transition-all overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-amber-500/30 border border-amber-400/50 rounded-sm backdrop-blur-xs transform -rotate-1 shadow-inner" />

            {/* Sticky Note Header */}
            <div className="flex items-start justify-between border-b border-amber-500/30 pb-4 mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm shrink-0">
                  <StickyNote className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 uppercase animate-pulse">
                      {selectedAlertForPopup.stats.urgencyLevel}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400/90 font-bold">
                      Severity: {selectedAlertForPopup.stats.urgencyScore}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black font-heading text-white mt-1">
                    {selectedAlertForPopup.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedAlertForPopup(null)}
                className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-white border border-amber-500/30 transition-colors"
                title="Close Sticky Note"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Issue Summary */}
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200/90 mb-4 font-mono leading-relaxed">
              {selectedAlertForPopup.summary}
            </div>

            {/* Full Statistical Data Breakdown */}
            <div className="space-y-3 mb-5">
              <h4 className="text-xs font-extrabold uppercase font-heading text-amber-400 tracking-wider flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>Full Telemetry & Statistical Breakdown</span>
              </h4>

              <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Peak Metric</span>
                  <span className="text-xs sm:text-sm font-black text-rose-400">{selectedAlertForPopup.stats.peakTemperature}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Thermal Efficiency</span>
                  <span className="text-xs sm:text-sm font-black text-amber-400">{selectedAlertForPopup.stats.thermalEfficiency}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Carbon Waste Stream</span>
                  <span className="text-xs sm:text-sm font-black text-emerald-400">{selectedAlertForPopup.stats.monthlyCarbonWaste}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Financial OPEX Loss</span>
                  <span className="text-xs sm:text-sm font-black text-red-400">{selectedAlertForPopup.stats.financialLossRate}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Sensor Location:</span>
                  <span className="text-slate-200 font-bold">{selectedAlertForPopup.stats.sensorNode}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">AI Diagnostic Confidence:</span>
                  <span className="text-emerald-400 font-bold">{selectedAlertForPopup.stats.confidenceScore}</span>
                </div>
                <div className="pt-1.5 border-t border-slate-800">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Root Cause Analysis:</span>
                  <p className="text-slate-300 text-[11px] leading-snug mt-0.5">{selectedAlertForPopup.stats.rootCause}</p>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-amber-500/30 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedAlertForPopup(null)}
                className="py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition-colors"
              >
                Dismiss
              </button>

              <button
                onClick={() => {
                  const target = selectedAlertForPopup.tabTarget;
                  setSelectedAlertForPopup(null);
                  onNavigate(target);
                }}
                className="flex-1 py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs font-heading flex items-center justify-center space-x-2 transition-colors shadow-lg"
              >
                <span>{selectedAlertForPopup.actionLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

