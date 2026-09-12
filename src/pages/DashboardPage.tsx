import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { BaseLayout } from '../components/layout/BaseLayout';
import { KPICards } from '../components/features/dashboard/KPICards';
import { JudgeTourBanner } from '../components/features/dashboard/JudgeTourBanner';
import { OCRIntakeHub } from '../components/features/dashboard/OCRIntakeHub';
import { ProcessFlowCanvas } from '../components/features/dashboard/ProcessFlowCanvas';
import { WhatIfSliders } from '../components/features/dashboard/WhatIfSliders';
import { ScenarioSandbox } from '../components/features/dashboard/ScenarioSandbox';
import { CopilotPanel } from '../components/features/dashboard/CopilotPanel';
import { CopilotCommandModal } from '../components/features/dashboard/CopilotCommandModal';
import { BRSRExportModal } from '../components/features/dashboard/BRSRExportModal';
import { SankeyVisualizer } from '../components/features/dashboard/SankeyVisualizer';
import { CircularNetwork } from '../components/features/dashboard/CircularNetwork';
import { RoadmapTable } from '../components/features/dashboard/RoadmapTable';
import { Card, CardContent } from '../components/ui/Card';
import { Building2, ChevronRight, Command, Scan, FileCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';

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

  return (
    <BaseLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      viewMode={viewMode}
      onToggleViewMode={toggleViewMode}
      onOpenCopilotModal={() => setIsCopilotOpen(true)}
      onOpenBRSRModal={() => setIsBRSRModalOpen(true)}
      isBackendOnline={isBackendOnline}
    >
      {/* Top Guided "Judge Tour" Banner */}
      <JudgeTourBanner
        isActive={isJudgeTourActive}
        currentStep={judgeTourStep}
        steps={judgeTourSteps}
        onStart={startJudgeTour}
        onNext={nextJudgeTourStep}
        onStop={stopJudgeTour}
      />

      {/* Top Executive Metric Cards Bar */}
      <KPICards kpiData={kpiData} viewMode={viewMode} />

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

      {/* Tab 1: Project Overview & Hero Context */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Hero Banner */}
          <Card className="bg-gradient-to-r from-emerald-950/30 via-slate-900/60 to-cyan-950/30 border-emerald-500/30">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Apex Packaging Pvt. Ltd. — Pune SME Facility</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                    Industrial Emission Leak-Point Intelligence Platform
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Digital twin particle-stream visualization, real-time What-If empirical regression sliders, OCR bill scanner, and AI-powered circular economy trade matching for Indian SME manufacturers.
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
                  <Button
                    variant="primary"
                    onClick={() => setActiveTab('intake')}
                    className="flex items-center space-x-2"
                  >
                    <Scan className="w-4 h-4" />
                    <span>OCR Smart Bill Scanner</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsBRSRModalOpen(true)}
                    className="flex items-center space-x-2"
                  >
                    <FileCheck className="w-4 h-4 text-emerald-500" />
                    <span>BRSR PDF Audit Pack</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* OCR Intake Scanner */}
          <OCRIntakeHub />

          {/* Digital Twin Canvas */}
          <ProcessFlowCanvas stages={stages} viewMode={viewMode} />

          {/* What-If Sliders */}
          <WhatIfSliders
            sliderInputs={sliderInputs}
            onSliderChange={updateSlider}
            onReset={resetSliders}
            viewMode={viewMode}
          />

          {/* Scenario Sandbox Comparison Matrix */}
          <ScenarioSandbox
            scenarios={savedScenarios}
            onSaveCurrentScenario={saveScenario}
            onDeleteScenario={deleteScenario}
            onLoadScenario={applyPreset}
            viewMode={viewMode}
          />

          {/* Sankey Flow Visualizer */}
          <SankeyVisualizer viewMode={viewMode} />

          {/* Roadmap Table */}
          <RoadmapTable viewMode={viewMode} />
        </div>
      )}

      {/* Tab: OCR Scanner */}
      {activeTab === 'intake' && (
        <div className="animate-fadeIn">
          <OCRIntakeHub />
        </div>
      )}

      {/* Tab: Digital Twin Canvas */}
      {activeTab === 'simulation' && (
        <div className="animate-fadeIn">
          <ProcessFlowCanvas stages={stages} viewMode={viewMode} />
        </div>
      )}

      {/* Tab: What-If Sliders */}
      {activeTab === 'whatif' && (
        <div className="animate-fadeIn">
          <WhatIfSliders
            sliderInputs={sliderInputs}
            onSliderChange={updateSlider}
            onReset={resetSliders}
            viewMode={viewMode}
          />
        </div>
      )}

      {/* Tab: Scenario Sandbox */}
      {activeTab === 'sandbox' && (
        <div className="animate-fadeIn">
          <ScenarioSandbox
            scenarios={savedScenarios}
            onSaveCurrentScenario={saveScenario}
            onDeleteScenario={deleteScenario}
            onLoadScenario={applyPreset}
            viewMode={viewMode}
          />
        </div>
      )}

      {/* Tab: AI Copilot */}
      {activeTab === 'copilot' && (
        <div className="animate-fadeIn">
          <CopilotPanel />
        </div>
      )}

      {/* Tab: B2B Waste Sankey Network */}
      {activeTab === 'circular' && (
        <div className="animate-fadeIn space-y-8">
          <SankeyVisualizer viewMode={viewMode} />
          <CircularNetwork />
        </div>
      )}

      {/* Tab: ROI Matrix & Roadmap */}
      {activeTab === 'roadmap' && (
        <div className="animate-fadeIn">
          <RoadmapTable viewMode={viewMode} />
        </div>
      )}
    </BaseLayout>
  );
};
