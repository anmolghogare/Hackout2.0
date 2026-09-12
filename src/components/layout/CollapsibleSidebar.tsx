import React from 'react';
import { TabId, ViewMode } from '../../types';
import {
  Zap,
  Activity,
  Scan,
  Flame,
  Layers,
  Recycle,
  BarChart3,
  PanelLeftClose,
  PanelLeftOpen,
  PlayCircle,
  Sparkles,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CollapsibleSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onOpenCopilotModal: () => void;
  onOpenAuditExportModal: () => void;
  onStartJudgeTour?: () => void;
  viewMode: ViewMode;
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
  onStartJudgeTour,
}) => {
  const navItems: NavItem[] = [
    { id: 'overview', label: 'Home Overview', category: 'Platform', icon: Sparkles, badge: 'Overview' },
    { id: 'simulation', label: 'Digital Twin Pipeline', category: 'Interactive Tools', icon: Flame, badge: 'Twin' },
    { id: 'simulator_hub', label: 'ROI Playground', category: 'Interactive Tools', icon: Zap, badge: 'Live' },
    { id: 'analytics_hub', label: '3D Thermal Analytics', category: 'Interactive Tools', icon: Activity, badge: '3D' },
    { id: 'intake', label: 'OCR Bill Scanner', category: 'Data & Planning', icon: Scan, badge: 'OCR' },
    { id: 'sandbox', label: 'Scenario Sandbox', category: 'Data & Planning', icon: Layers, badge: 'Matrix' },
    { id: 'circular', label: 'B2B Waste Sankey', category: 'Circular & Compliance', icon: Recycle, badge: 'Trade' },
    { id: 'roadmap', label: 'BRSR Roadmap & ROI', category: 'Circular & Compliance', icon: BarChart3, badge: 'SEBI' },
  ];

  const categories = Array.from(new Set(navItems.map((item) => item.category)));

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-50 h-screen flex flex-col justify-between border-r transition-all duration-300 select-none bg-white dark:bg-[#070d19] border-slate-200 dark:border-slate-800 shadow-xl lg:shadow-none',
          isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0',
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        )}
      >
        {/* Brand Header - Always shows Logo + Name cleanly */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-heading font-extrabold text-lg shadow-md shadow-emerald-600/20 shrink-0">
              B
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col truncate">
                <div className="flex items-center space-x-1.5">
                  <span className="font-heading font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                    ByteMe
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                    v2.0
                  </span>
                </div>
                <span className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">
                  Carbon Decision Intelligence
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse / Mobile Close Button */}
          <div className="flex items-center">
            {isMobileOpen ? (
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={onToggleCollapse}
                className="hidden lg:flex p-1.5 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Navigation Item Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 custom-scrollbar">
          {categories.map((category) => {
            const items = navItems.filter((i) => i.category === category);
            return (
              <div key={category} className="space-y-1">
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
                        'w-full flex items-center rounded-xl font-medium transition-all duration-200 group relative',
                        isCollapsed && !isMobileOpen ? 'justify-center p-3' : 'px-3 py-2 space-x-3 text-left',
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 font-bold shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      )}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon
                        className={cn(
                          'w-4 h-4 shrink-0 transition-transform group-hover:scale-110',
                          isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-400'
                        )}
                      />
                      {(!isCollapsed || isMobileOpen) && (
                        <div className="flex-1 flex items-center justify-between truncate">
                          <span className="text-xs truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={cn(
                                'text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold uppercase',
                                isActive
                                  ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Tooltip for collapsed desktop rail */}
                      {isCollapsed && !isMobileOpen && (
                        <div className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-slate-700 shadow-xl">
                          {item.label}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Bottom Context: Judge Demo & Facility Context */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2 shrink-0">
          {onStartJudgeTour && (
            <button
              onClick={() => {
                onStartJudgeTour();
                if (isMobileOpen) onCloseMobile();
              }}
              className={cn(
                'w-full flex items-center rounded-xl transition-all duration-200 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white shadow-sm font-bold',
                isCollapsed && !isMobileOpen ? 'justify-center p-3' : 'px-3 py-2 space-x-2 text-xs'
              )}
              title="Run 3-Min Judge Demo Walkthrough"
            >
              <PlayCircle className="w-4 h-4 shrink-0 fill-current text-emerald-400 dark:text-white" />
              {(!isCollapsed || isMobileOpen) && <span>Run Judge Demo</span>}
            </button>
          )}

          {(!isCollapsed || isMobileOpen) && (
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <div className="truncate">
                <span className="text-slate-800 dark:text-slate-200 font-bold block truncate">
                  Apex Packaging Pvt. Ltd.
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Pune Unit #4 Telemetry</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
