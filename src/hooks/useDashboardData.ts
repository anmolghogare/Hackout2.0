import { useState, useEffect, useCallback } from 'react';
import { KPIData, ProcessStage, SliderInputs, TabId, ViewMode, SavedScenario } from '../types';
import { fetchSimulationResult } from '../lib/api';
import { calculateLocalSimulation } from '../lib/utils';

const INITIAL_SLIDERS: SliderInputs = {
  fuelShiftPct: 50,
  tempReductionPct: 5,
  pcrResinPct: 20,
  scrapRecyclePct: 100,
};

export function useDashboardData() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [viewMode, setViewMode] = useState<ViewMode>('carbon');
  const [sliderInputs, setSliderInputs] = useState<SliderInputs>(INITIAL_SLIDERS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBackendOnline, setIsBackendOnline] = useState<boolean>(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isBRSRModalOpen, setIsBRSRModalOpen] = useState<boolean>(false);

  // Judge Tour State
  const [isJudgeTourActive, setIsJudgeTourActive] = useState<boolean>(false);
  const [judgeTourStep, setJudgeTourStep] = useState<number>(0);

  // Saved Scenarios Sandbox State
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([
    {
      id: 'sc-1',
      name: 'Plan A: 50% Biomass Fuel Shift + 20% PCR Blend',
      sliderInputs: { fuelShiftPct: 50, tempReductionPct: 5, pcrResinPct: 20, scrapRecyclePct: 100 },
      savedKpi: calculateLocalSimulation({ fuelShiftPct: 50, tempReductionPct: 5, pcrResinPct: 20, scrapRecyclePct: 100 }).kpiData,
      createdAt: 'Just now',
      capexEst: '₹15,40,000',
      paybackMonths: '7.5 Months',
    },
    {
      id: 'sc-2',
      name: 'Plan B: Aggressive PNG Shift (80%) + Zero Waste',
      sliderInputs: { fuelShiftPct: 80, tempReductionPct: 10, pcrResinPct: 35, scrapRecyclePct: 100 },
      savedKpi: calculateLocalSimulation({ fuelShiftPct: 80, tempReductionPct: 10, pcrResinPct: 35, scrapRecyclePct: 100 }).kpiData,
      createdAt: '10 mins ago',
      capexEst: '₹35,00,000',
      paybackMonths: '10.0 Months',
    },
  ]);

  // Computed simulation state
  const [kpiData, setKpiData] = useState<KPIData>(() => calculateLocalSimulation(INITIAL_SLIDERS).kpiData);
  const [stages, setStages] = useState<ProcessStage[]>(() => calculateLocalSimulation(INITIAL_SLIDERS).stages);

  // Recalculate simulation state when sliders change
  const recalculateSimulation = useCallback(async (inputs: SliderInputs) => {
    setIsLoading(true);
    const remoteResult = await fetchSimulationResult(inputs);
    
    if (remoteResult) {
      setKpiData(remoteResult.kpiData);
      setStages(remoteResult.stages);
      setIsBackendOnline(true);
    } else {
      const localResult = calculateLocalSimulation(inputs);
      setKpiData(localResult.kpiData);
      setStages(localResult.stages);
      setIsBackendOnline(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    recalculateSimulation(sliderInputs);
  }, [sliderInputs, recalculateSimulation]);

  const updateSlider = (key: keyof SliderInputs, value: number) => {
    setSliderInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyPreset = (preset: Partial<SliderInputs>) => {
    setSliderInputs((prev) => ({
      ...prev,
      ...preset,
    }));
  };

  const resetSliders = () => {
    setSliderInputs(INITIAL_SLIDERS);
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'carbon' ? 'financial' : 'carbon'));
  };

  const saveScenario = (name: string) => {
    const newScenario: SavedScenario = {
      id: `sc-${Date.now()}`,
      name: name || `Custom Sandbox Plan (${savedScenarios.length + 1})`,
      sliderInputs: { ...sliderInputs },
      savedKpi: { ...kpiData },
      createdAt: 'Just now',
      capexEst: sliderInputs.fuelShiftPct > 60 ? '₹35,00,000' : '₹15,40,000',
      paybackMonths: '8.2 Months',
    };
    setSavedScenarios((prev) => [newScenario, ...prev]);
  };

  const deleteScenario = (id: string) => {
    setSavedScenarios((prev) => prev.filter((s) => s.id !== id));
  };

  // Automated 3-Min Judge Demo Flow
  const judgeTourSteps: { tab: TabId; title: string; desc: string }[] = [
    { tab: 'intake', title: '1. OCR Smart Bill Intake', desc: 'Drag-and-drop utility bills with laser scanning animation to auto-fill plant baselines.' },
    { tab: 'simulation', title: '2. Digital Twin Leak Hotspots', desc: 'Inspect particle stream connectors and expandable radial hotspot breakdown wheel.' },
    { tab: 'whatif', title: '3. What-If Empirical Sliders', desc: 'Adjust fuel shifts and PCR resin substitution in real time.' },
    { tab: 'sandbox', title: '4. Scenario Sandbox Matrix', desc: 'Compare saved decarbonization plans side-by-side against baseline CAPEX and ROI.' },
    { tab: 'circular', title: '5. B2B Circular Waste Sankey', desc: 'Trace waste stream monetization between Factory A and regional buyer clusters.' },
    { tab: 'roadmap', title: '6. BRSR Regulatory Export', desc: 'Generate SEBI-compliant BRSR Core ESG audit packs in one click.' },
  ];

  const startJudgeTour = () => {
    setIsJudgeTourActive(true);
    setJudgeTourStep(0);
    setActiveTab(judgeTourSteps[0].tab);
  };

  const nextJudgeTourStep = () => {
    if (judgeTourStep < judgeTourSteps.length - 1) {
      const nextIdx = judgeTourStep + 1;
      setJudgeTourStep(nextIdx);
      setActiveTab(judgeTourSteps[nextIdx].tab);
    } else {
      setIsJudgeTourActive(false);
      setIsBRSRModalOpen(true); // Open BRSR export modal at tour end
    }
  };

  const stopJudgeTour = () => {
    setIsJudgeTourActive(false);
  };

  return {
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    toggleViewMode,
    sliderInputs,
    updateSlider,
    applyPreset,
    resetSliders,
    kpiData,
    stages,
    isLoading,
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
  };
}
