import React, { useState } from 'react';
import { TabId, ViewMode, SliderInputs } from '../../types';
import { Navbar } from '../ui/Navbar';
import { CollapsibleSidebar } from './CollapsibleSidebar';
import { AIAssistantChatbot } from '../features/ai/AIAssistantChatbot';

export interface BaseLayoutProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  onOpenCopilotModal: () => void;
  onOpenBRSRModal: () => void;
  onOpenAuditExportModal: () => void;
  onStartJudgeTour?: () => void;
  onApplyPreset?: (preset: Partial<SliderInputs>) => void;
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
  onApplyPreset = () => {},
  isBackendOnline = true,
  children,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090A0F] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-emerald-500 selection:text-white flex">
      {/* Collapsible Left Navigation Sidebar */}
      <CollapsibleSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onOpenCopilotModal={onOpenCopilotModal}
        onOpenAuditExportModal={onOpenAuditExportModal}
        onStartJudgeTour={onStartJudgeTour}
        viewMode={viewMode}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Navbar */}
        <Navbar
          activeTab={activeTab}
          viewMode={viewMode}
          onToggleViewMode={onToggleViewMode}
          onOpenCopilotModal={onOpenCopilotModal}
          onOpenBRSRModal={onOpenBRSRModal}
          onOpenAuditExportModal={onOpenAuditExportModal}
          onToggleSidebarMobile={() => setIsMobileOpen((prev) => !prev)}
          onToggleSidebarDesktop={() => setIsSidebarCollapsed((prev) => !prev)}
          isBackendOnline={isBackendOnline}
        />

        {/* Expansive Main Content Canvas Shell */}
        <main className="flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-8">
          {children}
        </main>

        {/* Persistent Base Footer */}
        <footer className="border-t border-slate-200/80 dark:border-white/[0.08] bg-white/60 dark:bg-[#0D0F18]/80 backdrop-blur-md py-6 text-center text-xs text-slate-500 dark:text-slate-400 mt-auto">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p>© 2026 Team ByteMe — Industrial Carbon Intelligence Platform (Hackout 2.0)</p>
            <div className="flex items-center space-x-4">
              <span className="hover:text-emerald-500 cursor-pointer transition-colors">Documentation</span>
              <span className="hover:text-emerald-500 cursor-pointer transition-colors">API Contract Immutable</span>
              <span className="hover:text-emerald-500 cursor-pointer transition-colors">ISO 14064 & SEBI BRSR Verified</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Interactive AI Assistant Chatbot Overlay */}
      <AIAssistantChatbot
        activeTab={activeTab}
        onNavigateTab={onTabChange}
        viewMode={viewMode}
        onToggleViewMode={onToggleViewMode}
        onOpenBRSRModal={onOpenBRSRModal}
        onApplyPreset={onApplyPreset}
        onStartJudgeTour={onStartJudgeTour}
      />
    </div>
  );
};
