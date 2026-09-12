import React, { useState } from 'react';
import { TabId, ViewMode, SliderInputs } from '../../../types';
import {
  Bot,
  X,
  Send,
  Sparkles,
} from 'lucide-react';
import { queryCopilot } from '../../../lib/api';
import { cn } from '../../../lib/utils';

export interface AIAssistantChatbotProps {
  activeTab: TabId;
  onNavigateTab: (tab: TabId) => void;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  onOpenBRSRModal: () => void;
  onApplyPreset: (preset: Partial<SliderInputs>) => void;
  onStartJudgeTour?: () => void;
}

export const AIAssistantChatbot: React.FC<AIAssistantChatbotProps> = ({
  activeTab,
  onNavigateTab,
  viewMode,
  onToggleViewMode,
  onOpenBRSRModal,
  onApplyPreset,
  onStartJudgeTour,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<
    { id: string; sender: 'user' | 'assistant'; text: string; actionChip?: { label: string; action: () => void } }[]
  >([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "👋 Hi! I'm your ByteMe Assistant. I can guide you through the platform, answer questions on facility carbon emissions & ROI, or run live simulations for you.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Quick navigation shortcuts
  const navShortcuts = [
    { label: '🏠 Home Overview', tab: 'overview' as TabId },
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

    if (lower.includes('preset') || lower.includes('net-zero') || lower.includes('net zero') || lower.includes('biomass')) {
      setTimeout(() => {
        onApplyPreset({ fuelShiftPct: 80, tempReductionPct: 15, pcrResinPct: 40, scrapRecyclePct: 100 });
        onNavigateTab('simulator_hub');
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: 'Applied the Net-Zero 2030 target simulation preset (80% fuel shift, 40% PCR resin, 100% scrap circularity) and jumped to the ROI Playground!',
          },
        ]);
        setIsTyping(false);
      }, 400);
      return;
    }

    try {
      const res = await queryCopilot(prompt);
      const data = res?.data || res;
      const resText = data?.text || res?.response || data?.summary;

      if (resText) {
        if (data?.navigationTarget) {
          onNavigateTab(data.navigationTarget as TabId);
        }

        let formattedText = resText;
        if (data?.actionItems && Array.isArray(data.actionItems) && data.actionItems.length > 0) {
          formattedText += '\n\n**Action Plan:**\n' + data.actionItems.map((item: any) =>
            `• **Step ${item.step}: ${item.title}**\n  - ${item.co2Impact || ''}\n  - ${item.financialImpact || ''}`
          ).join('\n');
        }
        if (data?.totalImpact) {
          formattedText += `\n\n**Total Impact:** ${data.totalImpact.co2ReductionPct || ''} CO₂ reduction, ${data.totalImpact.annualProfitIncrease || ''} savings.`;
        }

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: formattedText,
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
      text = "👋 Hello! How can I assist you with Apex Packaging's carbon emissions reduction, ROI modeling, or circular waste network today?";
    } else if (lower.includes('emiss') || lower.includes('carbon') || lower.includes('co2') || lower.includes('furnace')) {
      text = "At Apex Packaging, Stage 2 Furnace Heating generates 48 tCO₂e/month (the largest hotspot). Shifting 50% furnace fuel to biomass briquettes reduces emissions by 28.8% with ₹6.5 Lakhs/year net operational savings.";
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
            className="group relative flex items-center space-x-2.5 px-4 py-3 rounded-full bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-slate-900/20 dark:shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Open AI Assistant Chatbot"
          >
            <Bot className="w-5 h-5 text-emerald-400 dark:text-white" />
            <span className="font-heading">AI Assistant</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
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
                    ByteMe Copilot Assistant
                  </h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[10.5px] text-slate-500 dark:text-slate-400">Navigation & Intelligence Co-pilot</p>
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
                    'max-w-[85%] p-3.5 rounded-2xl leading-relaxed',
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-sm font-medium'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-bl-none shadow-sm'
                  )}
                >
                  <p>{m.text}</p>

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

            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-xs font-mono">
                <Bot className="w-4 h-4 text-emerald-500 animate-spin" />
                <span>ByteMe AI is analyzing telemetry...</span>
              </div>
            )}
          </div>

          {/* Bottom Chat Input Bar - Fully Visible and High Contrast */}
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
                placeholder="Ask or command (e.g., 'Jump to Sankey', 'BRSR report')..."
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
