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

export type TabId =
  | 'overview'
  | 'simulator_hub'
  | 'analytics_hub'
  | 'intake'
  | 'simulation'
  | 'whatif'
  | 'sandbox'
  | 'copilot'
  | 'circular'
  | 'roadmap';
