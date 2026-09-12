export type Theme = 'dark' | 'light';

export type ViewMode = 'carbon' | 'financial';

export type StageStatus = 'NORMAL' | 'EVALUATE' | 'RED ALERT';

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

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendation?: CopilotRecommendation;
}

export interface CircularListing {
  id: string;
  materialName: string;
  seller: string;
  quantity: string;
  pricePerTon: string;
  carbonOffsetPotential: string;
  matchScore: number;
  location: string;
  feedstockDiscount: string;
  transportDistance: string;
}

export interface RoadmapItem {
  phase: string;
  timeline: string;
  initiative: string;
  investmentCost: string;
  annualSavings: string;
  co2Reduction: string;
  paybackPeriod: string;
  status: 'Planned' | 'In Progress' | 'Completed';
}

export type TabId = 'overview' | 'simulation' | 'whatif' | 'copilot' | 'circular' | 'roadmap';
