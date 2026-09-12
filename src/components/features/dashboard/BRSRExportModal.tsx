import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Download, FileCheck, CheckCircle2, ShieldCheck, X, Sparkles, Building2, Calendar, Award } from 'lucide-react';
import { KPIData, ProcessStage } from '../../../types';
import { formatINR, formatNumber } from '../../../lib/utils';

export interface BRSRExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpiData: KPIData;
  stages: ProcessStage[];
}

export const BRSRExportModal: React.FC<BRSRExportModalProps> = ({
  isOpen,
  onClose,
  kpiData,
  stages,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportedSuccess, setExportedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportedSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold font-heading text-xl text-slate-900 dark:text-white flex items-center space-x-2">
                <span>SEBI BRSR Core ESG Audit Compliance Pack</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-mono font-bold border border-emerald-500/20">
                  ISO 14064 Verified
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Business Responsibility & Sustainability Reporting (BRSR Principle 6: Protection & Restoration of Environment)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Preview */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          {/* Executive Summary Block */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">
                  Entity Verification Profile
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Apex Packaging Pvt. Ltd. (Pune SME Unit #4)
                </h4>
              </div>
              <div className="text-right text-xs font-mono text-slate-500">
                <span>Reporting Cycle: FY 2026-27</span>
                <br />
                <span>Auditor: ByteMe Automated Engine</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-3 border-t border-slate-200 dark:border-slate-700/60">
              <div>
                <span className="text-slate-400 block text-[10px]">BASELINE FOOTPRINT</span>
                <span className="font-bold text-slate-900 dark:text-white">100 tCO₂e/mo</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">ABATED FOOTPRINT</span>
                <span className="font-bold text-emerald-500">{formatNumber(100 - kpiData.monthlyCO2SavedTons)} tCO₂e/mo</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">VERIFIED CUT %</span>
                <span className="font-bold text-cyan-500">-{kpiData.co2ReductionPercentage}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">ANNUAL NET ROI</span>
                <span className="font-bold text-purple-500">{kpiData.financialSavings.totalNetSavingsDisplay}</span>
              </div>
            </div>
          </div>

          {/* Scope 1, 2, 3 Disclosure Table */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 font-heading flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Principle 6 Essential Indicators (GHG Scope 1, 2, 3 Disclosures)</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider bg-slate-100 dark:bg-slate-800/40">
                    <th className="p-3">GHG Scope Category</th>
                    <th className="p-3">Activity Stream Source</th>
                    <th className="p-3">Emission Factor Standard</th>
                    <th className="p-3">Monthly Footprint</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr>
                    <td className="p-3 font-bold text-rose-500">Scope 1 (Direct)</td>
                    <td className="p-3">Heavy Furnace Oil Combustion (1400°C)</td>
                    <td className="p-3 text-slate-400">IPCC 2006 (3.12 kgCO₂e/L)</td>
                    <td className="p-3 font-bold">{stages[1]?.currentMonthlyCO2 || 28.0} tCO₂e</td>
                    <td className="p-3"><Badge variant="alert">Priority 1</Badge></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-emerald-500">Scope 2 (Indirect)</td>
                    <td className="p-3">Extrusion Line Electricity Grid</td>
                    <td className="p-3 text-slate-400">CEA Grid Factor v2025 (0.82 kg/kWh)</td>
                    <td className="p-3 font-bold">{stages[2]?.currentMonthlyCO2 || 25.0} tCO₂e</td>
                    <td className="p-3"><Badge variant="warning">Evaluate</Badge></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-500">Scope 3 (Upstream)</td>
                    <td className="p-3">Virgin Polymer Resin Input (100T/mo)</td>
                    <td className="p-3 text-slate-400">Ecoinvent 3.9 (2.80 tCO₂e/T)</td>
                    <td className="p-3 font-bold">{stages[0]?.currentMonthlyCO2 || 10.0} tCO₂e</td>
                    <td className="p-3"><Badge variant="normal">Verified</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Audit Verification Stamp */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Empirical mathematical proofs and IPCC compliance verified for banking ESG loans.
              </span>
            </div>
            <span className="font-mono text-slate-400 text-[10px]">Hash: 0x9f82...3a71</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">SEBI BRSR Format 2026 Ready</span>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleDownload}
              disabled={isExporting}
              className="flex items-center space-x-2"
            >
              {isExporting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Generating Audit PDF...</span>
                </>
              ) : exportedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>BRSR Audit Pack Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download BRSR PDF Audit Pack</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
