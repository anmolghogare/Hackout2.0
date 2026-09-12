const {
  facilityBaseline,
  decarbonizationRoadmap,
  b2bCircularMatch
} = require('../models/facilityModel');

// GET /api/facility/baseline
exports.getBaseline = (req, res) => {
  res.json({
    success: true,
    data: facilityBaseline
  });
};

// POST /api/simulation/calculate
exports.calculateSimulation = (req, res) => {
  try {
    const {
      fuelShiftPct = 0,       // 0 to 100% shift from Furnace Oil to PNG/Biomass
      tempReductionPct = 0,   // 0 to 20% reduction in thermal overshoot
      pcrResinPct = 0,        // 0 to 50% substitution of virgin resin with PCR blend
      scrapRecyclePct = 0     // 0 to 100% off-cut scrap routed to circular exchange
    } = req.body;

    // 1. Calculate Raw Material Impact (Baseline: 10 tCO2e/mo)
    const rawMaterialReductionTons = 10 * (pcrResinPct / 50) * 0.40;
    const newRawMaterialTons = Math.max(0, 10 - rawMaterialReductionTons);

    // 2. Calculate Furnace Heating Impact (Baseline: 48 tCO2e/mo)
    const fuelShiftCO2Cut = 48 * (fuelShiftPct / 100) * 0.44;
    const tempCutCO2Cut = 48 * (tempReductionPct / 20) * 0.18;
    const totalFurnaceCut = fuelShiftCO2Cut + tempCutCO2Cut;
    const newFurnaceTons = Math.max(0, 48 - totalFurnaceCut);

    // 3. Processing Line Impact (Baseline: 25 tCO2e/mo)
    const newProcessingTons = 25; // Constant baseline operation

    // 4. Scrap Waste Impact (Baseline: 17 tCO2e/mo)
    const scrapCO2Cut = 17 * (scrapRecyclePct / 100) * 0.85;
    const newScrapTons = Math.max(0, 17 - scrapCO2Cut);

    // Totals
    const baselineMonthlyCO2 = 100;
    const newMonthlyCO2 = newRawMaterialTons + newFurnaceTons + newProcessingTons + newScrapTons;
    const monthlyCO2SavedTons = baselineMonthlyCO2 - newMonthlyCO2;
    const annualCO2SavedTons = monthlyCO2SavedTons * 12;
    const co2ReductionPercentage = (monthlyCO2SavedTons / baselineMonthlyCO2) * 100;

    // Financial ROI Calculations (INR ₹)
    const annualEnergySavingsINR = Math.round(350000 * (fuelShiftPct / 50 + tempReductionPct / 5) / 2);
    const annualMaterialSavingsINR = Math.round(240000 * (pcrResinPct / 20));
    const annualScrapRevenueINR = Math.round(300000 * (scrapRecyclePct / 100));
    const totalNetSavingsINR = annualEnergySavingsINR + annualMaterialSavingsINR + annualScrapRevenueINR;

    // Stage Status Updates based on 15% Red Alert Threshold
    const totalForPercentages = newMonthlyCO2 || 1;
    const updatedStages = [
      {
        id: "raw-material",
        name: "1. Raw Material",
        currentMonthlyCO2: Number(newRawMaterialTons.toFixed(1)),
        sharePercentage: Number(((newRawMaterialTons / totalForPercentages) * 100).toFixed(1)),
        status: (newRawMaterialTons / totalForPercentages) * 100 > 15 ? "RED ALERT" : "NORMAL"
      },
      {
        id: "furnace-heating",
        name: "2. Furnace Heating",
        currentMonthlyCO2: Number(newFurnaceTons.toFixed(1)),
        sharePercentage: Number(((newFurnaceTons / totalForPercentages) * 100).toFixed(1)),
        status: (newFurnaceTons / totalForPercentages) * 100 > 15 ? "RED ALERT" : "NORMAL"
      },
      {
        id: "processing-line",
        name: "3. Processing Line",
        currentMonthlyCO2: Number(newProcessingTons.toFixed(1)),
        sharePercentage: Number(((newProcessingTons / totalForPercentages) * 100).toFixed(1)),
        status: (newProcessingTons / totalForPercentages) * 100 > 15 ? "RED ALERT" : "NORMAL"
      },
      {
        id: "scrap-waste",
        name: "4. Scrap Waste",
        currentMonthlyCO2: Number(newScrapTons.toFixed(1)),
        sharePercentage: Number(((newScrapTons / totalForPercentages) * 100).toFixed(1)),
        status: (newScrapTons / totalForPercentages) * 100 > 15 ? "RED ALERT" : "NORMAL"
      }
    ];

    res.json({
      success: true,
      simulationInputs: {
        fuelShiftPct,
        tempReductionPct,
        pcrResinPct,
        scrapRecyclePct
      },
      results: {
        baselineMonthlyCO2,
        newMonthlyCO2: Number(newMonthlyCO2.toFixed(1)),
        monthlyCO2SavedTons: Number(monthlyCO2SavedTons.toFixed(1)),
        annualCO2SavedTons: Math.round(annualCO2SavedTons),
        co2ReductionPercentage: Number(co2ReductionPercentage.toFixed(1)),
        financialSavings: {
          annualEnergySavingsINR,
          annualMaterialSavingsINR,
          annualScrapRevenueINR,
          totalNetSavingsINR,
          totalNetSavingsDisplay: `₹${totalNetSavingsINR.toLocaleString('en-IN')}`
        },
        updatedStages
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST /api/copilot/query
exports.getCopilotResponse = (req, res) => {
  const { prompt = "" } = req.body;
  const queryLower = prompt.toLowerCase();

  let responseData = {
    userPrompt: prompt,
    aiTitle: "Decarbonization Action Plan",
    summary: "Integrated operational adjustments for optimal carbon & financial return.",
    actionItems: [
      {
        step: 1,
        title: "Reduce furnace thermal overshoot by 5%",
        co2Impact: "-9% CO₂ Reduction",
        financialImpact: "Annual Energy Savings: ₹3,50,000 / year"
      },
      {
        step: 2,
        title: "Substitute 20% virgin resin with certified PCR scrap",
        co2Impact: "-7% CO₂ Reduction",
        financialImpact: "Cost-Neutral Material Shift"
      },
      {
        step: 3,
        title: "Route 12T/mo off-cut scrap to Factory B via Circular Network",
        co2Impact: "-5% CO₂ Reduction",
        financialImpact: "Scrap Sales Revenue: +₹3,00,000 / year"
      }
    ],
    totalImpact: {
      co2ReductionPct: "21% Total CO₂ Reduction",
      annualProfitIncrease: "+₹6,50,000 / year Net Operational Profit Increase",
      paybackPeriodMonths: "10.5 Months Average Payback"
    }
  };

  if (queryLower.includes("payback") || queryLower.includes("cost") || queryLower.includes("investment")) {
    responseData.aiTitle = "Financial ROI & Capital Payback Analysis";
    responseData.summary = "Capital allocation breakdown across identified facility hotspot interventions.";
  } else if (queryLower.includes("scrap") || queryLower.includes("waste") || queryLower.includes("b2b")) {
    responseData.aiTitle = "B2B Waste-to-Resource Circular Plan";
    responseData.summary = "Monetization pathway for 12 Tons/month polymer trim scrap.";
  }

  res.json({
    success: true,
    data: responseData
  });
};

// GET /api/circular/matches
exports.getCircularMatches = (req, res) => {
  res.json({
    success: true,
    data: b2bCircularMatch
  });
};

// GET /api/roadmap
exports.getRoadmap = (req, res) => {
  res.json({
    success: true,
    data: {
      roadmap: decarbonizationRoadmap,
      summary: {
        totalCapitalInvestmentINR: 2030000,
        totalCapitalInvestmentDisplay: "₹20,30,000 (~20.3 Lakhs INR)",
        annualCO2ReductionTons: 195,
        totalFacilityReductionPct: 21,
        averagePaybackMonths: 10.5
      }
    }
  });
};
