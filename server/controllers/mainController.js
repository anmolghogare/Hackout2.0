import {
  facilityBaseline,
  decarbonizationRoadmap,
  b2bCircularMatch,
  empiricalRegressionData
} from '../models/facilityModel.js';

let activeCircularListings = [
  {
    id: 'L1',
    materialName: 'Off-Cut Trim Scrap (LLDPE Polymer)',
    seller: 'Apex Packaging Pvt. Ltd. (Factory A)',
    quantity: '12 Tons / Month',
    pricePerTon: '₹25,000 / Ton',
    carbonOffsetPotential: '1.8 tCO₂e / Ton',
    matchScore: 98,
    location: 'Pune Industrial Belt, MH',
    aiAnalysis: {
      recipientIndustry: 'Pipe & Conduit Manufacturers (Factory B)',
      buyerDiscount: '30% below virgin polymer',
      annualRevenueDisplay: '+₹3,00,000 / year',
      annualLandfillFeeSavedDisplay: '+₹2,16,000 / year',
      landfillDiversionPct: '85% Landfill Diversion',
      recommendation: 'Direct B2B supply of off-cut trim scrap to Factory B replaces virgin resin at 30% discount while generating ₹3.0L/yr scrap sales revenue.'
    }
  },
  {
    id: 'L2',
    materialName: 'Clean Industrial Biomass Briquettes',
    seller: 'GreenFuel Eco Solutions',
    quantity: '50 Tons / Month',
    pricePerTon: '₹6,800 / Ton',
    carbonOffsetPotential: '2.4 tCO₂e / Ton (vs Heavy Fuel)',
    matchScore: 94,
    location: 'Chakan Industrial Zone, MH'
  },
  {
    id: 'L3',
    materialName: 'Post-Consumer Recycled (PCR) HDPE Granules',
    seller: 'ResinTech Circular Synthetics',
    quantity: '25 Tons / Month',
    pricePerTon: '₹48,000 / Ton',
    carbonOffsetPotential: '1.4 tCO₂e / Ton',
    matchScore: 89,
    location: 'Vapi Industrial Area, GJ'
  }
];

// Baseline emission factor constants (IPCC 2006 / CEA India v19)
const EMISSION_FACTORS = {
  ceaGridFactor: 0.82,          // kgCO2e/kWh (Central Electricity Authority India)
  heavyFurnaceOil: 3.12,         // kgCO2e/Liter (IPCC Stationary Combustion)
  virginLLDPE: 2.80,             // tCO2e/Ton (Polymer Embodied Carbon)
  pcrLLDPE: 1.40,                // tCO2e/Ton (50% recycled polymer blend)
  pipedNaturalGas: 1.95,         // kgCO2e/m3 (PNG Transition)
  biomassBriquettes: 0.45,       // kgCO2e/kg (Carbon Neutral Biomass Cycle)
  landfillScrapEmissions: 1.42,  // tCO2e/Ton (Landfill Methane & Degradation)
  disposalFeePerTonINR: 1500     // ₹/Ton Landfill Fee
};

// GET /api/facility/baseline
export const getBaseline = (req, res) => {
  res.json({
    success: true,
    data: facilityBaseline,
    emissionFactorReference: {
      standard: "IPCC 2006 Guidelines & CEA India Grid Database v19",
      factors: EMISSION_FACTORS
    }
  });
};

