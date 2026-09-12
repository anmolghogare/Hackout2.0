import React, { useState } from 'react';
import { TabId, ViewMode } from '../../types';
import { ThemeToggle } from './ThemeToggle';
import {
  Menu,
  X,
  Flame,
  SlidersHorizontal,
  Bot,
  Recycle,
  BarChart3,
  Building2,
  DollarSign,
  Leaf,
  Command,
  Scan,
  Layers,
  FileCheck,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface NavbarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  onOpenCopilotModal: () => void;
  onOpenBRSRModal: () => void;
  isBackendOnline?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  viewMode,
  onToggleViewMode,
  onOpenCopilotModal,
  onOpenBRSRModal,
  isBackendOnline = true,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Context', icon: Building2 },
    { id: 'intake', label: 'OCR Scanner', icon: Scan },
    { id: 'simulation', label: 'Digital Twin', icon: Flame },
    { id: 'whatif', label: 'What-If Sliders', icon: SlidersHorizontal },
    { id: 'sandbox', label: 'Sandbox Matrix', icon: Layers },
    { id: 'copilot', label: 'AI Copilot', icon: Bot },
    { id: 'circular', label: 'Waste Sankey', icon: Recycle },
    { id: 'roadmap', label: 'ROI Matrix', icon: BarChart3 },
  ];

  const isFinancial = viewMode === 'financial';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Connection Status */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 font-heading font-extrabold text-xl">
              B
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-emerald-600 to-teal-700 dark:from-white dark:via-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                  ByteMe
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-semibold border border-emerald-500/20">
                  Hackout 2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal hidden sm:block">
                Industrial Emission Leak-Point Intelligence
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 bg-slate-100/80 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    'flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all duration-200',
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md shadow-emerald-500/10 border border-slate-200/80 dark:border-slate-700/80'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/30'
                  )}
                >
                  <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-emerald-500' : 'opacity-70')} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Rupee-to-Carbon Switch, BRSR Export, Cmd+K & Theme */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Rupee-to-Carbon Shift Hero Switch */}
            <div className="flex items-center bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl border border-slate-300/80 dark:border-slate-700/80">
              <button
                onClick={() => onToggleViewMode()}
                className={cn(
                  'flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-bold transition-all duration-300',
                  !isFinancial
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                )}
                title="View in Carbon Emissions (tCO2e)"
              >
                <Leaf className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">tCO₂e</span>
              </button>

              <button
                onClick={() => onToggleViewMode()}
                className={cn(
                  'flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-bold transition-all duration-300',
                  isFinancial
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                )}
                title="View in Financial Cash Flow (₹ INR)"
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">₹ INR</span>
              </button>
            </div>

            {/* BRSR Export Pack Button */}
            <button
              onClick={onOpenBRSRModal}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all shadow-sm"
              title="Generate BRSR Regulatory Audit Pack"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>BRSR Audit</span>
            </button>

            {/* Cmd+K Copilot Command Trigger */}
            <button
              onClick={onOpenCopilotModal}
              className="hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 transition-all shadow-sm"
              title="Open AI Command Terminal (Cmd + K)"
            >
              <Command className="w-3.5 h-3.5 text-emerald-500" />
              <span>Cmd + K</span>
            </button>

            <ThemeToggle />

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                <Icon className="w-5 h-5 text-emerald-500" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
