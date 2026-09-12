import React, { useState } from 'react';
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
  Sparkles,
  Command,
  Download,
  FileCheck,
  X,
  BookOpen,
  HelpCircle,
  ChevronRight,
  Info,
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
  onOpenCopilotModal,
  onOpenBRSRModal,
  onOpenAuditExportModal,
}) => {
  const [isModalGuideOpen, setIsModalGuideOpen] = useState(false);

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

      {/* Standalone Guide Modal for Collapsed Sidebar or Quick Modal Trigger */}
      {isModalGuideOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-extrabold text-white font-heading">
                  About Us & Utility Guide
                </h3>
              </div>
              <button
                onClick={() => setIsModalGuideOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* About ByteMe - 2-Sentence Plain English Summary */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-slate-200 leading-relaxed font-normal">
              ByteMe is a smart operational platform designed to track real-time factory energy loss, cut carbon emissions, and save operational costs effortlessly. It translates complex machine sensors into plain financial savings for your plant floor.
            </div>

            {/* Interactive Utility Guide */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                Key Tools Explained Simply
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onTabChange('simulation');
                    setIsModalGuideOpen(false);
                    if (isMobileOpen) onCloseMobile();
                  }}
                  className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500 text-left transition-all group space-y-1"
                >
                  <div className="flex items-center space-x-2 text-xs font-bold text-white group-hover:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <span>🟢 Digital Twin Pipeline</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Visual digital map that tracks machine heating, thermal loss, and operational health across your plant.
                  </p>
                </button>

                <button
                  onClick={() => {
                    onTabChange('simulator_hub');
                    setIsModalGuideOpen(false);
                    if (isMobileOpen) onCloseMobile();
                  }}
                  className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500 text-left transition-all group space-y-1"
                >
                  <div className="flex items-center space-x-2 text-xs font-bold text-white group-hover:text-emerald-400">
                    <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>⚡ ROI Playground</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Interactive calculator that estimates how fast green equipment upgrades will save money and pay for themselves.
                  </p>
                </button>

                <button
                  onClick={() => {
                    onTabChange('intake');
                    setIsModalGuideOpen(false);
                    if (isMobileOpen) onCloseMobile();
                  }}
                  className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500 text-left transition-all group space-y-1"
                >
                  <div className="flex items-center space-x-2 text-xs font-bold text-white group-hover:text-emerald-400">
                    <Scan className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>📄 OCR Bill Scanner</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Instant scanner to upload utility and fuel bills, automatically logging carbon and cost data without manual entry.
                  </p>
                </button>

                <button
                  onClick={() => {
                    if (onOpenBRSRModal) onOpenBRSRModal();
                    else onTabChange('roadmap');
                    setIsModalGuideOpen(false);
                    if (isMobileOpen) onCloseMobile();
                  }}
                  className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500 text-left transition-all group space-y-1"
                >
                  <div className="flex items-center space-x-2 text-xs font-bold text-white group-hover:text-emerald-400">
                    <FileCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>📋 BRSR Audit Pack</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    One-click report generator to instantly export verified compliance docs ready for official audits.
                  </p>
                </button>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsModalGuideOpen(false)}
                className="w-full py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-50 h-screen flex flex-col justify-between border-r transition-all duration-300 select-none bg-white dark:bg-[#070d19] border-slate-200 dark:border-slate-800 shadow-xl lg:shadow-none',
          isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0',
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        )}
      >
        {/* Brand Header - Always shows Logo + Name */}
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

          {/* PERMANENT "ABOUT US & UTILITY GUIDE" SECTION IN PLAIN-ENGLISH */}
          {(!isCollapsed || isMobileOpen) ? (
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-900 dark:text-white font-heading">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>About Us & Utility Guide</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 uppercase">
                  Plain-English
                </span>
              </div>

              {/* 2-Sentence Plain English About Summary */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                ByteMe is a smart operational platform designed to track real-time factory energy loss, cut carbon emissions, and save operational costs effortlessly.
              </div>

              {/* Interactive Utility Guide */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block px-1">
                  Key Tools Explained Simply
                </span>

                {/* 1. Digital Twin Pipeline */}
                <button
                  onClick={() => {
                    onTabChange('simulation');
                    if (isMobileOpen) onCloseMobile();
                  }}
                  className="w-full text-left p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-emerald-500/10 hover:border-emerald-500/40 border border-slate-200 dark:border-slate-800 transition-all group"
                >
                  <div className="flex items-center space-x-1.5 text-[11.5px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>🟢 Digital Twin Pipeline</span>
                  </div>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                    Visual digital map that tracks machine heating, thermal loss, and operational health across your plant.
                  </p>
                </button>

                {/* 2. ROI Playground */}
                <button
                  onClick={() => {
                    onTabChange('simulator_hub');
                    if (isMobileOpen) onCloseMobile();
                  }}
                  className="w-full text-left p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-emerald-500/10 hover:border-emerald-500/40 border border-slate-200 dark:border-slate-800 transition-all group"
                >
                  <div className="flex items-center space-x-1.5 text-[11.5px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>⚡ ROI Playground</span>
                  </div>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                    Interactive calculator that estimates how fast green equipment upgrades will save money and pay for themselves.
                  </p>
                </button>

                {/* 3. OCR Bill Scanner */}
                <button
                  onClick={() => {
                    onTabChange('intake');
                    if (isMobileOpen) onCloseMobile();
                  }}
                  className="w-full text-left p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-emerald-500/10 hover:border-emerald-500/40 border border-slate-200 dark:border-slate-800 transition-all group"
                >
                  <div className="flex items-center space-x-1.5 text-[11.5px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    <Scan className="w-3 h-3 text-purple-500 shrink-0" />
                    <span>📄 OCR Bill Scanner</span>
                  </div>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                    Instant scanner to upload utility and fuel bills, automatically logging carbon and cost data without manual entry.
                  </p>
                </button>

                {/* 4. BRSR Audit Pack */}
                <button
                  onClick={() => {
                    if (onOpenBRSRModal) onOpenBRSRModal();
                    else onTabChange('roadmap');
                    if (isMobileOpen) onCloseMobile();
                  }}
                  className="w-full text-left p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-emerald-500/10 hover:border-emerald-500/40 border border-slate-200 dark:border-slate-800 transition-all group"
                >
                  <div className="flex items-center space-x-1.5 text-[11.5px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    <FileCheck className="w-3 h-3 text-teal-500 shrink-0" />
                    <span>📋 BRSR Audit Pack</span>
                  </div>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                    One-click report generator to instantly export verified compliance docs ready for official audits.
                  </p>
                </button>
              </div>
            </div>
          ) : (
            /* Collapsed Rail Info Button Trigger */
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-center">
              <button
                onClick={() => setIsModalGuideOpen(true)}
                className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all border border-emerald-200 dark:border-emerald-500/30 group relative"
                title="About Us & Plain-English Utility Guide"
              >
                <BookOpen className="w-4 h-4" />
                <div className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-slate-700 shadow-xl">
                  About Us & Platform Guide
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Quick Tools: Command Modal, BRSR, Export, Facility Context */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2 shrink-0">
          {/* Quick Action Buttons */}
          <div className={cn('grid gap-1.5', isCollapsed && !isMobileOpen ? 'grid-cols-1' : 'grid-cols-3')}>
            {onOpenCopilotModal && (
              <button
                onClick={() => {
                  onOpenCopilotModal();
                  if (isMobileOpen) onCloseMobile();
                }}
                className={cn(
                  'flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700',
                  isCollapsed && !isMobileOpen ? 'p-2.5' : 'p-2 text-xs space-x-1 font-medium'
                )}
                title="AI Command Terminal (Cmd + K)"
              >
                <Command className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {(!isCollapsed || isMobileOpen) && <span className="truncate">Cmd+K</span>}
              </button>
            )}

            {onOpenBRSRModal && (
              <button
                onClick={() => {
                  onOpenBRSRModal();
                  if (isMobileOpen) onCloseMobile();
                }}
                className={cn(
                  'flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 transition-colors border border-emerald-200 dark:border-emerald-500/30',
                  isCollapsed && !isMobileOpen ? 'p-2.5' : 'p-2 text-xs space-x-1 font-medium'
                )}
                title="SEBI BRSR Audit Pack"
              >
                <FileCheck className="w-3.5 h-3.5" />
                {(!isCollapsed || isMobileOpen) && <span className="truncate">BRSR</span>}
              </button>
            )}

            {onOpenAuditExportModal && (
              <button
                onClick={() => {
                  onOpenAuditExportModal();
                  if (isMobileOpen) onCloseMobile();
                }}
                className={cn(
                  'flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700',
                  isCollapsed && !isMobileOpen ? 'p-2.5' : 'p-2 text-xs space-x-1 font-medium'
                )}
                title="Audit Report Export"
              >
                <Download className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                {(!isCollapsed || isMobileOpen) && <span className="truncate">Export</span>}
              </button>
            )}
          </div>

          {/* Plant Context Tag */}
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

