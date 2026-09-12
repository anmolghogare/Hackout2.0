import React from 'react';
import { TabId, ViewMode } from '../../types';
import { Navbar } from '../ui/Navbar';

export interface BaseLayoutProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  onOpenCopilotModal: () => void;
  onOpenBRSRModal: () => void;
  onOpenAuditExportModal: () => void;
  onStartJudgeTour?: () => void;
  isBackendOnline?: boolean;
  children: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  activeTab,
  onTabChange,
  viewMode,
  onToggleViewMode,
  onOpenCopilotModal,
  onOpenBRSRModal,
  onOpenAuditExportModal,
  onStartJudgeTour,
  isBackendOnline = true,
  children,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070d19] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-emerald-500 selection:text-white flex flex-col">
      {/* Base Responsive Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={onTabChange}
        viewMode={viewMode}
        onToggleViewMode={onToggleViewMode}
        onOpenCopilotModal={onOpenCopilotModal}
        onOpenBRSRModal={onOpenBRSRModal}
        onOpenAuditExportModal={onOpenAuditExportModal}
        onStartJudgeTour={onStartJudgeTour}
        isBackendOnline={isBackendOnline}
      />

      {/* Main Page Container Shell */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Persistent Base Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p>© 2026 Team ByteMe — Industrial Carbon Intelligence Platform (Hackout 2.0)</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-emerald-500 cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-emerald-500 cursor-pointer transition-colors">API Contract Immutable</span>
            <span className="hover:text-emerald-500 cursor-pointer transition-colors">ISO 14064 & SEBI BRSR Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
