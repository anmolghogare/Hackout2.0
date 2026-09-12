const {
  facilityBaseline,
  decarbonizationRoadmap,
  b2bCircularMatch,
  empiricalRegressionData
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
        name: "1. RAW MATERIAL",
        description: "Virgin Polymer Resin (100T/mo)",
        currentMonthlyCO2: Number(newRawMaterialTons.toFixed(1)),
        sharePercentage: Number(((newRawMaterialTons / totalForPercentages) * 100).toFixed(1)),
        status: ((newRawMaterialTons / totalForPercentages) * 100) > 15 ? "RED ALERT" : "NORMAL",
        alertPriority: ((newRawMaterialTons / totalForPercentages) * 100) > 15 ? "PRIORITY" : null
      },
      {
        id: "furnace-heating",
        name: "2. FURNACE HEATING",
        description: "Heavy Furnace Oil Heating (1400°C)",
        currentMonthlyCO2: Number(newFurnaceTons.toFixed(1)),
        sharePercentage: Number(((newFurnaceTons / totalForPercentages) * 100).toFixed(1)),
        status: ((newFurnaceTons / totalForPercentages) * 100) > 15 ? "RED ALERT" : "NORMAL",
        alertPriority: ((newFurnaceTons / totalForPercentages) * 100) > 15 ? "PRIORITY 1" : null
      },
      {
        id: "processing-line",
        name: "3. PROCESSING LINE",
        description: "Extrusion Line Operations",
        currentMonthlyCO2: Number(newProcessingTons.toFixed(1)),
        sharePercentage: Number(((newProcessingTons / totalForPercentages) * 100).toFixed(1)),
        status: ((newProcessingTons / totalForPercentages) * 100) > 15 ? "EVALUATE" : "NORMAL",
        alertPriority: null
      },
      {
        id: "scrap-waste",
        name: "4. WASTE SCRAP",
        description: "Off-cut Trim Scrap (12T/mo)",
        currentMonthlyCO2: Number(newScrapTons.toFixed(1)),
        sharePercentage: Number(((newScrapTons / totalForPercentages) * 100).toFixed(1)),
        status: ((newScrapTons / totalForPercentages) * 100) > 15 ? "RED ALERT" : "NORMAL",
        alertPriority: ((newScrapTons / totalForPercentages) * 100) > 15 ? "PRIORITY 2" : null
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
          totalNetSavingsDisplay: `+₹${totalNetSavingsINR.toLocaleString('en-IN')} / year`
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
    aiTitle: "Live AI Copilot Operational Action Plan",
    summary: "AI Engine continuously monitoring facility throughput, energy mix, and scrap production against global emission databases (IPCC, CEA India).",
    actionItems: [
      {
        step: 1,
        title: "Reduce furnace thermal overshoot by 5%",
        co2Impact: "CO₂ Reduction: -9%",
        financialImpact: "Annual Energy Savings: ₹3,50,000 / year"
      },
      {
        step: 2,
        title: "Substitute 20% virgin resin with certified PCR scrap",
        co2Impact: "CO₂ Reduction: -7%",
        financialImpact: "Financial Impact: Cost-Neutral Material Shift"
      },
      {
        step: 3,
        title: "Route 12T/mo off-cut scrap to Factory B via Circular Network",
        co2Impact: "CO₂ Reduction: -5%",
        financialImpact: "Scrap Sales Revenue: +₹3,00,000 / year"
      }
    ],
    totalImpact: {
      co2ReductionPct: "21% Total CO₂ Reduction",
      annualProfitIncrease: "+₹6,50,000 / year Net Operational Profit Increase",
      paybackPeriodMonths: "~10.5 Months Average Payback"
    }
  };

  if (queryLower.includes("payback") || queryLower.includes("cost") || queryLower.includes("investment") || queryLower.includes("png")) {
    responseData.aiTitle = "Financial ROI & Capital Payback Analysis";
    responseData.summary = "Capital allocation breakdown for thermal energy fuel transition (Heavy Furnace Oil -> PNG/Biomass).";
    responseData.actionItems = [
      {
        step: 1,
        title: "Furnace Thermal Heating Optimization & 50% PNG Switch",
        co2Impact: "CO₂ Reduction: -30 tCO₂e / year",
        financialImpact: "Capital Cost: ₹3,30,000 | Payback Period: 6 Months"
      },
      {
        step: 2,
        title: "40% PCR Polymer Resin Substitution Blend",
        co2Impact: "CO₂ Reduction: -120 tCO₂e / year",
        financialImpact: "Capital Cost: ₹10,00,000 | Payback Period: 14 Months"
      },
      {
        step: 3,
        title: "Inline Scrap Re-granulation & B2B Matchmaking",
        co2Impact: "CO₂ Reduction: -45 tCO₂e / year",
        financialImpact: "Capital Cost: ₹7,00,000 | Payback Period: 9 Months"
      }
    ];
    responseData.totalImpact = {
      co2ReductionPct: "195 tCO₂e / yr (21% Facility Cut)",
      annualProfitIncrease: "Total Capital Investment: ₹20,30,000 (~20.3 Lakhs INR)",
      paybackPeriodMonths: "~10.5 Months Average Payback"
    };
  } else if (queryLower.includes("scrap") || queryLower.includes("waste") || queryLower.includes("b2b") || queryLower.includes("monetize")) {
    responseData.aiTitle = "B2B Waste-to-Resource Circular Monetization Plan";
    responseData.summary = "Replaces linear route (Factory A ➔ Waste ➔ Landfill) with active B2B waste-to-resource exchange network with Factory B.";
    responseData.actionItems = [
      {
        step: 1,
        title: "Divert 12 Tons/month Off-cut Polymer Scrap from Landfill",
        co2Impact: "Landfill Waste Diversion: -85%",
        financialImpact: "Eliminates ₹1,500/Ton Landfill Disposal Fee (₹2,16,000/yr saved)"
      },
      {
        step: 2,
        title: "Supply Secondary Polymer Feedstock to Factory B (Pipe Manufacturer)",
        co2Impact: "Net Carbon Footprint Cut: -42%",
        financialImpact: "Generates Scrap Sales Revenue: +₹3,00,000 / year"
      },
      {
        step: 3,
        title: "Provide Recipient Factory B with Feedstock at 30% Discount below Virgin Resin",
        co2Impact: "Circular Ecosystem Impact",
        financialImpact: "30% Discount Feedstock Savings for Buyer"
      }
    ];
    responseData.totalImpact = {
      co2ReductionPct: "42% Net Footprint Cut",
      annualProfitIncrease: "+₹5,16,000 Total Value Created / year",
      paybackPeriodMonths: "Immediate Operational Cash positive"
    };
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

// GET /api/charts/whatif
exports.getRegressionCharts = (req, res) => {
  res.json({
    success: true,
    data: empiricalRegressionData
  });
};
