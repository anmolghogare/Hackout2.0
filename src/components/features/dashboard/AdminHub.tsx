import React, { useState } from 'react';
import { FacilityConfig, AISettings, TabId } from '../../../types';
import { DEFAULT_FACILITY_PRESETS, formatINR, formatINRLakhs, calculateDynamicFacilitySimulation } from '../../../lib/utils';
import {
  Building2,
  Flame,
  Zap,
  Recycle,
  Layers,
  Sparkles,
  Save,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Brain,
  Sliders,
  Download,
  Gauge,
  Activity,
  ShieldAlert,
  ArrowRight,
  Bot,
  RefreshCw,
  Play,
} from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface AdminHubProps {
  currentConfig: FacilityConfig;
  onSaveConfig: (newConfig: FacilityConfig) => void;
  aiSettings: AISettings;
  onSaveAISettings: (newSettings: AISettings) => void;
  onNavigateTab: (tab: TabId) => void;
  onOpenProvenanceModal: () => void;
}

export const AdminHub: React.FC<AdminHubProps> = ({
  currentConfig,
  onSaveConfig,
  aiSettings,
  onSaveAISettings,
  onNavigateTab,
  onOpenProvenanceModal,
}) => {
  const [formConfig, setFormConfig] = useState<FacilityConfig>(() => JSON.parse(JSON.stringify(currentConfig)));
  const [activeSection, setActiveSection] = useState<'profile' | 'stages' | 'financial' | 'ai'>('profile');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);

  const handleProfileChange = (field: keyof typeof formConfig.profile, value: any) => {
    setFormConfig((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  const handleStage1Change = (field: keyof typeof formConfig.stage1, value: any) => {
    setFormConfig((prev) => ({
      ...prev,
      stage1: {
        ...prev.stage1,
        [field]: typeof value === 'number' ? Number(value) : value,
      },
    }));
  };

  const handleStage2Change = (field: keyof typeof formConfig.stage2, value: any) => {
    setFormConfig((prev) => ({
      ...prev,
      stage2: {
        ...prev.stage2,
        [field]: typeof value === 'number' ? Number(value) : value,
      },
    }));
  };

  const handleStage3Change = (field: keyof typeof formConfig.stage3, value: any) => {
    setFormConfig((prev) => ({
      ...prev,
      stage3: {
        ...prev.stage3,
        [field]: typeof value === 'number' ? Number(value) : value,
      },
    }));
  };

  const handleStage4Change = (field: keyof typeof formConfig.stage4, value: any) => {
    setFormConfig((prev) => ({
      ...prev,
      stage4: {
        ...prev.stage4,
        [field]: typeof value === 'number' ? Number(value) : value,
      },
    }));
  };

  const handleFinancialChange = (field: keyof typeof formConfig.financial, value: any) => {
    setFormConfig((prev) => ({
      ...prev,
      financial: {
        ...prev.financial,
        [field]: typeof value === 'number' ? Number(value) : value,
      },
    }));
  };

  const handleLoadPreset = (presetKey: string) => {
    const selected = DEFAULT_FACILITY_PRESETS[presetKey];
    if (selected) {
      setFormConfig(JSON.parse(JSON.stringify(selected)));
      showFlashMessage(`Loaded preset: ${selected.profile.name}`);
    }
  };

  const handleResetToCurrent = () => {
    setFormConfig(JSON.parse(JSON.stringify(currentConfig)));
    showFlashMessage('Reset form to active facility configuration.');
  };

  const handleSaveAll = () => {
    const updated = {
      ...formConfig,
      updatedAt: new Date().toISOString(),
    };
    onSaveConfig(updated);
    showFlashMessage('Facility parameters successfully saved & live telemetry recalculated!');
  };

  const showFlashMessage = (msg: string) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => {
      setSaveSuccessMessage(null);
    }, 4500);
  };

  const liveSimulation = calculateDynamicFacilitySimulation(formConfig, {
    fuelShiftPct: 50,
    tempReductionPct: 5,
    pcrResinPct: 20,
    scrapRecyclePct: 100,
  });

  const calculateFacilityHealthScore = () => {
    let score = 55;
    if (formConfig.stage2.thermalEfficiencyPct >= 75) score += 15;
    else if (formConfig.stage2.thermalEfficiencyPct >= 60) score += 8;

    if (formConfig.stage3.powerFactor >= 0.95) score += 12;
    else if (formConfig.stage3.powerFactor >= 0.90) score += 6;

    if (formConfig.stage3.rooftopSolarKWp > 0) score += 8;
    if (formConfig.stage1.recycledPcrAvailablePct >= 20) score += 5;
    if (formConfig.stage4.monthlyScrapTons > 0) score += 5;
    return Math.min(100, score);
  };

  const healthScore = calculateFacilityHealthScore();

  const handleRunAIAudit = () => {
    setIsAnalyzingAI(true);
    setTimeout(() => {
      setIsAnalyzingAI(false);
      showFlashMessage(`AI Audit generated! Facility Decarbonization Score: ${healthScore}/100`);
    }, 900);
  };

  const handleApplyAIRecommendedStrategy = () => {
    setFormConfig((prev) => ({
      ...prev,
      stage1: { ...prev.stage1, recycledPcrAvailablePct: Math.max(25, prev.stage1.recycledPcrAvailablePct) },
      stage2: { ...prev.stage2, fuelType: 'Biomass Briquettes', thermalEfficiencyPct: Math.max(78, prev.stage2.thermalEfficiencyPct) },
      stage3: { ...prev.stage3, powerFactor: 0.98, rooftopSolarKWp: Math.max(75, prev.stage3.rooftopSolarKWp) },
      stage4: { ...prev.stage4, recyclerSellingRatePerTonINR: Math.max(22000, prev.stage4.recyclerSellingRatePerTonINR) },
    }));
    showFlashMessage('AI-recommended parameters applied to form. Click "Save & Recalculate" to activate.');
  };

  const handleDownloadAuditReport = () => {
    const reportText = `===================================================================
BYTEME INDUSTRIAL DECARBONIZATION AI EXECUTIVE AUDIT REPORT
Facility Name: ${formConfig.profile.name}
Sector: ${formConfig.profile.sector}
Location: ${formConfig.profile.location} (${formConfig.profile.cluster})
Generated At: ${new Date().toLocaleString('en-IN')}
===================================================================

1. EXECUTIVE DECARBONIZATION HEALTH SCORE: ${healthScore} / 100
2. BASELINE MONTHLY CARBON EMISSIONS: ${liveSimulation.kpiData.baselineMonthlyCO2} tCO2e / month
3. BASELINE MONTHLY ENERGY & MATERIAL SPEND: ${formatINRLakhs(liveSimulation.kpiData.baselineMonthlyCostINR || 2850000)} / month
4. ESTIMATED ANNUAL CARBON TAX RISK: ${formatINRLakhs(Math.round(liveSimulation.kpiData.baselineMonthlyCO2 * 12 * 850))} / year

5. STAGE AUDIT FINDINGS:
- Stage 1 Raw Material: ${formConfig.stage1.materialName} (${formConfig.stage1.monthlyVolumeTons} T/mo). PCR Blend: ${formConfig.stage1.recycledPcrAvailablePct}%.
- Stage 2 Thermal Combustion: Primary Fuel: ${formConfig.stage2.fuelType} @ ${formConfig.stage2.furnaceOperatingTempC}°C. Efficiency: ${formConfig.stage2.thermalEfficiencyPct}%.
- Stage 3 Electricity Grid: Draw: ${formConfig.stage3.monthlyElectricityKWh.toLocaleString()} kWh @ ₹${formConfig.stage3.gridTariffPerKWhINR}/kWh (CEA Baseline Factor: 0.82). Solar: ${formConfig.stage3.rooftopSolarKWp} kWp.
- Stage 4 Circular Scrap: ${formConfig.stage4.monthlyScrapTons} T/mo of ${formConfig.stage4.scrapTypeName}. Offtake rate: ₹${formConfig.stage4.recyclerSellingRatePerTonINR}/T.

6. STATUTORY REGULATORY STANDARDS:
- CEA India Grid Baseline Database Ver. 19.0 (0.82 kgCO2e/kWh)
- IPCC 2006 Guidelines for National Greenhouse Gas Inventories
- CPCB Plastic Waste Management Rules 2022 (Schedule II EPR)
- SEBI BRSR Core Circular (SEBI/HO/CFD/CFD-SEC-2/P/CIR/2023/122)
===================================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI_Audit_Report_${formConfig.profile.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showFlashMessage('AI Decarbonization Audit Report downloaded!');
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 font-sans">
      {/* 1. CLEAN HEADER & PRESET SELECTOR */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                Facility Configuration
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Live Parameter Telemetry
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Factory Parameters & Onboarding Setup
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Configure plant materials, combustion fuels, electricity tariffs, and byproduct scrap streams. The engine recalculates your carbon baseline and ROI automatically.
            </p>
          </div>

          {/* Clean SME Preset Pills */}
          <div className="flex flex-col space-y-2 shrink-0">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Load Facility Preset:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleLoadPreset('apex_packaging')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                Apex Packaging (Pune)
              </button>
              <button
                type="button"
                onClick={() => handleLoadPreset('rajkot_forging')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                Rajkot Forging (Gujarat)
              </button>
              <button
                type="button"
                onClick={() => handleLoadPreset('surat_textiles')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                Surat Textiles (Dyeing)
              </button>
            </div>
          </div>
        </div>

        {/* Flash Notification */}
        {saveSuccessMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-medium">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{saveSuccessMessage}</span>
            </div>
            <button
              onClick={() => onNavigateTab('simulator_hub')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center space-x-1"
            >
              <span>View Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 2. SECTION TABS BAR */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveSection('profile')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2',
            activeSection === 'profile'
              ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          )}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>1. Plant Profile & Shifts</span>
        </button>

        <button
          onClick={() => setActiveSection('stages')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2',
            activeSection === 'stages'
              ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          )}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>2. Stage 1–4 Energy & Materials</span>
        </button>

        <button
          onClick={() => setActiveSection('financial')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2',
            activeSection === 'financial'
              ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          )}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>3. Financial & Capex Context</span>
        </button>

        <button
          onClick={() => setActiveSection('ai')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2',
            activeSection === 'ai'
              ? 'bg-emerald-600 text-white shadow-sm font-bold'
              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
          )}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>4. AI Decarbonization Review</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: PLANT PROFILE & SHIFTS */}
      {/* ========================================================================= */}
      {activeSection === 'profile' && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Plant Profile & Operating Rhythm
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Specify business registration, industrial sector, and production schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Facility / Company Name</label>
              <input
                type="text"
                value={formConfig.profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Industrial Sector</label>
              <select
                value={formConfig.profile.sector}
                onChange={(e) => handleProfileChange('sector', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Plastic & Polymer Extrusion">Plastic & Polymer Extrusion</option>
                <option value="Automotive Metal Forging">Automotive Metal Forging</option>
                <option value="Textile & Dyeing">Textile & Dyeing</option>
                <option value="Chemical & Agrochem">Chemical & Agrochem</option>
                <option value="Food & Agro Processing">Food & Agro Processing</option>
                <option value="Custom SME">Custom SME Manufacturing</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Location / Industrial Zone</label>
              <input
                type="text"
                value={formConfig.profile.location}
                onChange={(e) => handleProfileChange('location', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Operating Shifts per Day</label>
              <input
                type="number"
                min={1}
                max={3}
                value={formConfig.profile.shiftsPerDay}
                onChange={(e) => handleProfileChange('shiftsPerDay', parseInt(e.target.value, 10) || 1)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Working Days per Month</label>
              <input
                type="number"
                min={20}
                max={31}
                value={formConfig.profile.workingDaysPerMonth}
                onChange={(e) => handleProfileChange('workingDaysPerMonth', parseInt(e.target.value, 10) || 26)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Annual Revenue Turnover (INR)</label>
              <input
                type="text"
                value={formConfig.profile.annualTurnoverINR}
                onChange={(e) => handleProfileChange('annualTurnoverINR', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: STAGES 1-4 ENERGY & MATERIALS */}
      {/* ========================================================================= */}
      {activeSection === 'stages' && (
        <div className="space-y-6">
          {/* Stage 1 & 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stage 1 */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Stage 01: Raw Material & Polymer Feedstock
                </h3>
                <span className="text-xs text-slate-400 font-mono">Scope 3 Upstream</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Material Name</label>
                  <input
                    type="text"
                    value={formConfig.stage1.materialName}
                    onChange={(e) => handleStage1Change('materialName', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Monthly Volume (Tons)</label>
                  <input
                    type="number"
                    value={formConfig.stage1.monthlyVolumeTons}
                    onChange={(e) => handleStage1Change('monthlyVolumeTons', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Virgin Material Cost (₹ / Ton)</label>
                  <input
                    type="number"
                    value={formConfig.stage1.costPerTonINR}
                    onChange={(e) => handleStage1Change('costPerTonINR', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Available PCR Recycled (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={formConfig.stage1.recycledPcrAvailablePct}
                    onChange={(e) => handleStage1Change('recycledPcrAvailablePct', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Stage 02: Thermal Combustion & Furnace
                </h3>
                <span className="text-xs text-slate-400 font-mono">Scope 1 Direct</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Primary Fuel Type</label>
                  <select
                    value={formConfig.stage2.fuelType}
                    onChange={(e) => handleStage2Change('fuelType', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  >
                    <option value="Heavy Furnace Oil">Heavy Furnace Oil (HFO)</option>
                    <option value="PNG Natural Gas">PNG Natural Gas</option>
                    <option value="High Speed Diesel">High Speed Diesel (HSD)</option>
                    <option value="Biomass Briquettes">Agro-Biomass Briquettes</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Monthly Fuel (Liters/SCM)</label>
                  <input
                    type="number"
                    value={formConfig.stage2.monthlyFuelConsumption}
                    onChange={(e) => handleStage2Change('monthlyFuelConsumption', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Operating Temperature (°C)</label>
                  <input
                    type="number"
                    value={formConfig.stage2.furnaceOperatingTempC}
                    onChange={(e) => handleStage2Change('furnaceOperatingTempC', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Thermal Efficiency (%)</label>
                  <input
                    type="number"
                    min={20}
                    max={95}
                    value={formConfig.stage2.thermalEfficiencyPct}
                    onChange={(e) => handleStage2Change('thermalEfficiencyPct', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stage 3 & 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stage 3 */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Stage 03: Extrusion Electricity & Grid
                </h3>
                <span className="text-xs text-slate-400 font-mono">Scope 2 Indirect</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Monthly Electricity (kWh)</label>
                  <input
                    type="number"
                    value={formConfig.stage3.monthlyElectricityKWh}
                    onChange={(e) => handleStage3Change('monthlyElectricityKWh', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Grid Tariff (₹ / kWh)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formConfig.stage3.gridTariffPerKWhINR}
                    onChange={(e) => handleStage3Change('gridTariffPerKWhINR', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Rooftop Solar (kWp)</label>
                  <input
                    type="number"
                    value={formConfig.stage3.rooftopSolarKWp}
                    onChange={(e) => handleStage3Change('rooftopSolarKWp', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Power Factor (0.80 - 1.0)</label>
                  <input
                    type="number"
                    step="0.01"
                    min={0.8}
                    max={1.0}
                    value={formConfig.stage3.powerFactor}
                    onChange={(e) => handleStage3Change('powerFactor', parseFloat(e.target.value) || 0.95)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Stage 04: Byproduct Scrap & Circular Off-Take
                </h3>
                <span className="text-xs text-slate-400 font-mono">Circular EPR</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Scrap Type</label>
                  <input
                    type="text"
                    value={formConfig.stage4.scrapTypeName}
                    onChange={(e) => handleStage4Change('scrapTypeName', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Monthly Scrap (Tons)</label>
                  <input
                    type="number"
                    value={formConfig.stage4.monthlyScrapTons}
                    onChange={(e) => handleStage4Change('monthlyScrapTons', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Recycler Sale Rate (₹ / Ton)</label>
                  <input
                    type="number"
                    value={formConfig.stage4.recyclerSellingRatePerTonINR}
                    onChange={(e) => handleStage4Change('recyclerSellingRatePerTonINR', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-300">Landfill Disposal Fee (₹ / Ton)</label>
                  <input
                    type="number"
                    value={formConfig.stage4.disposalOrLandfillCostPerTonINR}
                    onChange={(e) => handleStage4Change('disposalOrLandfillCostPerTonINR', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: FINANCIAL & CAPEX CONTEXT */}
      {/* ========================================================================= */}
      {activeSection === 'financial' && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Financial Context & CapEx Hurdle Rates
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Parameters used by the ROI and Payback simulation engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Available CapEx Budget (₹ INR)</label>
              <input
                type="number"
                value={formConfig.financial.availableCapexBudgetINR}
                onChange={(e) => handleFinancialChange('availableCapexBudgetINR', parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Max Payback Threshold (Months)</label>
              <input
                type="number"
                value={formConfig.financial.maxPaybackThresholdMonths}
                onChange={(e) => handleFinancialChange('maxPaybackThresholdMonths', parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Cost of Capital / WACC (%)</label>
              <input
                type="number"
                step="0.1"
                value={formConfig.financial.costOfCapitalPct}
                onChange={(e) => handleFinancialChange('costOfCapitalPct', parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: INTEGRATED AI DECARBONIZATION AUDIT STUDIO */}
      {/* ========================================================================= */}
      {activeSection === 'ai' && (
        <div className="space-y-8">
          {/* Top AI Action Banner */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Deterministic AI Decarbonization Review
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pre-configured intelligence analyzing parameters against IPCC 2006 & CEA standards.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleRunAIAudit}
                disabled={isAnalyzingAI}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-sm flex items-center space-x-1.5"
              >
                {isAnalyzingAI ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run AI Audit</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleApplyAIRecommendedStrategy}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition-colors"
              >
                1-Click Apply AI Targets
              </button>

              <button
                type="button"
                onClick={handleDownloadAuditReport}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Audit</span>
              </button>
            </div>
          </div>

          {/* 3 Unified Scorecards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-3">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">DECARBONIZATION HEALTH SCORE</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {healthScore}
                </span>
                <span className="text-xs text-slate-400 font-mono">/ 100</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-medium">
                  {healthScore >= 80 ? 'Grade A+: Leader' : 'Grade A: Ready'}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono block">BEE PAT Thermal Benchmark Verified</span>
            </div>

            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-3">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">MONTHLY BASELINE FOOTPRINT</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white">
                  {liveSimulation.kpiData.baselineMonthlyCO2}
                </span>
                <span className="text-xs text-slate-500 font-mono">tCO₂e / mo</span>
              </div>
              <span className="text-xs text-slate-400 font-mono block">Monthly Spend: {formatINRLakhs(liveSimulation.kpiData.baselineMonthlyCostINR || 2850000)}</span>
            </div>

            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-3">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">ANNUAL CARBON TAX RISK</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white">
                  {formatINRLakhs(Math.round(liveSimulation.kpiData.baselineMonthlyCO2 * 12 * 850))}
                </span>
                <span className="text-xs text-slate-500 font-mono">/ year</span>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium font-mono block">-78% Exposure with AI Strategy</span>
            </div>
          </div>

          {/* 4 Spacious Stage-by-Stage Review Cards */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              AI Stage-by-Stage Telemetry Review
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Stage 02: Thermal Combustion
                  </span>
                  <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Primary Hotspot
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Furnace consumes {formConfig.stage2.monthlyFuelConsumption.toLocaleString('en-IN')} {formConfig.stage2.fuelUnit}/mo of {formConfig.stage2.fuelType} at {formConfig.stage2.furnaceOperatingTempC}°C. AI recommends dual-fuel biomass briquette conversion to cut fuel costs.
                </p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Est. Fuel Savings:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">+{formatINRLakhs(liveSimulation.kpiData.financialSavings.energySavings || 420000)}/yr</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Stage 03: Extrusion Grid Power
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                    CEA Factor 0.82
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Monthly grid draw of {formConfig.stage3.monthlyElectricityKWh.toLocaleString('en-IN')} kWh @ ₹{formConfig.stage3.gridTariffPerKWhINR}/kWh. {formConfig.stage3.rooftopSolarKWp} kWp solar offsets peak load. Power Factor is steady at {formConfig.stage3.powerFactor}.
                </p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Power Factor Status:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{formConfig.stage3.powerFactor >= 0.96 ? 'Optimal (> 0.95)' : 'Evaluate Capacitors'}</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Stage 01: Polymer Feedstock Blend
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                    CPCB EPR
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Using {formConfig.stage1.monthlyVolumeTons} T/mo of {formConfig.stage1.materialName}. Blending {formConfig.stage1.recycledPcrAvailablePct}% PCR reduces virgin material expenditures significantly.
                </p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Est. Material Savings:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">+{formatINRLakhs(liveSimulation.kpiData.financialSavings.materialSavings || 240000)}/yr</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Stage 04: Byproduct Monetization
                  </span>
                  <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Zero Waste
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Generates {formConfig.stage4.monthlyScrapTons} T/mo of {formConfig.stage4.scrapTypeName}. Routing 100% via B2B off-take yields ₹{formConfig.stage4.recyclerSellingRatePerTonINR.toLocaleString('en-IN')}/Ton revenue while avoiding landfill fees.
                </p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Est. Scrap Revenue:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">+{formatINRLakhs(liveSimulation.kpiData.financialSavings.scrapRevenue || 336000)}/yr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CLEAN EMBEDDED SAVE BAR */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Active Configuration: {formConfig.profile.name} ({formConfig.profile.sector})
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleResetToCurrent}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Changes</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition-all flex items-center space-x-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save & Recalculate Live Platform</span>
          </button>
        </div>
      </div>
    </div>
  );
};
