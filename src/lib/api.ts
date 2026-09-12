import { KPIData, ProcessStage, SliderInputs } from '../types';

const API_BASE = '/api';

export async function fetchBaselineData(): Promise<{ stages?: ProcessStage[] } | null> {
  try {
    const res = await fetch(`${API_BASE}/facility/baseline`);
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (err) {
    console.warn('API Offline: fallback to local state for baseline', err);
  }
  return null;
}

export async function fetchSimulationResult(inputs: SliderInputs): Promise<{
  kpiData: KPIData;
  stages: ProcessStage[];
} | null> {
  try {
    const res = await fetch(`${API_BASE}/simulation/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs),
    });

    if (res.ok) {
      const data = await res.json();
      const results = data.results;
      return {
        kpiData: {
          baselineMonthlyCO2: results.baselineMonthlyCO2,
          monthlyCO2SavedTons: results.monthlyCO2SavedTons,
          co2ReductionPercentage: results.co2ReductionPercentage,
          financialSavings: results.financialSavings,
        },
        stages: results.updatedStages || [],
      };
    }
  } catch (err) {
    console.warn('API Offline: fallback to local simulation', err);
  }
  return null;
}

export async function queryCopilot(prompt: string): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/copilot/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API Offline: fallback to local copilot response', err);
  }
  return null;
}

export async function analyzeByProduct(productData: {
  name: string;
  quantity: string;
  category?: string;
  location?: string;
  description?: string;
}): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/circular/analyze-product`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API Offline: using local AI by-product analysis fallback', err);
  }
  return null;
}
