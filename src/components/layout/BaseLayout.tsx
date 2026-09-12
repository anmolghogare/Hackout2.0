import React, { useState } from 'react';
import { TabId, ViewMode, SliderInputs, GoogleUser, FacilityConfig } from '../../types';
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
  onOpenProvenanceModal?: () => void;
  facilityConfig?: FacilityConfig;
  activeGoogleUser?: GoogleUser | null;
  onOpenGoogleAuthModal?: () => void;
  onStartJudgeTour?: () => void;
  onApplyPreset?: (preset: Partial<SliderInputs>) => void;
  sliderInputs?: SliderInputs;
  apiKey?: string;
  aiModel?: string;
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
  onOpenProvenanceModal,
  facilityConfig,
  activeGoogleUser,
  onOpenGoogleAuthModal,
  onStartJudgeTour,
  onApplyPreset = () => {},
  sliderInputs,
  apiKey,
  aiModel,
  isBackendOnline = true,
  children,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090D] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-950 dark:selection:text-white flex">
      <CollapsibleSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onOpenCopilotModal={onOpenCopilotModal}
        onOpenBRSRModal={onOpenBRSRModal}
        onOpenAuditExportModal={onOpenAuditExportModal}
        onOpenProvenanceModal={onOpenProvenanceModal}
        facilityConfig={facilityConfig}
        viewMode={viewMode}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Navbar
          activeTab={activeTab}
          viewMode={viewMode}
          onToggleViewMode={onToggleViewMode}
          onOpenCopilotModal={onOpenCopilotModal}
          onOpenBRSRModal={onOpenBRSRModal}
          onOpenAuditExportModal={onOpenAuditExportModal}
          onOpenProvenanceModal={onOpenProvenanceModal}
          onToggleSidebarMobile={() => setIsMobileOpen((prev) => !prev)}
          onToggleSidebarDesktop={() => setIsSidebarCollapsed((prev) => !prev)}
          activeGoogleUser={activeGoogleUser}
          onOpenGoogleAuthModal={onOpenGoogleAuthModal}
          isBackendOnline={isBackendOnline}
          onTabChange={onTabChange}
        />

        <main className="flex-1 w-full max-w-[1680px] mx-auto px-5 sm:px-10 lg:px-14 xl:px-16 py-10 md:py-12 space-y-10 md:space-y-12 min-w-0 flex flex-col justify-start relative isolate">
          {children}
        </main>

        <footer className="border-t border-slate-200/70 dark:border-white/[0.06] bg-white/70 dark:bg-[#0B0D14]/80 backdrop-blur-md py-8 text-center text-xs text-slate-500 dark:text-slate-400 mt-auto tracking-wide">
          <div className="max-w-[1680px] mx-auto px-5 sm:px-10 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p>© 2026 Team ByteMe — Industrial Carbon Intelligence Platform (Hackout 2.0)</p>
            <div className="flex items-center space-x-6">
              <span className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors">Documentation</span>
              <span className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors">API Contract</span>
              <span className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors">ISO 14064 · SEBI BRSR</span>
            </div>
          </div>
        </footer>
      </div>

      <AIAssistantChatbot
        activeTab={activeTab}
        onNavigateTab={onTabChange}
        viewMode={viewMode}
        onToggleViewMode={onToggleViewMode}
        onOpenBRSRModal={onOpenBRSRModal}
        onApplyPreset={onApplyPreset}
        onStartJudgeTour={onStartJudgeTour}
        facilityConfig={facilityConfig}
        sliderInputs={sliderInputs}
        apiKey={apiKey}
        aiModel={aiModel}
      />
    </div>
  );
};
