import { useState, useEffect, useCallback } from 'react';
import {
  KPIData,
  ProcessStage,
  SliderInputs,
  TabId,
  ViewMode,
  SavedScenario,
  GoogleUser,
  FacilityConfig,
  AISettings,
} from '../types';
import { fetchSimulationResult } from '../lib/api';
import { calculateDynamicFacilitySimulation, DEFAULT_FACILITY_PRESETS } from '../lib/utils';

const INITIAL_SLIDERS: SliderInputs = {
  fuelShiftPct: 50,
  tempReductionPct: 5,
  pcrResinPct: 20,
  scrapRecyclePct: 100,
};

const DEFAULT_AI_SETTINGS: AISettings = {
  apiKey: '',
  model: 'gemini-1.5-flash',
  enableAutoAnalysis: true,
  temperature: 0.2,
};

const DEFAULT_GOOGLE_USER: GoogleUser = {
  id: 'g-default-1',
  name: 'Anmol Ghogare',
  email: 'anmol.ghogare@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  verified: true,
};

const BOY_FALLBACK_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
];

export function useDashboardData() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [viewMode, setViewMode] = useState<ViewMode>('carbon');
  const [sliderInputs, setSliderInputs] = useState<SliderInputs>(INITIAL_SLIDERS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBackendOnline, setIsBackendOnline] = useState<boolean>(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isBRSRModalOpen, setIsBRSRModalOpen] = useState<boolean>(false);
  const [isDataProvenanceModalOpen, setIsDataProvenanceModalOpen] = useState<boolean>(false);

  // Facility Configuration State with LocalStorage Persistence
  const [facilityConfig, setFacilityConfig] = useState<FacilityConfig>(() => {
    const saved = localStorage.getItem('byteme_facility_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore parse error
      }
    }
    return DEFAULT_FACILITY_PRESETS.apex_packaging;
  });

  // AI Configuration Settings with LocalStorage Persistence
  const [aiSettings, setAISettings] = useState<AISettings>(() => {
    const saved = localStorage.getItem('byteme_ai_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore parse error
      }
    }
    return DEFAULT_AI_SETTINGS;
  });

  const saveFacilityConfig = (newConfig: FacilityConfig) => {
    setFacilityConfig(newConfig);
    localStorage.setItem('byteme_facility_config', JSON.stringify(newConfig));
  };

  const saveAISettings = (newSettings: AISettings) => {
    setAISettings(newSettings);
    localStorage.setItem('byteme_ai_settings', JSON.stringify(newSettings));
  };

  // Google Authentication State
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState<boolean>(false);
  const [googleAccounts, setGoogleAccounts] = useState<GoogleUser[]>(() => {
    const saved = localStorage.getItem('byteme_google_users');
    if (saved) {
      try {
        const parsed: GoogleUser[] = JSON.parse(saved);
        return parsed.map((u, i) => ({
          ...u,
          avatar: !u.avatar || u.avatar.includes('dicebear')
            ? BOY_FALLBACK_AVATARS[i % BOY_FALLBACK_AVATARS.length]
            : u.avatar,
        }));
      } catch (e) {
        // ignore parse error
      }
    }
    return [DEFAULT_GOOGLE_USER];
  });
  const [activeGoogleUser, setActiveGoogleUser] = useState<GoogleUser | null>(() => {
    const saved = localStorage.getItem('byteme_active_google_user');
    if (saved) {
      try {
        const parsed: GoogleUser = JSON.parse(saved);
        return {
          ...parsed,
          avatar: !parsed.avatar || parsed.avatar.includes('dicebear')
            ? DEFAULT_GOOGLE_USER.avatar
            : parsed.avatar,
        };
      } catch (e) {
        // ignore parse error
      }
    }
    return DEFAULT_GOOGLE_USER;
  });

  const selectGoogleAccount = (user: GoogleUser) => {
    setActiveGoogleUser(user);
    localStorage.setItem('byteme_active_google_user', JSON.stringify(user));
  };

  const addGoogleAccount = (newUser: GoogleUser) => {
    setGoogleAccounts((prev) => {
      const exists = prev.some((u) => u.email.toLowerCase() === newUser.email.toLowerCase());
      const updated = exists
        ? prev.map((u) => (u.email.toLowerCase() === newUser.email.toLowerCase() ? newUser : u))
        : [newUser, ...prev];
      localStorage.setItem('byteme_google_users', JSON.stringify(updated));
      return updated;
    });
    selectGoogleAccount(newUser);
  };

  const signOutGoogleAccount = () => {
    setActiveGoogleUser(null);
    localStorage.removeItem('byteme_active_google_user');
  };

  // Judge Tour State
  const [isJudgeTourActive, setIsJudgeTourActive] = useState<boolean>(false);
  const [judgeTourStep, setJudgeTourStep] = useState<number>(0);

  // Saved Scenarios Sandbox State
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>(() => {
    const defaultA = calculateDynamicFacilitySimulation(facilityConfig, {
      fuelShiftPct: 50,
      tempReductionPct: 5,
      pcrResinPct: 20,
      scrapRecyclePct: 100,
    });
    const defaultB = calculateDynamicFacilitySimulation(facilityConfig, {
      fuelShiftPct: 80,
      tempReductionPct: 10,
      pcrResinPct: 35,
      scrapRecyclePct: 100,
    });
    return [
      {
        id: 'sc-1',
        name: 'Plan A: 50% Biomass Fuel Shift + 20% PCR Blend',
        sliderInputs: { fuelShiftPct: 50, tempReductionPct: 5, pcrResinPct: 20, scrapRecyclePct: 100 },
        savedKpi: defaultA.kpiData,
        createdAt: 'Just now',
        capexEst: '₹15,40,000',
        paybackMonths: '7.5 Months',
      },
      {
        id: 'sc-2',
        name: 'Plan B: Aggressive PNG Shift (80%) + Zero Waste',
        sliderInputs: { fuelShiftPct: 80, tempReductionPct: 10, pcrResinPct: 35, scrapRecyclePct: 100 },
        savedKpi: defaultB.kpiData,
        createdAt: '10 mins ago',
        capexEst: '₹35,00,000',
        paybackMonths: '10.0 Months',
      },
    ];
  });

  // Computed simulation state dynamically calculated from facilityConfig
  const [kpiData, setKpiData] = useState<KPIData>(
    () => calculateDynamicFacilitySimulation(facilityConfig, INITIAL_SLIDERS).kpiData
  );
  const [stages, setStages] = useState<ProcessStage[]>(
    () => calculateDynamicFacilitySimulation(facilityConfig, INITIAL_SLIDERS).stages
  );

  // Recalculate simulation state when sliders or facilityConfig change
  const recalculateSimulation = useCallback(async (inputs: SliderInputs, config: FacilityConfig) => {
    setIsLoading(true);
    const remoteResult = await fetchSimulationResult(inputs);

    if (remoteResult && config.id === 'apex_packaging') {
      setKpiData(remoteResult.kpiData);
      setStages(remoteResult.stages);
      setIsBackendOnline(true);
    } else {
      const localResult = calculateDynamicFacilitySimulation(config, inputs);
      setKpiData(localResult.kpiData);
      setStages(localResult.stages);
      setIsBackendOnline(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    recalculateSimulation(sliderInputs, facilityConfig);
  }, [sliderInputs, facilityConfig, recalculateSimulation]);

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
    { tab: 'admin', title: '1. Facility Admin & Onboarding', desc: 'Configure factory profiles, fuels, tariffs, and Gemini API connection in seconds.' },
    { tab: 'intake', title: '2. OCR Smart Bill Intake', desc: 'Drag-and-drop utility bills with laser scanning animation to auto-fill plant baselines.' },
    { tab: 'simulation', title: '3. Digital Twin Leak Hotspots', desc: 'Inspect particle stream connectors and expandable radial hotspot breakdown wheel.' },
    { tab: 'simulator_hub', title: '4. What-If Empirical Sliders', desc: 'Adjust fuel shifts and PCR resin substitution in real time.' },
    { tab: 'sandbox', title: '5. Scenario Sandbox Matrix', desc: 'Compare saved decarbonization plans side-by-side against baseline CAPEX and ROI.' },
    { tab: 'circular', title: '6. B2B Circular Waste Sankey', desc: 'Trace waste stream monetization between Factory A and regional buyer clusters.' },
    { tab: 'roadmap', title: '7. BRSR Regulatory Export', desc: 'Generate SEBI-compliant BRSR Core ESG audit packs in one click.' },
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
      setIsBRSRModalOpen(true);
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
    facilityConfig,
    saveFacilityConfig,
    aiSettings,
    saveAISettings,
    kpiData,
    stages,
    isLoading,
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
  };
}
