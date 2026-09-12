import React, { useState } from 'react';
import { TabId, ViewMode, SliderInputs } from '../../../types';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Zap,
  ArrowRight,
  Flame,
  Activity,
  Scan,
  Layers,
  Recycle,
  BarChart3,
  FileCheck,
  RotateCcw,
  CheckCircle2,
  DollarSign,
  Leaf,
  MessageSquare,
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
      text: "👋 Hi! I'm your ByteMe AI Assistant. I can answer facility emission queries, guide you through decarbonization modules, or run live ROI simulations.",
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

    // Check for direct command keywords
    const lower = prompt.toLowerCase();

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
      }, 400);
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
      }, 400);
      return;
    }

    if (lower.includes('tour') || lower.includes('demo') || lower.includes('judge')) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: 'Launching the guided 3-minute judge demo walkthrough across all modules!',
            actionChip: {
              label: 'Step Through Demo Now',
              action: () => onStartJudgeTour && onStartJudgeTour(),
            },
          },
        ]);
        if (onStartJudgeTour) onStartJudgeTour();
        setIsTyping(false);
      }, 500);
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
      }, 500);
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
      }, 400);
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
      }, 500);
      return;
    }

    // Call API backend or intelligent fallback
    try {
      const res = await queryCopilot(prompt);
      if (res && res.response) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: res.response,
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

  const fallbackResponse = (prompt: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `At Apex Packaging (Pune), the largest emission hotspot is Stage 2 (Furnace Heating: 48 tCO₂e/mo) followed by Scrap Waste (17 tCO₂e/mo). Shifting 50% furnace fuel to biomass briquettes cuts emissions by 28.8% with an estimated ₹6.5 Lakhs/year in net savings.`,
        actionChip: {
          label: 'Apply 50% Biomass Shift',
          action: () => onApplyPreset({ fuelShiftPct: 50, tempReductionPct: 5 }),
        },
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
            className="group relative flex items-center space-x-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 text-white font-bold text-sm shadow-[0_8px_30px_rgb(16,185,129,0.4)] hover:shadow-[0_12px_40px_rgb(16,185,129,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Open AI Assistant Chatbot"
          >
            <div className="relative">
              <Bot className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
            </div>
            <span className="font-heading">AI Assistant</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </button>
        ) : null}
      </div>

      {/* Floating Glassmorphism Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl bg-[#111420]/95 dark:bg-[#0E101A]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-fadeIn select-none">
          {/* Header */}
          <div className="p-4 border-b border-white/[0.08] bg-white/[0.03] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h4 className="font-heading font-extrabold text-sm text-white">
                    ByteMe Copilot Assistant
                  </h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-slate-400">Navigation & Intelligence Co-pilot</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Navigation Chips Strip */}
          <div className="p-2.5 border-b border-white/[0.06] bg-black/20 overflow-x-auto whitespace-nowrap flex space-x-1.5 custom-scrollbar">
            {navShortcuts.map((sc, i) => (
              <button
                key={i}
                onClick={() => onNavigateTab(sc.tab)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors shrink-0',
                  activeTab === sc.tab
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                    : 'bg-white/[0.05] text-slate-300 hover:bg-white/[0.1] hover:text-white'
                )}
              >
                {sc.label}
              </button>
            ))}
          </div>

          {/* Chat Stream Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 custom-scrollbar text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn('flex flex-col', m.sender === 'user' ? 'items-end' : 'items-start')}
              >
                <div
                  className={cn(
                    'max-w-[85%] p-3.5 rounded-2xl leading-relaxed',
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-br-none shadow-md shadow-emerald-500/10'
                      : 'bg-[#181B28] text-slate-200 border border-white/[0.08] rounded-bl-none shadow-sm'
                  )}
                >
                  <p>{m.text}</p>

                  {/* Optional Action Button embedded in message */}
                  {m.actionChip && (
                    <button
                      onClick={m.actionChip.action}
                      className="mt-2.5 w-full py-1.5 px-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 font-bold text-[11px] flex items-center justify-center space-x-1 transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{m.actionChip.label}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs font-mono">
                <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>ByteMe AI is analyzing telemetry...</span>
              </div>
            )}
          </div>

          {/* Bottom Chat Input Bar */}
          <div className="p-3 border-t border-white/[0.08] bg-white/[0.02]">
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
                className="flex-1 px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white transition-colors"
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
