/**
 * Baseline Facility Data Model & Decarbonization Intelligence
 * Target Implementation Entity: Apex Packaging Pvt. Ltd.
 * Mid-Size SME Plastics & Packaging Facility, India Context
 * Team: ByteMe
 */

const facilityBaseline = {
  projectInfo: {
    teamName: "ByteMe",
    track: "Automated Industrial Carbon Decision Intelligence for SMEs",
    title: "Industrial Emission Leak-Point Detector & Circular Alternative Recommender",
    members: ["Divyanshu", "Anmol Ghogare", "Rohan Gohil", "Riyan Mansuri"]
  },
  facilityName: "Apex Packaging Pvt. Ltd.",
  category: "Mid-Size SME Plastics & Packaging Facility",
  location: "Gujarat / Maharashtra Industrial Belt, India",
  operationalProfile: {
    virginResinInputTonsMonth: 100,
    furnaceTempCelsius: 1400,
    fuelType: "Heavy Furnace Oil",
    trimScrapGeneratedTonsMonth: 12,
    disposalFeePerTonINR: 1500
  },
  executiveOverview: {
    mission: "Automated industrial carbon decision intelligence platform designed specifically for SMEs in India.",
    operationalFocus: "Bridges corporate sustainability goals and plant profitability by transforming raw operational inputs into costed, ROI-evaluated circular interventions.",
    valueProposition: "Eliminates capital-intensive ESG consulting fees (₹10–25 Lakhs) and hardware IoT deployment barriers, delivering software-only carbon decision intelligence in Indian Rupees (INR ₹)."
  },
  processStages: [
    {
      id: "raw-material",
      name: "1. RAW MATERIAL",
      description: "Virgin Polymer Resin (100T/mo)",
      currentMonthlyCO2: 10,
      annualEmissionsTCO2e: 120,
      sharePercentage: 10,
      status: "NORMAL",
      alertPriority: null
    },
    {
      id: "furnace-heating",
      name: "2. FURNACE HEATING",
      description: "Heavy Furnace Oil Heating (1400°C)",
      currentMonthlyCO2: 48,
      annualEmissionsTCO2e: 576,
      sharePercentage: 48,
      status: "RED ALERT",
      alertPriority: "PRIORITY 1"
    },
    {
      id: "processing-line",
      name: "3. PROCESSING LINE",
      description: "Extrusion Line Operations",
      currentMonthlyCO2: 25,
      annualEmissionsTCO2e: 300,
      sharePercentage: 25,
      status: "EVALUATE",
      alertPriority: null
    },
    {
      id: "scrap-waste",
      name: "4. WASTE SCRAP",
      description: "Off-cut Trim Scrap (12T/mo)",
      currentMonthlyCO2: 17,
      annualEmissionsTCO2e: 204,
      sharePercentage: 17,
      status: "RED ALERT",
      alertPriority: "PRIORITY 2"
    }
  ],
  baselineTotals: {
    monthlyEmissionsTCO2e: 100,
    annualEmissionsTCO2e: 1200,
    redAlertThresholdPercentage: 15
  }
};

const decarbonizationRoadmap = [
  {
    id: 1,
    diagnosedHotspot: "Virgin Polymer Resin (62% Footprint)",
    recommendedAction: "Substitute 40% virgin resin with PCR polymer blend.",
    capitalCostINR: 1000000,
    capitalCostDisplay: "₹10,00,000 (~10 Lakhs)",
    annualCO2ReductionTons: 120,
    paybackMonths: 14
  },
  {
    id: 2,
    diagnosedHotspot: "Furnace Thermal Energy (28% Footprint)",
    recommendedAction: "Optimize heating cycles & switch 50% fuel to PNG/Biomass.",
    capitalCostINR: 330000,
    capitalCostDisplay: "₹3,30,000 (~3.3 Lakhs)",
    annualCO2ReductionTons: 30,
    paybackMonths: 6
  },
  {
    id: 3,
    diagnosedHotspot: "Unrecycled Scrap Waste (10% Footprint)",
    recommendedAction: "Inline scrap re-granulation + B2B waste matchmaking.",
    capitalCostINR: 700000,
    capitalCostDisplay: "₹7,00,000 (~7 Lakhs)",
    annualCO2ReductionTons: 45,
    paybackMonths: 9
  }
];

const b2bCircularMatch = {
  seller: {
    name: "Apex Packaging Pvt. Ltd. (Factory A)",
    byProduct: "Polymer Trim Scrap",
    volume: "12 Tons/month",
    currentDisposal: "Landfill Dumping",
    currentDisposalFeeINR: 1500,
    annualDisposalCostINR: 216000
  },
  buyer: {
    name: "Factory B (Regional Pipe Manufacturer)",
    requiredFeedstock: "Secondary Polymer Feedstock",
    priceDiscountVsVirgin: "30% Discount",
    newPathway: "Circular Product Input"
  },
  ecosystemImpact: {
    disposalCostSavingsINRYear: 216000,
    scrapSalesRevenueINRYear: 300000,
    totalAnnualFinancialGainINR: 516000,
    rawMaterialCostSavingsPct: 30,
    landfillWasteReductionPct: 85,
    netCarbonFootprintCutPct: 42
  }
};

// Data points for Empirical Regression Models (Slide 8)
const empiricalRegressionData = {
  rawMaterialRegression: {
    labels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    baselineVirginResin: [28, 56, 84, 112, 140, 168, 196, 224, 252, 280], // 2.80 tCO2e/Ton
    circularPCRBlend: [14, 28, 42, 56, 70, 84, 98, 112, 126, 140],       // 1.40 tCO2e/Ton (40% PCR Target)
    targetReductionPct: 50
  },
  fuelTransitionRegression: {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    biomassSolar: [0, 8.8, 17.6, 26.4, 35.2, 44.0, 52.8, 61.6, 70.4, 79.2, 88.0],
    biomassBriquettes: [0, 7.0, 14.0, 21.0, 28.0, 35.0, 42.0, 49.0, 56.0, 63.0, 70.0],
    pipedNaturalGas: [0, 3.0, 6.0, 9.0, 12.0, 15.0, 18.0, 21.0, 24.0, 27.0, 30.0],
    greenShiftTarget: { percent: 50, reduction: 44 }
  }
};

module.exports = {
  facilityBaseline,
  decarbonizationRoadmap,
  b2bCircularMatch,
  empiricalRegressionData
};
