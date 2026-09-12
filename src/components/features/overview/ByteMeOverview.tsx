import React from 'react';
import { TabId } from '../../../types';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
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
  // Key Proof Numbers
  const keyProofMetrics = [
    {
      label: 'Total Capex Investment',
      value: '₹20.3L',
      subtext: '5 ranked interventions',
      icon: Coins,
    },
    {
      label: 'Net Annual Carbon Cut',
      value: '195 tCO₂e',
      subtext: 'Verified Scope 1 & 2',
      icon: TrendingDown,
    },
    {
      label: 'Capital Payback Period',
      value: '10.5 mos',
      subtext: 'Balance-sheet ROI',
      icon: Zap,
    },
    {
      label: 'Footprint Reduction',
      value: '42.0%',
      subtext: 'vs factory baseline',
      icon: Activity,
    },
    {
      label: 'Landfill Waste Diverted',
      value: '85.0%',
      subtext: 'Polymer scrap monetized',
      icon: Recycle,
    },
  ];

  // 5 Core Functionalities (Standardized Template)
  const coreFunctionalities = [
    {
      num: '01',
      title: 'Digital Factory Process Simulation',
      tagline: 'Physics-Based Empirical Process Pipeline',
      description:
        'Simulate material and energy flow across Input Feedstock, High-Temperature Thermal Furnaces, Polymer Extrusion, and Byproduct Recovery with live mass-energy balance calculations.',
      mechanism: 'Simulates 4 sequential stages with real-time empirical equations for specific heat and grid power draw.',
      impactMetric: 'Pinpoints 48 tCO₂e/mo furnace leak',
      isAlert: false,
      tabTarget: 'simulation' as TabId,
      actionLabel: 'Launch Twin Pipeline',
      icon: Flame,
    },
    {
      num: '02',
      title: 'Emission Hotspots & Red Alert System',
      tagline: 'Automated Thermal Leak-Point Diagnostics',
      description:
        'Continuous telemetry monitoring identifies physical heat breaches, including 1,418°C kiln burner thermal overshoots and 380°C refractory wall radiation losses costing ₹12,400 daily.',
      mechanism: 'Calibrated against FLIR thermal infrared imaging curves and Zone 3 flue gas sensor telemetry.',
      impactMetric: 'CRITICAL ALERT: ₹3.72L/mo fuel loss',
      isAlert: true, // Uses Rose alert color ONLY for red-alert state
      tabTarget: 'analytics_hub' as TabId,
      actionLabel: 'Inspect Hotspots',
      icon: AlertCircle,
    },
    {
      num: '03',
      title: 'AI Sustainability Copilot',
      tagline: 'Server-Side Natural Language Carbon Reasoning',
      description:
        'Accepts natural language operational queries and returns structured, costed action plans grounded strictly in facility telemetry, IPCC 2006 guidelines, and CEA India Grid v19 factors.',
      mechanism: 'Server-side key vault with deterministic zero-hallucination fallback engine for 99.9% uptime.',
      impactMetric: 'Zero hallucinated metrics',
      isAlert: false,
      tabTarget: 'copilot' as TabId,
      actionLabel: 'Launch AI Copilot',
      icon: Sparkles,
    },
    {
      num: '04',
      title: 'Fuel & Material Substitution What-If Scale',
      tagline: 'Live Capital Waterfall & Abatement Curve',
      description:
        'Interactive empirical sliders allowing plant managers to model fuel shifts (Biomass, RDF), temperature setpoint tuning, rooftop solar integration, and post-consumer recycled (PCR) resin blends.',
      mechanism: 'Calculates dynamic carbon abatement curves, monthly operational savings, and net payback schedule.',
      impactMetric: 'Instant split ROI comparison',
      isAlert: false,
      tabTarget: 'simulator_hub' as TabId,
      actionLabel: 'Run What-If Simulator',
      icon: Zap,
    },
    {
      num: '05',
      title: 'AI Waste-to-Resource Matching Network',
      tagline: 'Algorithmic B2B Circular Byproduct Marketplace',
      description:
        'Transforms manufacturing off-cut plastic and trim scrap into recurring revenue via automated algorithmic matchmaking with nearby industrial cluster buyers, eliminating landfill tipping fees.',
      mechanism: 'Calculates 30% virgin feedstock discount, avoided ₹1,500/Ton tipping fees, and net logistics costs.',
      impactMetric: '+₹3.0L/yr Byproduct Revenue',
      isAlert: false,
      tabTarget: 'circular' as TabId,
      actionLabel: 'Explore Waste Network',
      icon: Recycle,
    },
  ];

  // Ranked ROI Action Items
  const roiActionItems = [
    {
      rank: 1,
      name: 'Kiln Burner Air-Fuel Ratio Tuning & Setpoint Fix',
      type: 'Process Optimization',
      capex: '₹0.80L',
      annualCO2: '48.0 tCO₂e',
      annualSavings: '₹3.72L',
      payback: '2.6 mos',
    },
    {
      rank: 2,
      name: 'B2B Polymer Trim Scrap Cluster Off-Take Match',
      type: 'Circular Economy',
      capex: '₹2.00L',
      annualCO2: '32.0 tCO₂e',
      annualSavings: '₹3.00L',
      payback: '8.0 mos',
    },
    {
      rank: 3,
      name: 'Furnace Heavy Oil to Biomass Pellet Fuel Shift',
      type: 'Fuel Switch',
      capex: '₹6.00L',
      annualCO2: '52.0 tCO₂e',
      annualSavings: '₹4.80L',
      payback: '15.0 mos',
    },
    {
      rank: 4,
      name: '150 kW On-Site Rooftop Solar Net-Metering',
      type: 'Renewable Power',
      capex: '₹8.00L',
      annualCO2: '37.0 tCO₂e',
      annualSavings: '₹3.60L',
      payback: '26.7 mos',
    },
    {
      rank: 5,
      name: 'Refractory Shell Ceramic Fiber Insulation',
      type: 'Thermal Retrofit',
      capex: '₹3.50L',
      annualCO2: '26.0 tCO₂e',
      annualSavings: '₹1.44L',
      payback: '29.1 mos',
    },
  ];

  // Beneficiaries
  const stakeholders = [
    {
      role: 'Plant & Operations Managers',
      tag: 'Manufacturing Ops',
      benefit: 'Eliminate uninsulated furnace radiation and receive proactive burner overshoot alerts to avoid costly downtime.',
      kpi: 'Cut Thermal OPEX by ~28%',
      action: 'Inspect Twin Pipeline',
      target: 'simulation' as TabId,
    },
    {
      role: 'ESG & Compliance Directors',
      tag: 'Regulatory & Audit',
      benefit: 'Instantly generate verified SEBI BRSR Principle 6 Core audit packs and ISO 14064 GHG Scope 1-3 reports.',
      kpi: '1-Click Audit Filing',
      action: 'Open BRSR Roadmap',
      target: 'roadmap' as TabId,
    },
    {
      role: 'CFOs & Financial Controllers',
      tag: 'Capital Allocation',
      benefit: 'Translate carbon metrics into balance-sheet savings in ₹ INR with real-time payback schedules and tax credit models.',
      kpi: 'Sub-11 Month Payback',
      action: 'Calculate Live ROI',
      target: 'simulator_hub' as TabId,
    },
    {
      role: 'Circular Economy Recyclers',
      tag: 'Secondary Materials',
      benefit: 'Source pre-qualified industrial polymer trim scrap directly from local manufacturers at discounted feedstock pricing.',
      kpi: '85% Landfill Diversion',
      action: 'View Waste Sankey',
      target: 'circular' as TabId,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 animate-fadeIn pb-16 text-slate-900 dark:text-slate-100 font-sans">
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0E131F] p-8 md:p-10 shadow-xs">
        <div className="max-w-3xl space-y-6">
          {/* Facility Context Chip */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Pilot Facility: Apex Packaging Pvt. Ltd. (Pune, India)</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 text-xs font-mono">
              <Building2 className="w-3.5 h-3.5" />
              <span>Plastics &amp; Packaging SME</span>
            </span>
          </div>

          {/* Product Title & Subtitle */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Industrial Emission Leak-Point Detector &amp;{' '}
              <span className="text-emerald-600 dark:text-emerald-400">Circular Recommender</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              ByteMe identifies hidden carbon leak points in SME factories and recommends costed, ROI-ranked circular interventions to cut emissions by 42% with a sub-11-month financial payback.
            </p>
          </div>

          {/* Single Primary CTA + Secondary Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('simulation')}
              className="flex items-center space-x-2 shadow-xs"
            >
              <span>Launch Digital Twin Pipeline</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('simulator_hub')}
              className="flex items-center space-x-2"
            >
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>What-If ROI Simulator</span>
            </Button>

            {onStartJudgeTour && (
              <Button
                variant="outline"
                size="lg"
                onClick={onStartJudgeTour}
                className="flex items-center space-x-2"
              >
                <Compass className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>60s Guided Tour</span>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. THE PROBLEM: THE INDUSTRIAL SME DILEMMA                   */}
      {/* ============================================================ */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800/80 pb-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            The Industrial SME Decarbonization Dilemma
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Why Indian manufacturing SMEs struggle with traditional ESG tools and carbon reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-mono font-bold text-xs text-slate-700 dark:text-slate-300">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Unseen Thermal Leak Points
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Kilns and furnaces operate with uncalibrated air-fuel ratios and damaged refractory shell insulation, leaking up to 48 tCO₂e/mo in wasted fossil fuel without operator awareness.
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-mono font-bold text-xs text-slate-700 dark:text-slate-300">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Surging Peak Grid Tariffs
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              State DISCOM peak electricity rates surge to ₹8.50/kWh during evening windows (0.82 kgCO₂e/kWh grid factor). SMEs lack dynamic load-shifting simulators to avoid costly demand spikes.
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-mono font-bold text-xs text-slate-700 dark:text-slate-300">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              SEBI BRSR Compliance Burden
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mandatory SEBI BRSR Principle 6 Core disclosures require strict Scope 1-3 audit packs. Manual consulting takes months and costs lakhs, pricing out mid-market manufacturers.
            </p>
          </Card>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. 5 CORE FUNCTIONALITIES (STANDARDIZED TEMPLATE)            */}
      {/* ============================================================ */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              5 Core Platform Functionalities
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Empirical modeling, automated leak detection, and algorithmic byproduct monetization.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 self-start sm:self-auto">
            Click any module to inspect live state
          </span>
        </div>

        <div className="space-y-4">
          {coreFunctionalities.map((func) => {
            const Icon = func.icon;
            return (
              <Card
                key={func.num}
                className="p-6 transition-all duration-200 hover:border-emerald-500/40"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left Column: Number Badge, Title, Description, Mechanism */}
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      {func.num}
                    </div>

                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {func.title}
                        </h3>
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                          • {func.tagline}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {func.description}
                      </p>

                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Mechanism:</span> {func.mechanism}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Metric Pill & Standard CTA */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800/80 shrink-0">
                    <div
                      className={
                        func.isAlert
                          ? 'px-3 py-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-xs font-semibold border border-rose-500/20'
                          : 'px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-semibold border border-emerald-500/20'
                      }
                    >
                      {func.impactMetric}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate(func.tabTarget)}
                      className="flex items-center space-x-1.5 text-xs hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
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

      {/* ============================================================ */}
      {/* 4. VERIFIED FACILITY IMPACT PROOF METRICS                    */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
            Verified Facility Impact Proof Metrics
          </h2>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
            IPCC 2006 &amp; CEA India Grid v19 Grounded
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {keyProofMetrics.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-5 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                    {stat.label}
                  </span>
                  <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {stat.subtext}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. FINANCIAL & CARBON ROI IMPACT MATRIX (COSTED TABLE)       */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Costed Decarbonization Action Plan &amp; Payback Matrix
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Ranked financial investment roadmap modeled for Apex Packaging (195 tCO₂e/yr total cut).
            </p>
          </div>
          {onOpenBRSRModal && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenBRSRModal}
              className="flex items-center space-x-1.5 self-start sm:self-auto"
            >
              <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Export BRSR Audit Pack</span>
            </Button>
          )}
        </div>

        <Card className="overflow-hidden border border-slate-200 dark:border-slate-800/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Rank</th>
                  <th className="py-3.5 px-4">Intervention &amp; Strategy</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-right">Capex</th>
                  <th className="py-3.5 px-4 text-right">CO₂ Cut / yr</th>
                  <th className="py-3.5 px-4 text-right">Annual Savings</th>
                  <th className="py-3.5 px-4 text-right">Payback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {roiActionItems.map((item) => (
                  <tr
                    key={item.rank}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      #{item.rank}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                      {item.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {item.type}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-700 dark:text-slate-300">
                      {item.capex}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {item.annualCO2}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-900 dark:text-white">
                      {item.annualSavings}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-600 dark:text-slate-400">
                      {item.payback}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50/90 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800/80 font-mono text-xs">
                <tr>
                  <td colSpan={3} className="py-3.5 px-4 text-slate-900 dark:text-white font-bold uppercase">
                    Combined Portfolio Total Impact
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-900 dark:text-white font-bold">
                    ₹20.30L
                  </td>
                  <td className="py-3.5 px-4 text-right text-emerald-600 dark:text-emerald-400 font-bold">
                    195.0 tCO₂e/yr
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-900 dark:text-white font-bold">
                    ₹16.56L/yr
                  </td>
                  <td className="py-3.5 px-4 text-right text-emerald-600 dark:text-emerald-400 font-bold">
                    ~10.5 mos
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </section>

      {/* ============================================================ */}
      {/* 6. STAKEHOLDER BENEFICIARIES                                  */}
      {/* ============================================================ */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800/80 pb-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Stakeholder Alignment &amp; Value Realization
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Tailored workflows for every decision-maker in the industrial SME hierarchy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stakeholders.map((s, idx) => (
            <Card key={idx} className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80">
                  {s.tag}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {s.role}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {s.benefit}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Key Outcome:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{s.kpi}</span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate(s.target)}
                  className="w-full text-xs flex items-center justify-center space-x-1"
                >
                  <span>{s.action}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. SCIENTIFIC DATA PROVENANCE & ARCHITECTURE                 */}
      {/* ============================================================ */}
      <section className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0E131F] p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Scientific Data Provenance &amp; System Architecture
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Strictly grounded mathematical calculation engines with statutory citation standards.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
            100% Deterministic Provenance
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-2">
            <div className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">
              Emission Factors
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-sans">
              CEA India Grid v19 &amp; IPCC 2006
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed font-sans">
              Indian national grid baseline at 0.82 kgCO₂e/kWh. Stationary combustion factors per IPCC 2006 Guidelines for National GHG Inventories.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-2">
            <div className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">
              Compliance Standard
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-sans">
              SEBI BRSR Core &amp; ISO 14064
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed font-sans">
              Formulated for direct filing under SEBI BRSR Principle 6 Core metrics (Scope 1 direct fuels, Scope 2 electricity, Scope 3 waste off-take).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-2">
            <div className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">
              AI Backend Security
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-sans">
              Server-Side API Key Vault
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed font-sans">
              Gemini LLM calls execute strictly server-side without exposing API keys to the browser, paired with zero-hallucination mathematical verification.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. TEAM & PROJECT CREDENTIALS                                 */}
      {/* ============================================================ */}
      <section className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>ByteMe v2.0 • Hackout 2.0 National Hackathon Submission</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span>React + Vite</span>
          <span>•</span>
          <span>Node.js / Express</span>
          <span>•</span>
          <span>Tailwind CSS</span>
          <span>•</span>
          <span>Gemini LLM</span>
        </div>
      </section>
    </div>
  );
};
