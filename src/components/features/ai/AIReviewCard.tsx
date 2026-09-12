import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { FacilityConfig, SliderInputs } from '../../../types';
import { AICopilotResponse, AIReviewSection, querySectionAIReview } from '../../../services/geminiCopilot';
import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';

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

  const run = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await querySectionAIReview({ section, facilityConfig, sliders, apiKey, model: aiModel, extraContext });
      setResult(res);
    } catch (e: any) {
      setError(e?.message || 'Review failed');
    }
    setLoading(false);
  };

  return (
    <Card className="border-emerald-500/20">
      <CardContent className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">AI Review</p>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-1">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>
          </div>
          <Button variant="primary" size="sm" onClick={run} disabled={loading} className="shrink-0">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span className="ml-2">{loading ? 'Reviewing…' : 'Run AI review'}</span>
          </Button>
        </div>
        {error && <p className="text-xs text-rose-500">{error}</p>}
        {result && (
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/[0.06] p-5 space-y-3 text-sm whitespace-pre-wrap text-slate-700 dark:text-slate-200">
            {result.summary}
            {result.actionItems?.length > 0 && (
              <ol className="space-y-2 list-decimal pl-4">
                {result.actionItems.map((item) => (
                  <li key={item.step}>
                    <span className="font-semibold">{item.title}</span>
                    <span className="block text-xs text-slate-500 mt-0.5">{item.co2Impact} · {item.financialImpact}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
