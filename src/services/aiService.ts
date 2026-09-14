const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
];

async function callGeminiWithFallback(
  activeKey: string,
  promptContext: string
) {
  let lastError = 'unknown';

  for (const model of GEMINI_MODELS) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(activeKey)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: promptContext,
                  },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.15,
            },
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        lastError =
          data?.error?.message || `HTTP ${response.status}`;
        continue;
      }

      const jsonText =
        data?.candidates?.[0]?.content?.parts
          ?.map((part: any) => part.text || '')
          .join('')
          .trim();

      if (!jsonText) {
        lastError = 'empty_model_output';
        continue;
      }

      try {
        const parsed = JSON.parse(jsonText);

        return {
          ok: true as const,
          parsed,
          model,
        };
      } catch {
        const start = jsonText.indexOf('{');
        const end = jsonText.lastIndexOf('}');

        if (start !== -1 && end > start) {
          try {
            const parsed = JSON.parse(
              jsonText.slice(start, end + 1)
            );

            return {
              ok: true as const,
              parsed,
              model,
            };
          } catch {
            lastError = 'invalid_json_response';
          }
        } else {
          lastError = 'invalid_json_response';
        }
      }
    } catch (err: any) {
      lastError = err?.message || 'network_error';
    }
  }

  return {
    ok: false as const,
    error: lastError,
  };
}
