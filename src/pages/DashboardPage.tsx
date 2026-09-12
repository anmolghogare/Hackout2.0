import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { BaseLayout } from '../components/layout/BaseLayout';
import { KPICards } from '../components/features/dashboard/KPICards';
import { ProcessFlowCanvas } from '../components/features/dashboard/ProcessFlowCanvas';
import { WhatIfSliders } from '../components/features/dashboard/WhatIfSliders';
import { CopilotPanel } from '../components/features/dashboard/CopilotPanel';
import { CopilotCommandModal } from '../components/features/dashboard/CopilotCommandModal';
import { SankeyVisualizer } from '../components/features/dashboard/SankeyVisualizer';
import { CircularNetwork } from '../components/features/dashboard/CircularNetwork';
import { RoadmapTable } from '../components/features/dashboard/RoadmapTable';
import { Card, CardContent } from '../components/ui/Card';
import { Building2, ChevronRight, Sparkles, Command } from 'lucide-react';
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
  } = useDashboardData();

  return (
    <BaseLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      viewMode={viewMode}
      onToggleViewMode={toggleViewMode}
      onOpenCopilotModal={() => setIsCopilotOpen(true)}
      isBackendOnline={isBackendOnline}
    >
      {/* Top Executive Metric Cards Bar */}
      <KPICards kpiData={kpiData} viewMode={viewMode} />

      {/* Global AI Command Modal (Cmd + K) */}
      <CopilotCommandModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onApplyPreset={applyPreset}
        viewMode={viewMode}
      />

      {/* Tab 1: Project Overview & Digital Twin Context Shell */}
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
                    Digital twin particle-stream visualization, real-time What-If empirical regression sliders, and AI-powered circular economy trade matching for Indian SME manufacturers.
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
                  <Button
                    variant="primary"
                    onClick={() => setActiveTab('simulation')}
                    className="flex items-center space-x-2"
                  >
                    <span>View Digital Twin Canvas</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsCopilotOpen(true)}
                    className="flex items-center space-x-2"
                  >
                    <Command className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Cmd + K AI Copilot</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Functionality 1 & 2: Digital Twin Process Flow Canvas & Red Alert Engine */}
          <ProcessFlowCanvas stages={stages} viewMode={viewMode} />

          {/* Functionality 4: What-If Empirical Controls */}
          <WhatIfSliders
            sliderInputs={sliderInputs}
            onSliderChange={updateSlider}
            onReset={resetSliders}
            viewMode={viewMode}
          />

          {/* Functionality 5: B2B Circular Sankey Flow Visualizer */}
          <SankeyVisualizer viewMode={viewMode} />

          {/* Executive Impact Matrix Table */}
          <RoadmapTable viewMode={viewMode} />
        </div>
      )}

      {/* Tab 2: Digital Twin Canvas */}
      {activeTab === 'simulation' && (
        <div className="animate-fadeIn">
          <ProcessFlowCanvas stages={stages} viewMode={viewMode} />
        </div>
      )}

      {/* Tab 3: What-If Sliders */}
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

      {/* Tab 4: AI Sustainability Copilot */}
      {activeTab === 'copilot' && (
        <div className="animate-fadeIn">
          <CopilotPanel />
        </div>
      )}

      {/* Tab 5: B2B Waste Sankey Network */}
      {activeTab === 'circular' && (
        <div className="animate-fadeIn space-y-8">
          <SankeyVisualizer viewMode={viewMode} />
          <CircularNetwork />
        </div>
      )}

      {/* Tab 6: Financial ROI Matrix & Roadmap */}
      {activeTab === 'roadmap' && (
        <div className="animate-fadeIn">
          <RoadmapTable viewMode={viewMode} />
        </div>
      )}
    </BaseLayout>
  );
};
