export type Theme = 'dark' | 'light';

export type ViewMode = 'carbon' | 'financial';

export type StageStatus = 'NORMAL' | 'EVALUATE' | 'RED ALERT';

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  locale?: string;
  verified?: boolean;
}

export interface ProcessStage {
  id?: string;
  name: string;
  desc: string;
  currentMonthlyCO2: number;
  sharePercentage: number;
  status: StageStatus;
  alertPriority?: string;
  financialMonthlyCost?: number;
  provenanceFormula?: string;
}

export interface FinancialSavings {
  totalNetSavingsDisplay: string;
  totalNetSavingsVal?: number;
  energySavings?: number;
  materialSavings?: number;
  scrapRevenue?: number;
}

export interface KPIData {
  baselineMonthlyCO2: number;
  baselineMonthlyCostINR?: number;
  monthlyCO2SavedTons: number;
  co2ReductionPercentage: number;
  financialSavings: FinancialSavings;
}

export interface SliderInputs {
  fuelShiftPct: number;
  tempReductionPct: number;
  pcrResinPct: number;
  scrapRecyclePct: number;
}

export interface AnomalyLog {
  id: string;
  title: string;
  stageName: string;
  spikeMetric: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  featureImportance: { feature: string; weight: number }[];
  naturalExplanation: string;
  mitigationSteps: string[];
}

export interface WaterfallStep {
  label: string;
  value: number;
  isTotal?: boolean;
  color?: string;
}

export interface ExportOptions {
  includeThermalMaps: boolean;
  attachFinancialRoi: boolean;
  exportRegressionCsv: boolean;
  includeBRSR: boolean;
  includeAuditTrail: boolean;
}

export interface CopilotRecommendation {
  action: string;
  impactCO2: string;
  impactINR: string;
  roi: string;
  sliderPreset?: Partial<SliderInputs>;
  provenance: {
    badge: 'IPCC Verified' | 'CEA Factor' | 'Empirical Regression';
    formula: string;
  };
}

export interface SavedScenario {
  id: string;
  name: string;
  sliderInputs: SliderInputs;
  savedKpi: KPIData;
  createdAt: string;
  capexEst: string;
  paybackMonths: string;
}

export interface OCRParsedResult {
  fileName: string;
  fileType: 'Utility Bill' | 'Weighbridge Ticket' | 'Furnace Fuel Invoice';
  parsedVolume: string;
  parsedMonthlyCost: string;
  detectedHotspot: string;
  confidenceScore: number;
  extractedTextLines: string[];
}

export interface FacilityProfile {
  name: string;
  sector: 'Plastic & Polymer Extrusion' | 'Automotive Metal Forging' | 'Textile & Dyeing' | 'Chemical & Agrochem' | 'Food & Agro Processing' | 'Custom SME';
  location: string;
  cluster: string;
  shiftsPerDay: number;
  workingDaysPerMonth: number;
  totalEmployees: number;
  annualTurnoverINR: string;
}

export interface FacilityStage1Inputs {
  materialName: string;
  monthlyVolumeTons: number;
  costPerTonINR: number;
  virginEmissionFactor: number; // tCO2e/ton (e.g. 2.80 for polymer resin, 2.30 for steel billets)
  recycledPcrAvailablePct: number;
  recycledMaterialCostPerTonINR: number;
}

export interface FacilityStage2Inputs {
  fuelType: 'Heavy Furnace Oil' | 'PNG Natural Gas' | 'High Speed Diesel' | 'Biomass Briquettes' | 'Electric Arc Induction';
  monthlyFuelConsumption: number; // Liters or SCM
  fuelUnit: 'Liters' | 'SCM' | 'kg' | 'kWh';
  fuelCostPerUnitINR: number;
  furnaceOperatingTempC: number;
  fuelEmissionFactor: number; // kgCO2e/unit (e.g. 3.12 for HFO, 1.88 for PNG)
  thermalEfficiencyPct: number;
}

export interface FacilityStage3Inputs {
  monthlyElectricityKWh: number;
  contractDemandKVA: number;
  gridTariffPerKWhINR: number;
  gridEmissionFactor: number; // kgCO2e/kWh (CEA India Baseline 0.82)
  rooftopSolarKWp: number;
  powerFactor: number;
}

export interface FacilityStage4Inputs {
  scrapTypeName: string;
  monthlyScrapTons: number;
  disposalOrLandfillCostPerTonINR: number;
  recyclerSellingRatePerTonINR: number;
  landfillEmissionFactor: number; // tCO2e/ton
}

export interface FacilityFinancialContext {
  availableCapexBudgetINR: number;
  maxPaybackThresholdMonths: number;
  costOfCapitalPct: number;
  carbonOffsetCreditPriceINR: number;
}

export interface FacilityConfig {
  id: string;
  profile: FacilityProfile;
  stage1: FacilityStage1Inputs;
  stage2: FacilityStage2Inputs;
  stage3: FacilityStage3Inputs;
  stage4: FacilityStage4Inputs;
  financial: FacilityFinancialContext;
  updatedAt: string;
}

export interface AISettings {
  apiKey: string;
  model: 'gemini-1.5-flash' | 'gemini-1.5-pro' | 'heuristic-offline';
  enableAutoAnalysis: boolean;
  temperature: number;
}

export interface ScientificSourceItem {
  id: string;
  title: string;
  authority: string;
  referenceDoc: string;
  scope: 'Scope 1' | 'Scope 2' | 'Scope 3' | 'Circular' | 'Financial';
  formula: string;
  substitutedSample: string;
  verifiableValue: string;
  officialUrl?: string;
  regulatoryBody: string;
  description: string;
}

export type TabId =
  | 'overview'
  | 'admin'
  | 'sensors'
  | 'simulation'
  | 'simulator_hub'
  | 'analytics_hub'
  | 'sandbox'
  | 'circular'
  | 'sankey'
  | 'intake'
  | 'copilot'
  | 'roadmap'
  | 'compliance'
  | 'carbon_credits';
