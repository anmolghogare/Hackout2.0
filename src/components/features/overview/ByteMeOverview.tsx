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
  Leaf,
  BookOpen,
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
  // Time-based greeting & clock state
  const [greeting, setGreeting] = useState('');
  const [userRole, setUserRole] = useState('Operations Lead');
  const [lastRefreshed, setLastRefreshed] = useState('Just now');
  const [selectedAlertForPopup, setSelectedAlertForPopup] = useState<(typeof criticalAlerts)[0] | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

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

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
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
      {/* ============================================================ */}
      {/* 1. TOP SECTION (3-COLUMN EQUAL-HEIGHT ROW) */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ------------------------------------------------------------ */}
        {/* LEFT COLUMN: Condensed Site Statistics (3 cols) */}
        {/* ------------------------------------------------------------ */}
        <aside className="lg:col-span-3 flex flex-col">
          <div className="rounded-2xl p-5 bg-[#111827] border border-[#1F2937] shadow-xl space-y-5 flex-1 flex flex-col justify-between">
            <div>
              {/* Title Header with Live Green Indicator */}
              <div className="flex items-center justify-between border-b border-[#1F2937] pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <h3 className="text-xs font-bold font-heading uppercase tracking-wider text-slate-200">
                    SITE OVERVIEW STATISTICS
                  </h3>
                </div>
                <span className="text-[9px] font-mono font-extrabold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                  LIVE
                </span>
              </div>

              {/* Major High-Level KPI 1: Active Plant Telemetry */}
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-[#1F2937] space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">Active Plant Telemetry</span>
                  <p className="text-xs font-bold text-white font-heading truncate">
                    Apex Packaging Pvt. Ltd.
                  </p>
                  <span className="text-[10px] text-emerald-400 font-mono block">Pune Unit #4 • 4 Sensor Nodes</span>
                </div>

                {/* Major High-Level KPI 2: Grid Load & Power Factor */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-[#1F2937] space-y-1.5">
                  <div className="flex items-center justify-between text-xs min-w-0">
                    <span className="text-slate-400 text-[11px] truncate">Grid Load & Power Factor</span>
                    <span className="font-mono font-extrabold text-[#06B6D4] tracking-wider whitespace-nowrap shrink-0">420 kW • PF 0.96</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#06B6D4] rounded-full w-[65%]" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>CEA Grid Factor</span>
                    <span className="text-slate-200 font-bold">0.82 kgCO₂e/kWh</span>
                  </div>
                </div>

                {/* Major High-Level KPI 3: Net MT CO2e Emissions */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-[#1F2937] space-y-1.5">
                  <div className="flex items-center justify-between text-xs min-w-0">
                    <span className="text-slate-400 text-[11px] truncate">Net MT CO₂e Emissions</span>
                    <span className="font-mono font-extrabold text-rose-400 tracking-wider whitespace-nowrap shrink-0">100 tCO₂e/mo</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full w-[80%]" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Net Financial Savings</span>
                    <span className="text-emerald-400 font-bold">₹6.5L / yr Net ROI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live refresh status bar */}
            <div className="pt-3 border-t border-[#1F2937]">
              <button
                onClick={handleRefreshStats}
                className="w-full py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10.5px] font-mono flex items-center justify-center space-x-1.5 transition-colors border border-[#1F2937]"
              >
                <RefreshCw className="w-3 h-3 text-emerald-400" />
                <span>Refreshed: {lastRefreshed}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ------------------------------------------------------------ */}
        {/* CENTER COLUMN: ByteMe Hero & Welcome Section (6 cols) */}
        {/* ------------------------------------------------------------ */}
        <main className="lg:col-span-6 flex flex-col">
          <div className="rounded-2xl p-6 sm:p-8 bg-[#111827] border border-[#1F2937] shadow-xl relative overflow-hidden flex-1 flex flex-col justify-between space-y-6">
            {/* Subtle Cyan Ambient Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center space-x-3.5 relative z-10">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5 animate-pulse text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[9.5px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Industrial Intelligence Active
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Unit #4 • Pune</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black font-heading text-white tracking-tight mt-0.5">
                  Welcome back, <span className="text-emerald-400">{userRole}</span>!
                </h2>
              </div>
            </div>

            {/* Date & Time Access Metadata Display */}
            <div className="flex flex-col sm:items-end font-mono text-right relative z-10 pl-11 sm:pl-0">
              <div className="flex items-center space-x-1.5 text-xs font-extrabold text-slate-200">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  {currentTime.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="text-[10px] font-medium text-slate-400/90 mt-0.5 tracking-wider">
                Time of Access: <span className="text-emerald-400 font-bold">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
            </div>
          </div>

          {/* CONCISE BYTEME BRANDING BLOCK */}
          <div className="rounded-xl p-3.5 sm:p-4 bg-gradient-to-r from-slate-900/90 via-[#0b101d]/90 to-slate-900/90 border border-slate-800/80 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            {/* Logo & Name + Crisp Sentence Tagline */}
            <div className="flex items-center space-x-3 min-w-0">
              <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0 shadow-sm">
                <Leaf className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold font-heading text-white text-sm tracking-tight">
                    ByteMe<span className="text-emerald-400">.ai</span>
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase">
                    v2.0
                  </span>
                </div>
                <p className="text-[11.5px] text-slate-300 leading-snug truncate sm:whitespace-normal mt-0.5">
                  ByteMe is an AI-powered carbon decision intelligence platform transforming industrial SME emission leaks into verified financial ROI.
                </p>
              </div>
            </div>

            {/* Know More Action Trigger */}
            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="shrink-0 py-1.5 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 text-xs font-bold font-heading border border-emerald-500/30 transition-all flex items-center space-x-1 self-end sm:self-auto"
            >
              <span>Know More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

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
              {/* Top Badge Tag */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/30 text-xs font-mono font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>ByteMe v2.0 • Carbon Decision Intelligence</span>
                </span>
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white/[0.05] text-slate-300 border border-white/10 text-xs font-mono font-medium">
                  <Globe className="w-3 h-3 text-slate-400" />
                  <span>SME Manufacturing</span>
                </span>
              </div>

              {/* Dynamic Header */}
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight">
                  Welcome back, <span className="text-[#06B6D4]">{userRole}</span>!
                </h2>
                <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white leading-tight">
                  Transforming Industrial Emission Leaks into{' '}
                  <span className="bg-gradient-to-r from-[#06B6D4] to-emerald-400 bg-clip-text text-transparent">
                    Measurable Financial ROI
                  </span>
                </h1>
              </div>

              {/* Value Summary */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Indian SME manufacturers face mounting pressure from SEBI BRSR mandates and rising fuel costs. <strong className="text-white font-semibold">ByteMe</strong> bridges compliance with balance-sheet profitability through an automated digital twin, physics-backed thermal diagnostics, and real-time circular byproduct trading.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="relative z-10 pt-2 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                onClick={() => onNavigate('simulation')}
                className="flex items-center space-x-2 px-5 py-2.5 text-xs font-bold shadow-md bg-[#06B6D4] hover:bg-[#06B6D4]/80 text-slate-950 border-none"
              >
                <Flame className="w-4 h-4 text-slate-950" />
                <span>Digital Twin Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>

              <Button
                variant="secondary"
                onClick={() => onNavigate('simulator_hub')}
                className="flex items-center space-x-2 px-5 py-2.5 text-xs font-medium border border-[#1F2937]"
              >
                <Zap className="w-4 h-4 text-[#06B6D4]" />
                <span>ROI Simulator</span>
              </Button>
            </div>
          </section>

          {/* AI INTELLIGENCE ARCHITECTURE FEATURE SHOWCASE */}
          <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 border border-emerald-500/30 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </span>
                  <h3 className="text-base sm:text-lg font-heading font-black text-white tracking-tight">
                    AI Intelligence & Server-Side Core Architecture
                  </h3>
                </div>
                <p className="text-xs text-slate-300">
                  Zero-hallucination industrial carbon decision intelligence grounded in facility datasets, IPCC 2006 guidelines & CEA India Grid v19 factors.
                </p>
              </div>
              <span className="text-[11px] font-mono font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0 self-start sm:self-center">
                ✨ Server-Side AI Engine Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: AI Natural Language Q&A */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-white text-sm">
                      1. Natural Language Q&A Engine
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    POST /api/copilot/query
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Accepts natural language operational queries (e.g. <em>"How can I reduce emissions by 20% without raising cost?"</em>) and returns structured action plans with step-by-step CO₂ reductions, ₹ cost/savings, and payback schedules.
                </p>
                <div className="text-[11px] font-mono text-slate-300 pt-1.5 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-500">Citation Dataset:</span>
                  <span className="text-emerald-400 font-semibold">IPCC 2006 & CEA India Grid v19</span>
                </div>
              </div>

              {/* Card 2: AI Circular Economy By-Product Matcher */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      <Recycle className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-white text-sm">
                      2. AI Circular Economy Matcher
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800">
                    POST /api/circular/analyze-product
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Analyzes added industrial scrap (e.g. Off-Cut Film, PET Flakes, Fly Ash), predicts recipient buyer industries, calculates 30% feedstock discount, avoided landfill fees (₹1,500/Ton), and annual sales revenue.
                </p>
                <div className="text-[11px] font-mono text-slate-300 pt-1.5 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-500">Economic Impact:</span>
                  <span className="text-teal-400 font-semibold">+₹3.0L/yr Revenue • 85% Diversion</span>
                </div>
              </div>

              {/* Card 3: AI Thermal Leak-Point Monitor */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      <Activity className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-white text-sm">
                      3. AI Workflow & Leak Monitor
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
                    Telemetry Engine
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Continuous process pipeline monitoring that pinpoints 1,418°C furnace overshoots and 380°C refractory shell radiation heat loss, predicting fuel shifts before thermal efficiency drops.
                </p>
                <div className="text-[11px] font-mono text-slate-300 pt-1.5 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-500">Monitored Hotspot:</span>
                  <span className="text-rose-400 font-semibold">Stage 2 Furnace (48 tCO₂e/mo)</span>
                </div>
              </div>

              {/* Card 4: Server-Side API Security */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-white text-sm">
                      4. Server-Side Security & Uptime
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                    Enterprise Ready
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Server-side execution ensures API keys (e.g. Gemini LLM) are never exposed to browser clients. Integrates a deterministic zero-hallucination fallback engine for 99.9% uptime.
                </p>
                <div className="text-[11px] font-mono text-slate-300 pt-1.5 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-500">Security Architecture:</span>
                  <span className="text-amber-400 font-semibold">100% Server-Side Key Vault</span>
                </div>
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

        {/* ------------------------------------------------------------ */}
        {/* RIGHT COLUMN: Condensed Urgent Hotspot & Hazard (3 cols) */}
        {/* ------------------------------------------------------------ */}
        <aside className="lg:col-span-3 flex flex-col">
          <div className="rounded-2xl p-4 sm:p-5 bg-[#111827] border border-red-500/50 shadow-[0_0_20px_rgba(255,59,48,0.2)] space-y-4 flex-1 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Red Glow Halo Effect */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3">
              {/* Header with Pulsing Red Beacon */}
              <div className="flex items-center justify-between border-b border-red-500/30 pb-2.5">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF3B30]" />
                  </span>
                  <h3 className="text-xs font-bold font-heading uppercase tracking-wider text-red-400">
                    URGENT HOTSPOT
                  </h3>
                </div>
                <span className="text-[9px] font-mono font-extrabold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 uppercase animate-pulse">
                  P1 CRITICAL
                </span>
              </div>

              {/* Single Highest Priority Issue Card */}
              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-red-500/40 space-y-2.5">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-red-500/15 text-red-400 border border-red-500/30 shrink-0">
                    <Thermometer className="w-4 h-4 text-red-400 animate-pulse" />
                  </div>
                  <h4 className="text-xs font-extrabold text-white font-heading">
                    Kiln Thermal Overshoot Spike
                  </h4>
                </div>

                <p className="text-[11.5px] text-slate-300 leading-snug">
                  Furnace Burner #2 spiked to <strong className="text-red-400 font-mono">1,418°C</strong> (48 tCO₂e/mo excessive fuel waste).
                </p>

                <div className="flex items-center justify-between text-[10.5px] font-mono text-slate-400 pt-1 border-t border-slate-900">
                  <span>Sensor #K2-A</span>
                  <span className="text-rose-400 font-bold">₹12,400 / day loss</span>
                </div>
              </div>
            </div>

            {/* Direct Single Link Navigating to the Problem */}
            <button
              onClick={() => onNavigate('analytics_hub')}
              className="w-full py-2 px-3 rounded-xl bg-red-600/25 hover:bg-red-600/40 text-red-200 hover:text-white text-xs font-extrabold font-heading flex items-center justify-center space-x-2 transition-colors border border-red-500/50 shadow-md group"
            >
              <span>Fix Setpoint in 3D Analytics</span>
              <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </aside>
      </div>

      {/* ============================================================ */}
      {/* 2. BOTTOM SECTION (FULL-WIDTH INTERACTIVE PLATFORM MODULES) */}
      {/* ============================================================ */}
      <section className="w-full space-y-6 pt-6 border-t border-[#1F2937]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F2937] pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 shadow-sm">
              <Target className="w-5 h-5 text-[#06B6D4] animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-black font-heading text-white uppercase tracking-wider">
                INTERACTIVE PLATFORM MODULES
              </h3>
              <p className="text-xs text-slate-400">
                Role-based operational tools for plant managers, ESG directors, CFOs, and circular recyclers.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 font-bold self-start sm:self-auto">
            4 Interactive Role Modules
          </span>
        </div>

        {/* 4-Column Responsive Grid matching role-based cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {targetAudience.map((audience, idx) => {
            const Icon = audience.icon;
            return (
              <Card
                key={idx}
                className="p-5 flex flex-col justify-between bg-[#111827] border-[#1F2937] hover:border-[#06B6D4]/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 group rounded-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn('p-2.5 rounded-xl border shadow-sm', audience.color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9.5px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                      {audience.tag}
                    </span>
                  </div>

                  <h4 className="text-base font-bold font-heading text-white mb-2 group-hover:text-[#06B6D4] transition-colors">
                    {audience.role}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {audience.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1F2937] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 text-[11px]">Key Focus</span>
                    <span className="text-[#06B6D4] font-bold">{audience.metrics}</span>
                  </div>

                  <button
                    onClick={() => onNavigate(audience.tabTarget)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors border border-slate-700 group-hover:border-[#06B6D4]/40"
                  >
                    <span>{audience.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#06B6D4]" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

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
      {/* ============================================================ */}
      {/* ABOUT US & PLATFORM GUIDE MODAL OVERLAY */}
      {/* ============================================================ */}
      {isAboutModalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsAboutModalOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-[#0d1322] border border-emerald-500/40 shadow-2xl rounded-2xl p-6 sm:p-7 text-slate-100 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-white">About ByteMe Carbon Intelligence</h3>
                  <span className="text-xs font-mono text-emerald-400">Industrial SME Carbon-to-ROI Engine</span>
                </div>
              </div>
              <button
                onClick={() => setIsAboutModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <p className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 font-medium">
                <strong className="text-white font-semibold">ByteMe</strong> is an AI-powered carbon decision intelligence platform designed specifically for Indian SME manufacturers facing rising energy tariffs and strict SEBI BRSR Principle 6 mandates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block text-[11.5px]">1-Click SEBI Audit</span>
                  <span className="text-slate-400 text-[10.5px]">Instant BRSR Principle 6 Core & ISO 14064 GHG report packs.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block text-[11.5px]">3D Thermal Hotspots</span>
                  <span className="text-slate-400 text-[10.5px]">Physics-backed furnace telemetry and anomaly leak alerts.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsAboutModalOpen(false)}
                className="py-2 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs font-heading transition-colors"
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

