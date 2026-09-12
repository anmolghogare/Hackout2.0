const GEMINI_MODELS = [
  'gemini-2.0-flash',
  'gemini-2.5-flash',
  'gemini-flash-latest',
  'gemini-2.0-flash-001',
  'gemini-1.5-flash',
];

function extractJson(raw) {
  if (!raw) return null;
  const cleaned = String(raw).replace(/```json/gi, '```').replace(/```/g, '').trim();
  try { return JSON.parse(cleaned); } catch (_) {}
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start >= 0 && end > start) {
    try { return JSON.parse(cleaned.slice(start, end + 1)); } catch (_) {}
  }
  return null;
}

async function callGemini({ apiKey, prompt, model }) {
  const key = apiKey || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.API_KEY;
  if (!key) return { ok: false, error: 'missing_api_key' };

  const models = model ? [model, ...GEMINI_MODELS.filter((m) => m !== model)] : GEMINI_MODELS;
  let lastError = 'unknown';

  for (const m of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${encodeURIComponent(key)}`;
      const fetchRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.12, responseMimeType: 'application/json' },
        }),
      });
      const payload = await fetchRes.json().catch(() => ({}));
      if (!fetchRes.ok) {
        lastError = payload?.error?.message || `HTTP ${fetchRes.status}`;
        continue;
      }
      const text = payload?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('\n') || '';
      const data = extractJson(text);
      if (data) return { ok: true, data, model: m, text };
      if (text) return { ok: true, data: { summary: text, text }, model: m, text };
      lastError = 'empty_model_output';
    } catch (err) {
      lastError = err.message || 'network_error';
    }
  }
  return { ok: false, error: lastError };
}

function facilityBrief(facility = {}, sliders = {}) {
  const p = facility.profile || {};
  return `Facility ${p.name || 'Unknown'} (${p.sector || 'n/a'}, ${p.location || 'n/a'}). Sliders fuel=${sliders.fuelShiftPct}% temp=-${sliders.tempReductionPct}% PCR=${sliders.pcrResinPct}% scrap=${sliders.scrapRecyclePct}%. Use only numbers supplied in the request. Never invent tCO2e or INR.`;
}

async function handleAIQuery(req, res) {
  try {
    const body = req.body || {};
    const prompt = body.prompt || body.query || '';
    const facility = body.facilityConfig || {};
    const sliders = body.sliderInputs || {};
    const section = body.section || 'copilot';
    const apiKey = body.apiKey;
    const model = body.model;

    const composed = `You are ByteMe's grounded plant copilot.\n${facilityBrief(facility, sliders)}\nSECTION: ${section}\nUSER: ${prompt || 'Produce a section review with 4 actions.'}\nReturn JSON { "summary": "markdown", "actionItems": [{"step":1,"title":"...","co2Impact":"...","financialImpact":"..."}], "totalImpact": {"co2ReductionPct":"...","annualProfitIncrease":"..."}, "navigationTarget": "simulator_hub" }`;

    const result = await callGemini({ apiKey, prompt: composed, model });
    if (!result.ok) {
      return res.json({
        success: true,
        source: 'fallback',
        data: {
          type: 'fallback',
          text: 'Gemini is not reachable from the server. Answers will use the on-device plant model in the browser.',
          summary: result.error,
        },
      });
    }

    return res.json({ success: true, source: result.model, data: result.data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { handleAIQuery, callGemini };
