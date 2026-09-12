import React, { useState } from 'react';
import { TabId, ViewMode, FacilityConfig } from '../../types';
import {
  Zap,
  Activity,
  Scan,
  Flame,
  Layers,
  Recycle,
  BarChart3,
  PanelLeftClose,
  Sparkles,
  Command,
  Download,
  FileCheck,
  X,
  BookOpen,
  ChevronRight,
  Building2,
  ShieldCheck,
  Compass,
  Sliders,
  Radio,
  TrendingDown,
  Cpu,
  Coins,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CollapsibleSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onOpenCopilotModal?: () => void;
  onOpenBRSRModal?: () => void;
  onOpenAuditExportModal?: () => void;
  onOpenProvenanceModal?: () => void;
  facilityConfig?: FacilityConfig;
  viewMode?: ViewMode;
}

interface NavItem {
  id: TabId;
  label: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  activeTab,
  onTabChange,
  onOpenProvenanceModal,
  facilityConfig,
}) => {
  const [isModalGuideOpen, setIsModalGuideOpen] = useState(false);

  const navItems: NavItem[] = [
    // 1. Core Platform
    { id: 'overview', label: 'Executive Overview', category: 'Core Platform', icon: Sparkles },
    { id: 'admin', label: 'Facility Configuration', category: 'Core Platform', icon: Building2 },
    { id: 'sensors', label: 'Real-Time IoT Sensors', category: 'Core Platform', icon: Radio, badge: 'Live' },

    // 2. Simulation & Engineering
    { id: 'simulation', label: 'Digital Twin Process', category: 'Simulation & Engineering', icon: Flame, badge: '4 Stages' },
    { id: 'simulator_hub', label: 'What-If ROI Simulator', category: 'Simulation & Engineering', icon: Sliders, badge: 'Interactive' },
    { id: 'analytics_hub', label: '3D Thermal Diagnostics', category: 'Simulation & Engineering', icon: Activity },
    { id: 'sandbox', label: 'Scenario Matrix', category: 'Simulation & Engineering', icon: Layers },

    // 3. Circular Economy & Supply Chain
    { id: 'sankey', label: 'Material & Energy Sankey', category: 'Circular Economy', icon: TrendingDown },

    // 4. Data Intake & Automation
    { id: 'intake', label: 'OCR Utility Ingestion', category: 'Data & AI', icon: Scan, badge: 'OCR' },
    { id: 'copilot', label: 'AI Intelligence Copilot', category: 'Data & AI', icon: Cpu },

    // 5. Compliance & Green Capital
    { id: 'roadmap', label: 'CapEx & Payback Matrix', category: 'Compliance & Finance', icon: BarChart3 },
    { id: 'compliance', label: 'SEBI BRSR Core ESG', category: 'Compliance & Finance', icon: ShieldCheck, badge: 'BRSR' },
    { id: 'carbon_credits', label: 'Green Finance & Credits', category: 'Compliance & Finance', icon: Coins, badge: '₹ Carbon' },
  ];

  const categories = Array.from(new Set(navItems.map((item) => item.category)));

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Guide Modal */}
      {isModalGuideOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  ByteMe Architecture & User Guide
                </h3>
              </div>
              <button
                onClick={() => setIsModalGuideOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              ByteMe transforms industrial telemetry and utility records into verifiable Scope 1–3 emissions data, ROI payback waterfalls, and SEBI BRSR Principle 6 compliance packs.
            </div>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => {
                  onTabChange('overview');
                  setIsModalGuideOpen(false);
                  if (isMobileOpen) onCloseMobile();
                }}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/60 dark:bg-slate-800/40 dark:hover:bg-emerald-500/10 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 text-left transition-all"
              >
                <span className="font-bold text-slate-900 dark:text-white block">1. Executive Overview</span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">High-level footprint, financial savings, and facility readiness.</span>
              </button>

              <button
                onClick={() => {
                  onTabChange('sensors');
                  setIsModalGuideOpen(false);
                  if (isMobileOpen) onCloseMobile();
                }}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/60 dark:bg-slate-800/40 dark:hover:bg-emerald-500/10 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 text-left transition-all"
              >
                <span className="font-bold text-slate-900 dark:text-white block">2. Real-Time IoT Sensors</span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Continuous sensor telemetry for pyrometers, O₂ analyzers, and power factors.</span>
              </button>

              <button
                onClick={() => {
                  onTabChange('simulator_hub');
                  setIsModalGuideOpen(false);
                  if (isMobileOpen) onCloseMobile();
                }}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/60 dark:bg-slate-800/40 dark:hover:bg-emerald-500/10 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 text-left transition-all"
              >
                <span className="font-bold text-slate-900 dark:text-white block">3. What-If ROI Simulator & Digital Twin</span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Simulate operational shifts, thermal recovery, and payback periods live.</span>
              </button>
            </div>

            <button
              onClick={() => setIsModalGuideOpen(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
            >
              Close Platform Guide
            </button>
          </div>
        </div>
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-50 h-screen flex flex-col justify-between border-r transition-all duration-200 select-none bg-white dark:bg-[#0B0F17] border-slate-200/80 dark:border-slate-800 shadow-sm lg:shadow-none',
          isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0',
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        )}
      >
        {/* Brand Header */}
        <div
          className={cn(
            'h-16 flex items-center border-b border-slate-200/80 dark:border-slate-800 shrink-0 transition-all',
            isCollapsed && !isMobileOpen ? 'px-2 justify-center' : 'px-5 justify-between'
          )}
        >
          {isCollapsed && !isMobileOpen ? (
            <button
              onClick={onToggleCollapse}
              className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm hover:bg-emerald-500 transition-colors"
              title="Expand sidebar"
            >
              B
            </button>
          ) : (
            <>
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0">
                  B
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                      ByteMe
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      v2.0
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    Carbon Intelligence
                  </span>
                </div>
              </div>

              <div className="flex items-center shrink-0">
                {isMobileOpen ? (
                  <button
                    onClick={onCloseMobile}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={onToggleCollapse}
                    className="hidden lg:flex p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Collapse sidebar"
                  >
                    <PanelLeftClose className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 custom-scrollbar">
          {categories.map((category) => {
            const items = navItems.filter((i) => i.category === category);
            return (
              <div key={category} className="space-y-0.5">
                {(!isCollapsed || isMobileOpen) && (
                  <span className="px-3 text-[10px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-1">
                    {category}
                  </span>
                )}
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        if (isMobileOpen) onCloseMobile();
                      }}
                      className={cn(
                        'w-full flex items-center rounded-xl text-xs font-medium transition-all duration-150 group relative',
                        isCollapsed && !isMobileOpen ? 'justify-center p-2.5' : 'px-3 py-2 space-x-2.5 text-left',
                        isActive
                          ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      )}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon
                        className={cn(
                          'w-4 h-4 shrink-0 transition-colors',
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                        )}
                      />
                      {(!isCollapsed || isMobileOpen) && (
                        <div className="flex-1 flex items-center justify-between truncate">
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={cn(
                                'text-[9px] px-1.5 py-0.5 rounded font-mono font-medium',
                                isActive
                                  ? 'bg-emerald-700 text-emerald-100'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Bottom Facility Context */}
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 space-y-2 shrink-0">
          {(!isCollapsed || isMobileOpen) ? (
            <div className="space-y-2">
              <button
                onClick={() => {
                  onTabChange('admin');
                  if (isMobileOpen) onCloseMobile();
                }}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-xs text-left transition-all flex items-center space-x-2.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-slate-900 dark:text-white font-semibold block truncate text-xs">
                    {facilityConfig?.profile?.name || 'Apex Packaging Unit #4'}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block truncate">
                    {facilityConfig?.profile?.sector || 'Polymer Extrusion'}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              <div className="flex items-center justify-between px-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <button
                  onClick={() => setIsModalGuideOpen(true)}
                  className="hover:text-slate-900 dark:hover:text-white flex items-center space-x-1"
                >
                  <BookOpen className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Guide</span>
                </button>
                {onOpenProvenanceModal && (
                  <button
                    onClick={onOpenProvenanceModal}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center space-x-1"
                  >
                    <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Standards</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => setIsModalGuideOpen(true)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Platform Guide"
              >
                <BookOpen className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
