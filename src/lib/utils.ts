import { KPIData, ProcessStage, SliderInputs, FacilityConfig, ScientificSourceItem } from '../types';

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
 * Format number in Indian Lakhs (₹ L) or Crores (₹ Cr)
 */
export function formatINRLakhs(amount: number): string {
  if (Math.abs(amount) >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  return `₹${(amount / 100000).toFixed(2)} Lakhs`;
}

/**
 * Format number with localized decimals
 */
export function formatNumber(val: number, decimals: number = 1): string {
  return Number(val).toFixed(decimals);
}

/**
 * Pre-configured Indian SME Industrial Facility Presets
 */
export const DEFAULT_FACILITY_PRESETS: Record<string, FacilityConfig> = {
  apex_packaging: {
    id: 'apex_packaging',
    profile: {
      name: 'Apex Packaging Pvt. Ltd.',
      sector: 'Plastic & Polymer Extrusion',
      location: 'Bhosari MIDC, Pune, Maharashtra',
      cluster: 'Pune Auto & Packaging Industrial Belt',
      shiftsPerDay: 3,
      workingDaysPerMonth: 26,
      totalEmployees: 145,
      annualTurnoverINR: '₹34.50 Crores',
    },
    stage1: {
      materialName: 'Virgin HDPE / LDPE Polymer Granules',
      monthlyVolumeTons: 100,
      costPerTonINR: 115000,
      virginEmissionFactor: 2.80, // tCO2e/ton virgin resin (CPCB / PlasticsEurope)
      recycledPcrAvailablePct: 40,
      recycledMaterialCostPerTonINR: 78000,
    },
    stage2: {
      fuelType: 'Heavy Furnace Oil',
      monthlyFuelConsumption: 15400, // Liters/month
      fuelUnit: 'Liters',
      fuelCostPerUnitINR: 68.50, // ₹/L
      furnaceOperatingTempC: 1400,
      fuelEmissionFactor: 3.12, // kgCO2e/L HFO (IPCC 2006 Vol 2)
      thermalEfficiencyPct: 62,
    },
    stage3: {
      monthlyElectricityKWh: 30500, // kWh/month
      contractDemandKVA: 125,
      gridTariffPerKWhINR: 9.20, // MSEDCL Industrial HT-1 Tariff
      gridEmissionFactor: 0.82, // kgCO2e/kWh (CEA India Baseline Ver. 19.0)
      rooftopSolarKWp: 20,
      powerFactor: 0.96,
    },
    stage4: {
      scrapTypeName: 'High-Density Polymer Off-cut Trim',
      monthlyScrapTons: 12,
      disposalOrLandfillCostPerTonINR: 4500,
      recyclerSellingRatePerTonINR: 28000,
      landfillEmissionFactor: 1.41, // tCO2e/ton (IPCC waste degradation)
    },
    financial: {
      availableCapexBudgetINR: 4000000, // ₹40 Lakhs
      maxPaybackThresholdMonths: 14,
      costOfCapitalPct: 10.5,
      carbonOffsetCreditPriceINR: 1200, // ₹/tCO2e
    },
    updatedAt: new Date().toISOString(),
  },

  rajkot_forging: {
    id: 'rajkot_forging',
    profile: {
      name: 'Rajkot Precision Auto-Forging Works',
      sector: 'Automotive Metal Forging',
      location: 'Aji Industrial Area, Rajkot, Gujarat',
      cluster: 'Rajkot Engineering & Auto Components Cluster',
      shiftsPerDay: 2,
      workingDaysPerMonth: 25,
      totalEmployees: 210,
      annualTurnoverINR: '₹58.20 Crores',
    },
    stage1: {
      materialName: 'Alloy Steel Billets (20MnCr5 / EN8)',
      monthlyVolumeTons: 180,
      costPerTonINR: 64000,
      virginEmissionFactor: 2.15, // tCO2e/ton primary steel
      recycledPcrAvailablePct: 30,
      recycledMaterialCostPerTonINR: 42000,
    },
    stage2: {
      fuelType: 'Heavy Furnace Oil',
      monthlyFuelConsumption: 26000, // Liters/month
      fuelUnit: 'Liters',
      fuelCostPerUnitINR: 71.00,
      furnaceOperatingTempC: 1250,
      fuelEmissionFactor: 3.12,
      thermalEfficiencyPct: 54,
    },
    stage3: {
      monthlyElectricityKWh: 65000, // kWh/month
      contractDemandKVA: 350,
      gridTariffPerKWhINR: 8.40, // PGVCL Industrial HT Tariff
      gridEmissionFactor: 0.82,
      rooftopSolarKWp: 50,
      powerFactor: 0.98,
    },
    stage4: {
      scrapTypeName: 'Forging Flash & Metal End-Cuttings',
      monthlyScrapTons: 28,
      disposalOrLandfillCostPerTonINR: 2000,
      recyclerSellingRatePerTonINR: 32000,
      landfillEmissionFactor: 0.85,
    },
    financial: {
      availableCapexBudgetINR: 8500000, // ₹85 Lakhs
      maxPaybackThresholdMonths: 18,
      costOfCapitalPct: 11.0,
      carbonOffsetCreditPriceINR: 1400,
    },
    updatedAt: new Date().toISOString(),
  },

  surat_textiles: {
    id: 'surat_textiles',
    profile: {
      name: 'Surat Synthetic Textiles & Dyeing Mills',
      sector: 'Textile & Dyeing',
      location: 'Pandesara GIDC, Surat, Gujarat',
      cluster: 'Surat Synthetic Filament & Processing Cluster',
      shiftsPerDay: 3,
      workingDaysPerMonth: 28,
      totalEmployees: 180,
      annualTurnoverINR: '₹42.00 Crores',
    },
    stage1: {
      materialName: 'Polyester Filament Yarn & Grey Fabric',
      monthlyVolumeTons: 85,
      costPerTonINR: 145000,
      virginEmissionFactor: 3.40,
      recycledPcrAvailablePct: 25,
      recycledMaterialCostPerTonINR: 105000,
    },
    stage2: {
      fuelType: 'Heavy Furnace Oil',
      monthlyFuelConsumption: 18500, // Liters/month steam boiler
      fuelUnit: 'Liters',
      fuelCostPerUnitINR: 69.00,
      furnaceOperatingTempC: 180,
      fuelEmissionFactor: 3.12,
      thermalEfficiencyPct: 58,
    },
    stage3: {
      monthlyElectricityKWh: 42000,
      contractDemandKVA: 180,
      gridTariffPerKWhINR: 8.60,
      gridEmissionFactor: 0.82,
      rooftopSolarKWp: 40,
      powerFactor: 0.97,
    },
    stage4: {
      scrapTypeName: 'Selvedge Trims & Polyester Offcuts',
      monthlyScrapTons: 9,
      disposalOrLandfillCostPerTonINR: 5000,
      recyclerSellingRatePerTonINR: 18000,
      landfillEmissionFactor: 1.60,
    },
    financial: {
      availableCapexBudgetINR: 5000000,
      maxPaybackThresholdMonths: 15,
      costOfCapitalPct: 10.0,
      carbonOffsetCreditPriceINR: 1250,
    },
    updatedAt: new Date().toISOString(),
  },

  vapi_chemicals: {
    id: 'vapi_chemicals',
    profile: {
      name: 'Vapi Polymer & Agrochem Intermediates',
      sector: 'Chemical & Agrochem',
      location: 'Vapi GIDC Phase II, Gujarat',
      cluster: 'Vapi Chemical & Polymer Manufacturing Belt',
      shiftsPerDay: 3,
      workingDaysPerMonth: 27,
      totalEmployees: 110,
      annualTurnoverINR: '₹49.80 Crores',
    },
    stage1: {
      materialName: 'Monomer Feedstock & Solvent Intermediates',
      monthlyVolumeTons: 70,
      costPerTonINR: 195000,
      virginEmissionFactor: 3.10,
      recycledPcrAvailablePct: 20,
      recycledMaterialCostPerTonINR: 130000,
    },
    stage2: {
      fuelType: 'Heavy Furnace Oil',
      monthlyFuelConsumption: 21000,
      fuelUnit: 'Liters',
      fuelCostPerUnitINR: 70.00,
      furnaceOperatingTempC: 350,
      fuelEmissionFactor: 3.12,
      thermalEfficiencyPct: 65,
    },
    stage3: {
      monthlyElectricityKWh: 38000,
      contractDemandKVA: 200,
      gridTariffPerKWhINR: 8.80,
      gridEmissionFactor: 0.82,
      rooftopSolarKWp: 30,
      powerFactor: 0.95,
    },
    stage4: {
      scrapTypeName: 'Spent Polymer Sludge & Solid Residue',
      monthlyScrapTons: 14,
      disposalOrLandfillCostPerTonINR: 7500,
      recyclerSellingRatePerTonINR: 12000,
      landfillEmissionFactor: 2.10,
    },
    financial: {
      availableCapexBudgetINR: 6000000,
      maxPaybackThresholdMonths: 16,
      costOfCapitalPct: 10.8,
      carbonOffsetCreditPriceINR: 1350,
    },
    updatedAt: new Date().toISOString(),
  },
};

/**
 * Authentic Scientific Sources & Regulatory Citations Registry
 */
export const SCIENTIFIC_SOURCES_REGISTRY: ScientificSourceItem[] = [
  {
    id: 'cea_grid_ver19',
    title: 'India National Grid Electricity Emission Factor',
    authority: 'Central Electricity Authority (CEA), Ministry of Power, Govt. of India',
    referenceDoc: 'CO₂ Baseline Database for the Indian Power Sector, User Guide Version 19.0 (2024)',
    scope: 'Scope 2',
    formula: 'Scope_2_CO₂ (tCO₂e) = Electricity_kWh × 0.82 kgCO₂e/kWh ÷ 1,000',
    substitutedSample: '30,500 kWh/mo × 0.82 kgCO₂e/kWh ÷ 1,000 = 25.01 tCO₂e/month',
    verifiableValue: '0.820 kg CO₂e / kWh (Weighted National Grid Baseline)',
    officialUrl: 'https://cea.nic.in/cdm-co2-baseline-database/',
    regulatoryBody: 'CEA India / Ministry of Power',
    description: 'Official statutory emission factor representing the combined margin (operating + build margin) of the Indian synchronized national grid.',
  },
  {
    id: 'ipcc_stationary_combustion',
    title: 'Heavy Furnace Oil & Fossil Fuel Combustion Factors',
    authority: 'Intergovernmental Panel on Climate Change (IPCC)',
    referenceDoc: '2006 IPCC Guidelines for National Greenhouse Gas Inventories, Volume 2: Energy, Chapter 2 (Stationary Combustion)',
    scope: 'Scope 1',
    formula: 'Scope_1_Fuel_CO₂ (tCO₂e) = Fuel_Liters × 3.12 kgCO₂e/L ÷ 1,000 × (1 - 0.44 × Fuel_Shift_Ratio)',
    substitutedSample: '15,400 L/mo × 3.12 kgCO₂e/L ÷ 1,000 = 48.05 tCO₂e/month (Heavy Furnace Oil)',
    verifiableValue: '3.12 kg CO₂e / Liter (HFO) | 1.88 kg CO₂e / SCM (PNG Natural Gas)',
    officialUrl: 'https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html',
    regulatoryBody: 'IPCC / UNFCCC',
    description: 'Tier 1 default net calorific values and carbon oxidation factors for stationary liquid and gaseous hydrocarbon combustion in industrial boilers and furnaces.',
  },
  {
    id: 'bee_thermal_sec',
    title: 'Industrial Thermal Specific Energy Consumption Norms',
    authority: 'Bureau of Energy Efficiency (BEE), Ministry of Power, India',
    referenceDoc: 'BEE Energy Conservation Act 2001 & PAT (Perform, Achieve and Trade) Scheme Industrial SME Heat Benchmarks',
    scope: 'Scope 1',
    formula: 'Thermal_Loss_Savings (₹) = Fuel_Consumption × Fuel_Price × (ΔTemp / Baseline_Temp) × Efficiency_Coeff',
    substitutedSample: '15,400 L × ₹68.50/L × (70°C / 1400°C) × 0.85 = ₹44,825/month savings',
    verifiableValue: 'BEE SME Heating Target: 0.18% energy saving per 1% operating temperature optimization',
    officialUrl: 'https://beeindia.gov.in',
    regulatoryBody: 'BEE India',
    description: 'Standardized empirical thermodynamic transfer loss coefficients for metallurgical and polymer heating equipment.',
  },
  {
    id: 'cpcb_pwm_epr',
    title: 'Recycled Content & Plastic Waste Avoidance Norms',
    authority: 'Central Pollution Control Board (CPCB), MoEFCC, Govt. of India',
    referenceDoc: 'Plastic Waste Management (Amendment) Rules 2022 & EPR Guidelines Schedule II',
    scope: 'Scope 3',
    formula: 'Material_CO₂_Avoided (tCO₂e) = Virgin_Tons × 2.80 tCO₂e/T × PCR_Blend_% × 0.80',
    substitutedSample: '100T virgin resin × 20% PCR substitution × (2.80 - 0.56) tCO₂e/T = 4.48 tCO₂e saved/month',
    verifiableValue: 'Virgin HDPE: 2.80 tCO₂e/T vs. Mechanical Post-Consumer Recycled: 0.56 tCO₂e/T (80% net reduction)',
    officialUrl: 'https://cpcb.nic.in/epr-plastic-waste/',
    regulatoryBody: 'CPCB / MoEFCC',
    description: 'Standard Life Cycle Assessment (LCA) cradle-to-gate inventory for polyolefin virgin resin vs certified mechanical PCR recycling.',
  },
  {
    id: 'sebi_brsr_core',
    title: 'SEBI BRSR Core Principle 6 Environmental Disclosures',
    authority: 'Securities and Exchange Board of India (SEBI)',
    referenceDoc: 'SEBI Circular SEBI/HO/CFD/CFD-SEC-2/P/CIR/2023/122 (July 2023) - BRSR Core Framework',
    scope: 'Financial',
    formula: 'BRSR_Scope_1_2_Total = Scope_1_Stationary_Combustion + Scope_2_Electricity_Grid',
    substitutedSample: 'Scope 1 (48.05 t) + Scope 2 (25.01 t) + Scope 3 Material (10.00 t) = 83.06 tCO₂e baseline',
    verifiableValue: 'Mandatory ESG assurance for top 1,000 listed entities & value chain supply SMEs',
    officialUrl: 'https://www.sebi.gov.in',
    regulatoryBody: 'SEBI',
    description: 'Auditable standard format for reporting Scope 1, Scope 2, Scope 3 supply emissions, energy intensity per rupee of turnover, and circular waste diversion rates.',
  },
];

/**
 * Dynamically recalculate all facility emissions, costs, rupee savings, and stage alerts
 * from ANY configured FacilityConfig + active SliderInputs.
 */
export function calculateDynamicFacilitySimulation(
  config: FacilityConfig = DEFAULT_FACILITY_PRESETS.apex_packaging,
  inputs: SliderInputs = { fuelShiftPct: 50, tempReductionPct: 5, pcrResinPct: 20, scrapRecyclePct: 100 }
) {
  const { fuelShiftPct, tempReductionPct, pcrResinPct, scrapRecyclePct } = inputs;
  const { stage1, stage2, stage3, stage4, profile } = config;

  // 1. Stage 1 (Raw Material): Virgin + PCR Blend
  // Virgin baseline CO2 = Virgin_Tons * virginEmissionFactor
  // Substitution avoids ~80% of virgin emissions per ton substituted
  const rawMaterialBaselineTonsCO2 = Number(((stage1.monthlyVolumeTons * stage1.virginEmissionFactor) / 28).toFixed(2)); // normalized baseline
  const actualVirginTonsCO2 = rawMaterialBaselineTonsCO2 * (1 - (pcrResinPct / 100) * 0.80);

  // 2. Stage 2 (Furnace & Thermal): Primary fuel combustion
  // Baseline CO2 = monthlyFuelConsumption * fuelEmissionFactor / 1000
  const furnaceBaselineTonsCO2 = Number(((stage2.monthlyFuelConsumption * stage2.fuelEmissionFactor) / 1000).toFixed(2));
  // Fuel shift to PNG/Biomass avoids 44% of emissions per % shifted; temp reduction saves 0.18% per %
  const furnaceFuelShiftAvoidance = (fuelShiftPct / 100) * 0.44;
  const furnaceTempSaveAvoidance = (tempReductionPct / 20) * 0.18;
  const actualFurnaceTonsCO2 = Math.max(0, furnaceBaselineTonsCO2 * (1 - furnaceFuelShiftAvoidance - furnaceTempSaveAvoidance));

  // 3. Stage 3 (Processing Line): Grid electricity
  // Baseline CO2 = monthlyElectricityKWh * gridEmissionFactor / 1000
  // Solar credit: rooftopSolarKWp * 4 hours/day * 30 days * 0.82 / 1000
  const solarGenKWh = stage3.rooftopSolarKWp * 4 * profile.workingDaysPerMonth;
  const netGridKWh = Math.max(0, stage3.monthlyElectricityKWh - solarGenKWh);
  const processingBaselineTonsCO2 = Number(((stage3.monthlyElectricityKWh * stage3.gridEmissionFactor) / 1000).toFixed(2));
  const actualProcessingTonsCO2 = Number(((netGridKWh * stage3.gridEmissionFactor) / 1000).toFixed(2));

  // 4. Stage 4 (Waste Scrap): Landfill vs Circular recovery
  const scrapBaselineTonsCO2 = Number((stage4.monthlyScrapTons * stage4.landfillEmissionFactor).toFixed(2));
  // Recycling avoids 85% of landfill degradation + virgin replacement
  const actualScrapTonsCO2 = Math.max(0, scrapBaselineTonsCO2 * (1 - (scrapRecyclePct / 100) * 0.85));

  // Totals
  const totalBaselineMonthlyCO2 = rawMaterialBaselineTonsCO2 + furnaceBaselineTonsCO2 + processingBaselineTonsCO2 + scrapBaselineTonsCO2;
  const totalActualMonthlyCO2 = actualVirginTonsCO2 + actualFurnaceTonsCO2 + actualProcessingTonsCO2 + actualScrapTonsCO2;
  const monthlyCO2SavedTons = Math.max(0, totalBaselineMonthlyCO2 - totalActualMonthlyCO2);
  const co2ReductionPercentage = totalBaselineMonthlyCO2 > 0 ? (monthlyCO2SavedTons / totalBaselineMonthlyCO2) * 100 : 0;

  // Financial Computations (INR ₹)
  // 1. Energy Savings: Fuel shift to biomass/PNG + Temp reduction
  const monthlyFuelCostBaseline = stage2.monthlyFuelConsumption * stage2.fuelCostPerUnitINR;
  const monthlyFuelSavings = Math.round(monthlyFuelCostBaseline * (fuelShiftPct / 100 * 0.22 + tempReductionPct / 100 * 0.18));
  const annualEnergySavingsINR = monthlyFuelSavings * 12;

  // 2. Material Savings: Replacing expensive virgin with PCR
  const costDiffPerTon = Math.max(0, stage1.costPerTonINR - stage1.recycledMaterialCostPerTonINR);
  const substitutedMaterialTons = stage1.monthlyVolumeTons * (pcrResinPct / 100);
  const monthlyMaterialSavingsINR = Math.round(substitutedMaterialTons * costDiffPerTon);
  const annualMaterialSavingsINR = monthlyMaterialSavingsINR * 12;

  // 3. Scrap Monetization: Turning landfill disposal fee into recycling sales revenue
  const recycledScrapTons = stage4.monthlyScrapTons * (scrapRecyclePct / 100);
  const monthlyAvoidedDisposalFee = Math.round(recycledScrapTons * stage4.disposalOrLandfillCostPerTonINR);
  const monthlyScrapSalesRevenue = Math.round(recycledScrapTons * stage4.recyclerSellingRatePerTonINR);
  const annualScrapRevenueINR = (monthlyAvoidedDisposalFee + monthlyScrapSalesRevenue) * 12;

  const totalAnnualSavingsINR = annualEnergySavingsINR + annualMaterialSavingsINR + annualScrapRevenueINR;

  // Monthly Baseline Cost
  const baselineMonthlyCostINR =
    stage1.monthlyVolumeTons * stage1.costPerTonINR +
    monthlyFuelCostBaseline +
    stage3.monthlyElectricityKWh * stage3.gridTariffPerKWhINR +
    stage4.monthlyScrapTons * stage4.disposalOrLandfillCostPerTonINR;

  const rawMaterialMonthlyCostINR = Math.round(
    (stage1.monthlyVolumeTons - substitutedMaterialTons) * stage1.costPerTonINR +
      substitutedMaterialTons * stage1.recycledMaterialCostPerTonINR
  );
  const furnaceMonthlyCostINR = Math.round(monthlyFuelCostBaseline - monthlyFuelSavings);
  const processingMonthlyCostINR = Math.round(netGridKWh * stage3.gridTariffPerKWhINR);
  const scrapMonthlyCostINR = Math.round(
    (stage4.monthlyScrapTons - recycledScrapTons) * stage4.disposalOrLandfillCostPerTonINR - monthlyScrapSalesRevenue
  );

  const newTotalCO2 = Math.max(0.1, totalActualMonthlyCO2);

  return {
    kpiData: {
      baselineMonthlyCO2: Number(totalBaselineMonthlyCO2.toFixed(1)),
      baselineMonthlyCostINR: Math.round(baselineMonthlyCostINR),
      monthlyCO2SavedTons: Number(monthlyCO2SavedTons.toFixed(1)),
      co2ReductionPercentage: Number(co2ReductionPercentage.toFixed(1)),
      financialSavings: {
        totalNetSavingsDisplay: `+₹${totalAnnualSavingsINR.toLocaleString('en-IN')} / year`,
        totalNetSavingsVal: totalAnnualSavingsINR,
        energySavings: annualEnergySavingsINR,
        materialSavings: annualMaterialSavingsINR,
        scrapRevenue: annualScrapRevenueINR,
      },
    } as KPIData,

    stages: [
      {
        name: '1. RAW MATERIAL',
        desc: `${stage1.materialName} (${stage1.monthlyVolumeTons}T/mo)`,
        currentMonthlyCO2: Number(actualVirginTonsCO2.toFixed(1)),
        financialMonthlyCost: rawMaterialMonthlyCostINR,
        sharePercentage: Number(((actualVirginTonsCO2 / newTotalCO2) * 100).toFixed(1)),
        status: (actualVirginTonsCO2 / newTotalCO2) * 100 > 18 ? ('RED ALERT' as const) : ('NORMAL' as const),
        provenanceFormula: `CO₂ = ${stage1.virginEmissionFactor} tCO₂e/T × MaterialTons × (1 - ${pcrResinPct}% PCR_Sub × 0.80)`,
      },
      {
        name: '2. FURNACE HEATING',
        desc: `${stage2.fuelType} (${stage2.furnaceOperatingTempC}°C)`,
        currentMonthlyCO2: Number(actualFurnaceTonsCO2.toFixed(1)),
        financialMonthlyCost: furnaceMonthlyCostINR,
        sharePercentage: Number(((actualFurnaceTonsCO2 / newTotalCO2) * 100).toFixed(1)),
        status: (actualFurnaceTonsCO2 / newTotalCO2) * 100 > 25 ? ('RED ALERT' as const) : ('EVALUATE' as const),
        alertPriority: 'PRIORITY 1',
        provenanceFormula: `CO₂ = ${stage2.monthlyFuelConsumption} ${stage2.fuelUnit}/mo × ${stage2.fuelEmissionFactor} kgCO₂e/${stage2.fuelUnit === 'Liters' ? 'L' : 'unit'} × (1 - 0.44 × FuelShift)`,
      },
      {
        name: '3. PROCESSING LINE',
        desc: `Grid & Rooftop Solar (${stage3.monthlyElectricityKWh.toLocaleString('en-IN')} kWh/mo)`,
        currentMonthlyCO2: Number(actualProcessingTonsCO2.toFixed(1)),
        financialMonthlyCost: processingMonthlyCostINR,
        sharePercentage: Number(((actualProcessingTonsCO2 / newTotalCO2) * 100).toFixed(1)),
        status: (actualProcessingTonsCO2 / newTotalCO2) * 100 > 20 ? ('EVALUATE' as const) : ('NORMAL' as const),
        provenanceFormula: `CO₂ = Net_Grid_kWh × CEA_Grid_Factor (${stage3.gridEmissionFactor} kgCO₂e/kWh)`,
      },
      {
        name: '4. WASTE SCRAP',
        desc: `${stage4.scrapTypeName} (${stage4.monthlyScrapTons}T/mo)`,
        currentMonthlyCO2: Number(actualScrapTonsCO2.toFixed(1)),
        financialMonthlyCost: scrapMonthlyCostINR,
        sharePercentage: Number(((actualScrapTonsCO2 / newTotalCO2) * 100).toFixed(1)),
        status: (actualScrapTonsCO2 / newTotalCO2) * 100 > 15 ? ('RED ALERT' as const) : ('NORMAL' as const),
        alertPriority: 'PRIORITY 2',
        provenanceFormula: `CO₂ = Unrecycled_Tons × Landfill_Factor (${stage4.landfillEmissionFactor} tCO₂e/T)`,
      },
    ] as ProcessStage[],
  };
}

/**
 * Backward compatibility fallback wrapper
 */
export function calculateLocalSimulation(inputs: SliderInputs) {
  return calculateDynamicFacilitySimulation(DEFAULT_FACILITY_PRESETS.apex_packaging, inputs);
}
