import React, { useState } from 'react';
import { TabId, ViewMode } from '../../types';
import { ThemeToggle } from './ThemeToggle';
import { SidebarDrawer } from '../layout/SidebarDrawer';
import {
  Menu,
  X,
  Flame,
  Zap,
  Activity,
  Scan,
  Layers,
  Recycle,
  BarChart3,
  Building2,
  DollarSign,
  Leaf,
  Command,
  Download,
  PanelLeft,
  ChevronDown,
  LayoutGrid,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface NavbarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  onOpenCopilotModal: () => void;
  onOpenBRSRModal: () => void;
  onOpenAuditExportModal: () => void;
  onStartJudgeTour?: () => void;
  isBackendOnline?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  viewMode,
  onToggleViewMode,
  onOpenCopilotModal,
  onOpenBRSRModal,
  onOpenAuditExportModal,
  onStartJudgeTour,
  isBackendOnline = true,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);

  const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Facility Context', icon: Building2 },
    { id: 'simulator_hub', label: 'ROI Playground', icon: Zap },
    { id: 'analytics_hub', label: 'Thermal Analytics', icon: Activity },
    { id: 'intake', label: 'OCR Scanner', icon: Scan },
    { id: 'simulation', label: 'Digital Twin Canvas', icon: Flame },
    { id: 'sandbox', label: 'Scenario Sandbox', icon: Layers },
    { id: 'circular', label: 'B2B Waste Sankey', icon: Recycle },
    { id: 'roadmap', label: 'ROI Roadmap Matrix', icon: BarChart3 },
  ];

  const currentTabObj = tabs.find((t) => t.id === activeTab) || tabs[0];
  const CurrentIcon = currentTabObj.icon;
  const isFinancial = viewMode === 'financial';

  return (
    <>
      {/* Slide-out Left Sidebar Drawer */}
      <SidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onOpenCopilotModal={onOpenCopilotModal}
        onOpenAuditExportModal={onOpenAuditExportModal}
        onStartJudgeTour={onStartJudgeTour}
        viewMode={viewMode}
      />

      {/* Main Top Header Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-[#070d19]/85 backdrop-blur-xl transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* LEFT SECTION: Logo + Sidebar Drawer Toggle + SME Context */}
            <div className="flex items-center space-x-3 shrink-0">
              {/* Sidebar Menu Trigger Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 transition-all duration-200 shadow-sm group"
                title="Open Left Navigation Drawer (All Modules)"
              >
                <PanelLeft className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold font-heading hidden sm:inline">Menu</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                  8 Modules
                </span>
              </button>

              {/* Brand Logo & Tag */}
              <div
                onClick={() => onTabChange('overview')}
                className="flex items-center space-x-2.5 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 font-heading font-extrabold text-lg group-hover:scale-105 transition-transform">
                  B
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-heading font-black text-lg tracking-tight bg-gradient-to-r from-slate-900 via-emerald-600 to-teal-700 dark:from-white dark:via-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                      ByteMe
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-500 font-mono font-bold border border-emerald-500/20">
                      Hackout 2.0
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal leading-none">
                    Industrial Decision Intelligence
                  </p>
                </div>
              </div>
            </div>

            {/* CENTER SECTION: Active View Breadcrumb Dropdown Switcher */}
            <div className="relative hidden md:flex items-center">
              <button
                onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
                className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/60 hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 transition-all text-xs font-semibold shadow-inner"
              >
                <CurrentIcon className="w-4 h-4 text-emerald-500" />
                <span className="font-bold font-heading">{currentTabObj.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Quick Tab Switcher Dropdown */}
              {isQuickMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsQuickMenuOpen(false)}
                  />
                  <div className="absolute top-11 left-0 z-40 w-64 p-2 rounded-2xl bg-white dark:bg-[#0c1629] border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-xl space-y-1 animate-fadeIn">
                    <div className="text-[10px] font-mono font-bold text-slate-400 px-2.5 py-1 uppercase">
                      Quick Module Switch
                    </div>
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            onTabChange(tab.id);
                            setIsQuickMenuOpen(false);
                          }}
                          className={cn(
                            'w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-colors',
                            isActive
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          )}
                        >
                          <Icon className={cn('w-4 h-4', isActive ? 'text-emerald-500' : 'text-slate-400')} />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* RIGHT SECTION: Controls & Action Triggers */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Rupee-to-Carbon Shift Toggle */}
              <div className="flex items-center bg-slate-200/80 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-300/80 dark:border-slate-700/80 shadow-sm">
                <button
                  onClick={() => onToggleViewMode()}
                  className={cn(
                    'flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-300',
                    !isFinancial
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  )}
                  title="View in Carbon Emissions (tCO2e)"
                >
                  <Leaf className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">tCO₂e</span>
                </button>

                <button
                  onClick={() => onToggleViewMode()}
                  className={cn(
                    'flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-300',
                    isFinancial
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  )}
                  title="View in Financial Cash Flow (₹ INR)"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">₹ INR</span>
                </button>
              </div>

              {/* Audit Export Button */}
              <button
                onClick={onOpenAuditExportModal}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all shadow-sm"
                title="Configurable Executive Audit Export"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>

              {/* Cmd+K AI Command Button */}
              <button
                onClick={onOpenCopilotModal}
                className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 transition-all shadow-sm"
                title="Open AI Command Terminal (Cmd + K)"
              >
                <Command className="w-3.5 h-3.5 text-emerald-500" />
                <span>Cmd + K</span>
              </button>

              <ThemeToggle />
            </div>

          </div>
        </div>
      </header>
    </>
  );
};
