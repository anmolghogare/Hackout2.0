import React, { useState } from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { BaseLayout } from '../components/layout/BaseLayout';
import { ByteMeOverview } from '../components/features/overview/ByteMeOverview';
import { UnifiedSimulatorHub } from '../components/features/dashboard/UnifiedSimulatorHub';
import { AdvancedAnalyticsHub } from '../components/features/dashboard/AdvancedAnalyticsHub';
import { OCRIntakeHub } from '../components/features/dashboard/OCRIntakeHub';
import { ProcessFlowCanvas } from '../components/features/dashboard/ProcessFlowCanvas';
import { ScenarioSandbox } from '../components/features/dashboard/ScenarioSandbox';
import { CopilotPanel } from '../components/features/dashboard/CopilotPanel';
import { CopilotCommandModal } from '../components/features/dashboard/CopilotCommandModal';
import { BRSRExportModal } from '../components/features/dashboard/BRSRExportModal';
import { AuditReportExportModal } from '../components/features/dashboard/AuditReportExportModal';
import { GoogleAuthModal } from '../components/auth/GoogleAuthModal';
import { KPICards } from '../components/features/dashboard/KPICards';
import { SankeyVisualizer } from '../components/features/dashboard/SankeyVisualizer';
import { CircularNetwork } from '../components/features/dashboard/CircularNetwork';
import { RoadmapTable } from '../components/features/dashboard/RoadmapTable';

export const DashboardPage: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    viewMode,
    toggleViewMode,
    sliderInputs,
    updateSlider,
    applyPreset,
    resetSliders,
    kpiData,
    stages,
    isBackendOnline,
    isCopilotOpen,
    setIsCopilotOpen,
    isBRSRModalOpen,
    setIsBRSRModalOpen,
    isGoogleModalOpen,
    setIsGoogleModalOpen,
    googleAccounts,
    activeGoogleUser,
    selectGoogleAccount,
    addGoogleAccount,
    signOutGoogleAccount,
    savedScenarios,
    saveScenario,
    deleteScenario,
    isJudgeTourActive,
    judgeTourStep,
    judgeTourSteps,
    startJudgeTour,
    nextJudgeTourStep,
    stopJudgeTour,
  } = useDashboardData();

  const [isAuditExportOpen, setIsAuditExportOpen] = useState(false);

  return (
    <BaseLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      viewMode={viewMode}
      onToggleViewMode={toggleViewMode}
      onOpenCopilotModal={() => setIsCopilotOpen(true)}
      onOpenBRSRModal={() => setIsBRSRModalOpen(true)}
      onOpenAuditExportModal={() => setIsAuditExportOpen(true)}
      activeGoogleUser={activeGoogleUser}
      onOpenGoogleAuthModal={() => setIsGoogleModalOpen(true)}
      onStartJudgeTour={startJudgeTour}
      onApplyPreset={applyPreset}
      isBackendOnline={isBackendOnline}
    >


      {/* Top Executive Metric Cards Bar (Rendered for in-depth functional tools) */}
      {activeTab !== 'overview' && (
        <div className="animate-fadeIn">
          <KPICards kpiData={kpiData} viewMode={viewMode} />
        </div>
      )}

      {/* Google Identity Services Authentication Modal */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        activeUser={activeGoogleUser}
        accounts={googleAccounts}
        onSelectAccount={selectGoogleAccount}
        onAddAccount={addGoogleAccount}
        onSignOut={signOutGoogleAccount}
      />

      {/* Global AI Command Modal (Cmd + K) */}
      <CopilotCommandModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onApplyPreset={applyPreset}
        viewMode={viewMode}
      />

      {/* Global SEBI BRSR Regulatory Audit Modal */}
      <BRSRExportModal
        isOpen={isBRSRModalOpen}
        onClose={() => setIsBRSRModalOpen(false)}
        kpiData={kpiData}
        stages={stages}
      />

      {/* Executive Configurable Audit Export Modal */}
      <AuditReportExportModal
        isOpen={isAuditExportOpen}
        onClose={() => setIsAuditExportOpen(false)}
        kpiData={kpiData}
      />

      {/* ============================================================ */}
      {/* 1. HOME / PRODUCT OVERVIEW (Clean, Spacious, Narrative-Led) */}
      {/* ============================================================ */}
      {activeTab === 'overview' && (
        <ByteMeOverview
          onNavigate={setActiveTab}
          onStartJudgeTour={startJudgeTour}
          onOpenBRSRModal={() => setIsBRSRModalOpen(true)}
        />
      )}

      {/* ============================================================ */}
      {/* 2. FUNCTIONAL VIEW: WHAT-IF SIMULATOR & LIVE ROI HUB */}
      {/* ============================================================ */}
      {activeTab === 'simulator_hub' && (
        <div className="animate-fadeIn space-y-6">
          <UnifiedSimulatorHub
            sliderInputs={sliderInputs}
            onSliderChange={updateSlider}
            onApplyPreset={applyPreset}
            onReset={resetSliders}
            viewMode={viewMode}
          />
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. FUNCTIONAL VIEW: ADVANCED ANALYTICS & 3D THERMAL HEATMAP */}
      {/* ============================================================ */}
      {activeTab === 'analytics_hub' && (
        <div className="animate-fadeIn space-y-6">
          <AdvancedAnalyticsHub
            onOpenAnomalyCopilot={() => setIsCopilotOpen(true)}
            viewMode={viewMode}
          />
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. FUNCTIONAL VIEW: OCR SMART BILL SCANNER */}
      {/* ============================================================ */}
      {activeTab === 'intake' && (
        <div className="animate-fadeIn space-y-6">
          <OCRIntakeHub />
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. FUNCTIONAL VIEW: DIGITAL TWIN PIPELINE CANVAS */}
      {/* ============================================================ */}
      {activeTab === 'simulation' && (
        <div className="animate-fadeIn space-y-6">
          <ProcessFlowCanvas stages={stages} viewMode={viewMode} />
        </div>
      )}

      {/* ============================================================ */}
      {/* 6. FUNCTIONAL VIEW: SCENARIO SANDBOX */}
      {/* ============================================================ */}
      {activeTab === 'sandbox' && (
        <div className="animate-fadeIn space-y-6">
          <ScenarioSandbox
            scenarios={savedScenarios}
            onSaveCurrentScenario={saveScenario}
            onDeleteScenario={deleteScenario}
            onLoadScenario={applyPreset}
            viewMode={viewMode}
          />
        </div>
      )}

      {/* ============================================================ */}
      {/* 7. FUNCTIONAL VIEW: AI COPILOT */}
      {/* ============================================================ */}
      {activeTab === 'copilot' && (
        <div className="animate-fadeIn">
          <CopilotPanel />
        </div>
      )}

      {/* ============================================================ */}
      {/* 8. FUNCTIONAL VIEW: B2B CIRCULAR WASTE SANKEY & CLUSTER */}
      {/* ============================================================ */}
      {activeTab === 'circular' && (
        <div className="animate-fadeIn space-y-8">
          <SankeyVisualizer viewMode={viewMode} />
          <CircularNetwork />
        </div>
      )}

      {/* ============================================================ */}
      {/* 9. FUNCTIONAL VIEW: ROI ROADMAP & SEBI BRSR AUDIT */}
      {/* ============================================================ */}
      {activeTab === 'roadmap' && (
        <div className="animate-fadeIn space-y-6">
          <RoadmapTable viewMode={viewMode} />
        </div>
      )}
    </BaseLayout>
  );
};
