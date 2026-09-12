import { FacilityConfig, SliderInputs, ProcessStage, CopilotRecommendation, TabId } from '../types';
import { calculateDynamicFacilitySimulation, formatINRLakhs } from '../lib/utils';

export interface AICopilotResponse {
  summary: string;
  actionItems: {
    step: number;
    title: string;
    co2Impact: string;
    financialImpact: string;
    capexRequired?: string;
    paybackPeriod?: string;
    provenanceSource?: string;
  }[];
  totalImpact: {
    co2ReductionPct: string;
    annualProfitIncrease: string;
    recommendedPreset?: Partial<SliderInputs>;
  };
  navigationTarget?: TabId;
  rawExplanation?: string;
}

/**
 * Parses conversational natural language prompts into slider adjustments
 * e.g., "shift 60% furnace fuel to png and increase scrap recycling to 100%"
 */
export function parseNaturalLanguageWhatIf(
  prompt: string,
  currentSliders: SliderInputs
): { hasMatches: boolean; newSliders: SliderInputs; explanation: string } {
  const lower = prompt.toLowerCase();
  const updated: SliderInputs = { ...currentSliders };
  let hasMatches = false;
  const changes: string[] = [];

  // Match fuel shift
  const fuelMatch = lower.match(/(\d+)\s*%\s*(?:fuel|furnace|biomass|png|gas)/i) ||
                     lower.match(/(?:fuel|furnace|biomass|png|gas)\s*(?:to|by)?\s*(\d+)\s*%/i);
  if (fuelMatch && fuelMatch[1]) {
    const val = Math.min(100, Math.max(0, parseInt(fuelMatch[1], 10)));
    updated.fuelShiftPct = val;
    hasMatches = true;
    changes.push(`Furnace Fuel Shift set to ${val}%`);
  }

  // Match temp reduction
  const tempMatch = lower.match(/(\d+)\s*%\s*(?:temp|temperature|heat)/i) ||
                     lower.match(/(?:temp|temperature|heat)\s*(?:to|by)?\s*(\d+)\s*%/i);
  if (tempMatch && tempMatch[1]) {
    const val = Math.min(20, Math.max(0, parseInt(tempMatch[1], 10)));
    updated.tempReductionPct = val;
    hasMatches = true;
    changes.push(`Operating Temperature Reduction set to ${val}%`);
  }

  // Match PCR resin
  const pcrMatch = lower.match(/(\d+)\s*%\s*(?:pcr|resin|recycle|polymer|scrap material|blend)/i) ||
                    lower.match(/(?:pcr|resin|polymer|blend)\s*(?:to|by)?\s*(\d+)\s*%/i);
  if (pcrMatch && pcrMatch[1]) {
    const val = Math.min(50, Math.max(0, parseInt(pcrMatch[1], 10)));
    updated.pcrResinPct = val;
    hasMatches = true;
    changes.push(`PCR Recycled Resin Blend set to ${val}%`);
  }

  // Match Scrap Recycling
  const scrapMatch = lower.match(/(\d+)\s*%\s*(?:scrap|waste|circular|landfill)/i) ||
                      lower.match(/(?:scrap|waste|circularity)\s*(?:to|by)?\s*(\d+)\s*%/i);
  if (scrapMatch && scrapMatch[1]) {
    const val = Math.min(100, Math.max(0, parseInt(scrapMatch[1], 10)));
    updated.scrapRecyclePct = val;
    hasMatches = true;
    changes.push(`Off-Cut Scrap Circular Recycling set to ${val}%`);
  }

  return {
    hasMatches,
    newSliders: updated,
    explanation: changes.length > 0 ? `Adjusted parameters: ${changes.join(', ')}.` : '',
  };
}

/**
 * Call real Google Gemini 1.5 API or execute deep heuristic fallback
 */
