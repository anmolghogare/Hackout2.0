const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
];

function extractJson(raw) {
  if (!raw) return null;

  const cleaned = String(raw)
    .replace(/```json/gi, '```')
    .replace(/```/g, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (_) {}

  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');

  if (start >= 0 && end > start) {
    try {
      return JSON.parse(cleaned.slice(start, end + 1));
    } catch (_) {}
  }

  return null;
}

export async function callGemini({
  apiKey,
  prompt,
  model,
  history = [],
}) {
  const key =
    apiKey ||
    process.env.GEMINI_API_KEY ||
    process.env.API_KEY;

  if (!key) {
    return {
      ok: false,
      error: 'missing_api_key',
    };
  }

  const models = model
    ? [model, ...GEMINI_MODELS.filter((m) => m !== model)]
    : GEMINI_MODELS;

  let lastError = 'unknown';

  const contents = [
    ...history.slice(-8).map((h) => ({
      role:
        h.role === 'assistant' || h.role === 'model'
          ? 'model'
          : 'user',
      parts: [{ text: h.text || '' }],
    })),
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  for (const m of models) {
    try {
      const url =
        `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${encodeURIComponent(key)}`;

      const fetchRes = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.12,
            responseMimeType: 'application/json',
          },
        }),
      });

      const payload = await fetchRes.json().catch(() => ({}));

      if (!fetchRes.ok) {
        lastError =
          payload?.error?.message ||
          `HTTP ${fetchRes.status}`;
        continue;
      }

      const text =
        payload?.candidates?.[0]?.content?.parts
          ?.map((p) => p.text || '')
          .join('\n')
          .trim() || '';

      const data = extractJson(text);

      if (data) {
        return {
          ok: true,
          data,
          model: m,
          text,
        };
      }

      if (text) {
        return {
          ok: true,
          data: {
            summary: text,
            text,
          },
          model: m,
          text,
        };
      }

      lastError = 'empty_model_output';
    } catch (err) {
      lastError =
        err?.message || 'network_error';
    }
  }

  return {
    ok: false,
    error: lastError,
  };
}

function facilityBrief(facility = {}, sliders = {}) {
  const p = facility.profile || {};

  return `Facility ${p.name || 'Unknown'} (${p.sector || 'n/a'}, ${p.location || 'n/a'}).
Current sliders:
fuel=${sliders.fuelShiftPct ?? 0}%
temp=${sliders.tempReductionPct ?? 0}%
PCR=${sliders.pcrResinPct ?? 0}%
scrap=${sliders.scrapRecyclePct ?? 0}%.

Use the supplied facility data and current slider values.
If the user changes a percentage in the conversation, treat the latest percentage as the requested scenario.
Use previous conversation context to understand references such as "50%", "what about 30%", "instead", "increase it", or "reduce it".
Never invent facility numbers, tCO2e values, INR values, or emission factors that were not supplied.`;
}

export async function handleAIQuery(req, res) {
  try {
    const body = req.body || {};

    const prompt =
      body.prompt ||
      body.query ||
      '';

    const facility =
      body.facilityConfig ||
      {};

    const sliders =
      body.sliderInputs ||
      {};

    const section =
      body.section ||
      'copilot';

    const apiKey =
      body.apiKey;

    const model =
      body.model;

    const history =
      Array.isArray(body.history)
        ? body.history
        : [];

    const composed = `You are ByteMe's grounded industrial sustainability copilot.

${facilityBrief(facility, sliders)}

SECTION: ${section}

CONVERSATION CONTEXT:
Use the previous conversation turns supplied separately. Resolve follow-up questions using that context.

CURRENT USER QUESTION:
${prompt || 'Produce a section review with 4 actions.'}

RULES:
1. Answer the user's actual question.
2. Use the current facility data and current slider values.
3. If the user provides a new percentage or value, use that value for the relevant scenario.
4. If the user says "what about 50%" after discussing PCR, understand that 50% refers to PCR unless the conversation clearly indicates otherwise.
5. Do not repeat a previous answer unnecessarily.
6. For calculations, use only supplied values and factors.
7. Do not invent financial or emissions numbers.
8. If an exact calculation cannot be made from the supplied data, clearly say what is missing.
9. For greetings, give a short greeting.
10. For navigation requests, set navigationTarget to the appropriate application section.
11. Return ONLY valid JSON.

Return:
{
  "userPrompt": "${prompt}",
  "type": "greeting | question | navigation",
  "text": "Direct answer to the user",
  "navigationTarget": null,
  "aiTitle": "Response heading",
  "summary": "Brief summary",
  "referenceStandards": "IPCC 2006 Guidelines & CEA India Grid v19",
  "actionItems": null,
  "totalImpact": null
}`;

    const result = await callGemini({
      apiKey,
      prompt: composed,
      model,
      history,
    });

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

    return res.json({
      success: true,
      source: result.model,
      data: result.data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err?.message || 'server_error',
    });
  }
}
