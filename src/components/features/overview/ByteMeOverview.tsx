import React, { useState, useEffect } from 'react';
import { TabId } from '../../../types';
import {
  Zap,
  Activity,
  Flame,
  Scan,
  Recycle,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  Coins,
  CheckCircle2,
  ChevronRight,
  Clock,
  Sparkles,
  Layers,
  FileCheck,
  Building2,
  Sliders,
  ExternalLink,
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
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const kpis = [
    {
      title: 'Current Baseline Footprint',
      value: '100.0',
      unit: 'tCO₂e / mo',
      delta: 'Scope 1: 52% • Scope 2: 38%',
      deltaType: 'neutral',
      desc: 'Based on 4,200 L HSD & 30,500 kWh grid load',
    },
    {
      title: 'Target Carbon Abatement',
      value: '28.8',
      unit: 'tCO₂e / mo',
      delta: '-28.8% Net Reduction',
      deltaType: 'success',
      desc: 'Via fuel shift & thermal heat recovery',
    },
    {
      title: 'Annual Operating Savings',
      value: '₹6.50',
      unit: 'Lakhs / yr',
      delta: '+₹54,160 / month cashflow',
      deltaType: 'success',
      desc: 'Lower fuel bills & scrap byproduct revenue',
    },
    {
      title: 'Estimated Payback Horizon',
      value: '10.5',
      unit: 'Months',
      delta: 'IRR 42.8% • Capex ₹4.8L',
      deltaType: 'neutral',
      desc: 'Full capital recovery under 1 financial year',
    },
  ];

  const hotspots = [
    {
      stage: 'Stage 02 • Thermal Processing',
      name: 'Heavy Furnace Heating (HSD Oil)',
      emission: '48.0 tCO₂e/mo',
      pct: 48,
      status: 'High Priority Hotspot',
      statusColor: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900',
      lever: '50% Shift to Biomass Briquettes & Flue Gas Heat Exchanger',
    },
    {
      stage: 'Stage 03 • Extrusion & Molding',
      name: 'Grid Electricity Motor Drives',
      emission: '25.0 tCO₂e/mo',
      pct: 25,
      status: 'Optimization Target',
      statusColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900',
      lever: 'VFD Speed Controls & 20% Rooftop Solar Offset (CEA Grid 0.82)',
    },
    {
      stage: 'Stage 01 • Raw Materials',
      name: 'Virgin Polymer Resin (HDPE/PP)',
      emission: '15.0 tCO₂e/mo',
      pct: 15,
      status: 'Scope 3 Supply Chain',
      statusColor: 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
      lever: 'Blend 20% Post-Consumer Recycled (PCR) Polymer Resin',
    },
    {
      stage: 'Stage 04 • Finishing & Trim',
      name: 'Plastic Byproduct Scrap (12T/mo)',
      emission: '12.0 tCO₂e/mo',
      pct: 12,
      status: 'Circular Monetization',
      statusColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900',
      lever: '100% In-Plant Regrind + B2B Offtake at ₹25,000/Ton',
    },
  ];

  const quickActions = [
    {
      id: 'simulation' as TabId,
      title: 'Digital Twin Process Flow',
      desc: 'Interactive 4-stage material & energy telemetry pipeline with live leak diagnosis.',
      icon: Flame,
      badge: 'Real-Time Telemetry',
    },
    {
      id: 'simulator_hub' as TabId,
      title: 'What-If ROI Simulator',
      desc: 'Adjust fuel shifts, temperature setpoints, and PCR resin blends to see instant ROI.',
      icon: Sliders,
      badge: 'Interactive Modeling',
    },
    {
      id: 'analytics_hub' as TabId,
      title: '3D Thermal Diagnostics',
      desc: 'Furnace temperature gradient mapping, empirical regressions, and SHAP explainability.',
      icon: Activity,
      badge: 'Hotspot Detection',
    },
    {
      id: 'circular' as TabId,
      title: 'B2B Circular Waste Stream',
      desc: 'Industrial symbiosis marketplace connecting regional manufacturing buyers.',
      icon: Recycle,
      badge: 'Waste Monetization',
    },
    {
      id: 'intake' as TabId,
      title: 'OCR Smart Bill Scanner',
      desc: 'Automated utility bill parser extracting energy kWh, tariffs, and statutory factors.',
      icon: Scan,
      badge: 'Zero-Manual Ingestion',
    },
    {
      id: 'admin' as TabId,
      title: 'Facility Admin & AI Setup',
      desc: 'Configure factory fuels, baseline parameters, and run automated AI engineering reviews.',
      icon: Zap,
      badge: 'Factory Configuration',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12 font-sans">
      {/* 1. CLEAN EXECUTIVE PLANT HERO */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Facility Connected</span>
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Apex Packaging Pvt. Ltd. • Unit #4, Chakan Industrial Area, Pune
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Industrial Carbon Decision Intelligence
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Automated Scope 1-3 leak-point detection, empirical ROI optimization, and SEBI BRSR Principle 6 compliance for manufacturing operations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('simulator_hub')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-sm flex items-center space-x-2"
            >
              <Sliders className="w-4 h-4" />
              <span>Launch Live Simulator</span>
            </button>
            
            {onOpenBRSRModal && (
              <button
                onClick={onOpenBRSRModal}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-all flex items-center space-x-2"
              >
                <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Export BRSR Audit Pack</span>
              </button>
            )}

            {onStartJudgeTour && (
              <button
                onClick={onStartJudgeTour}
                className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-all flex items-center space-x-1.5"
                title="Guided Judge Walkthrough"
              >
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>3-Min Demo</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. FOUR KEY EXECUTIVE METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-3"
          >
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {kpi.title}
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {kpi.value}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {kpi.unit}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-col space-y-1">
              <span
                className={cn(
                  'text-xs font-semibold',
                  kpi.deltaType === 'success'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-600 dark:text-slate-300'
                )}
              >
                {kpi.delta}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                {kpi.desc}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. TWO-COLUMN EXECUTIVE WORKFLOW SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Hotspot Diagnostic Breakdown (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Facility Emission Hotspots & Abatement Levers
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Stage-wise breakdown of current 100 tCO₂e/mo footprint with statutory standards
              </p>
            </div>
            <button
              onClick={() => onNavigate('simulation')}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center space-x-1"
            >
              <span>View Digital Twin</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {hotspots.map((h, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/80 space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 block">
                      {h.stage}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {h.name}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2 self-start sm:self-center">
                    <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                      {h.emission}
                    </span>
                    <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full border', h.statusColor)}>
                      {h.status}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      i === 0 ? 'bg-rose-500' : i === 1 ? 'bg-amber-500' : 'bg-emerald-500'
                    )}
                    style={{ width: `${h.pct}%` }}
                  />
                </div>

                <div className="pt-1.5 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                    <strong className="text-slate-700 dark:text-slate-300">Action:</strong> {h.lever}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pre-Integrated AI Recommendations & Compliance (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Integrated AI Assistant Box */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Deterministic AI Engineering Insights
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pre-configured intelligence • Zero API key needed
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                  <span>Priority 1: Fuel Substitution</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono">-14.4 tCO₂e</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Shift 50% Furnace Oil to Agro-Biomass Briquettes. Capex: ₹3.2L, annual net fuel savings: ₹2.80L/yr.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                  <span>Priority 2: Waste Heat Recovery</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono">-8.2 tCO₂e</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Install shell heat recuperator to preheat intake air by 80°C, lowering burner fuel demand by 7.2%.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                  <span>Priority 3: Circular Scrap Exchange</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono">+₹3.0L / yr</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Divert 12 Ton/month HDPE trim scrap to Chakan Automotive Cluster recyclers at ₹25,000/Ton.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('simulator_hub')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-semibold transition-all text-center flex items-center justify-center space-x-2"
            >
              <span>Test Recommendations in Live Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Statutory Compliance Badge Box */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-mono">
              Statutory Compliance Verification
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">GRID EMISSIONS</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">CEA v2025 (0.82)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">SCOPE 1 AUDITING</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">IPCC 2006 Standard</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">ESG DISCLOSURE</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">SEBI BRSR Core</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">CIRCULAR WASTE</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">CPCB EPR Mandate</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. CLEAN MODULE LAUNCHPAD GRID */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Platform Capabilities & Engineering Hubs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="group bg-white dark:bg-[#111827] hover:bg-slate-50/80 dark:hover:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm cursor-pointer transition-all duration-200 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 group-hover:bg-emerald-500/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-medium font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {action.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {action.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Open Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