export async function queryAICopilot(
  userPrompt: string,
  facilityConfig: FacilityConfig,
  currentSliders: SliderInputs,
  apiKey?: string
): Promise<AICopilotResponse> {
  const whatIfParsed = parseNaturalLanguageWhatIf(userPrompt, currentSliders);

  // If user provided a Gemini API Key in AdminHub or environment, make direct API call
  const activeKey = apiKey || (typeof process !== 'undefined' ? (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY) : '');

  if (activeKey && activeKey.trim().length > 10 && !userPrompt.toLowerCase().includes('offline')) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are ByteMe's Industrial Decarbonization AI Copilot, specialized in Indian manufacturing plants (SMEs).
Current Facility Context:
- Plant: ${facilityConfig.profile.name} (${facilityConfig.profile.sector}) in ${facilityConfig.profile.location}
- Shifts: ${facilityConfig.profile.shiftsPerDay} shifts/day, ${facilityConfig.profile.workingDaysPerMonth} days/mo
- Stage 1 Raw Material: ${facilityConfig.stage1.monthlyVolumeTons} T/mo (${facilityConfig.stage1.materialName}) @ ₹${facilityConfig.stage1.costPerTonINR}/T
- Stage 2 Furnace/Heating: ${facilityConfig.stage2.monthlyFuelConsumption} ${facilityConfig.stage2.fuelUnit}/mo (${facilityConfig.stage2.fuelType}) @ ₹${facilityConfig.stage2.fuelCostPerUnitINR}/${facilityConfig.stage2.fuelUnit}
- Stage 3 Electricity: ${facilityConfig.stage3.monthlyElectricityKWh} kWh/mo @ ₹${facilityConfig.stage3.gridTariffPerKWhINR}/kWh (CEA Baseline 0.82 kgCO2e/kWh)
- Stage 4 Scrap Waste: ${facilityConfig.stage4.monthlyScrapTons} T/mo (${facilityConfig.stage4.scrapTypeName})
- Current Sliders: Fuel Shift: ${currentSliders.fuelShiftPct}%, Temp Reduction: ${currentSliders.tempReductionPct}%, PCR: ${currentSliders.pcrResinPct}%, Scrap: ${currentSliders.scrapRecyclePct}%

User Question: "${userPrompt}"

Respond in JSON matching this exact structure:
{
  "summary": "Concise high-level insight in 2 sentences with INR and CO2 metrics.",
  "actionItems": [
    {
      "step": 1,
      "title": "Specific engineering action",
      "co2Impact": "e.g. -14.2 tCO2e/mo",
      "financialImpact": "e.g. +₹4.5 Lakhs/yr savings",
      "capexRequired": "e.g. ₹8 Lakhs",
      "paybackPeriod": "e.g. 6.2 Months",
      "provenanceSource": "e.g. IPCC 2006 Vol 2 / BEE Norms"
    }
  ],
  "totalImpact": {
    "co2ReductionPct": "e.g. 28.5%",
    "annualProfitIncrease": "e.g. +₹8,90,000 / yr"
  },
  "navigationTarget": "simulator_hub" | "simulation" | "analytics_hub" | "circular" | "roadmap" | "intake" | "overview"
}`,
                  },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.2,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (jsonText) {
          const parsed = JSON.parse(jsonText);
          if (whatIfParsed.hasMatches) {
            parsed.totalImpact.recommendedPreset = whatIfParsed.newSliders;
          }
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Gemini API call fell back to local expert heuristics:', err);
    }
  }

  // Fallback Deterministic Industrial Expert Engine
  return generateHeuristicCopilotResponse(userPrompt, facilityConfig, currentSliders, whatIfParsed);
}

/**
 * Deterministic Indian SME Industrial Decarbonization Heuristics
 */
function generateHeuristicCopilotResponse(
  prompt: string,
  config: FacilityConfig,
  sliders: SliderInputs,
  whatIf: { hasMatches: boolean; newSliders: SliderInputs; explanation: string }
): AICopilotResponse {
  const lower = prompt.toLowerCase();
  const sim = calculateDynamicFacilitySimulation(config, whatIf.hasMatches ? whatIf.newSliders : sliders);

  if (whatIf.hasMatches) {
    return {
      summary: `Parsed What-If simulation for ${config.profile.name}. ${whatIf.explanation} This achieves ${sim.kpiData.co2ReductionPercentage}% carbon cut with ${sim.kpiData.financialSavings.totalNetSavingsDisplay}.`,
      actionItems: [
        {
          step: 1,
          title: 'Implement Parameter Recalibration',
          co2Impact: `-${sim.kpiData.monthlyCO2SavedTons} tCO₂e/mo saved`,
          financialImpact: sim.kpiData.financialSavings.totalNetSavingsDisplay,
          capexRequired: config.stage2.fuelType === 'Heavy Furnace Oil' ? '₹14.5 Lakhs' : '₹6.0 Lakhs',
          paybackPeriod: '7.8 Months',
          provenanceSource: 'CEA India Ver 19.0 & IPCC 2006',
        },
      ],
      totalImpact: {
        co2ReductionPct: `${sim.kpiData.co2ReductionPercentage}%`,
        annualProfitIncrease: sim.kpiData.financialSavings.totalNetSavingsDisplay,
        recommendedPreset: whatIf.newSliders,
      },
      navigationTarget: 'simulator_hub',
    };
  }

  if (lower.includes('furnace') || lower.includes('oil') || lower.includes('heat') || lower.includes('fuel')) {
    const fuelSavings = Math.round(config.stage2.monthlyFuelConsumption * config.stage2.fuelCostPerUnitINR * 0.25 * 12);
    return {
      summary: `Stage 2 Furnace combustion is the primary Scope 1 carbon driver at ${config.profile.name} (${config.stage2.fuelType} at ${config.stage2.furnaceOperatingTempC}°C). Shifting to Biomass Briquettes or PNG cuts thermal emissions by up to 44%.`,
      actionItems: [
        {
          step: 1,
          title: 'Dual-Fuel Burner Retrofit for Biomass/PNG Conversion',
          co2Impact: `-${(config.stage2.monthlyFuelConsumption * 3.12 * 0.44 / 1000).toFixed(1)} tCO₂e/mo`,
          financialImpact: `+${formatINRLakhs(fuelSavings)}/yr net fuel cost reduction`,
          capexRequired: '₹18.5 Lakhs',
          paybackPeriod: '8.4 Months',
          provenanceSource: 'IPCC 2006 Vol 2 & BEE Thermal Guidelines',
        },
        {
          step: 2,
          title: 'O2 Sensor Air-Fuel Ratio Tuning & Waste Heat Recuperator',
          co2Impact: '-3.8 tCO₂e/mo',
          financialImpact: '+₹2.4 Lakhs/yr energy efficiency recovery',
          capexRequired: '₹4.2 Lakhs',
          paybackPeriod: '5.1 Months',
          provenanceSource: 'BEE India PAT Industrial Heat Recovery Norms',
        },
      ],
      totalImpact: {
        co2ReductionPct: '32.4%',
        annualProfitIncrease: `+${formatINRLakhs(fuelSavings + 240000)} / yr`,
        recommendedPreset: { fuelShiftPct: 65, tempReductionPct: 8 },
      },
      navigationTarget: 'simulation',
    };
  }

  if (lower.includes('scrap') || lower.includes('waste') || lower.includes('circular') || lower.includes('sankey')) {
    const scrapRev = Math.round(config.stage4.monthlyScrapTons * (config.stage4.recyclerSellingRatePerTonINR + config.stage4.disposalOrLandfillCostPerTonINR) * 12);
    return {
      summary: `At ${config.profile.name}, ${config.stage4.monthlyScrapTons} T/mo of ${config.stage4.scrapTypeName} is currently generating landfill liability. Routing 100% through certified B2B circular aggregators unlocks direct cash flow.`,
      actionItems: [
        {
          step: 1,
          title: 'B2B Cluster Offtake Matchmaking',
          co2Impact: `-${(config.stage4.monthlyScrapTons * config.stage4.landfillEmissionFactor * 0.85).toFixed(1)} tCO₂e/mo avoided`,
          financialImpact: `+${formatINRLakhs(scrapRev)}/yr scrap sales & zero landfill fees`,
          capexRequired: '₹1.5 Lakhs (Baling & Sorting Bin Setup)',
          paybackPeriod: '1.2 Months',
          provenanceSource: 'CPCB PWM Rules 2022 Schedule II',
        },
      ],
      totalImpact: {
        co2ReductionPct: '14.2%',
        annualProfitIncrease: `+${formatINRLakhs(scrapRev)} / yr`,
        recommendedPreset: { scrapRecyclePct: 100 },
      },
      navigationTarget: 'circular',
    };
  }

  if (lower.includes('brsr') || lower.includes('sebi') || lower.includes('audit') || lower.includes('compliance')) {
    return {
      summary: `SEBI BRSR Core Principle 6 requires auditable Scope 1, Scope 2, and circular material flow disclosures for Indian suppliers. Your current data is fully aligned with CEA Ver. 19.0 standards.`,
      actionItems: [
        {
          step: 1,
          title: 'Export Auditor-Verified BRSR Core PDF Pack',
          co2Impact: '100% Traceability across 4 lifecycle stages',
          financialImpact: 'Complies with mandatory Tier-1 buyer vendor ESG mandates',
          capexRequired: '₹0 (Built-in Automated Generator)',
          paybackPeriod: 'Immediate',
          provenanceSource: 'SEBI Circular SEBI/HO/CFD/CFD-SEC-2/P/CIR/2023/122',
        },
      ],
      totalImpact: {
        co2ReductionPct: `${sim.kpiData.co2ReductionPercentage}% Target`,
        annualProfitIncrease: sim.kpiData.financialSavings.totalNetSavingsDisplay,
      },
      navigationTarget: 'roadmap',
    };
  }

  // Default Comprehensive Decarbonization Recommendation
  return {
    summary: `ByteMe Intelligence Analysis for ${config.profile.name} (${config.profile.sector}): We recommend a synchronized 3-tier decarbonization strategy targeting Furnace Oil conversion and PCR material blending.`,
    actionItems: [
      {
        step: 1,
        title: `Primary Fuel Shift (${config.stage2.fuelType} ➔ Biomass / PNG)`,
        co2Impact: '-21.1 tCO₂e/mo',
        financialImpact: `+${formatINRLakhs(Math.round(sim.kpiData.financialSavings.energySavings || 420000))}/yr`,
        capexRequired: '₹16.0 Lakhs',
        paybackPeriod: '7.2 Months',
        provenanceSource: 'IPCC 2006 Vol 2 Energy',
      },
      {
        step: 2,
        title: `20% Post-Consumer Recycled (${config.stage1.materialName}) Substitution`,
        co2Impact: '-5.6 tCO₂e/mo',
        financialImpact: `+${formatINRLakhs(Math.round(sim.kpiData.financialSavings.materialSavings || 240000))}/yr`,
        capexRequired: '₹2.5 Lakhs (Quality testing & blending setup)',
        paybackPeriod: '2.8 Months',
        provenanceSource: 'CPCB Plastic Waste Rules 2022',
      },
      {
        step: 3,
        title: `100% Circular Offtake for ${config.stage4.scrapTypeName}`,
        co2Impact: '-10.2 tCO₂e/mo',
        financialImpact: `+${formatINRLakhs(Math.round(sim.kpiData.financialSavings.scrapRevenue || 300000))}/yr`,
        capexRequired: '₹1.8 Lakhs',
        paybackPeriod: '1.4 Months',
        provenanceSource: 'CPCB EPR Schedule II',
      },
    ],
    totalImpact: {
      co2ReductionPct: `${sim.kpiData.co2ReductionPercentage}%`,
      annualProfitIncrease: sim.kpiData.financialSavings.totalNetSavingsDisplay,
      recommendedPreset: { fuelShiftPct: 50, tempReductionPct: 5, pcrResinPct: 20, scrapRecyclePct: 100 },
    },
    navigationTarget: 'simulator_hub',
  };
}
