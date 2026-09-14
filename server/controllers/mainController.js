import { callGemini } from '../aiEngine.js';

export const getCopilotResponse = async (req, res) => {
  try {
    const body = req.body || {};

    const prompt = body.prompt || body.query || '';
    const history = Array.isArray(body.history) ? body.history : [];
    const facilityConfig = body.facilityConfig || {};
    const sliderInputs = body.sliderInputs || {};
    const section = body.section || 'copilot';

    const queryLower = prompt.toLowerCase().trim();

    if (!queryLower) {
      return res.json({
        success: true,
        source: 'local',
        data: {
          userPrompt: '',
          type: 'greeting',
          text: "👋 Hello! I am your ByteMe AI Assistant. How can I assist you with Apex Packaging's carbon emissions, ROI simulation, or circular waste monetization today?",
          aiTitle: 'ByteMe AI Assistant',
          summary: 'Industrial Carbon Decision Intelligence Platform',
          referenceStandards: 'IPCC 2006 & CEA India Grid v19',
          actionItems: null,
          totalImpact: null,
          navigationTarget: null
        }
      });
    }

    const p = facilityConfig.profile || {};

    const context = `
You are ByteMe, an AI sustainability copilot for an industrial carbon decision intelligence platform.

FACILITY:
Name: ${p.name || 'Not provided'}
Sector: ${p.sector || 'Not provided'}
Location: ${p.location || 'Not provided'}

CURRENT FACILITY DATA:
${JSON.stringify(facilityConfig)}

CURRENT SLIDER VALUES:
${JSON.stringify(sliderInputs)}

CURRENT SECTION:
${section}

USER QUESTION:
${prompt}

IMPORTANT:
- Use the current facility data supplied above.
- Use the current slider values supplied above.
- Use previous conversation turns to understand follow-up questions.
- If the user says "what about 50%" after discussing PCR, understand that 50% refers to PCR.
- If the user changes a percentage, use the latest percentage for that scenario.
- Do not assume that a number refers to a different parameter when conversation context makes its meaning clear.
- Do not invent facility data.
- Do not invent emission factors.
- Do not invent financial values.
- If an exact calculation cannot be made from the supplied data, clearly state what information is missing.
- Give a direct answer instead of returning a generic canned response.
- Stay consistent with previous conversation context.
- For greetings, return a short greeting with no action items.
- For navigation requests, set navigationTarget appropriately.

Return ONLY valid JSON:

{
  "userPrompt": "${prompt.replace(/"/g, '\\"')}",
  "type": "greeting | question | navigation",
  "text": "Direct answer to the user",
  "navigationTarget": null,
  "aiTitle": "Response heading",
  "summary": "Brief summary",
  "referenceStandards": "IPCC 2006 Guidelines & CEA India Grid v19",
  "actionItems": null,
  "totalImpact": null
}
`;

    const result = await callGemini({
      prompt: context,
      history: history.slice(-8)
    });

    if (result.ok) {
      return res.json({
        success: true,
        source: result.model,
        data: result.data
      });
    }

    console.warn(
      `Gemini unavailable on all models: ${result.error}`
    );

    const greetingKeywords = [
      'hi',
      'hello',
      'hey',
      'good morning',
      'good afternoon',
      'good evening',
      'who are you',
      'what can you do',
      'thanks',
      'thank you',
      'namaste',
      'greetings',
      'yo',
      'sup'
    ];

    const isGreeting = greetingKeywords.some(
      (word) =>
        queryLower === word ||
        queryLower.startsWith(word + ' ') ||
        queryLower.endsWith(' ' + word) ||
        queryLower === word + '!'
    );

    if (isGreeting) {
      return res.json({
        success: true,
        source: 'fallback',
        data: {
          userPrompt: prompt,
          type: 'greeting',
          text: '👋 Hello! I am your ByteMe AI Assistant. Gemini is temporarily unavailable, but I can still help with the available plant analysis.',
          navigationTarget: null,
          aiTitle: 'ByteMe AI Assistant',
          summary: 'Industrial Carbon Decision Intelligence Platform',
          referenceStandards: 'IPCC 2006 & CEA India Grid v19',
          actionItems: null,
          totalImpact: null
        }
      });
    }

    return res.json({
      success: true,
      source: 'fallback',
      data: {
        userPrompt: prompt,
        type: 'question',
        text: 'I am temporarily unable to reach the AI models. Please try the question again in a moment.',
        navigationTarget: null,
        aiTitle: 'ByteMe AI Assistant',
        summary: 'AI service temporarily unavailable',
        referenceStandards: 'IPCC 2006 & CEA India Grid v19',
        actionItems: null,
        totalImpact: null
      }
    });
  } catch (error) {
    console.error('Copilot error:', error);

    return res.status(500).json({
      success: false,
      error: error?.message || 'Copilot service failed'
    });
  }
};
