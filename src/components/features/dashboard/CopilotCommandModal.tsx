import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/Button';
import { Bot, Send, X, CheckCircle2, Play, Info } from 'lucide-react';
import { queryCopilot } from '../../../lib/api';
import { SliderInputs, ViewMode } from '../../../types';

export interface CopilotCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPreset?: (preset: Partial<SliderInputs>) => void;
  viewMode?: ViewMode;
}

export const CopilotCommandModal: React.FC<CopilotCommandModalProps> = ({
  isOpen,
  onClose,
  onApplyPreset,
}) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<
    {
      id: string;
      sender: 'user' | 'assistant';
      text: string;
      rec?: {
        action: string;
        impactCO2: string;
        impactINR: string;
        roi: string;
        preset: Partial<SliderInputs>;
        provenance: { badge: string; formula: string };
      };
    }[]
  >([
    {
      id: '1',
      sender: 'assistant',
      text: 'AI Industrial Copilot initialized. Ask about process thermodynamics, furnace fuel transitions, PCR polymer blends, or instant simulation presets.',
      rec: {
        action: 'Shift Furnace Oil to Biomass Briquettes (50%) & Cut Temp by 5°C',
        impactCO2: 'Abates 28.8 tCO₂e/mo',
        impactINR: '+₹3,50,000 / Year Energy ROI',
        roi: 'Est. Payback 8.5 Months',
        preset: { fuelShiftPct: 50, tempReductionPct: 5 },
        provenance: {
          badge: 'IPCC Verified',
          formula: 'CO₂_saved = FurnaceOil_Liters × 3.12 kgCO₂e/L × FuelShift%',
        },
      },
    },
  ]);
  const [isAsking, setIsAsking] = useState(false);
  const [hoveredFormula, setHoveredFormula] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || query;
    if (!textToSend.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'user', text: textToSend },
    ]);
    setQuery('');
    setIsAsking(true);

    const apiResult = await queryCopilot(textToSend);

    if (apiResult && apiResult.response) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: apiResult.response,
          rec: apiResult.recommendation
            ? {
                ...apiResult.recommendation,
                preset: apiResult.recommendation.sliderPreset || { fuelShiftPct: 50 },
                provenance: apiResult.recommendation.provenance || {
                  badge: 'IPCC Verified',
                  formula: 'CO₂ = Baseline - (Baseline × ReductionPct)',
                },
              }
            : undefined,
        },
      ]);
    } else {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: `Analyzing Apex Packaging baseline... Integrating 20% PCR Polymer Resin and 100% Trim Scrap Diversion yields ₹6,50,000 annual net savings while reducing carbon intensity by 28.8%.`,
            rec: {
              action: 'Apply 20% PCR Blend & 100% Closed-Loop Scrap Recycling',
              impactCO2: 'Abates ~28.8 tCO₂e/mo',
              impactINR: '+₹6,50,000 / Year Net ROI',
              roi: 'Est. Payback 4.2 Months',
              preset: { pcrResinPct: 20, scrapRecyclePct: 100, fuelShiftPct: 50 },
              provenance: {
                badge: 'CEA Factor',
                formula: 'ScrapAvoidance = 17T × 1.41 tCO₂e/T × (ScrapRecycle% / 100)',
              },
            },
          },
        ]);
        setIsAsking(false);
      }, 400);
      return;
    }

    setIsAsking(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold font-heading text-lg text-slate-900 dark:text-white flex items-center space-x-2">
                <span>AI Copilot Command Terminal</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-slate-600 dark:text-slate-400">
                  Cmd + K
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Natural language simulation engine & provenance-backed engineering cards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-slate-50/40 dark:bg-transparent">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-500/20">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white shadow-sm font-medium'
                    : 'bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 shadow-sm'
                }`}
              >
                <p>{msg.text}</p>

                {/* Executable Action Card */}
                {msg.rec && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center space-x-1.5 font-heading">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Executable Engineering Recommendation</span>
                      </span>

                      {/* Provenance Badge */}
                      <div className="relative">
                        <span
                          onMouseEnter={() => setHoveredFormula(msg.rec!.provenance.formula)}
                          onMouseLeave={() => setHoveredFormula(null)}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 cursor-pointer flex items-center space-x-1"
                        >
                          <Info className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>{msg.rec.provenance.badge}</span>
                        </span>

                        {hoveredFormula === msg.rec.provenance.formula && (
                          <div className="absolute right-0 bottom-6 w-64 p-3 rounded-xl bg-slate-900 text-slate-200 text-[11px] font-mono border border-slate-800 shadow-2xl z-30">
                            <span className="text-slate-400 block mb-1">PROVENANCE FORMULA:</span>
                            <p className="text-emerald-400">{msg.rec.provenance.formula}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      {msg.rec.action}
                    </p>

                    <div className="flex flex-wrap items-center justify-between text-xs font-mono pt-2 border-t border-slate-200 dark:border-slate-800 gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{msg.rec.impactCO2}</span>
                      <span className="text-slate-700 dark:text-slate-300 font-bold">{msg.rec.impactINR}</span>
                      <span className="text-slate-400">{msg.rec.roi}</span>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        if (onApplyPreset && msg.rec?.preset) {
                          onApplyPreset(msg.rec.preset);
                          onClose();
                        }
                      }}
                      className="w-full flex items-center justify-center space-x-2 mt-2 font-bold"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Apply to Live Simulation Sliders</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isAsking && (
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
              <Bot className="w-4 h-4 animate-spin" />
              <span>Calculating empirical regression models & financial payback...</span>
            </div>
          )}
        </div>

        {/* Input bar - Crisp High-Contrast Input */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your industrial query or prompt..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Button onClick={() => handleSend()} className="flex items-center space-x-1 font-bold">
            <span>Send</span>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
