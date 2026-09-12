import React from 'react';
import { TabId, ViewMode } from '../../types';
import { ThemeToggle } from './ThemeToggle';
import {
  Menu,
  Command,
  Download,
  FileCheck,
  DollarSign,
  Leaf,
  PanelLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface NavbarProps {
  activeTab: TabId;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  onOpenCopilotModal: () => void;
  onOpenBRSRModal: () => void;
  onOpenAuditExportModal: () => void;
  onToggleSidebarMobile: () => void;
  onToggleSidebarDesktop: () => void;
  isBackendOnline?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  viewMode,
  onToggleViewMode,
  onOpenCopilotModal,
  onOpenBRSRModal,
  onOpenAuditExportModal,
  onToggleSidebarMobile,
  onToggleSidebarDesktop,
  isBackendOnline = true,
}) => {
  const isFinancial = viewMode === 'financial';

  const tabTitles: Record<TabId, { title: string; category: string }> = {
    overview: { title: 'Facility Baseline & Profile', category: 'Executive Overview' },
    simulator_hub: { title: 'Unified ROI Playground & Waterfall', category: 'Simulator & Controls' },
    analytics_hub: { title: 'Thermal Analytics & 3D Heatmap', category: 'Hotspot Diagnostics' },
    intake: { title: 'OCR Smart Bill Scanner', category: 'Data Ingestion' },
    simulation: { title: 'Digital Twin Process Pipeline', category: 'Process Telemetry' },
    sandbox: { title: 'Scenario Sandbox Comparison', category: 'Planning Matrix' },
    circular: { title: 'B2B Circular Waste Stream Sankey', category: 'Circular Logistics' },
    roadmap: { title: 'Financial ROI & BRSR Roadmap', category: 'Compliance Matrix' },
  };

  const currentSection = tabTitles[activeTab] || { title: 'Industrial Carbon Intelligence', category: 'Platform' };

  return (
    <header className="sticky top-0 z-30 w-full h-16 border-b border-slate-200/80 dark:border-white/[0.08] bg-[#090A0F]/85 backdrop-blur-xl transition-all duration-300 px-4 sm:px-8 flex items-center justify-between">
      {/* Left: Sidebar Toggle & Section Breadcrumb */}
      <div className="flex items-center space-x-3.5">
        {/* Mobile Hamburger Drawer Trigger */}
        <button
          onClick={onToggleSidebarMobile}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 lg:hidden transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Sidebar Toggle Trigger */}
        <button
          onClick={onToggleSidebarDesktop}
          className="hidden lg:flex p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Toggle Sidebar"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        {/* Breadcrumb Section Indicator */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 font-mono uppercase tracking-wider hidden sm:inline">
            {currentSection.category}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline" />
          <h2 className="font-heading font-extrabold text-slate-900 dark:text-white text-sm sm:text-base tracking-tight truncate max-w-[200px] sm:max-w-[320px]">
            {currentSection.title}
          </h2>
        </div>
      </div>

      {/* Right: High-Level Controls (Search, Rupee Toggle, Export, Theme) */}
      <div className="flex items-center space-x-2.5 sm:space-x-3">
        {/* Rupee-to-Carbon Shift Hero Toggle */}
        <div className="flex items-center bg-[#141724] p-1 rounded-xl border border-white/[0.08]">
          <button
            onClick={onToggleViewMode}
            className={cn(
              'flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-300',
              !isFinancial
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                : 'text-slate-400 hover:text-white'
            )}
            title="View in Carbon Emissions (tCO2e)"
          >
            <Leaf className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">tCO₂e</span>
          </button>

          <button
            onClick={onToggleViewMode}
            className={cn(
              'flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-300',
              isFinancial
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                : 'text-slate-400 hover:text-white'
            )}
            title="View in Financial Cash Flow (₹ INR)"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">₹ INR</span>
          </button>
        </div>

        {/* Global Command Terminal Trigger (Cmd + K) */}
        <button
          onClick={onOpenCopilotModal}
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#141724] text-slate-300 border border-white/[0.08] hover:border-emerald-500/50 hover:text-white transition-all shadow-sm"
          title="Open Command Terminal (Cmd + K)"
        >
          <Command className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono">Cmd + K</span>
        </button>

        {/* BRSR Audit Modal Button */}
        <button
          onClick={onOpenBRSRModal}
          className="hidden xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all shadow-sm"
          title="Open SEBI BRSR Audit Pack"
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>BRSR Audit</span>
        </button>

        {/* Executive Export Button */}
        <button
          onClick={onOpenAuditExportModal}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-all shadow-sm"
          title="Configurable Data Export"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Theme Toggle Button */}
        <ThemeToggle />
      </div>
    </header>
  );
};
