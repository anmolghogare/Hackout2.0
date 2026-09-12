/**
 * Baseline Facility Data Model for Apex Packaging Pvt. Ltd.
 * Mid-Size SME Plastics & Packaging Facility (India Context)
 */

const facilityBaseline = {
  facilityName: "Apex Packaging Pvt. Ltd.",
  category: "Mid-Size SME Plastics & Packaging",
  location: "Gujarat / Maharashtra Industrial Belt, India",
  operationalProfile: {
    virginResinInputTonsMonth: 100,
    furnaceTempCelsius: 1400,
    fuelType: "Heavy Furnace Oil",
    trimScrapGeneratedTonsMonth: 12,
    disposalFeePerTonINR: 1500
  },
  processStages: [
    {
      id: "raw-material",
      name: "1. Raw Material",
      description: "Virgin Polymer Resin (100 Tons/month)",
      monthlyEmissionsTCO2e: 10,
      annualEmissionsTCO2e: 120,
      sharePercentage: 10,
      status: "NORMAL",
      alertPriority: null
    },
    {
      id: "furnace-heating",
      name: "2. Furnace Heating",
      description: "Heavy Furnace Oil Heating (1400°C)",
      monthlyEmissionsTCO2e: 48,
      annualEmissionsTCO2e: 576,
      sharePercentage: 48,
      status: "RED ALERT",
      alertPriority: "PRIORITY 1"
    },
    {
      id: "processing-line",
      name: "3. Processing Line",
      description: "Extrusion Line Operations",
      monthlyEmissionsTCO2e: 25,
      annualEmissionsTCO2e: 300,
      sharePercentage: 25,
      status: "EVALUATE",
      alertPriority: null
    },
    {
      id: "scrap-waste",
      name: "4. Scrap Waste",
      description: "Off-cut Polymer Trim Scrap (12 Tons/month)",
      monthlyEmissionsTCO2e: 17,
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
    currentDisposalFeeINR: 1500
  },
  buyer: {
    name: "Factory B (Regional Pipe Manufacturer)",
    requiredFeedstock: "Secondary Polymer Feedstock",
    priceDiscountVsVirgin: "30% Discount",
    newPathway: "Circular Product Input"
  },
  ecosystemImpact: {
    disposalCostSavingsINRYear: 216000, // 12T * 12M * 1500
    scrapSalesRevenueINRYear: 300000,
    rawMaterialCostSavingsPct: 30,
    landfillWasteReductionPct: 85,
    netCarbonFootprintCutPct: 42
  }
};

module.exports = {
  facilityBaseline,
  decarbonizationRoadmap,
  b2bCircularMatch
};
