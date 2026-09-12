import React, { useState } from 'react';
import { ShieldCheck, FileCheck, Download, CheckCircle2, AlertCircle, Sparkles, Building2, Calendar, Award } from 'lucide-react';
import { KPIData, ProcessStage, FacilityConfig } from '../../../types';
import { formatNumber } from '../../../lib/utils';
import { cn } from '../../../lib/utils';

export interface ComplianceHubProps {
  kpiData: KPIData;
  stages: ProcessStage[];
  facilityConfig?: FacilityConfig;
  onOpenBRSRModal?: () => void;
}

export const ComplianceHub: React.FC<ComplianceHubProps> = ({
  kpiData,
  stages,
  facilityConfig,
  onOpenBRSRModal,
}) => {
  const [selectedStandard, setSelectedStandard] = useState<'SEBI' | 'ISO' | 'CPCB'>('SEBI');

  const disclosures = [
    {
      indicator: 'Essential Indicator 1',
      parameter: 'Total Electricity & Grid Energy Consumption (Scope 2)',
      statutoryMetric: '30,500 kWh / month',
      factorStandard: 'CEA Grid Factor v2025 (0.82 kgCO₂e/kWh)',
      footprint: `${stages[2]?.currentMonthlyCO2 || 25.0} tCO₂e/mo`,
      status: 'AUDITED & VERIFIED',
    },
    {
      indicator: 'Essential Indicator 2',
      parameter: 'Direct Stationary Fuel Combustion (Scope 1)',
      statutoryMetric: '4,200 Liters Furnace Oil (HSD)',
      factorStandard: 'IPCC 2006 Guidelines (3.12 kgCO₂e/L)',
      footprint: `${stages[1]?.currentMonthlyCO2 || 28.0} tCO₂e/mo`,
      status: 'AUDITED & VERIFIED',
    },
    {
      indicator: 'Essential Indicator 3',
      parameter: 'Raw Upstream Material Intensity (Scope 3)',
      statutoryMetric: '100 Tons Virgin HDPE Polymer',
      factorStandard: 'Ecoinvent 3.9 (2.80 tCO₂e/Ton)',
      footprint: `${stages[0]?.currentMonthlyCO2 || 15.0} tCO₂e/mo`,
      status: 'ESTIMATED SUPPLIER SPEC',
    },
    {
      indicator: 'Essential Indicator 4',
      parameter: 'Waste Generation & Circular Recovery Ratio',
      statutoryMetric: '12 Tons Trim Scrap Diverted',
      factorStandard: 'CPCB EPR Plastic Waste Rules 2024',
      footprint: '85% Circular Offset (3.0 tCO₂e net)',
      status: 'RECYCLER CONTRACT VERIFIED',
    },
    {
      indicator: 'Leadership Indicator 1',
      parameter: 'Decarbonization Trajectory & Net Zero Target',
      statutoryMetric: '-28.8% Verified Abatement',
      factorStandard: 'Science Based Targets initiative (SBTi)',
      footprint: 'Target 2030 SME Net-Zero Roadmap',
      status: 'ACTIVE SIMULATION APPROVED',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12 font-sans">
      {/* Header */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-mono">
              SEBI Circular No. SEBI/HO/CFD/CFD-SEC-2/P/CIR/2023/122
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            SEBI BRSR Core & ISO 14064 ESG Audit Compliance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Business Responsibility and Sustainability Reporting (BRSR Principle 6: Environmental Protection) for Indian Manufacturing SMEs.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {onOpenBRSRModal && (
            <button
              onClick={onOpenBRSRModal}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-sm flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Generate PDF Audit Pack</span>
            </button>
          )}
        </div>
      </div>

      {/* 3 Overview Metric Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">AUDITABLE BASELINE FOOTPRINT</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            100.0 <span className="text-sm font-normal text-slate-500">tCO₂e / month</span>
          </p>
          <span className="text-xs text-slate-400 font-mono block">Scope 1 (52T) + Scope 2 (38T) + Scope 3 (10T)</span>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">VERIFIED ANNUAL ABATEMENT</span>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            345.6 <span className="text-sm font-normal text-slate-500">tCO₂e / year</span>
          </p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-mono block">-28.8% Verified Abatement Trajectory</span>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">DATA PROVENANCE READINESS</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            100% <span className="text-sm font-normal text-slate-500">Audit-Ready</span>
          </p>
          <span className="text-xs text-slate-400 font-mono block">CEA Grid v2025 + IPCC 2006 Grounded</span>
        </div>
      </div>

      {/* Disclosures Table */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Principle 6 Mandatory Essential Indicators (ESG GHG Disclosures)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Statutory formatting ready for third-party carbon assurance and green lending submission
            </p>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200/80 dark:border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-900/50 font-mono text-[11px]">
                <th className="p-3.5 font-bold">Indicator Code</th>
                <th className="p-3.5 font-bold">Parameter Description</th>
                <th className="p-3.5 font-bold">Activity Volume</th>
                <th className="p-3.5 font-bold">Statutory Factor Standard</th>
                <th className="p-3.5 font-bold">Monthly Footprint</th>
                <th className="p-3.5 font-bold">Assurance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {disclosures.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-3.5 font-mono font-semibold text-slate-900 dark:text-white">{d.indicator}</td>
                  <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">{d.parameter}</td>
                  <td className="p-3.5 font-mono text-slate-600 dark:text-slate-300">{d.statutoryMetric}</td>
                  <td className="p-3.5 font-mono text-slate-500 dark:text-slate-400 text-[11px]">{d.factorStandard}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">{d.footprint}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
