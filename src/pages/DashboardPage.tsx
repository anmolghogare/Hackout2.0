import React, { useState } from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { BaseLayout } from '../components/layout/BaseLayout';
import { ByteMeOverview } from '../components/features/overview/ByteMeOverview';
import { AdminHub } from '../components/features/dashboard/AdminHub';
import { SensorsTelemetryHub } from '../components/features/dashboard/SensorsTelemetryHub';
import { UnifiedSimulatorHub } from '../components/features/dashboard/UnifiedSimulatorHub';
import { AdvancedAnalyticsHub } from '../components/features/dashboard/AdvancedAnalyticsHub';
import { OCRIntakeHub } from '../components/features/dashboard/OCRIntakeHub';
import { ProcessFlowCanvas } from '../components/features/dashboard/ProcessFlowCanvas';
import { ScenarioSandbox } from '../components/features/dashboard/ScenarioSandbox';
import { CopilotPanel } from '../components/features/dashboard/CopilotPanel';
import { CopilotCommandModal } from '../components/features/dashboard/CopilotCommandModal';
import { BRSRExportModal } from '../components/features/dashboard/BRSRExportModal';
import { AuditReportExportModal } from '../components/features/dashboard/AuditReportExportModal';
import { DataProvenanceModal } from '../components/features/dashboard/DataProvenanceModal';
import { GoogleAuthModal } from '../components/auth/GoogleAuthModal';
import { KPICards } from '../components/features/dashboard/KPICards';
import { SankeyVisualizer } from '../components/features/dashboard/SankeyVisualizer';
import { CircularNetwork } from '../components/features/dashboard/CircularNetwork';
import { RoadmapTable } from '../components/features/dashboard/RoadmapTable';
import { ComplianceHub } from '../components/features/dashboard/ComplianceHub';
import { CarbonCreditsHub } from '../components/features/dashboard/CarbonCreditsHub';

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
    facilityConfig,
    saveFacilityConfig,
    aiSettings,
    saveAISettings,
    kpiData,
    stages,
    isBackendOnline,
    isCopilotOpen,
    setIsCopilotOpen,
    isBRSRModalOpen,
    setIsBRSRModalOpen,
    isDataProvenanceModalOpen,
    setIsDataProvenanceModalOpen,
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
      onOpenProvenanceModal={() => setIsDataProvenanceModalOpen(true)}
      facilityConfig={facilityConfig}
      activeGoogleUser={activeGoogleUser}
      onOpenGoogleAuthModal={() => setIsGoogleModalOpen(true)}
      onStartJudgeTour={startJudgeTour}
      onApplyPreset={applyPreset}
      isBackendOnline={isBackendOnline}
    >
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

      {/* Scientific Data Provenance & Regulatory Inspector Modal */}
      <DataProvenanceModal
        isOpen={isDataProvenanceModalOpen}
        onClose={() => setIsDataProvenanceModalOpen(false)}
        facilityConfig={facilityConfig}
      />

      {/* ============================================================ */}
      {/* 1. CORE PLATFORM: EXECUTIVE OVERVIEW */}
      {/* ============================================================ */}
      {activeTab === 'overview' && (
        <ByteMeOverview
          onNavigate={setActiveTab}
          onStartJudgeTour={startJudgeTour}
          onOpenBRSRModal={() => setIsBRSRModalOpen(true)}
        />
      )}

      {/* ============================================================ */}
      {/* 2. CORE PLATFORM: FACILITY ONBOARDING & CONFIG */}
      {/* ============================================================ */}
      {activeTab === 'admin' && (
        <div className="animate-fadeIn">
          <AdminHub
            currentConfig={facilityConfig}
            onSaveConfig={saveFacilityConfig}
            aiSettings={aiSettings}
            onSaveAISettings={saveAISettings}
            onNavigateTab={setActiveTab}
            onOpenProvenanceModal={() => setIsDataProvenanceModalOpen(true)}
            viewMode={viewMode}
          />
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. CORE PLATFORM: REAL-TIME IOT SENSORS */}
      {/* ============================================================ */}
      {activeTab === 'sensors' && (
        <div className="animate-fadeIn space-y-6">
          <SensorsTelemetryHub facilityConfig={facilityConfig} />
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. SIMULATION: DIGITAL TWIN PIPELINE */}
      {/* ============================================================ */}
      {activeTab === 'simulation' && (
        <div className="animate-fadeIn space-y-6">
          <ProcessFlowCanvas
            stages={stages}
            viewMode={viewMode}
            onSelectStageForSimulation={(stageIdx) => {
              if (stageIdx === 0) applyPreset({ pcrResinPct: 20 });
              else if (stageIdx === 1) applyPreset({ fuelShiftPct: 50, tempReductionPct: 10 });
              else if (stageIdx === 2) applyPreset({ fuelShiftPct: 30, scrapRecyclePct: 50 });
              else if (stageIdx === 3) applyPreset({ scrapRecyclePct: 100 });
              setActiveTab('simulator_hub');
            }}
          />
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. SIMULATION: WHAT-IF ROI STUDIO */}
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
      {/* 6. SIMULATION: 3D THERMAL DIAGNOSTICS & HEATMAP */}
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
      {/* 7. SIMULATION: SCENARIO MATRIX */}
      {/* ============================================================ */}
      {activeTab === 'sandbox' && (
        <div className="animate-fadeIn space-y-6">
          <ScenarioSandbox
            scenarios={savedScenarios}
            onSaveCurrentScenario={saveScenario}
            onDeleteScenario={deleteScenario}
            onLoadScenario={(inputs) => {
              applyPreset(inputs);
              setActiveTab('simulator_hub');
            }}
            viewMode={viewMode}
          />
        </div>
      )}

      {/* ============================================================ */}
      {/* 8. CIRCULAR ECONOMY: SANKEY STREAM */}
      {/* ============================================================ */}
      {(activeTab === 'circular' || activeTab === 'sankey') && (
        <div className="animate-fadeIn space-y-6">
          <SankeyVisualizer viewMode={viewMode} />
        </div>
      )}

      {/* ============================================================ */}
      {/* 10. DATA & AI: OCR INGESTION */}
      {/* ============================================================ */}
      {activeTab === 'intake' && (
        <div className="animate-fadeIn space-y-6">
          <OCRIntakeHub />
        </div>
      )}

      {/* ============================================================ */}
      {/* 11. DATA & AI: COPILOT PANEL */}
      {/* ============================================================ */}
      {activeTab === 'copilot' && (
        <div className="animate-fadeIn">
          <CopilotPanel />
        </div>
      )}

      {/* ============================================================ */}
<<<<<<< HEAD
      {/* 12. COMPLIANCE: CAPEX ROADMAP */}
      {/* ============================================================ */}
      {activeTab === 'roadmap' && (
        <div className="animate-fadeIn space-y-6">
          <RoadmapTable
            viewMode={viewMode}
            onSimulatePhase={(inputs) => {
              applyPreset(inputs);
              setActiveTab('simulator_hub');
            }}
          />
=======
      {/* 9. FUNCTIONAL VIEW: B2B CIRCULAR WASTE SANKEY */}
      {/* ============================================================ */}
      {activeTab === 'circular' && (
        <div className="animate-fadeIn space-y-8">
          <SankeyVisualizer viewMode={viewMode} />
>>>>>>> aedc57e (fix(ui): remove B2B circular cluster network section and replace photo avatars with initial letter badges)
        </div>
      )}

      {/* ============================================================ */}
      {/* 13. COMPLIANCE: SEBI BRSR ESG */}
      {/* ============================================================ */}
      {activeTab === 'compliance' && (
        <div className="animate-fadeIn space-y-6">
          <ComplianceHub
            kpiData={kpiData}
            stages={stages}
            facilityConfig={facilityConfig}
            onOpenBRSRModal={() => setIsBRSRModalOpen(true)}
          />
        </div>
      )}

      {/* ============================================================ */}
      {/* 14. FINANCE: GREEN CREDITS */}
      {/* ============================================================ */}
      {activeTab === 'carbon_credits' && (
        <div className="animate-fadeIn space-y-6">
          <CarbonCreditsHub
            kpiData={kpiData}
            facilityConfig={facilityConfig}
            onNavigateTab={setActiveTab}
          />
        </div>
      )}
    </BaseLayout>
  );
};
