import React from 'react';
import { TabId, ViewMode } from '../../types';
import {
  X,
  Building2,
  Zap,
  Activity,
  Scan,
  Flame,
  Layers,
  Recycle,
  BarChart3,
  Sparkles,
  Command,
  Download,
  PlayCircle,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onOpenCopilotModal: () => void;
  onOpenAuditExportModal: () => void;
  onStartJudgeTour?: () => void;
  viewMode: ViewMode;
}

interface NavGroup {
  category: string;
  items: {
    id: TabId;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  onOpenCopilotModal,
  onOpenAuditExportModal,
  onStartJudgeTour,
  viewMode,
}) => {
  const navGroups: NavGroup[] = [
    {
      category: 'Executive Overview & Facility Setup',
      items: [
        {
          id: 'overview',
          label: 'Facility Context',
          description: 'Apex Packaging facility baseline & operational profile',
          icon: Building2,
          badge: 'SME Context',
        },
        {
          id: 'admin',
          label: 'Facility Configuration',
          description: 'Factory parameters, fuel types, tariffs, and AI engine setup',
          icon: Sliders,
          badge: 'Setup',
        },
        {
          id: 'intake',
          label: 'OCR Utility Ingestion',
          description: 'Laser OCR extraction for utility bills & material logs',
          icon: Scan,
          badge: 'OCR Ingestion',
        },
        {
          id: 'simulator_hub',
          label: 'ROI Simulator Playground',
          description: 'Live What-If slider controls & financial ROI engine',
          icon: Zap,
          badge: 'Interactive',
        },
      ],
    },
    {
      category: 'Hotspot Diagnostics',
      items: [
        {
          id: 'analytics_hub',
          label: 'Thermal Analytics & 3D Heatmap',
          description: 'Multi-layer emission diagnostic wheel & hotspot rules',
          icon: Activity,
          badge: 'Hotspot Engine',
        },
        {
          id: 'simulation',
          label: 'Digital Twin Process Flow',
          description: 'Animated particle-stream canvas across 4 manufacturing stages',
          icon: Flame,
          badge: 'Digital Twin',
        },
      ],
    },
    {
      category: 'Scenario Planning & Sandbox',
      items: [
        {
          id: 'sandbox',
          label: 'Scenario Sandbox Matrix',
          description: 'Side-by-side comparison of saved decarbonization plans',
          icon: Layers,
          badge: 'Scenario Plan',
        },
      ],
    },
    {
      category: 'Circular Economy & Compliance',
      items: [
        {
          id: 'circular',
          label: 'B2B Waste Sankey Network',
          description: 'Waste-to-resource matcher between Factory A and regional buyers',
          icon: Recycle,
          badge: 'Circular Trade',
        },
        {
          id: 'roadmap',
          label: 'ROI Matrix & BRSR Audit',
          description: 'Capital payback roadmap and SEBI BRSR compliance pack',
          icon: BarChart3,
          badge: 'BRSR Core',
        },
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Slide-out Left Sidebar Drawer */}
      <aside className="fixed top-0 left-0 bottom-0 z-50 w-80 sm:w-96 bg-slate-900/95 dark:bg-[#091121]/95 text-slate-100 border-r border-slate-800 shadow-2xl backdrop-blur-2xl flex flex-col transition-all duration-300 transform animate-slideRight">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white font-heading font-black text-lg shadow-lg shadow-emerald-500/25">
              B
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-extrabold text-base tracking-tight text-white">
                  ByteMe Modules
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono font-bold border border-emerald-500/30">
                  Navigation
                </span>
              </div>
              <p className="text-xs text-slate-400">Industrial Decision Intelligence Platform</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-2">
              <h4 className="text-[11px] font-extrabold font-mono uppercase tracking-wider text-slate-400 px-3 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{group.category}</span>
              </h4>

              <div className="space-y-1.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        onClose();
                      }}
                      className={cn(
                        'w-full flex items-start space-x-3 p-3 rounded-xl text-left transition-all duration-200 group relative',
                        isActive
                          ? 'bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-transparent text-white border border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white border border-transparent'
                      )}
                    >
                      <div
                        className={cn(
                          'p-2 rounded-lg shrink-0 transition-colors',
                          isActive
                            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                            : 'bg-slate-800/80 text-slate-400 group-hover:text-emerald-400 group-hover:bg-slate-800'
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-bold font-heading truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={cn(
                                'text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold shrink-0 ml-2',
                                isActive
                                  ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                                  : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight line-clamp-1">
                          {item.description}
                        </p>
                      </div>

                      {isActive && (
                        <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 self-center" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Bottom Action Quick Tools */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-2">


          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenCopilotModal();
                onClose();
              }}
              className="flex items-center justify-center space-x-1.5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/60 transition-all"
            >
              <Command className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cmd + K</span>
            </button>

            <button
              onClick={() => {
                onOpenAuditExportModal();
                onClose();
              }}
              className="flex items-center justify-center space-x-1.5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/60 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Audit Export</span>
            </button>
          </div>

          <div className="pt-2 text-center text-[10px] text-slate-500 flex items-center justify-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>Apex Packaging SME Baseline Verified</span>
          </div>
        </div>
      </aside>
    </>
  );
};
