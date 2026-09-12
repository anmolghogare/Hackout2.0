import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Bot, Send, Sparkles, User, ShieldCheck } from 'lucide-react';
import { queryAICopilot } from '../../../services/geminiCopilot';
import { DEFAULT_FACILITY_PRESETS } from '../../../lib/utils';
import { FacilityConfig, SliderInputs } from '../../../types';

export interface CopilotPanelProps {
  initialCopilotData?: any;
  facilityConfig?: FacilityConfig;
  sliderInputs?: SliderInputs;
  apiKey?: string;
  aiModel?: string;
}

export const CopilotPanel: React.FC<CopilotPanelProps> = ({
  facilityConfig = DEFAULT_FACILITY_PRESETS.apex_packaging,
  sliderInputs = { fuelShiftPct: 50, tempReductionPct: 5, pcrResinPct: 20, scrapRecyclePct: 100 },
  apiKey,
  aiModel,
}) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<
    { id: string; sender: 'user' | 'assistant'; text: string; structuredData?: any; rec?: any }[]
  >([
    {
      id: '1',
      sender: 'assistant',
      text: `Hello! I am the grounded copilot for ${facilityConfig.profile.name}. Ask how to raise efficiency ~20% without lifting opex. Totals come from your facility configuration, not invented figures.`,
    },
  ]);
  const [isAsking, setIsAsking] = useState(false);

  const samplePrompts = [
    'What steps should be taken to increase efficiency by 20%?',
    'How can I reduce emissions by 20% without raising cost?',
    'What is the payback period for PCR polymer substitution?',
    'Which furnace lever should we pull first?',
  ];

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || query;
    if (!textToSend.trim()) return;

    const userMsgId = Date.now().toString();
    setMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text: textToSend }]);
    setQuery('');
    setIsAsking(true);

    try {
      const history = messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text }));
      const aiRes = await queryAICopilot(textToSend, facilityConfig, sliderInputs, apiKey, history, aiModel);
      if (aiRes) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: aiRes.summary,
            structuredData: {
              aiTitle: `${facilityConfig.profile.name} calculated strategy`,
              referenceStandards: 'CEA India Grid v19 & IPCC 2006',
              actionItems: aiRes.actionItems,
              totalImpact: {
                co2ReductionPct: `${aiRes.totalImpact.co2ReductionPct} CO₂ cut`,
                annualProfitIncrease: `${aiRes.totalImpact.annualProfitIncrease} savings`,
                paybackPeriodMonths: 'Modeled from facility sliders',
              },
            },
          },
        ]);
      }
    } catch (err) {
      console.warn('Copilot error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          sender: 'assistant',
          text: 'The copilot could not complete that request. Confirm the Gemini key in Facility Configuration, then retry.',
        },
      ]);
    }
    setIsAsking(false);
  };

  return (
    <Card className="mb-8 theme-transition">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>AI Industrial Sustainability Copilot</span>
            </CardTitle>
            <CardDescription>
              Answers are constrained to {facilityConfig.profile.name} telemetry plus CEA / IPCC factors. Missing values stay UNKNOWN.
            </CardDescription>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-500/30 flex items-center space-x-1 self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{apiKey ? 'Gemini key loaded' : 'Using VITE_GEMINI_API_KEY / fallback model'}</span>
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {samplePrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-500/15 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors flex items-center space-x-1.5 font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{p}</span>
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-4 max-h-[480px] overflow-y-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div className={`max-w-[90%] sm:max-w-[82%] rounded-2xl p-4 text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-emerald-600 text-white rounded-br-none shadow-sm font-medium' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-sm'}`}>
                <p className="mb-2 font-medium whitespace-pre-wrap">{msg.text}</p>
                {msg.structuredData?.actionItems?.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    {msg.structuredData.actionItems.map((item: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
                        <h6 className="font-bold text-slate-900 dark:text-white mb-0.5">{item.step || idx + 1}. {item.title}</h6>
                        <div className="font-mono text-[11px] text-slate-500">{item.co2Impact} · {item.financialImpact}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-white shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {isAsking && (
            <div className="flex space-x-3 items-center text-slate-500 text-xs font-mono">
              <Bot className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>Grounding on facility config + Gemini…</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about 20% efficiency, furnace leaks, or PCR payback…"
            className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Button onClick={() => handleSend()} className="flex items-center space-x-1 shrink-0 font-bold">
            <span>Ask AI</span>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
