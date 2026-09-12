import React, { useState } from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { BaseLayout } from '../components/layout/BaseLayout';
import { ByteMeOverview } from '../components/features/overview/ByteMeOverview';
import { ViewHeaderBanner } from '../components/ui/ViewHeaderBanner';
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
import { Zap, Activity, Flame, Scan, Layers, Recycle, BarChart3 } from 'lucide-react';

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
          <ViewHeaderBanner
            category="WHAT-IF SIMULATION & WATERFALL ENGINE"
            title="Unified What-If Simulator & Live ROI Hub"
            description="Dynamically simulate operational decarbonization levers for Indian packaging SMEs. Adjust fuel shifts, temperature setpoints, and PCR resin blends to calculate real-time carbon abatement and financial cash flow."
            howToInteract={[
              'Drag operational sliders or click preset chips',
              'Toggle Before/After split view to inspect deltas',
              'Examine cost attribution across waterfall steps',
              'Switch between Carbon (tCO₂e) and Financial (₹ INR) mode',
            ]}
            keyMetrics={[
              { label: 'Net Annual ROI', value: '₹6,50,000 / yr', hint: 'Payback ~10.5 mo' },
              { label: 'CO₂ Abatement', value: '-28.8 Tons', hint: 'Net abatement' },
              { label: 'Fuel Shift Lever', value: '50% Biomass', hint: 'Thermal load' },
            ]}
            icon={Zap}
            badgeText="Live Recalculation"
            badgeVariant="emerald"
          />
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
          <ViewHeaderBanner
            category="HOTSPOT DIAGNOSTICS & 3D SENSORS"
            title="Thermal Analytics & 3D Hotspot Heatmap Engine"
            description="High-fidelity sensor telemetry for industrial heating processes. Pinpoint high-temperature burner overshoots, uninsulated shell dissipation, and motor load spikes with AI anomaly detection."
            howToInteract={[
              'Rotate and zoom the 3D furnace thermal gradient',
              'Inspect temperature distribution histograms',
              'Filter anomaly events by priority level',
              'Trigger autonomous AI anomaly diagnostics',
            ]}
            keyMetrics={[
              { label: 'Peak Burner Temp', value: '1,418°C', hint: 'Threshold: 1,350°C' },
              { label: 'Thermal Leak Rate', value: '48 tCO₂e / mo', hint: 'Stage 02 Furnace' },
              { label: 'Active Alert', value: 'Priority 1 (Red)', hint: 'Immediate action' },
            ]}
            icon={Activity}
            badgeText="3D Telemetry"
            badgeVariant="rose"
          />
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
          <ViewHeaderBanner
            category="INTELLIGENT DATA INGESTION"
            title="OCR Smart Utility Bill Scanner"
            description="Automated invoice parsing pipeline for industrial utility consumption. Ingest scanned electricity, heavy furnace oil, and natural gas bills into verified GHG Scope 1 & 2 carbon factors."
            howToInteract={[
              'Drag and drop utility invoice PDF/image or load sample bill',
              'Review OCR bounding box detection and extracted data fields',
              'Inspect auto-calculated tCO₂e emission factors',
              'Commit extracted telemetry into facility accounting ledger',
            ]}
            keyMetrics={[
              { label: 'OCR Confidence', value: '98.4%', hint: 'Tesseract + Claude OCR' },
              { label: 'Supported Invoices', value: 'Electricity, HFO, PNG', hint: 'Utility types' },
              { label: 'Ingestion Time', value: '< 1.5s', hint: 'Pre-indexed' },
            ]}
            icon={Scan}
            badgeText="Automated Intake"
            badgeVariant="purple"
          />
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
          <ViewHeaderBanner
            category="SCENARIO DECISION MATRIX"
            title="Decarbonization Scenario Comparison Sandbox"
            description="Side-by-side sensitivity modeling for executive committees. Contrast baseline facility operations against aggressive Net-Zero, moderate capital, or regulatory minimum compliance scenarios."
            howToInteract={[
              'Save your active simulator configuration as a named scenario',
              'Compare side-by-side emissions, CAPEX, and annual savings',
              'Click Load to instantly test any saved scenario in the playground',
              'Delete or duplicate scenarios to refine your multi-year strategy',
            ]}
            keyMetrics={[
              { label: 'Comparison Limit', value: 'Up to 4 Scenarios', hint: 'Side-by-side' },
              { label: 'Best Net Savings', value: '₹9.2 Lakhs / yr', hint: 'Aggressive 2030' },
              { label: 'Risk Sensitivity', value: 'High Accuracy', hint: 'Regressed matrix' },
            ]}
            icon={Layers}
            badgeText="Comparative Matrix"
            badgeVariant="amber"
          />
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
          <ViewHeaderBanner
            category="CIRCULAR LOGISTICS & BYPRODUCT TRADING"
            title="B2B Waste Stream Sankey & Industrial Cluster Network"
            description="Monetize industrial off-cut trims and secondary polymers. Visualize waste stream diversions from municipal landfills directly into profitable off-take contracts with verified regional partners."
            howToInteract={[
              'Hover over Sankey diversion paths to inspect tonnages',
              'Click partner nodes on the geographic cluster map',
              'Draft instant B2B scrap off-take commercial contracts',
              'Calculate avoided Scope 3 downstream landfill emissions',
            ]}
            keyMetrics={[
              { label: 'Scrap Diverted', value: '12 Tons / mo', hint: '100% diverted' },
              { label: 'Byproduct Revenue', value: '₹3,00,000 / yr', hint: '₹25,000 / Ton' },
              { label: 'Verified Partners', value: '4 SME Facilities', hint: 'Pune industrial cluster' },
            ]}
            icon={Recycle}
            badgeText="B2B Off-Take"
            badgeVariant="cyan"
          />
          <SankeyVisualizer viewMode={viewMode} />
          <CircularNetwork />
        </div>
      )}

      {/* ============================================================ */}
      {/* 9. FUNCTIONAL VIEW: ROI ROADMAP & SEBI BRSR AUDIT */}
      {/* ============================================================ */}
      {activeTab === 'roadmap' && (
        <div className="animate-fadeIn space-y-6">
          <ViewHeaderBanner
            category="COMPLIANCE & CAPITAL ALLOCATION"
            title="Financial ROI Roadmap & SEBI BRSR Audit Matrix"
            description="Prioritized multi-year intervention matrix with financial payback horizons and regulatory alignment. Seamlessly fulfills SEBI BRSR Principle 6 Core and ISO 14064 verification requirements."
            howToInteract={[
              'Filter interventions by payback period, difficulty, and scope',
              'Check implementation timelines across immediate and multi-year phases',
              'Verify regulatory citations for SEBI BRSR Principle 6',
              'Click Export to generate an executive PDF audit dossier',
            ]}
            keyMetrics={[
              { label: 'Interventions', value: '4 Strategic Actions', hint: 'Prioritized order' },
              { label: 'Blended Payback', value: '6.8 Months', hint: 'Under 1 year' },
              { label: 'Compliance Status', value: 'ISO 14064 Ready', hint: 'Principle 6 Core' },
            ]}
            icon={BarChart3}
            badgeText="Audit Ready"
            badgeVariant="emerald"
          />
          <RoadmapTable viewMode={viewMode} />
        </div>
      )}
    </BaseLayout>
  );
};
