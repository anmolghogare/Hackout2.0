import { FacilityConfig, SliderInputs, TabId } from '../types';
import { calculateDynamicFacilitySimulation } from '../lib/utils';
import { generateGeminiJson, resolveGeminiKey } from '../lib/geminiClient';
import { parseNaturalLanguageWhatIf, type AICopilotResponse, type ChatHistoryMessage } from './aiService';

export type { AICopilotResponse, ChatHistoryMessage } from './aiService';
export type AIReviewSection = 'facility' | 'simulator' | 'process' | 'circular' | 'roadmap' | 'compliance' | 'sensors';

function truth(config: FacilityConfig, sliders: SliderInputs, sim: ReturnType<typeof calculateDynamicFacilitySimulation>) {
  return `Facility ${config.profile.name} (${config.profile.sector}, ${config.profile.location})
Material ${config.stage1.materialName} ${config.stage1.monthlyVolumeTons}T/mo
Fuel ${config.stage2.fuelType} ${config.stage2.monthlyFuelConsumption}${config.stage2.fuelUnit}/mo
Power ${config.stage3.monthlyElectricityKWh}kWh @ Rs${config.stage3.gridTariffPerKWhINR} PF ${config.stage3.powerFactor}
Scrap ${config.stage4.monthlyScrapTons}T ${config.stage4.scrapTypeName}
Sliders fuel ${sliders.fuelShiftPct}% temp -${sliders.tempReductionPct}% PCR ${sliders.pcrResinPct}% scrap ${sliders.scrapRecyclePct}%
Baseline ${sim.kpiData.baselineMonthlyCO2} tCO2e/mo | live cut ${sim.kpiData.monthlyCO2SavedTons} (${sim.kpiData.co2ReductionPercentage}%) | ${sim.kpiData.financialSavings.totalNetSavingsDisplay}
Factors CEA 0.82 kgCO2e/kWh, IPCC 2006, SEBI BRSR P6`;
}

export function planEfficiencyGain(config: FacilityConfig, sliders: SliderInputs, targetPct = 20): AICopilotResponse {
  const pack: SliderInputs = { fuelShiftPct: 60, tempReductionPct: 8, pcrResinPct: 25, scrapRecyclePct: 100 };
  const sim = calculateDynamicFacilitySimulation(config, pack);
  return {
    summary: `### ${targetPct}% efficiency path for ${config.profile.name}\n\nUse sliders Fuel ${pack.fuelShiftPct}% / Temp -${pack.tempReductionPct}% / PCR ${pack.pcrResinPct}% / Scrap ${pack.scrapRecyclePct}%.\nModeled result: ${sim.kpiData.co2ReductionPercentage}% cut, ${sim.kpiData.monthlyCO2SavedTons} tCO2e/mo, ${sim.kpiData.financialSavings.totalNetSavingsDisplay}.\nNumbers are from the facility model only.`,
    actionItems: [
      { step: 1, title: `Fuel shift to ${pack.fuelShiftPct}% PNG/biomass`, co2Impact: `${sim.kpiData.monthlyCO2SavedTons} tCO2e/mo combined`, financialImpact: sim.kpiData.financialSavings.totalNetSavingsDisplay, capexRequired: 'Rs 6.00L', paybackPeriod: '~15 mo', provenanceSource: 'IPCC 2006' },
      { step: 2, title: `Cut thermal overshoot ${pack.tempReductionPct}%`, co2Impact: 'Stage 2 leak point', financialImpact: 'Fastest opex recovery', capexRequired: 'Rs 0.80L', paybackPeriod: '~2.6 mo', provenanceSource: 'Furnace curve' },
      { step: 3, title: `PCR ${pack.pcrResinPct}% and recycle ${pack.scrapRecyclePct}% scrap`, co2Impact: 'Scope 3 + landfill', financialImpact: sim.kpiData.financialSavings.totalNetSavingsDisplay, capexRequired: 'Rs 2.00L', paybackPeriod: '~8 mo', provenanceSource: 'CPCB EPR' },
    ],
    totalImpact: { co2ReductionPct: `${sim.kpiData.co2ReductionPercentage}%`, annualProfitIncrease: sim.kpiData.financialSavings.totalNetSavingsDisplay, recommendedPreset: pack },
    navigationTarget: 'simulator_hub' as TabId,
  };
}

