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

  const summaryLines = result?.summary
    ? result.summary.split('\n').map((l) => l.trim()).filter(Boolean)
    : [];

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0E131F] overflow-hidden">
      <div className="flex items-start justify-between gap-4 px-8 pt-6 pb-5 border-b border-slate-100 dark:border-white/[0.05]">
        <div className="flex items-start gap-3 min-w-0">
          <div className="mt-0.5 shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-emerald-600 font-bold">AI Review · {section}</p>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-0.5">{title}</h3>
            <p className="text-sm text-slate-500 mt-1">{description}</p>
          </div>
        </div>
        <button
          onClick={run}
          disabled={loading}
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white text-sm font-semibold min-h-[48px]"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? 'Analysing…' : result ? 'Re-run review' : 'Run AI Review'}
        </button>
      </div>

      {loading && (
        <div className="px-8 py-6 space-y-3">
          {[100, 80, 60].map((w, i) => (
            <div key={i} className="h-3 rounded-full bg-slate-100 animate-pulse" style={{ width: `${w}%` }} />
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="px-8 py-4 flex items-start gap-2 text-sm text-rose-600">
          <AlertTriangle className="w-4 h-4 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {result && !loading && (
        <div>
          <button onClick={() => setExpanded((v) => !v)} className="w-full flex items-center justify-between px-8 py-3 text-xs font-medium text-slate-500 bg-slate-50 border-b border-slate-100">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {result.actionItems?.length ?? 0} actions · {section}
            </span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expanded && (
            <div className="px-8 py-6 space-y-5">
              <div className="space-y-2">
                {summaryLines.map((line, i) => {
                  const heading = line.startsWith('#');
                  const clean = line.replace(/^#+\s*/, '');
                  return (
                    <p key={i} className={heading ? 'text-sm font-semibold text-slate-900' : 'text-sm text-slate-600 leading-relaxed'}>
                      {clean}
                    </p>
                  );
                })}
              </div>
              {result.actionItems && result.actionItems.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {result.actionItems.map((item) => (
                    <div key={item.step} className="rounded-lg border border-slate-200 p-4 space-y-2">
                      <p className="text-sm font-semibold text-slate-900">{item.step}. {item.title}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.co2Impact && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700">
                            <TrendingDown className="w-3 h-3" /> {item.co2Impact}
                          </span>
                        )}
                        {item.financialImpact && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-600">
                            <Coins className="w-3 h-3" /> {item.financialImpact}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {result.totalImpact && (
                <div className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>{result.totalImpact.co2ReductionPct}</span>
                  <span className="text-slate-500">{result.totalImpact.annualProfitIncrease}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!result && !loading && !error && (
        <div className="px-8 py-5 text-sm text-slate-500">
          Run AI Review uses the Gemini key saved in Facility Configuration. If the key is missing, you still get a section-specific model review — not a dump of raw config.
        </div>
      )}
    </div>
  );
};
