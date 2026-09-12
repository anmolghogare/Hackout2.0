import { FacilityConfig, SliderInputs, TabId } from '../types';
import { generateGeminiJson, resolveGeminiKey } from '../lib/geminiClient';
import { parseNaturalLanguageWhatIf, type AICopilotResponse, type ChatHistoryMessage } from './aiService';

export type { AICopilotResponse, ChatHistoryMessage } from './aiService';
export type AIReviewSection = 'facility' | 'simulator' | 'process' | 'circular' | 'roadmap' | 'compliance' | 'sensors';

const clamp = (n: number, lo: number, hi: number, fallback: number) =>
  typeof n === 'number' && Number.isFinite(n) && n >= lo && n <= hi ? n : fallback;

function plant(config: FacilityConfig, sliders: SliderInputs) {
  const tons = clamp(config.stage1?.monthlyVolumeTons, 1, 2000, 100);
  const kwh = clamp(config.stage3?.monthlyElectricityKWh, 100, 500000, 32500);
  const scrap = clamp(config.stage4?.monthlyScrapTons, 0, 500, 12);
  const fuelShift = clamp(sliders.fuelShiftPct, 0, 100, 50);
  const temp = clamp(sliders.tempReductionPct, 0, 30, 5);
  const pcr = clamp(sliders.pcrResinPct, 0, 80, 20);
  const rec = clamp(sliders.scrapRecyclePct, 0, 100, 100);
  const annualT = +(fuelShift * 2.4 + temp * 2.6 + pcr * 1.6 + rec * 0.32).toFixed(1);
  const saveL = +(fuelShift * 0.084 + temp * 0.028 + pcr * 0.012 + rec * 0.03).toFixed(1);
  const pct = Math.min(42, +(annualT / 12).toFixed(1));
  return {
    name: config.profile?.name || 'Apex Packaging',
    sector: config.profile?.sector || 'Plastics',
    location: config.profile?.location || 'Pune',
    material: config.stage1?.materialName || 'LLDPE',
    fuel: config.stage2?.fuelType || 'Furnace oil',
    tons,
    kwh,
    scrap,
    tariff: clamp(config.stage3?.gridTariffPerKWhINR, 1, 20, 9.2),
    fuelShift,
    temp,
    pcr,
    rec,
    annualT,
    saveL,
    pct,
    snapshot: `${config.profile?.name || 'Apex'} | ${tons} T resin/mo | ${config.stage2?.fuelType || 'oil'} | ${kwh} kWh/mo | ${scrap} T scrap/mo | sliders fuel ${fuelShift}% temp -${temp}% PCR ${pcr}% scrap ${rec}% | modeled ${pct}% / ${annualT} tCO2e/yr / Rs ${saveL}L/yr. Never exceed 120 tCO2e/mo or Rs 30L/mo.`,
  };
}

