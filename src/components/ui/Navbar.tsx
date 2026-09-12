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
} from 'lucide-react';
import { cn } from '../../lib/utils';

import { GoogleUser } from '../../types';

export interface NavbarProps {
  activeTab: TabId;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  onOpenCopilotModal: () => void;
  onOpenBRSRModal: () => void;
  onOpenAuditExportModal: () => void;
  onToggleSidebarMobile: () => void;
  onToggleSidebarDesktop: () => void;
  activeGoogleUser?: GoogleUser | null;
  onOpenGoogleAuthModal?: () => void;
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
  activeGoogleUser,
  onOpenGoogleAuthModal,
}) => {
  const isFinancial = viewMode === 'financial';

  const tabTitles: Record<TabId, { title: string; category: string }> = {
    overview: { title: 'Product Overview & Executive Summary', category: 'Platform Home' },
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
    <header className="sticky top-0 z-30 w-full h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-[#070d19]/90 backdrop-blur-xl transition-colors duration-300 px-3 sm:px-6 lg:px-8 flex items-center justify-between shadow-sm">
      {/* Left: Sidebar Toggle & Section Breadcrumb */}
      <div className="flex items-center space-x-2 sm:space-x-3.5 min-w-0 flex-1 mr-2 sm:mr-3">
        {/* Mobile Hamburger Drawer Trigger */}
        <button
          onClick={onToggleSidebarMobile}
          className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 lg:hidden transition-colors shrink-0"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb Section Indicator */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs min-w-0 truncate">
          <span className="text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider hidden lg:inline font-semibold shrink-0">
            {currentSection.category}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 hidden lg:inline shrink-0" />
          <h2 className="font-heading font-extrabold text-slate-900 dark:text-slate-100 text-xs sm:text-sm md:text-base tracking-tight truncate">
            {currentSection.title}
          </h2>
        </div>
      </div>

      {/* Right: High-Level Controls (Search, Rupee Toggle, Export, Theme) */}
      <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
        {/* Rupee-to-Carbon Shift Toggle */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/70 p-0.5 sm:p-1 rounded-xl border border-slate-200 dark:border-slate-700/60">
          <button
            onClick={onToggleViewMode}
            className={cn(
              'flex items-center space-x-1 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200',
              !isFinancial
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            )}
            title="View in Carbon Emissions (tCO2e)"
          >
            <Leaf className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">tCO₂e</span>
          </button>

          <button
            onClick={onToggleViewMode}
            className={cn(
              'flex items-center space-x-1 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200',
              isFinancial
                ? 'bg-slate-900 dark:bg-emerald-500 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            )}
            title="View in Financial Cash Flow (₹ INR)"
          >
            <DollarSign className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">₹ INR</span>
          </button>
        </div>

        {/* Global Command Terminal Trigger (Cmd + K) */}
        <button
          onClick={onOpenCopilotModal}
          className="hidden md:flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 hover:border-emerald-500/50 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm shrink-0"
          title="Open Command Terminal (Cmd + K)"
        >
          <Command className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="font-mono">Cmd + K</span>
        </button>

        {/* BRSR Audit Modal Button */}
        <button
          onClick={onOpenBRSRModal}
          className="hidden 2xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all shadow-sm shrink-0"
          title="Open SEBI BRSR Audit Pack"
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>BRSR Audit</span>
        </button>

        {/* Executive Export Button */}
        <button
          onClick={onOpenAuditExportModal}
          className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-800 dark:hover:bg-slate-700 border border-slate-700/50 transition-all shadow-sm shrink-0"
          title="Configurable Data Export"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Google Account Profile Button */}
        <button
          onClick={onOpenGoogleAuthModal}
          className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/50 transition-all shadow-xs shrink-0"
          title={activeGoogleUser ? `Google Account: ${activeGoogleUser.email}` : 'Sign in with Google'}
        >
          {activeGoogleUser ? (
            <>
              <img
                src={activeGoogleUser.avatar}
                alt={activeGoogleUser.name}
                className="w-6 h-6 rounded-full border border-emerald-500 bg-white shrink-0 object-cover"
              />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 hidden lg:inline truncate max-w-[100px]">
                {activeGoogleUser.name.split(' ')[0]}
              </span>
            </>
          ) : (
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span className="hidden sm:inline">Google Login</span>
            </div>
          )}
        </button>

        {/* Theme Toggle Button */}
        <ThemeToggle />
      </div>
    </header>
  );
};
