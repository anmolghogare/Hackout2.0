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
import { SankeyVisualizer } from '../components/features/dashboard/SankeyVisualizer';
import { CircularNetwork } from '../components/features/dashboard/CircularNetwork';
import { RoadmapTable } from '../components/features/dashboard/RoadmapTable';
import { ComplianceHub } from '../components/features/dashboard/ComplianceHub';
import { CarbonCreditsHub } from '../components/features/dashboard/CarbonCreditsHub';
import { AIReviewCard } from '../components/features/ai/AIReviewCard';

export const DashboardPage: React.FC = () => {
  const {
    activeTab, setActiveTab, viewMode, toggleViewMode, sliderInputs, updateSlider, applyPreset, resetSliders,
    facilityConfig, saveFacilityConfig, aiSettings, saveAISettings, kpiData, stages, isBackendOnline,
    isCopilotOpen, setIsCopilotOpen, isBRSRModalOpen, setIsBRSRModalOpen, isDataProvenanceModalOpen, setIsDataProvenanceModalOpen,
    isGoogleModalOpen, setIsGoogleModalOpen, googleAccounts, activeGoogleUser, selectGoogleAccount, addGoogleAccount, signOutGoogleAccount,
    savedScenarios, saveScenario, deleteScenario, startJudgeTour,
  } = useDashboardData();

  const [isAuditExportOpen, setIsAuditExportOpen] = useState(false);
  const reviewProps = { facilityConfig, sliders: sliderInputs, apiKey: aiSettings.apiKey, aiModel: aiSettings.model };

  return (
    <BaseLayout
      activeTab={activeTab} onTabChange={setActiveTab} viewMode={viewMode} onToggleViewMode={toggleViewMode}
      onOpenCopilotModal={() => setIsCopilotOpen(true)} onOpenBRSRModal={() => setIsBRSRModalOpen(true)}
      onOpenAuditExportModal={() => setIsAuditExportOpen(true)} onOpenProvenanceModal={() => setIsDataProvenanceModalOpen(true)}
      facilityConfig={facilityConfig} activeGoogleUser={activeGoogleUser} onOpenGoogleAuthModal={() => setIsGoogleModalOpen(true)}
      onStartJudgeTour={startJudgeTour} onApplyPreset={applyPreset} sliderInputs={sliderInputs}
      apiKey={aiSettings.apiKey} aiModel={aiSettings.model} isBackendOnline={isBackendOnline}
    >
      <GoogleAuthModal isOpen={isGoogleModalOpen} onClose={() => setIsGoogleModalOpen(false)} activeUser={activeGoogleUser} accounts={googleAccounts} onSelectAccount={selectGoogleAccount} onAddAccount={addGoogleAccount} onSignOut={signOutGoogleAccount} />
      <CopilotCommandModal isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} onApplyPreset={applyPreset} viewMode={viewMode} />
      <BRSRExportModal isOpen={isBRSRModalOpen} onClose={() => setIsBRSRModalOpen(false)} kpiData={kpiData} stages={stages} />
      <AuditReportExportModal isOpen={isAuditExportOpen} onClose={() => setIsAuditExportOpen(false)} kpiData={kpiData} />
      <DataProvenanceModal isOpen={isDataProvenanceModalOpen} onClose={() => setIsDataProvenanceModalOpen(false)} facilityConfig={facilityConfig} />

      {activeTab === 'overview' && <ByteMeOverview onNavigate={setActiveTab} onStartJudgeTour={startJudgeTour} onOpenBRSRModal={() => setIsBRSRModalOpen(true)} />}

      {activeTab === 'admin' && (
        <div className="animate-fadeIn space-y-8">
          <AdminHub currentConfig={facilityConfig} onSaveConfig={saveFacilityConfig} aiSettings={aiSettings} onSaveAISettings={saveAISettings} onNavigateTab={setActiveTab} onOpenProvenanceModal={() => setIsDataProvenanceModalOpen(true)} viewMode={viewMode} />
          <AIReviewCard section="facility" title="Audit this facility configuration" description="Check saved plant inputs before trusting a simulation." {...reviewProps} />
        </div>
      )}

      {activeTab === 'sensors' && (
        <div className="animate-fadeIn space-y-8">
          <SensorsTelemetryHub facilityConfig={facilityConfig} />
          <AIReviewCard section="sensors" title="AI telemetry review" description="Flag implausible furnace or power-factor readings." {...reviewProps} />
        </div>
      )}

      {activeTab === 'simulation' && (
        <div className="animate-fadeIn space-y-8">
          <ProcessFlowCanvas stages={stages} viewMode={viewMode} onSelectStageForSimulation={(stageIdx) => {
            if (stageIdx === 0) applyPreset({ pcrResinPct: 20 });
            else if (stageIdx === 1) applyPreset({ fuelShiftPct: 50, tempReductionPct: 10 });
            else if (stageIdx === 2) applyPreset({ fuelShiftPct: 30, scrapRecyclePct: 50 });
            else if (stageIdx === 3) applyPreset({ scrapRecyclePct: 100 });
            setActiveTab('simulator_hub');
          }} />
          <AIReviewCard section="process" title="AI leak-point review" description="Hottest stage, grounded in live facility data." {...reviewProps} />
        </div>
      )}

      {activeTab === 'simulator_hub' && (
        <div className="animate-fadeIn space-y-8">
          <UnifiedSimulatorHub sliderInputs={sliderInputs} onSliderChange={updateSlider} onApplyPreset={applyPreset} onReset={resetSliders} viewMode={viewMode} />
          <AIReviewCard section="simulator" title="AI scenario critique" description="Which slider buys ~20% efficiency without inflating opex." {...reviewProps} />
        </div>
      )}

      {activeTab === 'analytics_hub' && (
        <div className="animate-fadeIn space-y-6">
          <AdvancedAnalyticsHub onOpenAnomalyCopilot={() => setIsCopilotOpen(true)} viewMode={viewMode} />
        </div>
      )}

      {activeTab === 'sandbox' && (
        <div className="animate-fadeIn space-y-6">
          <ScenarioSandbox scenarios={savedScenarios} onSaveCurrentScenario={saveScenario} onDeleteScenario={deleteScenario} onLoadScenario={(inputs) => { applyPreset(inputs); setActiveTab('simulator_hub'); }} viewMode={viewMode} />
        </div>
      )}

      {activeTab === 'circular' && (
        <div className="animate-fadeIn space-y-8">
          <CircularNetwork />
          <AIReviewCard section="circular" title="AI offtake review" description="Scrap tons and PCR economics only." {...reviewProps} />
        </div>
      )}

      {activeTab === 'sankey' && (
        <div className="animate-fadeIn space-y-8">
          <SankeyVisualizer viewMode={viewMode} />
          <AIReviewCard section="circular" title="AI offtake review" description="Scrap tons and PCR economics only." {...reviewProps} />
        </div>
      )}

      {activeTab === 'intake' && <div className="animate-fadeIn space-y-6"><OCRIntakeHub /></div>}

      {activeTab === 'copilot' && (
        <div className="animate-fadeIn">
          <CopilotPanel facilityConfig={facilityConfig} sliderInputs={sliderInputs} apiKey={aiSettings.apiKey} aiModel={aiSettings.model} />
        </div>
      )}

      {activeTab === 'roadmap' && (
        <div className="animate-fadeIn space-y-8">
          <RoadmapTable viewMode={viewMode} onSimulatePhase={(inputs) => { applyPreset(inputs); setActiveTab('simulator_hub'); }} />
          <AIReviewCard section="roadmap" title="AI 90-day capex review" description="Sequence work using modeled INR and tCO2e only." {...reviewProps} />
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="animate-fadeIn space-y-8">
          <ComplianceHub kpiData={kpiData} stages={stages} facilityConfig={facilityConfig} onOpenBRSRModal={() => setIsBRSRModalOpen(true)} />
          <AIReviewCard section="compliance" title="AI BRSR gap review" description="Missing evidence stays UNKNOWN." {...reviewProps} />
        </div>
      )}

      {activeTab === 'carbon_credits' && (
        <div className="animate-fadeIn space-y-6">
          <CarbonCreditsHub kpiData={kpiData} facilityConfig={facilityConfig} onNavigateTab={setActiveTab} />
        </div>
      )}
    </BaseLayout>
  );
};
