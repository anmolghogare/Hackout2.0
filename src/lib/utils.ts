import { KPIData, ProcessStage } from '../types';

/**
 * Utility helper to conditionally join CSS class names cleanly.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format currency in Indian Rupees (INR)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number with localized decimals
 */
export function formatNumber(val: number, decimals: number = 1): string {
  return Number(val).toFixed(decimals);
}

/**
 * Compute local simulation fallback values when backend API is offline
 */
export function calculateLocalSimulation(inputs: {
  fuelShiftPct: number;
  tempReductionPct: number;
  pcrResinPct: number;
  scrapRecyclePct: number;
}) {
  const { fuelShiftPct, tempReductionPct, pcrResinPct, scrapRecyclePct } = inputs;

  const rawMaterialTons = 10 * (1 - (pcrResinPct / 50) * 0.40);
  const furnaceTons = 48 * (1 - (fuelShiftPct / 100) * 0.44 - (tempReductionPct / 20) * 0.18);
  const processingTons = 25;
  const scrapTons = 17 * (1 - (scrapRecyclePct / 100) * 0.85);

  const newTotal = rawMaterialTons + furnaceTons + processingTons + scrapTons;
  const saved = Math.max(0, 100 - newTotal);
  const cutPct = saved;

  const energySavings = Math.round(350000 * (fuelShiftPct / 50 + tempReductionPct / 5) / 2);
  const materialSavings = Math.round(240000 * (pcrResinPct / 20));
  const scrapRevenue = Math.round(300000 * (scrapRecyclePct / 100));
  const totalSavings = energySavings + materialSavings + scrapRevenue;

  // Rupee equivalents
  const baselineMonthlyCostINR = 2850000; // Baseline monthly energy & material cost
  const rawMaterialCostINR = Math.round(750000 * (rawMaterialTons / 10));
  const furnaceCostINR = Math.round(1400000 * (furnaceTons / 48));
  const processingCostINR = 500000;
  const scrapCostINR = Math.round(200000 * (scrapTons / 17));

  return {
    kpiData: {
      baselineMonthlyCO2: 100,
      baselineMonthlyCostINR: 2850000,
      monthlyCO2SavedTons: Number(saved.toFixed(1)),
      co2ReductionPercentage: Number(cutPct.toFixed(1)),
      financialSavings: {
        totalNetSavingsDisplay: `+₹${totalSavings.toLocaleString('en-IN')} / year`,
        totalNetSavingsVal: totalSavings,
        energySavings,
        materialSavings,
        scrapRevenue,
      },
    },
    stages: [
      {
        name: '1. RAW MATERIAL',
        desc: 'Virgin Polymer Resin (100T/mo)',
        currentMonthlyCO2: Number(rawMaterialTons.toFixed(1)),
        financialMonthlyCost: rawMaterialCostINR,
        sharePercentage: Number(((rawMaterialTons / newTotal) * 100).toFixed(1)),
        status: (rawMaterialTons / newTotal) * 100 > 15 ? ('RED ALERT' as const) : ('NORMAL' as const),
        provenanceFormula: 'CO₂ = 2.80 tCO₂e/T × ResinTons × (1 - PCR_Substitution)',
      },
      {
        name: '2. FURNACE HEATING',
        desc: 'Heavy Furnace Oil (1400°C)',
        currentMonthlyCO2: Number(furnaceTons.toFixed(1)),
        financialMonthlyCost: furnaceCostINR,
        sharePercentage: Number(((furnaceTons / newTotal) * 100).toFixed(1)),
        status: (furnaceTons / newTotal) * 100 > 15 ? ('RED ALERT' as const) : ('NORMAL' as const),
        alertPriority: 'PRIORITY 1',
        provenanceFormula: 'CO₂ = HeavyOil_Liters × 3.12 kgCO₂e/L × (1 - 0.44 × FuelShift)',
      },
      {
        name: '3. PROCESSING LINE',
        desc: 'Extrusion Line Operations',
        currentMonthlyCO2: Number(processingTons.toFixed(1)),
        financialMonthlyCost: processingCostINR,
        sharePercentage: Number(((processingTons / newTotal) * 100).toFixed(1)),
        status: (processingTons / newTotal) * 100 > 15 ? ('EVALUATE' as const) : ('NORMAL' as const),
        provenanceFormula: 'CO₂ = Electricity_kWh × CEA_Grid_Factor (0.82 kgCO₂e/kWh)',
      },
      {
        name: '4. WASTE SCRAP',
        desc: 'Off-cut Trim Scrap (12T/mo)',
        currentMonthlyCO2: Number(scrapTons.toFixed(1)),
        financialMonthlyCost: scrapCostINR,
        sharePercentage: Number(((scrapTons / newTotal) * 100).toFixed(1)),
        status: (scrapTons / newTotal) * 100 > 15 ? ('RED ALERT' as const) : ('NORMAL' as const),
        alertPriority: 'PRIORITY 2',
        provenanceFormula: 'CO₂ = UnrecycledScrapTons × LandfillEmissionsFactor (1.41 tCO₂e/T)',
      },
    ],
  };
}