const PLAYBOOK: Record<AIReviewSection, (p: ReturnType<typeof plant>) => AICopilotResponse> = {
  facility: (p) => ({
    summary: `### Facility audit · ${p.name}\n\nTreat volumes above 2,000 T/mo as data-entry errors. Working set: ${p.tons} T resin, ${p.kwh} kWh, ${p.scrap} T scrap, fuel ${p.fuel}. Sector shown as ${p.sector} at ${p.location}. Do not run the twin until resin tons and fuel units match the store floor.`,
    actionItems: [
      { step: 1, title: 'Confirm monthly resin tons (expect ~100 T, not millions)', co2Impact: 'Unlocks Scope 3', financialImpact: 'Stops fake baselines', provenanceSource: 'Store ledger' },
      { step: 2, title: `Match fuel type and unit for ${p.fuel}`, co2Impact: 'Scope 1 factor', financialImpact: 'Invoice-grade', provenanceSource: 'IPCC 2006' },
      { step: 3, title: 'Save Gemini key here so section reviews can call the model', co2Impact: 'n/a', financialImpact: 'n/a', provenanceSource: 'Admin' },
    ],
    totalImpact: { co2ReductionPct: `${p.pct}% modeled after sliders`, annualProfitIncrease: `₹${p.saveL}L / yr modeled` },
    navigationTarget: 'admin' as TabId,
  }),
  sensors: (p) => ({
    summary: `### Telemetry review · ${p.name}\n\nFlag a furnace reading above 1,400°C or PF below 0.90. Current modeled power ${p.kwh} kWh at ₹${p.tariff}/kWh. This section is about implausible sensors, not a 40-million-ton baseline.`,
    actionItems: [
      { step: 1, title: 'Quarantine Zone 2 if live temp > 1,400°C', co2Impact: '48 tCO₂e/mo leak class', financialImpact: '₹3.72L/mo if real', provenanceSource: 'FLIR / kiln curve' },
      { step: 2, title: 'Check PF vs 0.90 floor on extruder feeds', co2Impact: 'Scope 2 quality', financialImpact: 'DISCOM penalty', provenanceSource: 'Meter' },
    ],
    totalImpact: { co2ReductionPct: 'sensor QA', annualProfitIncrease: 'no rupee claim without a bill' },
    navigationTarget: 'sensors' as TabId,
  }),
  process: (p) => ({
    summary: `### Twin leak-point · ${p.name}\n\nHottest stage remains furnace heating on ${p.fuel}. Sliders today: fuel ${p.fuelShift}% / temp −${p.temp}%. Do not restate resin millions.`,
    actionItems: [
      { step: 1, title: 'Inspect Stage 2 burner before Stage 1 silo', co2Impact: 'Primary leak', financialImpact: 'Highest opex', provenanceSource: 'Twin' },
      { step: 2, title: 'Open What-If with fuel 50% + temp −10%', co2Impact: `~${p.annualT} tCO₂e/yr class`, financialImpact: `₹${p.saveL}L/yr class`, provenanceSource: 'Sliders' },
    ],
    totalImpact: { co2ReductionPct: `${p.pct}%`, annualProfitIncrease: `₹${p.saveL}L / yr` },
    navigationTarget: 'simulation' as TabId,
  }),
  simulator: (p) => ({
    summary: `### Scenario critique · ${p.name}\n\nA ~20% cut without lifting opex is fuel 50–60% + temp −8% + PCR 20% + scrap 100%. Modeled on current sliders: ${p.pct}% / ${p.annualT} tCO₂e/yr / ₹${p.saveL}L/yr.`,
    actionItems: [
      { step: 1, title: 'Set fuel shift 50–60% first', co2Impact: 'Largest lever', financialImpact: 'Capex ~₹6–15L', provenanceSource: 'IPCC oil→biomass' },
      { step: 2, title: 'Temp −8% (PID), not −30%', co2Impact: 'Stops 1,418°C overshoot', financialImpact: '₹0.8L capex', provenanceSource: 'Furnace' },
      { step: 3, title: 'Hold PCR 20% and scrap 100%', co2Impact: 'Scope 3 + landfill', financialImpact: 'Fast payback scrap', provenanceSource: 'EPR' },
    ],
    totalImpact: { co2ReductionPct: `${p.pct}%`, annualProfitIncrease: `₹${p.saveL}L / yr` },
    navigationTarget: 'simulator_hub' as TabId,
  }),
  circular: (p) => ({
    summary: `### Offtake review · ${p.name}\n\nOnly ${p.scrap} T trim/mo is in the model. Do not invent buyers. Landfill vs B2B pipe cluster is the decision.`,
    actionItems: [
      { step: 1, title: `Contract ${p.scrap} T/mo trim at ~₹25k/T`, co2Impact: '~32 tCO₂e/yr avoided landfill', financialImpact: '~₹3L/yr', provenanceSource: 'Scrap yard' },
      { step: 2, title: 'Do not count scrap as 170 tCO₂e', co2Impact: 'Keeps furnace as #1 leak', financialImpact: 'Honest BRSR', provenanceSource: 'Mass balance' },
    ],
    totalImpact: { co2ReductionPct: 'scrap only', annualProfitIncrease: '~₹3L / yr if PO exists' },
    navigationTarget: 'circular' as TabId,
  }),
  roadmap: (p) => ({
    summary: `### 90-day capex review · ${p.name}\n\nSequence: scrap PO (ops) → PCR trial (procurement) → burner PID (maintenance). Do not front-load ₹35L biomass until Phase 1 gate is Done.`,
    actionItems: [
      { step: 1, title: 'Phase 1 owner: plant ops — signed offtake', co2Impact: '32 t class', financialImpact: '₹0.4L capex', provenanceSource: 'Workboard' },
      { step: 2, title: 'Phase 3 only after OEM quote', co2Impact: `${p.annualT} t class`, financialImpact: `₹${p.saveL}L class`, provenanceSource: 'Roadmap' },
    ],
    totalImpact: { co2ReductionPct: `${p.pct}% if gates close`, annualProfitIncrease: `₹${p.saveL}L / yr modeled` },
    navigationTarget: 'roadmap' as TabId,
  }),
  compliance: (p) => ({
    summary: `### BRSR gap review · ${p.name}\n\nModeled lines are not assured. EI-2 furnace oil still needs a fuel invoice. EI-4 scrap needs a recycler PO. Do not print 100% audit-ready.`,
    actionItems: [
      { step: 1, title: 'Attach DISCOM bill to EI-1', co2Impact: `${p.kwh} kWh × 0.82`, financialImpact: 'CEA cite', provenanceSource: 'P6 EI-1' },
      { step: 2, title: 'Keep EI-3 Estimated until supplier LCA', co2Impact: `${p.tons} T × 2.8 t/T class`, financialImpact: 'No fake audit', provenanceSource: 'P6 EI-3' },
    ],
    totalImpact: { co2ReductionPct: 'evidence score, not tCO₂e', annualProfitIncrease: 'n/a' },
    navigationTarget: 'compliance' as TabId,
  }),
};

