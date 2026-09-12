import React, { useState } from 'react';
import { FacilityConfig, ScientificSourceItem } from '../../../types';
import { SCIENTIFIC_SOURCES_REGISTRY } from '../../../lib/utils';
import {
  X,
  ShieldCheck,
  BookOpen,
  ExternalLink,
  Calculator,
  Search,
  CheckCircle2,
  FileText,
  Building2,
  Atom,
} from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface DataProvenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  facilityConfig: FacilityConfig;
}

export const DataProvenanceModal: React.FC<DataProvenanceModalProps> = ({
  isOpen,
  onClose,
  facilityConfig,
}) => {
  const [selectedScope, setSelectedScope] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeSourceId, setActiveSourceId] = useState<string>(SCIENTIFIC_SOURCES_REGISTRY[0].id);

  if (!isOpen) return null;

  const filteredSources = SCIENTIFIC_SOURCES_REGISTRY.filter((src) => {
    const matchesScope = selectedScope === 'all' || src.scope === selectedScope;
    const matchesSearch =
      src.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      src.authority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      src.regulatoryBody.toLowerCase().includes(searchTerm.toLowerCase()) ||
      src.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesScope && matchesSearch;
  });

  const activeSource = SCIENTIFIC_SOURCES_REGISTRY.find((s) => s.id === activeSourceId) || SCIENTIFIC_SOURCES_REGISTRY[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="bg-white dark:bg-[#0c101c] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  Scientific Methodology & Data Provenance
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                  Verifiable Standards
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Every calculation, emission factor, and financial ROI model is grounded in statutory Indian & international standards.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by regulation, agency (e.g., CEA, IPCC, BEE, CPCB)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
            {['all', 'Scope 1', 'Scope 2', 'Scope 3', 'Financial'].map((scope) => (
              <button
                key={scope}
                onClick={() => setSelectedScope(scope)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors',
                  selectedScope === scope
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                {scope === 'all' ? 'All Sources' : scope}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body: Left list + Right inspector */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
          {/* Left: Source Cards */}
          <div className="md:col-span-5 p-4 space-y-2.5 overflow-y-auto max-h-[60vh] custom-scrollbar">
            {filteredSources.map((src) => {
              const isSelected = src.id === activeSourceId;
              return (
                <button
                  key={src.id}
                  onClick={() => setActiveSourceId(src.id)}
                  className={cn(
                    'w-full text-left p-3.5 rounded-2xl border transition-all space-y-1.5',
                    isSelected
                      ? 'bg-emerald-50/80 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/40 shadow-xs'
                      : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {src.scope}
                    </span>
                    <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 truncate">
                      {src.regulatoryBody}
                    </span>
                  </div>
                  <h4 className="font-heading font-extrabold text-xs text-slate-900 dark:text-white line-clamp-1">
                    {src.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                    {src.referenceDoc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Equation & Active Math Substitution Inspector */}
          <div className="md:col-span-7 p-6 space-y-5 overflow-y-auto max-h-[60vh] custom-scrollbar bg-slate-50/50 dark:bg-slate-900/20">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {activeSource.scope}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {activeSource.authority}
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                {activeSource.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeSource.description}
              </p>
            </div>

            {/* Official Source Document Reference */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Official Reference Document
              </span>
              <p className="font-semibold text-slate-900 dark:text-white">{activeSource.referenceDoc}</p>
              {activeSource.officialUrl && (
                <a
                  href={activeSource.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 hover:underline font-bold text-[11px]"
                >
                  <span>Open Official Document Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Statutory Standard Factor Value */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                Official Benchmark Metric / Statutory Baseline
              </span>
              <p className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                {activeSource.verifiableValue}
              </p>
            </div>

            {/* Live Substituted Mathematical Formula */}
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] uppercase font-bold tracking-wider flex items-center space-x-1.5">
                  <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Substituted Math for {facilityConfig.profile.name}</span>
                </span>
                <span className="text-[10px] text-emerald-400">Live Telemetry</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 overflow-x-auto text-[11.5px]">
                {activeSource.formula}
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 text-[11px]">
                <strong className="text-white block mb-1">Active Plant Calculation:</strong>
                {activeSource.substitutedSample}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Audited against SEBI BRSR Core July 2023 Guidelines</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-emerald-600 text-white font-bold text-xs hover:bg-slate-800 dark:hover:bg-emerald-500 transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
