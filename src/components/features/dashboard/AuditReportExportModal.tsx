import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Download, CheckCircle2, X, Sparkles, CheckSquare, Square } from 'lucide-react';
import { ExportOptions, KPIData } from '../../../types';

export interface AuditReportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpiData: KPIData;
}

export const AuditReportExportModal: React.FC<AuditReportExportModalProps> = ({
  isOpen,
  onClose,
  kpiData,
}) => {
  const [options, setOptions] = useState<ExportOptions>({
    includeThermalMaps: true,
    attachFinancialRoi: true,
    exportRegressionCsv: true,
    includeBRSR: true,
    includeAuditTrail: true,
  });

  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleOption = (key: keyof ExportOptions) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleExecuteExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setDownloadSuccess(true);
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#141724] border border-slate-200/80 dark:border-white/[0.08] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-xs">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold font-heading text-lg text-slate-900 dark:text-white">
                Executive Audit Report & Data Export Utility
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generate bankable ESG audit packs, raw CSV telemetry, and SEBI BRSR compliance PDF exports.
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

        {/* Configurable Checkboxes Body */}
        <div className="p-6 space-y-4 text-slate-800 dark:text-slate-200">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-mono">
            Configurable Audit Export Modules:
          </span>

          <div className="space-y-3">
            {/* Checkbox 1 */}
            <div
              onClick={() => toggleOption('includeThermalMaps')}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] cursor-pointer hover:border-emerald-500/50 transition-all flex items-center justify-between"
            >
              <div className="flex items-center space-x-3.5">
                {options.includeThermalMaps ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 shrink-0" />
                )}
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Include 3D Thermal Hotspot Facility Heatmaps
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    High-resolution vector thermal graphics & stage leak-point telemetry
                  </span>
                </div>
              </div>
              <Badge variant="normal">PNG / Vector</Badge>
            </div>

            {/* Checkbox 2 */}
            <div
              onClick={() => toggleOption('attachFinancialRoi')}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] cursor-pointer hover:border-emerald-500/50 transition-all flex items-center justify-between"
            >
              <div className="flex items-center space-x-3.5">
                {options.attachFinancialRoi ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 shrink-0" />
                )}
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Attach Financial Cashflow ROI & Payback Breakdown
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Detailed Capex, Opex savings, and ~10.5 month payback matrices
                  </span>
                </div>
              </div>
              <Badge variant="info">Financial ROI</Badge>
            </div>

            {/* Checkbox 3 */}
            <div
              onClick={() => toggleOption('exportRegressionCsv')}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] cursor-pointer hover:border-emerald-500/50 transition-all flex items-center justify-between"
            >
              <div className="flex items-center space-x-3.5">
                {options.exportRegressionCsv ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 shrink-0" />
                )}
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Export Empirical Regression Raw Datasets (CSV)
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Raw fuel, energy, and emission time-series data for custom analytics
                  </span>
                </div>
              </div>
              <Badge variant="outline">Raw CSV</Badge>
            </div>

            {/* Checkbox 4 */}
            <div
              onClick={() => toggleOption('includeBRSR')}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] cursor-pointer hover:border-emerald-500/50 transition-all flex items-center justify-between"
            >
              <div className="flex items-center space-x-3.5">
                {options.includeBRSR ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 shrink-0" />
                )}
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Include SEBI BRSR Principle 6 Mandatory Disclosures
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    GHG Scope 1, Scope 2, Scope 3, IPCC factors, and CEA grid standards
                  </span>
                </div>
              </div>
              <Badge variant="normal">BRSR Core</Badge>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">ISO 14064 Verified Export</span>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleExecuteExport}
              disabled={isExporting}
              className="flex items-center space-x-2 font-bold shadow-md shadow-emerald-500/15"
            >
              {isExporting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Packaging Export Bundle...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Audit Pack Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export Configured Audit Bundle</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