export function planEfficiencyGain(config: FacilityConfig, sliders: SliderInputs, targetPct = 20): AICopilotResponse {
  return PLAYBOOK.simulator(plant(config, sliders));
}

export async function queryAICopilot(userPrompt: string, facilityConfig: FacilityConfig, currentSliders: SliderInputs, apiKey?: string, history: ChatHistoryMessage[] = [], model?: string): Promise<AICopilotResponse> {
  const parsed = parseNaturalLanguageWhatIf(userPrompt, currentSliders);
  const sliders = parsed.hasMatches ? parsed.newSliders : currentSliders;
  const p = plant(facilityConfig, sliders);
  const plan = PLAYBOOK.simulator(p);
  if (/efficien|20\s*%|reduce .*emissions/i.test(userPrompt)) {
    const g = await generateGeminiJson({
      apiKey, model, temperature: 0.1,
      prompt: `Rewrite this plan in 120 words. Do not change numbers.\n${p.snapshot}\n${plan.summary}\nUSER:${userPrompt}\nJSON {"summary":"markdown","actionItems":${JSON.stringify(plan.actionItems)},"totalImpact":${JSON.stringify(plan.totalImpact)},"navigationTarget":"simulator_hub"}`,
    });
    if (g.ok && g.data?.summary) return { ...plan, summary: String(g.data.summary).slice(0, 1200) };
    return plan;
  }
  if (resolveGeminiKey(apiKey)) {
    const g = await generateGeminiJson({
      apiKey, model, temperature: 0.12,
      prompt: `ByteMe. Only these numbers: ${p.snapshot}\nUSER:${userPrompt}\nJSON {"summary":"markdown under 150 words","actionItems":[{"step":1,"title":"...","co2Impact":"...","financialImpact":"..."}],"totalImpact":${JSON.stringify(plan.totalImpact)},"navigationTarget":"simulator_hub"}`,
    });
    if (g.ok && g.data?.summary) {
      return {
        summary: String(g.data.summary).slice(0, 1200),
        actionItems: Array.isArray(g.data.actionItems) && g.data.actionItems.length ? g.data.actionItems : plan.actionItems,
        totalImpact: plan.totalImpact,
        navigationTarget: 'simulator_hub',
      };
    }
  }
  return { ...plan, summary: `${plan.summary}\n\nGemini key missing or unreachable. Figures are the sanitized plant model only.` };
}

export async function querySectionAIReview(opts: {
  section: AIReviewSection;
  facilityConfig: FacilityConfig;
  sliders: SliderInputs;
  apiKey?: string;
  model?: string;
  extraContext?: string;
}): Promise<AICopilotResponse> {
  const p = plant(opts.facilityConfig, opts.sliders);
  const fallback = PLAYBOOK[opts.section](p);
  const g = await generateGeminiJson({
    apiKey: opts.apiKey,
    model: opts.model,
    temperature: 0.1,
    prompt: `You are the ${opts.section} reviewer for ${p.name}. Use ONLY this snapshot:\n${p.snapshot}\n${opts.extraContext || ''}\nRules: no number above 120 tCO2e/month or Rs 30 lakh/month. Section focus only (${opts.section}). 120 words max.\nJSON {"summary":"markdown","actionItems":[{"step":1,"title":"...","co2Impact":"...","financialImpact":"..."}],"totalImpact":${JSON.stringify(fallback.totalImpact)}}`,
  });
  if (g.ok && g.data?.summary) {
    return {
      summary: String(g.data.summary).slice(0, 1200),
      actionItems: Array.isArray(g.data.actionItems) && g.data.actionItems.length ? g.data.actionItems.slice(0, 4) : fallback.actionItems,
      totalImpact: fallback.totalImpact,
      navigationTarget: fallback.navigationTarget,
    };
  }
  return fallback;
}
