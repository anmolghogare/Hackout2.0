import React, { useState } from 'react';
import {
  Sparkles,
  Loader2,
  TrendingDown,
  Coins,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { FacilityConfig, SliderInputs } from '../../../types';
import { AICopilotResponse, AIReviewSection, querySectionAIReview } from '../../../services/geminiCopilot';

export const AIReviewCard: React.FC<{
  section: AIReviewSection;
  title: string;
  description: string;
  facilityConfig: FacilityConfig;
  sliders: SliderInputs;
  apiKey?: string;
  aiModel?: string;
  extraContext?: string;
}> = ({ section, title, description, facilityConfig, sliders, apiKey, aiModel, extraContext }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AICopilotResponse | null>(null);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(true);

  const run = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await querySectionAIReview({ section, facilityConfig, sliders, apiKey, model: aiModel, extraContext });
      setResult(res);
      setExpanded(true);
    } catch (e: any) {
      setError(e?.message || 'Review failed');
    }
    setLoading(false);
  };

  // Parse markdown summary into clean lines (strip ### headings into display text)
  const summaryLines = result?.summary
    ? result.summary
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-white dark:bg-[#0E131F] overflow-hidden shadow-xs">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-slate-100 dark:border-white/[0.05]">
        <div className="flex items-start gap-3 min-w-0">
          {/* AI sparkle badge */}
          <div className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400 font-bold">
              AI Review · {section}
            </p>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">{title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{description}</p>
          </div>
        </div>

        {/* CTA Button — top right */}
        <button
          onClick={run}
          disabled={loading}
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-sm"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          {loading ? 'Analysing…' : result ? 'Re-run' : 'Run AI Review'}
        </button>
      </div>

      {/* ── Loading shimmer ── */}
      {loading && (
        <div className="px-6 py-5 space-y-3">
          {[100, 80, 60].map((w, i) => (
            <div
              key={i}
              className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse"
              style={{ width: `${w}%` }}
            />
          ))}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        </div>
      )}

      {/* ── Error state ── */}
      {error && !loading && (
        <div className="px-6 py-4 flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Result ── */}
      {result && !loading && (
        <div className="animate-fadeIn">
          {/* Collapse toggle */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-full flex items-center justify-between px-6 py-3 text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors bg-slate-50/60 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/[0.04]"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Review complete — {result.actionItems?.length ?? 0} actions identified
            </span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {expanded && (
            <div className="px-6 py-5 space-y-5">

              {/* Summary text block */}
              {summaryLines.length > 0 && (
                <div className="space-y-1.5">
                  {summaryLines.map((line, i) => {
                    const isHeading = line.startsWith('###') || line.startsWith('##');
                    const cleanLine = line.replace(/^#+\s*/, '');
                    if (isHeading) {
                      return (
                        <p key={i} className="text-xs font-bold text-slate-800 dark:text-slate-200 pt-1">
                          {cleanLine}
                        </p>
                      );
                    }
                    return (
                      <p key={i} className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {cleanLine}
                      </p>
                    );
                  })}
                </div>
              )}

              {/* Action Items as cards */}
              {result.actionItems && result.actionItems.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Recommended Actions</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {result.actionItems.map((item) => (
                      <div
                        key={item.step}
                        className="rounded-xl border border-slate-200/80 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.03] p-4 space-y-3 hover:border-emerald-500/30 transition-colors"
                      >
                        {/* Step badge + title */}
                        <div className="flex items-start gap-2.5">
                          <span className="shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold font-mono">
                            {String(item.step).padStart(2, '0')}
                          </span>
                          <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-snug">{item.title}</p>
                        </div>

                        {/* CO₂ + financial pills */}
                        <div className="flex flex-wrap gap-2">
                          {item.co2Impact && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/15">
                              <TrendingDown className="w-2.5 h-2.5" />
                              {item.co2Impact}
                            </span>
                          )}
                          {item.financialImpact && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-mono font-bold border border-amber-500/15">
                              <Coins className="w-2.5 h-2.5" />
                              {item.financialImpact}
                            </span>
                          )}
                        </div>

                        {/* Payback / capex if available */}
                        {(item.paybackPeriod || item.capexRequired) && (
                          <div className="flex items-center gap-3 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                            {item.capexRequired && <span>Capex: <span className="text-slate-600 dark:text-slate-300">{item.capexRequired}</span></span>}
                            {item.paybackPeriod && <span>Payback: <span className="text-slate-600 dark:text-slate-300">{item.paybackPeriod}</span></span>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Total impact summary bar */}
              {result.totalImpact && (
                <div className="flex flex-wrap items-center gap-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/15 px-4 py-3">
                  <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Total Impact:</span>
                  {result.totalImpact.co2ReductionPct && (
                    <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {result.totalImpact.co2ReductionPct} CO₂ cut
                    </span>
                  )}
                  {result.totalImpact.annualProfitIncrease && (
                    <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400">
                      · {result.totalImpact.annualProfitIncrease} savings
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Empty idle state ── */}
      {!result && !loading && !error && (
        <div className="px-6 py-5 flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
          <Sparkles className="w-4 h-4 text-emerald-500/50" />
          <span>Click <span className="font-semibold text-emerald-600 dark:text-emerald-400">Run AI Review</span> to get a grounded analysis of this section using your live facility data.</span>
        </div>
      )}
    </div>
  );
};
