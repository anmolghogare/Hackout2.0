import { useState, useEffect, useCallback } from 'react';
import { KPIData, ProcessStage, SliderInputs, TabId, ViewMode } from '../types';
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
  };
}
