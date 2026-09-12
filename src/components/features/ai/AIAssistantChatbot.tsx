import React, { useState } from 'react';
import { TabId, ViewMode, SliderInputs, FacilityConfig } from '../../../types';
import {
  Bot,
  X,
  Send,
  Sparkles,
} from 'lucide-react';
import { queryCopilot } from '../../../lib/api';
import { queryAICopilot, parseNaturalLanguageWhatIf } from '../../../services/aiService';
import { DEFAULT_FACILITY_PRESETS } from '../../../lib/utils';
import { cn } from '../../../lib/utils';

export interface AIAssistantChatbotProps {
  activeTab: TabId;
  onNavigateTab: (tab: TabId) => void;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  onOpenBRSRModal: () => void;
  onApplyPreset: (preset: Partial<SliderInputs>) => void;
  onStartJudgeTour?: () => void;
  facilityConfig?: FacilityConfig;
  sliderInputs?: SliderInputs;
}

export const AIAssistantChatbot: React.FC<AIAssistantChatbotProps> = ({
  activeTab,
  onNavigateTab,
  viewMode,
  onToggleViewMode,
  onOpenBRSRModal,
  onApplyPreset,
  onStartJudgeTour,
  facilityConfig = DEFAULT_FACILITY_PRESETS.apex_packaging,
  sliderInputs = { fuelShiftPct: 50, tempReductionPct: 5, pcrResinPct: 20, scrapRecyclePct: 100 },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<
    {
      id: string;
      sender: 'user' | 'assistant';
      text: string;
      actionChip?: { label: string; action: () => void };
      actionItems?: any[];
    }[]
  >([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `👋 Hi! I'm your ByteMe Assistant for ${facilityConfig.profile.name}. Ask me about facility carbon emissions, ROI & payback calculations, or run live simulations for your plant.`,
    },
  ]);

  const formatChatMessageText = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');

    return lines.map((line, lineIdx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={lineIdx} className="h-1.5" />;

      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={lineIdx} className="font-bold text-xs text-emerald-700 dark:text-emerald-400 mt-2 mb-1 border-b border-emerald-500/20 pb-0.5 font-mono uppercase tracking-wider">
            {trimmed.replace('### ', '')}
          </h4>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h3 key={lineIdx} className="font-bold text-sm text-slate-900 dark:text-white mt-2 mb-1">
            {trimmed.replace('## ', '')}
          </h3>
        );
      }

      // Format bold markers **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const lineContent = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-semibold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
        return (
          <div key={lineIdx} className="flex items-start space-x-1.5 my-0.5 ml-1">
            <span className="text-emerald-500 font-bold shrink-0">•</span>
            <span>{lineContent}</span>
          </div>
        );
      }

      return (
        <p key={lineIdx} className="my-0.5">
          {lineContent}
        </p>
      );
    });
  };
  const [isTyping, setIsTyping] = useState(false);

  // Quick navigation shortcuts
  const navShortcuts = [
    { label: '🏠 Overview', tab: 'overview' as TabId },
    { label: '⚙️ Admin Setup', tab: 'admin' as TabId },
    { label: '🏭 Digital Twin', tab: 'simulation' as TabId },
    { label: '🎛️ ROI Simulator', tab: 'simulator_hub' as TabId },
    { label: '🔥 3D Heatmap', tab: 'analytics_hub' as TabId },
    { label: '📄 OCR Scanner', tab: 'intake' as TabId },
    { label: '🔄 Waste Sankey', tab: 'circular' as TabId },
    { label: '🧪 Scenario Sandbox', tab: 'sandbox' as TabId },
  ];

  const handleSendMessage = async (text?: string) => {
    const prompt = text || query;
    if (!prompt.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: 'user' as const, text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    const lower = prompt.toLowerCase().trim();

    if (lower.includes('admin') || lower.includes('setup') || lower.includes('onboard') || lower.includes('config') || lower.includes('api key')) {
      setTimeout(() => {
        onNavigateTab('admin');
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: 'Navigated to the Facility Admin & Parameters Setup Hub! Here you can customize factory fuels, electricity tariffs, and Gemini API keys.',
          },
        ]);
        setIsTyping(false);
      }, 300);
      return;
    }

    if (lower.includes('home') || lower.includes('about') || lower.includes('overview')) {
      setTimeout(() => {
        onNavigateTab('overview');
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: 'Navigated to the ByteMe Home & Product Overview! Here you can review our mission, target audience profiles, and feature architecture.',
          },
        ]);
        setIsTyping(false);
      }, 300);
      return;
    }

    if (lower.includes('twin') || lower.includes('pipeline') || lower.includes('particle')) {
      setTimeout(() => {
        onNavigateTab('simulation');
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: 'Navigated to the Digital Twin Process Pipeline! Follow the glowing particle stream from Input to Output and inspect the Stage 02 furnace leak point.',
          },
        ]);
        setIsTyping(false);
      }, 300);
      return;
    }

    if (lower.includes('brsr') || lower.includes('audit') || lower.includes('report') || lower.includes('pdf')) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: 'Opening the SEBI BRSR Principle 6 Core Audit Compliance Pack generator modal.',
            actionChip: {
              label: 'Open BRSR Pack',
              action: onOpenBRSRModal,
            },
          },
        ]);
        onOpenBRSRModal();
        setIsTyping(false);
      }, 400);
      return;
    }

    if (lower.includes('rupee') || lower.includes('financial') || lower.includes('inr') || lower.includes('currency')) {
      setTimeout(() => {
        onToggleViewMode();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: `Toggled dashboard view to ${viewMode === 'carbon' ? 'Financial (₹ INR)' : 'Carbon (tCO₂e)'} mode!`,
          },
        ]);
        setIsTyping(false);
      }, 300);
      return;
    }

    // Check for natural language what-if adjustments
    const whatIf = parseNaturalLanguageWhatIf(prompt, sliderInputs);
    if (whatIf.hasMatches) {
      onApplyPreset(whatIf.newSliders);
    }

    try {
      const historyContext = messages.slice(-4).map((m) => ({ sender: m.sender, text: m.text }));
      const aiRes = await queryAICopilot(
        prompt,
        facilityConfig,
        whatIf.hasMatches ? whatIf.newSliders : sliderInputs,
        undefined,
        historyContext
      );
      if (aiRes) {
        if (aiRes.navigationTarget) {
          onNavigateTab(aiRes.navigationTarget as TabId);
        }

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: aiRes.summary,
            actionItems: (aiRes.actionItems && Array.isArray(aiRes.actionItems) && aiRes.actionItems.length > 0) ? aiRes.actionItems : undefined,
          },
        ]);
      } else {
        fallbackResponse(prompt);
      }
    } catch {
      fallbackResponse(prompt);
    }
    setIsTyping(false);
  };

  const fallbackResponse = (promptStr: string) => {
    const lower = promptStr.toLowerCase().trim();
    let text = "I am your ByteMe AI Assistant. You can ask questions about facility emissions, ROI payback, circular waste monetization, or SEBI BRSR reporting.";

    const greetings = ['hi', 'hello', 'hey', 'greetings', 'namaste', 'good morning', 'good afternoon', 'good evening'];
    if (greetings.some((g) => lower === g || lower.startsWith(g + ' ') || lower.endsWith(' ' + g))) {
      text = `👋 Hello! How can I assist you with ${facilityConfig.profile.name}'s carbon emissions reduction, ROI modeling, or circular waste network today?`;
    } else if (lower.includes('emiss') || lower.includes('carbon') || lower.includes('co2') || lower.includes('furnace')) {
      text = `At ${facilityConfig.profile.name}, Stage 2 Furnace Heating (${facilityConfig.stage2.fuelType}) is the largest Scope 1 hotspot. Shifting 50% furnace fuel to biomass/PNG reduces emissions with high net operational savings.`;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text,
      },
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label="Open AI Assistant"
          >
            <Bot className="w-4 h-4 text-emerald-400 dark:text-white" />
            <span>Ask AI</span>
          </button>
        ) : null}
      </div>

      {/* Floating Glassmorphism Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl bg-white dark:bg-[#0c101c] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-fadeIn select-none">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h4 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                    ByteMe AI Copilot
                  </h4>
                  <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    ✨ Server-Side AI
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-500 dark:text-slate-400">IPCC 2006 & CEA Grounded Intelligence</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Navigation Chips Strip */}
          <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 overflow-x-auto whitespace-nowrap flex space-x-1.5 custom-scrollbar">
            {navShortcuts.map((sc, i) => (
              <button
                key={i}
                onClick={() => onNavigateTab(sc.tab)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors shrink-0',
                  activeTab === sc.tab
                    ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/40 font-bold'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
                )}
              >
                {sc.label}
              </button>
            ))}
          </div>

          {/* Chat Stream Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 custom-scrollbar text-xs bg-slate-50/30 dark:bg-transparent">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn('flex flex-col', m.sender === 'user' ? 'items-end' : 'items-start')}
              >
                <div
                  className={cn(
                    'max-w-[88%] p-3.5 rounded-2xl leading-relaxed',
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-sm font-medium'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-bl-none shadow-sm'
                  )}
                >
                  <div className="space-y-1">
                    {formatChatMessageText(m.text)}
                  </div>

                  {m.actionItems && m.actionItems.length > 0 && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        Recommended Action Steps:
                      </span>
                      {m.actionItems.map((item: any, idx: number) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
                          <div className="font-bold text-slate-900 dark:text-white text-xs">
                            Step {item.step}: {item.title}
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono pt-0.5">
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{item.co2Impact}</span>
                            <span className="text-slate-700 dark:text-slate-300 font-semibold">{item.financialImpact}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {m.actionChip && (
                    <button
                      onClick={m.actionChip.action}
                      className="mt-2.5 w-full py-1.5 px-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 font-bold text-[11px] flex items-center justify-center space-x-1 transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{m.actionChip.label}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  ✨ Try AI Prompt Shortcuts:
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  <button
                    onClick={() => handleSendMessage('How can I reduce emissions by 20% without raising cost?')}
                    className="p-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 text-[11px] text-left font-medium transition-colors flex items-center justify-between"
                  >
                    <span>💡 How to reduce emissions by 20%?</span>
                    <Sparkles className="w-3 h-3 text-emerald-500 shrink-0" />
                  </button>
                  <button
                    onClick={() => handleSendMessage('What is our ROI and payback period?')}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] text-left font-medium transition-colors flex items-center justify-between"
                  >
                    <span>💰 What is our ROI & payback period?</span>
                    <Sparkles className="w-3 h-3 text-teal-500 shrink-0" />
                  </button>
                  <button
                    onClick={() => handleSendMessage('How to monetize 12T trim scrap?')}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] text-left font-medium transition-colors flex items-center justify-between"
                  >
                    <span>🔄 How to monetize 12T trim scrap?</span>
                    <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                  </button>
                </div>
              </div>
            )}

            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-xs font-mono">
                <Bot className="w-4 h-4 text-emerald-500 animate-spin" />
                <span>ByteMe AI is analyzing telemetry...</span>
              </div>
            )}
          </div>

          {/* Bottom Chat Input Bar */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask or command (e.g., 'Jump to Admin', 'BRSR report')..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