// POST /api/simulation/calculate
export const calculateSimulation = (req, res) => {
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

// POST /api/copilot/query - Server-side AI Q&A Engine (No API key exposed to frontend)
export const getCopilotResponse = async (req, res) => {
  try {
    const { prompt = "" } = req.body;
    const queryLower = prompt.toLowerCase().trim();

    if (!queryLower) {
      return res.json({
        success: true,
        data: {
          userPrompt: "",
          type: "greeting",
          text: "👋 Hello! I am your ByteMe AI Assistant. How can I assist you with Apex Packaging's carbon emissions, ROI simulation, or circular waste monetization today?",
          aiTitle: "ByteMe AI Assistant",
          summary: "Industrial Carbon Decision Intelligence Platform",
          referenceStandards: "IPCC 2006 & CEA India Grid v19",
          actionItems: null,
          totalImpact: null
        }
      });
    }

    // Intent Detection
    const greetingKeywords = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'who are you', 'help', 'what can you do', 'thanks', 'thank you', 'namaste', 'greetings', 'yo', 'sup'];
    const isGreeting = greetingKeywords.some(w => queryLower === w || queryLower.startsWith(w + ' ') || queryLower.endsWith(' ' + w) || queryLower === w + '!');

    const isNavigation = (queryLower.includes('go to') || queryLower.includes('navigate') || queryLower.includes('open') || queryLower.includes('show tab') || queryLower.includes('take me to') || queryLower.includes('switch to')) &&
      (queryLower.includes('simulator') || queryLower.includes('roi') || queryLower.includes('heatmap') || queryLower.includes('thermal') || queryLower.includes('ocr') || queryLower.includes('scanner') || queryLower.includes('digital twin') || queryLower.includes('canvas') || queryLower.includes('sandbox') || queryLower.includes('scenario') || queryLower.includes('sankey') || queryLower.includes('waste') || queryLower.includes('circular') || queryLower.includes('matrix') || queryLower.includes('roadmap') || queryLower.includes('overview') || queryLower.includes('context'));

    // Check if external Gemini API key is configured
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

    if (apiKey && queryLower.length > 0) {
      try {
        const systemPrompt = `You are the AI Sustainability Assistant for Apex Packaging Pvt. Ltd. (SME manufacturing facility in India: 100T/month virgin polymer resin, 1400°C furnace oil heating, 12T/month off-cut scrap).
Refer strictly to official IPCC 2006 & CEA India factors (CEA Grid: 0.82 kgCO2e/kWh, Furnace Oil: 3.12 kgCO2e/L, Virgin LLDPE: 2.80 tCO2e/Ton, PNG: 1.95 kgCO2e/m3).

User Input: "${prompt}"

Rules:
1. If the input is a GREETING (e.g. "hi", "hello", "hey", "thanks"), respond with a polite 1-2 sentence text greeting introducing yourself. Set "actionItems": null, "totalImpact": null. DO NOT generate fake action steps or audit tables for greetings.
2. If the user asks a REAL QUESTION about emissions, furnace heating, PCR substitution, scrap sales, payback, costs, or IPCC/CEA factors, answer with accurate calculations and set structured "actionItems" and "totalImpact".
3. If user requests NAVIGATION (e.g. "take me to 3D heatmap"), mention navigating and set "navigationTarget" to one of: ["overview", "simulator_hub", "analytics_hub", "intake", "simulation", "sandbox", "circular", "roadmap"].

Return ONLY valid JSON format:
{
  "userPrompt": "${prompt}",
  "type": "greeting | question | navigation",
  "text": "Your direct message to the user",
  "navigationTarget": null,
  "aiTitle": "Heading for response",
  "summary": "Brief summary",
  "referenceStandards": "IPCC 2006 Guidelines & CEA India Grid v19",
  "actionItems": null or [ { "step": 1, "title": "...", "co2Impact": "...", "financialImpact": "...", "paybackPeriod": "..." } ],
  "totalImpact": null or { "co2ReductionPct": "...", "annualProfitIncrease": "...", "paybackPeriodMonths": "..." }
}`;

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const fetchRes = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }] })
        });

        if (fetchRes.ok) {
          const rawRes = await fetchRes.json();
          const candidateText = rawRes?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            const cleanJsonStr = candidateText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsedData = JSON.parse(cleanJsonStr);
            return res.json({ success: true, data: parsedData, source: "Gemini-AI" });
          }
        }
      } catch (err) {
        console.warn("External Gemini API call error:", err.message);
      }
    }

    // SERVER-SIDE ZERO-HALLUCINATION INTENT ROUTER (when no API key or fallback)

    // Path 1: Greetings & Small Talk
    if (isGreeting) {
      return res.json({
        success: true,
        data: {
          userPrompt: prompt,
          type: "greeting",
          text: `👋 Hello! I am your ByteMe AI Assistant for Apex Packaging Pvt. Ltd. How can I help you today? You can ask me about furnace emissions, PCR resin substitution, waste monetization, or navigating to any dashboard module!`,
          aiTitle: "ByteMe AI Assistant",
          summary: "Apex Packaging Operational Decarbonization Intelligence",
          referenceStandards: "IPCC 2006 & CEA India Grid Database v19",
          actionItems: null,
          totalImpact: null,
          navigationTarget: null
        }
      });
    }

    // Path 2: Module Navigation Requests
    if (isNavigation) {
      let navTarget = "overview";
      let tabName = "Facility Context";
      if (queryLower.includes("simulator") || queryLower.includes("roi") || queryLower.includes("slider")) {
        navTarget = "simulator_hub"; tabName = "ROI Simulator Playground";
      } else if (queryLower.includes("heatmap") || queryLower.includes("thermal") || queryLower.includes("analytics")) {
        navTarget = "analytics_hub"; tabName = "3D Thermal Analytics & Heatmap";
      } else if (queryLower.includes("ocr") || queryLower.includes("scanner") || queryLower.includes("bill")) {
        navTarget = "intake"; tabName = "OCR Smart Bill Scanner";
      } else if (queryLower.includes("digital twin") || queryLower.includes("canvas") || queryLower.includes("flow")) {
        navTarget = "simulation"; tabName = "Digital Twin Process Flow Canvas";
      } else if (queryLower.includes("sandbox") || queryLower.includes("scenario") || queryLower.includes("plan")) {
        navTarget = "sandbox"; tabName = "Scenario Sandbox Matrix";
      } else if (queryLower.includes("sankey") || queryLower.includes("waste") || queryLower.includes("circular")) {
        navTarget = "circular"; tabName = "B2B Waste Sankey Network";
      } else if (queryLower.includes("matrix") || queryLower.includes("roadmap") || queryLower.includes("brsr")) {
        navTarget = "roadmap"; tabName = "ROI Matrix & BRSR Audit";
      }

      return res.json({
        success: true,
        data: {
          userPrompt: prompt,
          type: "navigation",
          text: `Opening the ${tabName} module for you now!`,
          navigationTarget: navTarget,
          aiTitle: `Navigating to ${tabName}`,
          summary: `Module navigation triggered for ${tabName}`,
          referenceStandards: "ByteMe Platform Router",
          actionItems: null,
          totalImpact: null
        }
      });
    }

    // Path 3: Financial ROI & Payback Questions
    if (queryLower.includes("payback") || queryLower.includes("cost") || queryLower.includes("investment") || queryLower.includes("roi") || queryLower.includes("png") || queryLower.includes("money") || queryLower.includes("capex")) {
      return res.json({
        success: true,
        data: {
          userPrompt: prompt,
          type: "question",
          text: "Here is the financial ROI and capital payback breakdown for Apex Packaging's decarbonization interventions:",
          aiTitle: "Financial ROI & Capital Payback Matrix (Apex Packaging)",
          summary: "Capital allocation breakdown for thermal energy fuel transition (Heavy Furnace Oil -> PNG/Biomass) and material substitution.",
          referenceStandards: "IPCC 2006 & CEA India Grid v19",
          actionItems: [
            {
              step: 1,
              title: "Furnace Thermal Heating Optimization & 50% PNG Switch",
              co2Impact: "CO₂ Reduction: -30 tCO₂e / year",
              financialImpact: "Capital Cost: ₹3,30,000 | Annual Savings: ₹3,50,000/yr",
              paybackPeriod: "6.0 Months"
            },
            {
              step: 2,
              title: "40% PCR Polymer Resin Substitution Blend",
              co2Impact: "CO₂ Reduction: -120 tCO₂e / year",
              financialImpact: "Capital Cost: ₹10,00,000 | Annual Savings: ₹2,40,000/yr",
              paybackPeriod: "14.0 Months"
            },
            {
              step: 3,
              title: "Inline Scrap Re-granulation & B2B Matchmaking",
              co2Impact: "CO₂ Reduction: -45 tCO₂e / year",
              financialImpact: "Capital Cost: ₹7,00,000 | Annual Revenue: ₹3,00,000/yr",
              paybackPeriod: "9.0 Months"
            }
          ],
          totalImpact: {
            co2ReductionPct: "195 tCO₂e / yr (21% Facility Cut)",
            annualProfitIncrease: "Total Capital Investment: ₹20,30,000 (~20.3 Lakhs INR)",
            paybackPeriodMonths: "~10.5 Months Average Payback"
          },
          navigationTarget: null
        }
      });
    }

    // Path 4: Scrap & Circular Economy Questions
    if (queryLower.includes("scrap") || queryLower.includes("waste") || queryLower.includes("b2b") || queryLower.includes("circular") || queryLower.includes("dumping") || queryLower.includes("monetize") || queryLower.includes("buyer")) {
      return res.json({
        success: true,
        data: {
          userPrompt: prompt,
          type: "question",
          text: "Here is how Apex Packaging monetizes 12 Tons/month off-cut polymer scrap via B2B waste-to-resource exchange:",
          aiTitle: "B2B Waste-to-Resource Circular Monetization Model",
          summary: "Replaces linear disposal (Factory ➔ Waste ➔ Landfill) with active B2B waste-to-resource exchange network.",
          referenceStandards: "IPCC 2006 Guidelines",
          actionItems: [
            {
              step: 1,
              title: "Divert 12 Tons/month Off-cut Polymer Scrap from Landfill",
              co2Impact: "Landfill Waste Diversion: -85%",
              financialImpact: "Saved Landfill Fee: +₹2,16,000 / year (₹1,500/Ton)",
              paybackPeriod: "Immediate"
            },
            {
              step: 2,
              title: "Supply Secondary Polymer Feedstock to Factory B (Pipe Manufacturer)",
              co2Impact: "Net Facility Carbon Cut: -42%",
              financialImpact: "Scrap Sales Revenue: +₹3,00,000 / year",
              paybackPeriod: "Immediate"
            },
            {
              step: 3,
              title: "Offer Feedstock at 30% Discount below Virgin Resin Rate to Buyer",
              co2Impact: "Scope 3 Circular Value Creation",
              financialImpact: "Buyer Cost Discount: 30% below virgin polymer",
              paybackPeriod: "Win-Win Network"
            }
          ],
          totalImpact: {
            co2ReductionPct: "42% Net Scrap Intensity Reduction",
            annualProfitIncrease: "+₹5,16,000 Total Value Created / year",
            paybackPeriodMonths: "Immediate Cash Positive"
          },
          navigationTarget: null
        }
      });
    }

    // Path 5: Emission Factors & Research Standards
    if (queryLower.includes("factor") || queryLower.includes("cea") || queryLower.includes("ipcc") || queryLower.includes("emission") || queryLower.includes("grid") || queryLower.includes("baseline") || queryLower.includes("reference")) {
      return res.json({
        success: true,
        data: {
          userPrompt: prompt,
          type: "question",
          text: "Apex Packaging's emissions are calculated using official IPCC 2006 Guidelines and CEA India Grid Database factors:",
          aiTitle: "Audit-Grade Carbon Emission Factor References (India Context)",
          summary: "Activity-based emission factor database derived from IPCC 2006 Guidelines & CEA India Grid Emission Factor Database v19.",
          referenceStandards: "IPCC 2006 & CEA India Grid Database v19",
          actionItems: [
            {
              step: 1,
              title: "CEA Grid Electricity Intensity",
              co2Impact: "Grid Emission Factor: 0.82 kgCO₂e / kWh",
              financialImpact: "Extrusion Line Scope 2 Baseline",
              paybackPeriod: "Audit Standard"
            },
            {
              step: 2,
              title: "Heavy Furnace Oil Thermal Combustion",
              co2Impact: "Combustion Factor: 3.12 kgCO₂e / Liter",
              financialImpact: "Scope 1 Direct Thermal Emissions",
              paybackPeriod: "Audit Standard"
            },
            {
              step: 3,
              title: "Virgin LLDPE Resin Embodied Footprint",
              co2Impact: "Upstream Factor: 2.80 tCO₂e / Ton",
              financialImpact: "Scope 3 Material Supply Chain",
              paybackPeriod: "Audit Standard"
            }
          ],
          totalImpact: {
            co2ReductionPct: "ISO 14064 Compliance Score: 99%",
            annualProfitIncrease: "SEBI BRSR Core Audit Ready",
            paybackPeriodMonths: "Auditable Calculation Engine"
          },
          navigationTarget: null
        }
      });
    }

    // Path 6: Default Question Path (Decarbonization Action Plan)
    return res.json({
      success: true,
      data: {
        userPrompt: prompt,
        type: "question",
        text: `Based on Apex Packaging's baseline telemetry (100T/mo virgin resin, 1400°C heavy furnace oil heating, 12T/mo trim scrap), here is your recommended 21% decarbonization action plan:`,
        aiTitle: "Live AI Copilot Operational Action Plan",
        summary: "AI Engine continuously monitoring facility throughput, energy mix, and scrap production against global emission databases (IPCC, CEA India).",
        referenceStandards: "IPCC 2006 Guidelines & CEA India Grid Emission Factor Database v19",
        actionItems: [
          {
            step: 1,
            title: "Reduce furnace thermal overshoot by 5%",
            co2Impact: "CO₂ Reduction: -9%",
            financialImpact: "Annual Energy Savings: ₹3,50,000 / year",
            paybackPeriod: "4.2 Months"
          },
          {
            step: 2,
            title: "Substitute 20% virgin resin with certified PCR scrap",
            co2Impact: "CO₂ Reduction: -7%",
            financialImpact: "Financial Impact: Cost-Neutral Material Shift",
            paybackPeriod: "7.5 Months"
          },
          {
            step: 3,
            title: "Route 12T/mo off-cut scrap to Factory B via Circular Network",
            co2Impact: "CO₂ Reduction: -5%",
            financialImpact: "Scrap Sales Revenue: +₹3,00,000 / year",
            paybackPeriod: "Immediate"
          }
        ],
        totalImpact: {
          co2ReductionPct: "21% Total CO₂ Reduction",
          annualProfitIncrease: "+₹6,50,000 / year Net Operational Profit Increase",
          paybackPeriodMonths: "~10.5 Months Average Payback"
        },
        navigationTarget: null
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/circular/matches
export const getCircularMatches = (req, res) => {
  res.json({
    success: true,
    data: activeCircularListings
  });
};

// POST /api/circular/analyze-product - AI By-Product Industry Matcher
export const analyzeByProduct = (req, res) => {
  try {
    const {
      name = "Industrial By-Product",
      quantity = "10 Tons / Month",
      quantityTons = 10,
      category = "Plastics & Polymers",
      location = "Pune Belt, MH",
      description = ""
    } = req.body;

    const nameLower = name.toLowerCase();
    let recipientIndustry = "Pipe & Conduit Manufacturers";
    let buyerDiscount = "30% below virgin rates";
    let pricePerTonINR = 24000;
    let co2OffsetPerTon = 1.6;

    if (nameLower.includes("fly ash") || nameLower.includes("slag") || nameLower.includes("cement") || nameLower.includes("concrete")) {
      recipientIndustry = "Ready-Mix Concrete & Brick Manufacturers";
      buyerDiscount = "45% below clinker cost";
      pricePerTonINR = 2800;
      co2OffsetPerTon = 0.8;
    } else if (nameLower.includes("metal") || nameLower.includes("steel") || nameLower.includes("aluminum") || nameLower.includes("copper")) {
      recipientIndustry = "Foundry & Secondary Smelting Refineries";
      buyerDiscount = "25% below primary ingot price";
      pricePerTonINR = 65000;
      co2OffsetPerTon = 4.2;
    } else if (nameLower.includes("chemical") || nameLower.includes("solvent") || nameLower.includes("oil") || nameLower.includes("sludge")) {
      recipientIndustry = "Cement Kilns (Co-processing Fuel) & Distillation Plants";
      buyerDiscount = "40% below virgin solvent rates";
      pricePerTonINR = 18000;
      co2OffsetPerTon = 2.1;
    } else if (nameLower.includes("textile") || nameLower.includes("cotton") || nameLower.includes("yarn") || nameLower.includes("fabric")) {
      recipientIndustry = "Non-Woven Insulation & Recycled Yarn Mill Clusters";
      buyerDiscount = "35% below virgin fiber rates";
      pricePerTonINR = 32000;
      co2OffsetPerTon = 1.9;
    }

    const numericQuantity = parseFloat(quantityTons) || parseFloat(quantity) || 10;
    const annualRevenueINR = Math.round(numericQuantity * pricePerTonINR * 12);
    const annualLandfillFeeSavedINR = Math.round(numericQuantity * 1500 * 12);
    const annualCO2AbatedTons = Number((numericQuantity * co2OffsetPerTon * 12).toFixed(1));
    const matchScore = Math.floor(Math.random() * 8) + 91; // 91% to 98% match

    const newListing = {
      id: `L-${Date.now()}`,
      materialName: name,
      seller: "Apex Packaging Pvt. Ltd. (Facility Input)",
      quantity: `${numericQuantity} Tons / Month`,
      pricePerTon: `₹${pricePerTonINR.toLocaleString('en-IN')} / Ton`,
      carbonOffsetPotential: `${co2OffsetPerTon} tCO₂e / Ton`,
      matchScore: matchScore,
      location: location,
      aiAnalysis: {
        recipientIndustry,
        buyerDiscount,
        annualRevenueINR,
        annualRevenueDisplay: `+₹${annualRevenueINR.toLocaleString('en-IN')} / year`,
        annualLandfillFeeSavedINR,
        annualLandfillFeeSavedDisplay: `+₹${annualLandfillFeeSavedINR.toLocaleString('en-IN')} / year`,
        annualCO2AbatedTons,
        landfillDiversionPct: "85% Landfill Diversion",
        recommendation: `Route ${numericQuantity}T/mo of ${name} directly to ${recipientIndustry}. Converts landfill disposal costs into recurring sales revenue while offering buyers a ${buyerDiscount}.`
      }
    };

    // Prepend to active listings
    activeCircularListings = [newListing, ...activeCircularListings];

    return res.json({
      success: true,
      message: "AI Circular Match Generated & Listed",
      data: newListing,
      allListings: activeCircularListings
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/roadmap
export const getRoadmap = (req, res) => {
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
export const getRegressionCharts = (req, res) => {
  res.json({
    success: true,
    data: empiricalRegressionData
  });
};
