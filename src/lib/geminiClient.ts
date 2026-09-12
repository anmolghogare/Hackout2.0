export const GEMINI_MODEL_CANDIDATES = [
  'gemini-2.0-flash',
  'gemini-2.5-flash',
  'gemini-flash-latest',
  'gemini-2.0-flash-001',
  'gemini-1.5-flash',
] as const;

export function resolveGeminiKey(explicit?: string): string {
  const fromEnv =
    (typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_GEMINI_API_KEY : '') ||
    (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.API_KEY : '');
  const key = (explicit || fromEnv || '').trim();
  return key.length > 10 ? key : '';
}

export function extractJsonObject(raw: string): any | null {
  if (!raw) return null;
  const cleaned = raw.replace(/```json/gi, '```').replace(/```/g, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(cleaned.slice(start, end + 1));
      } catch {
        return null;
      }
    }
  }
  return null;
}

export async function generateGeminiJson(opts: {
  apiKey?: string;
  model?: string;
  prompt: string;
  temperature?: number;
}): Promise<{ ok: boolean; data?: any; model?: string; error?: string; text?: string }> {
  const key = resolveGeminiKey(opts.apiKey);
  if (!key) {
    return { ok: false, error: 'missing_api_key' };
  }

  const models = opts.model && opts.model !== 'heuristic-offline'
    ? [opts.model, ...GEMINI_MODEL_CANDIDATES.filter((m) => m !== opts.model)]
    : [...GEMINI_MODEL_CANDIDATES];

  let lastError = 'unknown';

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: opts.prompt }] }],
          generationConfig: {
            temperature: opts.temperature ?? 0.15,
            responseMimeType: 'application/json',
          },
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        lastError = payload?.error?.message || `HTTP ${response.status}`;
        continue;
      }

      const text = payload?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('\n') || '';
      const data = extractJsonObject(text);
      if (data) {
        return { ok: true, data, model, text };
      }
      if (text) {
        return { ok: true, data: { summary: text }, model, text };
      }
      lastError = 'empty_model_output';
    } catch (err: any) {
      lastError = err?.message || 'network_error';
    }
  }

  return { ok: false, error: lastError };
}
