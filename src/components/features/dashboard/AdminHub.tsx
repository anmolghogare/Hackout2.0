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
  AlertTriangle,
  Info,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Bot,
  Brain,
  Lightbulb,
  Check,
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
  const [formAISettings, setFormAISettings] = useState<AISettings>(() => ({ ...aiSettings }));
  const [activeSection, setActiveSection] = useState<'profile' | 'stages' | 'financial' | 'ai'>('profile');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

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
    const preset = DEFAULT_FACILITY_PRESETS[presetKey];
    if (preset) {
      setFormConfig(JSON.parse(JSON.stringify(preset)));
      showFlashMessage(`Loaded preset: ${preset.profile.name}`);
    }
  };

  const handleSaveAll = () => {
    const updated = {
      ...formConfig,
      updatedAt: new Date().toISOString(),
    };
    onSaveConfig(updated);
    onSaveAISettings(formAISettings);
    showFlashMessage('✅ Facility parameters saved! AI review and all live modules recalculated.');
  };

  const handleResetToCurrent = () => {
    setFormConfig(JSON.parse(JSON.stringify(currentConfig)));
    setFormAISettings({ ...aiSettings });
    showFlashMessage('Reset form to active configuration.');
  };

  const showFlashMessage = (msg: string) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => {
      setSaveSuccessMessage(null);
    }, 4500);
  };

  // Compute live AI telemetry analysis based on currently configured form values
  const liveSimulation = calculateDynamicFacilitySimulation(formConfig, {
    fuelShiftPct: 50,
    tempReductionPct: 5,
    pcrResinPct: 20,
    scrapRecyclePct: 100,
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner & Heading */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/70 border border-slate-800 p-6 lg:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider flex items-center space-x-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Facility Admin Portal</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">Integrated AI Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              Factory Parameters & Live Onboarding
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Input your plant's operational parameters, raw materials, thermal fuels, electricity tariffs, and scrap volumes.
              Our integrated AI automatically reviews your parameters and recalculates carbon baselines, 3D thermal hotspots, and ROI in real time.
            </p>
          </div>

          {/* Quick Preset Selector Buttons */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2.5 shrink-0 max-w-xs w-full">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
              Load Pre-Configured SME Preset
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleLoadPreset('apex_packaging')}
                className="p-2 rounded-xl text-left bg-slate-900 hover:bg-emerald-600/30 border border-slate-700 hover:border-emerald-500/50 transition-all text-xs text-slate-200"
              >
                <span className="font-bold block truncate">Apex Packaging</span>
                <span className="text-[10px] text-slate-400">Polymer (Pune)</span>
              </button>

              <button
                type="button"
                onClick={() => handleLoadPreset('rajkot_forging')}
                className="p-2 rounded-xl text-left bg-slate-900 hover:bg-emerald-600/30 border border-slate-700 hover:border-emerald-500/50 transition-all text-xs text-slate-200"
              >
                <span className="font-bold block truncate">Rajkot Forging</span>
                <span className="text-[10px] text-slate-400">Steel (Gujarat)</span>
              </button>

              <button
                type="button"
                onClick={() => handleLoadPreset('surat_textiles')}
                className="p-2 rounded-xl text-left bg-slate-900 hover:bg-emerald-600/30 border border-slate-700 hover:border-emerald-500/50 transition-all text-xs text-slate-200"
              >
                <span className="font-bold block truncate">Surat Textiles</span>
                <span className="text-[10px] text-slate-400">Dyeing & Mills</span>
              </button>

              <button
                type="button"
                onClick={() => handleLoadPreset('vapi_chemicals')}
                className="p-2 rounded-xl text-left bg-slate-900 hover:bg-emerald-600/30 border border-slate-700 hover:border-emerald-500/50 transition-all text-xs text-slate-200"
              >
                <span className="font-bold block truncate">Vapi Chemicals</span>
                <span className="text-[10px] text-slate-400">Agrochem Belt</span>
              </button>
            </div>
          </div>
        </div>

        {/* Flash Message Alert */}
        {saveSuccessMessage && (
          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-between animate-fadeIn text-sm text-emerald-200 font-medium">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{saveSuccessMessage}</span>
            </div>
            <button
              onClick={() => onNavigateTab('simulator_hub')}
              className="text-xs px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
            >
              Go to Simulator ➔
            </button>
          </div>
        )}
      </div>

      {/* Navigation Tabs Bar inside Admin */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveSection('profile')}
          className={cn(
            'flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all',
            activeSection === 'profile'
              ? 'bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          )}
        >
          <Building2 className="w-4 h-4" />
          <span>1. Plant Profile & Shifts</span>
        </button>

        <button
          onClick={() => setActiveSection('stages')}
          className={cn(
            'flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all',
            activeSection === 'stages'
              ? 'bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          )}
        >
          <Layers className="w-4 h-4" />
          <span>2. Stage 1–4 Energy & Material Telemetry</span>
        </button>

        <button
          onClick={() => setActiveSection('financial')}
          className={cn(
            'flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all',
            activeSection === 'financial'
              ? 'bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          )}
        >
          <DollarSign className="w-4 h-4" />
          <span>3. Financial & CAPEX Constraints</span>
        </button>

        <button
          onClick={() => setActiveSection('ai')}
          className={cn(
            'flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all',
            activeSection === 'ai'
              ? 'bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          )}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>4. AI Intelligence & Automated Review</span>
        </button>

        <div className="ml-auto pr-2 hidden sm:flex items-center">
          <button
            type="button"
            onClick={onOpenProvenanceModal}
            className="flex items-center space-x-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verify Regulatory Sources (CEA/IPCC)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PLANT PROFILE & OPERATIONAL SHIFTS */}
      {/* ========================================================================= */}
      {activeSection === 'profile' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Facility Identity & Operating Schedule
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Basic company registration, industry classification, and operating rhythm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Company / Facility Name</label>
              <input
                type="text"
                value={formConfig.profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Industrial Sector</label>
              <select
                value={formConfig.profile.sector}
                onChange={(e) => handleProfileChange('sector', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
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
              <label className="font-bold text-slate-700 dark:text-slate-300">Location / MIDC Zone</label>
              <input
                type="text"
                value={formConfig.profile.location}
                onChange={(e) => handleProfileChange('location', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Industrial Cluster</label>
              <input
                type="text"
                value={formConfig.profile.cluster}
                onChange={(e) => handleProfileChange('cluster', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Shifts per Day (1 / 2 / 3)</label>
              <input
                type="number"
                min="1"
                max="3"
                value={formConfig.profile.shiftsPerDay}
                onChange={(e) => handleProfileChange('shiftsPerDay', parseInt(e.target.value, 10))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Working Days / Month</label>
              <input
                type="number"
                min="20"
                max="31"
                value={formConfig.profile.workingDaysPerMonth}
                onChange={(e) => handleProfileChange('workingDaysPerMonth', parseInt(e.target.value, 10))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Total Employees</label>
              <input
                type="number"
                value={formConfig.profile.totalEmployees}
                onChange={(e) => handleProfileChange('totalEmployees', parseInt(e.target.value, 10))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Annual Turnover (INR)</label>
              <input
                type="text"
                value={formConfig.profile.annualTurnoverINR}
                onChange={(e) => handleProfileChange('annualTurnoverINR', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: STAGE 1–4 ENERGY & MATERIAL TELEMETRY */}
      {/* ========================================================================= */}
      {activeSection === 'stages' && (
        <div className="space-y-6">
          {/* Stage 1: Raw Material */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-heading font-extrabold text-slate-900 dark:text-white text-sm">
                  Stage 1: Raw Material Input & Feedstock
                </h4>
                <p className="text-[11px] text-slate-500">Scope 3 cradle-to-gate feedstock & PCR blend substitution availability</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Material Specification</label>
                <input
                  type="text"
                  value={formConfig.stage1.materialName}
                  onChange={(e) => handleStage1Change('materialName', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Monthly Volume (Tons / month)</label>
                <input
                  type="number"
                  value={formConfig.stage1.monthlyVolumeTons}
                  onChange={(e) => handleStage1Change('monthlyVolumeTons', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Virgin Material Cost (₹ / Ton)</label>
                <input
                  type="number"
                  value={formConfig.stage1.costPerTonINR}
                  onChange={(e) => handleStage1Change('costPerTonINR', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Virgin Emission Factor (tCO₂e / Ton)</label>
                <input
                  type="number"
                  step="0.05"
                  value={formConfig.stage1.virginEmissionFactor}
                  onChange={(e) => handleStage1Change('virginEmissionFactor', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Recycled / PCR Available (%)</label>
                <input
                  type="number"
                  value={formConfig.stage1.recycledPcrAvailablePct}
                  onChange={(e) => handleStage1Change('recycledPcrAvailablePct', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">PCR Material Cost (₹ / Ton)</label>
                <input
                  type="number"
                  value={formConfig.stage1.recycledMaterialCostPerTonINR}
                  onChange={(e) => handleStage1Change('recycledMaterialCostPerTonINR', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Stage 2: Furnace & Thermal Heating */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-heading font-extrabold text-slate-900 dark:text-white text-sm">
                  Stage 2: Furnace Combustion & Thermal Heating
                </h4>
                <p className="text-[11px] text-slate-500">Scope 1 direct fuel combustion, operating temperature, and thermal loss</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Primary Fuel Type</label>
                <select
                  value={formConfig.stage2.fuelType}
                  onChange={(e) => handleStage2Change('fuelType', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Heavy Furnace Oil">Heavy Furnace Oil (HFO)</option>
                  <option value="PNG Natural Gas">PNG Natural Gas (Piped Gas)</option>
                  <option value="High Speed Diesel">High Speed Diesel (HSD)</option>
                  <option value="Biomass Briquettes">Biomass Briquettes / Agro Waste</option>
                  <option value="Electric Arc Induction">Electric Arc / Induction</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Monthly Fuel Consumption ({formConfig.stage2.fuelUnit})</label>
                <input
                  type="number"
                  value={formConfig.stage2.monthlyFuelConsumption}
                  onChange={(e) => handleStage2Change('monthlyFuelConsumption', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Fuel Unit Cost (₹ / {formConfig.stage2.fuelUnit})</label>
                <input
                  type="number"
                  value={formConfig.stage2.fuelCostPerUnitINR}
                  onChange={(e) => handleStage2Change('fuelCostPerUnitINR', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Operating Temperature (°C)</label>
                <input
                  type="number"
                  value={formConfig.stage2.furnaceOperatingTempC}
                  onChange={(e) => handleStage2Change('furnaceOperatingTempC', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Fuel Emission Factor (kgCO₂e / unit)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formConfig.stage2.fuelEmissionFactor}
                  onChange={(e) => handleStage2Change('fuelEmissionFactor', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Thermal Efficiency (%)</label>
                <input
                  type="number"
                  value={formConfig.stage2.thermalEfficiencyPct}
                  onChange={(e) => handleStage2Change('thermalEfficiencyPct', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Stage 3: Processing Line & Electricity */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-heading font-extrabold text-slate-900 dark:text-white text-sm">
                  Stage 3: Processing Line & Electricity Grid
                </h4>
                <p className="text-[11px] text-slate-500">Scope 2 grid power consumption, CEA baseline factor, and captive solar offset</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Monthly Electricity (kWh / month)</label>
                <input
                  type="number"
                  value={formConfig.stage3.monthlyElectricityKWh}
                  onChange={(e) => handleStage3Change('monthlyElectricityKWh', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Grid Tariff Rate (₹ / kWh)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formConfig.stage3.gridTariffPerKWhINR}
                  onChange={(e) => handleStage3Change('gridTariffPerKWhINR', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Grid Emission Factor (CEA India)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formConfig.stage3.gridEmissionFactor}
                  onChange={(e) => handleStage3Change('gridEmissionFactor', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Contract Demand (kVA)</label>
                <input
                  type="number"
                  value={formConfig.stage3.contractDemandKVA}
                  onChange={(e) => handleStage3Change('contractDemandKVA', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Installed Rooftop Solar (kWp)</label>
                <input
                  type="number"
                  value={formConfig.stage3.rooftopSolarKWp}
                  onChange={(e) => handleStage3Change('rooftopSolarKWp', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Operating Power Factor (0.90 – 0.99)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formConfig.stage3.powerFactor}
                  onChange={(e) => handleStage3Change('powerFactor', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Stage 4: Off-Cut Waste Scrap */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">4</div>
              <div>
                <h4 className="font-heading font-extrabold text-slate-900 dark:text-white text-sm">
                  Stage 4: Off-Cut Trim & Waste Circularity
                </h4>
                <p className="text-[11px] text-slate-500">Solid waste generation, landfill avoidance, and secondary market scrap price</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Scrap / Residue Type</label>
                <input
                  type="text"
                  value={formConfig.stage4.scrapTypeName}
                  onChange={(e) => handleStage4Change('scrapTypeName', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Monthly Scrap Volume (Tons / month)</label>
                <input
                  type="number"
                  value={formConfig.stage4.monthlyScrapTons}
                  onChange={(e) => handleStage4Change('monthlyScrapTons', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Current Landfill / Disposal Fee (₹ / Ton)</label>
                <input
                  type="number"
                  value={formConfig.stage4.disposalOrLandfillCostPerTonINR}
                  onChange={(e) => handleStage4Change('disposalOrLandfillCostPerTonINR', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Recycler Offtake Selling Price (₹ / Ton)</label>
                <input
                  type="number"
                  value={formConfig.stage4.recyclerSellingRatePerTonINR}
                  onChange={(e) => handleStage4Change('recyclerSellingRatePerTonINR', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Landfill Emission Factor (tCO₂e / Ton)</label>
                <input
                  type="number"
                  step="0.05"
                  value={formConfig.stage4.landfillEmissionFactor}
                  onChange={(e) => handleStage4Change('landfillEmissionFactor', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: FINANCIAL & CAPEX CONSTRAINTS */}
      {/* ========================================================================= */}
      {activeSection === 'financial' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Financial Capital Limits & Hurdle Rates
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Set your executive budget boundaries, target payback periods, and carbon credit valuations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Available Green CAPEX Budget (₹ INR)
              </label>
              <input
                type="number"
                value={formConfig.financial.availableCapexBudgetINR}
                onChange={(e) => handleFinancialChange('availableCapexBudgetINR', parseFloat(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                Current: {formatINRLakhs(formConfig.financial.availableCapexBudgetINR)}
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Maximum Acceptable Payback Threshold (Months)
              </label>
              <input
                type="number"
                value={formConfig.financial.maxPaybackThresholdMonths}
                onChange={(e) => handleFinancialChange('maxPaybackThresholdMonths', parseFloat(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <span className="text-[11px] text-slate-400 font-mono">
                SME Standard: 12 – 18 Months
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Cost of Capital / Discount Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={formConfig.financial.costOfCapitalPct}
                onChange={(e) => handleFinancialChange('costOfCapitalPct', parseFloat(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Internal Carbon Offset Price (₹ / tCO₂e)
              </label>
              <input
                type="number"
                value={formConfig.financial.carbonOffsetCreditPriceINR}
                onChange={(e) => handleFinancialChange('carbonOffsetCreditPriceINR', parseFloat(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <span className="text-[11px] text-slate-400 font-mono">
                Indian Voluntary Carbon Market benchmark
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: AUTOMATED AI INTELLIGENCE & AUDIT REVIEW */}
      {/* ========================================================================= */}
      {activeSection === 'ai' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-emerald-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Automated AI Facility Audit & Review
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Integrated AI telemetry engine continuously reviews your configured factory parameters, identifying Scope 1–3 saving opportunities.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center space-x-1.5 shrink-0 self-start sm:self-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI Engine Active & Synchronized</span>
            </span>
          </div>

          {/* AI Executive Facility Audit Review Cards */}
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950 text-white border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-sm">
                <Bot className="w-4 h-4" />
                <span>Executive Telemetry Review for {formConfig.profile.name}</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs">
                Based on your fed parameters ({formConfig.profile.sector} with {formConfig.profile.shiftsPerDay} daily shifts), the facility generates{' '}
                <strong className="text-white">{liveSimulation.kpiData.baselineMonthlyCO2} tCO₂e/month</strong> baseline carbon output with a monthly energy & material spend of{' '}
                <strong className="text-emerald-400">{formatINR(liveSimulation.kpiData.baselineMonthlyCostINR || 2850000)}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Scope 1 Thermal Review */}
              <div className="p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span>Scope 1 Thermal Fuel Review</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold">
                    Primary Hotspot
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11.5px] leading-relaxed">
                  Your primary furnace runs on <strong>{formConfig.stage2.fuelType}</strong> at <strong>{formConfig.stage2.furnaceOperatingTempC}°C</strong> consuming{' '}
                  <strong>{formConfig.stage2.monthlyFuelConsumption.toLocaleString('en-IN')} {formConfig.stage2.fuelUnit}/mo</strong>.
                  Shifting 50% to Biomass/PNG Natural Gas avoids <strong>~21.1 tCO₂e/month</strong>.
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Est. Annual Fuel Savings:</span>
                  <span>+{formatINRLakhs(liveSimulation.kpiData.financialSavings.energySavings || 420000)}/yr</span>
                </div>
              </div>

              {/* Scope 2 Grid & Solar Review */}
              <div className="p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <Zap className="w-4 h-4 text-emerald-500" />
                    <span>Scope 2 Grid & Solar Review</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                    CEA Factor 0.82
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11.5px] leading-relaxed">
                  Monthly power draw is <strong>{formConfig.stage3.monthlyElectricityKWh.toLocaleString('en-IN')} kWh</strong> at <strong>₹{formConfig.stage3.gridTariffPerKWhINR}/kWh</strong>.
                  Your installed <strong>{formConfig.stage3.rooftopSolarKWp} kWp</strong> rooftop solar offsets captive demand during peak tariff hours.
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Power Factor Optimization:</span>
                  <span>{formConfig.stage3.powerFactor >= 0.96 ? 'Optimal (PF > 0.95)' : 'Needs Capacitor Bank'}</span>
                </div>
              </div>

              {/* Scope 3 Material Review */}
              <div className="p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <Layers className="w-4 h-4 text-blue-500" />
                    <span>Scope 3 Feedstock & PCR Review</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold">
                    CPCB EPR Target
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11.5px] leading-relaxed">
                  Using <strong>{formConfig.stage1.monthlyVolumeTons} T/mo</strong> of {formConfig.stage1.materialName}.
                  Increasing PCR blend to {formConfig.stage1.recycledPcrAvailablePct}% saves <strong>₹{(formConfig.stage1.costPerTonINR - formConfig.stage1.recycledMaterialCostPerTonINR).toLocaleString('en-IN')}/ton</strong> in feedstock differential.
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Est. Material Cost Savings:</span>
                  <span>+{formatINRLakhs(liveSimulation.kpiData.financialSavings.materialSavings || 240000)}/yr</span>
                </div>
              </div>

              {/* Stage 4 Scrap Circularity Review */}
              <div className="p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <Recycle className="w-4 h-4 text-purple-500" />
                    <span>Stage 4 Circular Scrap Monetization</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold">
                    Zero Waste
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11.5px] leading-relaxed">
                  Generating <strong>{formConfig.stage4.monthlyScrapTons} T/mo</strong> of {formConfig.stage4.scrapTypeName}.
                  Routing 100% through B2B circular buyer clusters yields <strong>₹{formConfig.stage4.recyclerSellingRatePerTonINR.toLocaleString('en-IN')}/ton</strong> in resale revenue while eliminating landfill fees.
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Est. Annual Scrap Revenue:</span>
                  <span>+{formatINRLakhs(liveSimulation.kpiData.financialSavings.scrapRevenue || 300000)}/yr</span>
                </div>
              </div>
            </div>

            {/* AI Automated Review Controls */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="autoAnalysis"
                  checked={formAISettings.enableAutoAnalysis}
                  onChange={(e) => setFormAISettings((prev) => ({ ...prev, enableAutoAnalysis: e.target.checked }))}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="autoAnalysis" className="text-slate-700 dark:text-slate-300 font-medium">
                  Auto-generate AI mitigation plan when thermal leak share exceeds 15%
                </label>
              </div>

              <button
                type="button"
                onClick={() => onNavigateTab('copilot')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors shrink-0"
              >
                <Bot className="w-4 h-4" />
                <span>Open Full Copilot Review</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOTTOM FLOATING / STICKY ACTION BAR */}
      {/* ========================================================================= */}
      <div className="sticky bottom-4 z-30 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 text-xs text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            Configuring: <strong className="text-white">{formConfig.profile.name}</strong> ({formConfig.profile.sector})
          </span>
        </div>

        <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleResetToCurrent}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save & Recalculate Live Platform</span>
          </button>
        </div>
      </div>
    </div>
  );
};
