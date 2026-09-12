import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { BaseLayout } from '../components/layout/BaseLayout';
import { KPICards } from '../components/features/dashboard/KPICards';
import { ProcessSimulation } from '../components/features/dashboard/ProcessSimulation';
import { WhatIfSliders } from '../components/features/dashboard/WhatIfSliders';
import { CopilotPanel } from '../components/features/dashboard/CopilotPanel';
import { CircularNetwork } from '../components/features/dashboard/CircularNetwork';
import { RoadmapTable } from '../components/features/dashboard/RoadmapTable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Building2, Award, Zap, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const DashboardPage: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    sliderInputs,
    updateSlider,
    resetSliders,
    kpiData,
    stages,
    isBackendOnline,
  } = useDashboardData();

  return (
    <BaseLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      isBackendOnline={isBackendOnline}
    >
      {/* Top Metric Cards Bar (Always visible in dashboard shell) */}
      <KPICards kpiData={kpiData} />

      {/* Tab 1: Project Overview & Context Shell */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Facility Context Hero Card */}
          <Card className="bg-gradient-to-r from-emerald-900/20 via-slate-900/40 to-cyan-900/20 border-emerald-500/30">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Apex Packaging Pvt. Ltd. — Pune SME Facility</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                    Industrial Emission Leak-Point Intelligence & Circular Engine
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Automated thermal & material hotspot detection for manufacturing SMEs. Quantify carbon leak-points, run real-time what-if substitution simulations, and generate bankable ESG decarbonization roadmaps.
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
                  <Button
                    variant="primary"
                    onClick={() => setActiveTab('simulation')}
                    className="flex items-center space-x-2"
                  >
                    <span>View Leak Points</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('whatif')}
                  >
                    Run Simulation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Process Leak Hotspot Grid */}
          <ProcessSimulation stages={stages} />

          {/* What-If Simulation Controls Preview */}
          <WhatIfSliders
            sliderInputs={sliderInputs}
            onSliderChange={updateSlider}
            onReset={resetSliders}
          />
        </div>
      )}

      {/* Tab 2: Process Heatmap */}
      {activeTab === 'simulation' && (
        <div className="animate-fadeIn">
          <ProcessSimulation stages={stages} />
        </div>
      )}

      {/* Tab 3: What-If Sliders */}
      {activeTab === 'whatif' && (
        <div className="animate-fadeIn">
          <WhatIfSliders
            sliderInputs={sliderInputs}
            onSliderChange={updateSlider}
            onReset={resetSliders}
          />
        </div>
      )}

      {/* Tab 4: AI Sustainability Copilot */}
      {activeTab === 'copilot' && (
        <div className="animate-fadeIn">
          <CopilotPanel />
        </div>
      )}

      {/* Tab 5: B2B Waste Exchange */}
      {activeTab === 'circular' && (
        <div className="animate-fadeIn">
          <CircularNetwork />
        </div>
      )}

      {/* Tab 6: Financial ROI Matrix & Roadmap */}
      {activeTab === 'roadmap' && (
        <div className="animate-fadeIn">
          <RoadmapTable />
        </div>
      )}
    </BaseLayout>
  );
};