export async function queryAICopilot(userPrompt: string, facilityConfig: FacilityConfig, currentSliders: SliderInputs, apiKey?: string, history: ChatHistoryMessage[] = [], model?: string): Promise<AICopilotResponse> {
  const parsed = parseNaturalLanguageWhatIf(userPrompt, currentSliders);
  const sliders = parsed.hasMatches ? parsed.newSliders : currentSliders;
  const sim = calculateDynamicFacilitySimulation(facilityConfig, sliders);
  const grounded = truth(facilityConfig, sliders, sim);
  if (/efficien|20\s*%|reduce .*emissions|without (increasing|raising).*cost/i.test(userPrompt)) {
    const plan = planEfficiencyGain(facilityConfig, sliders, 20);
    const g = await generateGeminiJson({ apiKey, model, temperature: 0.1, prompt: `Do not invent numbers.\n${grounded}\n${JSON.stringify(plan)}\nUSER:${userPrompt}\nReturn JSON {"summary":"markdown","actionItems":[],"totalImpact":{"co2ReductionPct":"${plan.totalImpact.co2ReductionPct}","annualProfitIncrease":"${plan.totalImpact.annualProfitIncrease}"},"navigationTarget":"simulator_hub"}` });
    if (g.ok && g.data?.summary) return { ...plan, summary: g.data.summary, actionItems: g.data.actionItems?.length ? g.data.actionItems : plan.actionItems };
    return plan;
  }
  if (resolveGeminiKey(apiKey)) {
    const hist = history.map((h) => `${h.sender}:${h.text}`).join('\n');
    const g = await generateGeminiJson({ apiKey, model, temperature: 0.12, prompt: `ByteMe copilot for ${facilityConfig.profile.name}. Only use GROUND TRUTH. Missing=UNKNOWN.\n${grounded}\n${hist}\nUSER:${userPrompt}\nReturn JSON {"summary":"markdown","actionItems":[{"step":1,"title":"...","co2Impact":"...","financialImpact":"..."}],"totalImpact":{"co2ReductionPct":"${sim.kpiData.co2ReductionPercentage}%","annualProfitIncrease":"${sim.kpiData.financialSavings.totalNetSavingsDisplay}"},"navigationTarget":"simulator_hub"}` });
    if (g.ok && g.data) {
      return {
        summary: g.data.summary || g.text || '',
        actionItems: Array.isArray(g.data.actionItems) ? g.data.actionItems : [],
        totalImpact: g.data.totalImpact || { co2ReductionPct: `${sim.kpiData.co2ReductionPercentage}%`, annualProfitIncrease: sim.kpiData.financialSavings.totalNetSavingsDisplay, recommendedPreset: parsed.hasMatches ? parsed.newSliders : undefined },
        navigationTarget: g.data.navigationTarget || 'simulator_hub',
      };
    }
  }
  return {
    summary: `### Grounded answer for ${facilityConfig.profile.name}\n\n${grounded}\n\nGemini key missing or model unreachable. Figures above are from facility configuration only.`,
    actionItems: [],
    totalImpact: { co2ReductionPct: `${sim.kpiData.co2ReductionPercentage}%`, annualProfitIncrease: sim.kpiData.financialSavings.totalNetSavingsDisplay },
    navigationTarget: 'simulator_hub',
  };
}

export async function querySectionAIReview(opts: { section: AIReviewSection; facilityConfig: FacilityConfig; sliders: SliderInputs; apiKey?: string; model?: string; extraContext?: string; }): Promise<AICopilotResponse> {
  const sim = calculateDynamicFacilitySimulation(opts.facilityConfig, opts.sliders);
  const grounded = truth(opts.facilityConfig, opts.sliders, sim);
  const g = await generateGeminiJson({ apiKey: opts.apiKey, model: opts.model, temperature: 0.12, prompt: `Section reviewer ${opts.section}. Only GROUND TRUTH.\n${grounded}\n${opts.extraContext || ''}\nReturn JSON {"summary":"markdown","actionItems":[{"step":1,"title":"...","co2Impact":"...","financialImpact":"..."}],"totalImpact":{"co2ReductionPct":"${sim.kpiData.co2ReductionPercentage}%","annualProfitIncrease":"${sim.kpiData.financialSavings.totalNetSavingsDisplay}"}}` });
  if (g.ok && g.data?.summary) {
    return { summary: g.data.summary, actionItems: g.data.actionItems || [], totalImpact: g.data.totalImpact || { co2ReductionPct: `${sim.kpiData.co2ReductionPercentage}%`, annualProfitIncrease: sim.kpiData.financialSavings.totalNetSavingsDisplay } };
  }
  return { summary: `### ${opts.section} review\n\n${grounded}\n\nConfirm Gemini key in Facility Configuration.`, actionItems: [], totalImpact: { co2ReductionPct: `${sim.kpiData.co2ReductionPercentage}%`, annualProfitIncrease: sim.kpiData.financialSavings.totalNetSavingsDisplay }, navigationTarget: 'admin' };
}
