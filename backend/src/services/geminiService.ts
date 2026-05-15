import Anthropic from '@anthropic-ai/sdk';
import { UserProfile, Product, ChatResponse } from '../types';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function buildProfileSummary(profile: UserProfile): string {
  const esgLabels: Record<number, string> = {
    0: 'No preference, prioritize returns',
    1: 'Interested, but not a deciding factor',
    2: 'Prefer ESG if returns are comparable',
    3: 'Only certified sustainable-impact products',
  };

  const objectiveLabels: Record<string, string> = {
    A: 'Protect from inflation',
    B: 'Generate regular income',
    C: 'Grow wealth long-term',
    D: 'Achieve high returns',
  };

  const lines = [
    `Name: ${profile.name}`,
    `MiFID II Segment: ${profile.segment}${profile.forced_conservative ? ' (forced, no emergency fund)' : ''}`,
    `Financial Knowledge: ${profile.sophistication === 0 ? 'Beginner' : profile.sophistication === 1 ? 'Intermediate' : 'Advanced'}`,
    `ESG Preference: ${esgLabels[profile.esg_level] || 'Unknown'}`,
    `Investment Objective: ${objectiveLabels[profile.q1_objective] || profile.q1_objective}`,
  ];

  if (profile.expectation_mismatch) {
    lines.push(`⚠️ Note: Expectation mismatch detected (high return expectation vs. low risk tolerance)`);
  }

  return lines.join('\n');
}

function buildProductsCatalog(products: Product[]): string {
  return products.map((p) =>
    `[${p.id}] ${p.name} (${p.category})
  ${p.description}
  Benefits: ${p.key_benefits.join(', ')}
  Best for: ${p.target_audience.join(', ')}
  URL: ${p.url}`
  ).join('\n\n');
}

export async function chatWithRAG(
  message: string,
  profile: UserProfile,
  products: Product[],
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<ChatResponse> {
  // Pre-filter products by segment and sophistication
  const eligibleProducts = products.filter(
    (p) => p.segments.includes(profile.segment) && p.min_sophistication <= profile.sophistication
  );

  const systemPrompt = `You are an expert AI Financial Coach for UniCredit Romania. Respond ONLY with valid JSON, no markdown fences, no text outside the JSON object.

CLIENT PROFILE:
${buildProfileSummary(profile)}

UNICREDIT PRODUCT CATALOG (pre-filtered for suitability):
${buildProductsCatalog(eligibleProducts)}

RESPONSE FORMAT (strict JSON, no extra fields):
{
  "response": "Friendly, personalized advice in 2-4 sentences. When relevant, mention the best product by name with its URL as a markdown link [Product Name](url). Keep it conversational, no branch addresses or phone numbers.",
  "recommendations": [
    {
      "product_id": "<id from catalog>",
      "name": "<product name>",
      "reason": "<one sentence why it fits this specific client>",
      "fit_score": <integer 0-100>
    }
  ],
  "options": ["<clickable option 1>", "<clickable option 2>"],
  "followups": ["<follow-up question 1>", "<follow-up question 2>"],
  "needs_human_advisor": <true only if question is outside product scope or requires legal advice>,
  "advisor_reason": "<brief reason if needs_human_advisor is true, else null>",
  "suggest_advisor": <true if client is a qualified lead who would benefit from a personal advisor call, else false>
}

RULES:
- Always respond in English
- The client is classified as ${profile.segment} according to MiFID II guidelines
- Personalize advice based on the client profile above
- ONLY recommend products from the catalog above (they have been pre-filtered for suitability)
- recommendations: 1-3 items, best fit first. fit_score should reflect how well the product matches the client's specific investment objectives and risk profile (0-100)
- options: 2-4 short clickable choices when the conversation calls for a decision or exploration (e.g. "Tell me more about Investment Funds", "Show me savings options", "What's my risk level?"). Leave as [] if the response is already conclusive.
- followups: 2-3 natural next questions the client might ask (different from options, these are open-ended questions, not choices)
- needs_human_advisor: true only for legal, compliance, or out-of-scope questions. Do NOT set this just because you want to suggest a call.
- NEVER include branch addresses or phone numbers in the response text
- LEAD QUALIFICATION, suggest_advisor logic:
  * Set to false on the first message (never suggest on first exchange)
  * Set to true when: client shows specific product interest, has significant portfolio considerations, mentions life events (buying home, starting business, having children), asks about investment or mortgage products
  * When suggest_advisor is true, naturally weave into your response: "Would you like a UniCredit advisor to give you a call and walk you through this personally?"
  * Be warm and helpful, not pushy, frame it as added value, like a concierge service
  * Only set to true once per conversation`;

  const messages = conversationHistory.map((msg) => ({
    role: msg.role === 'assistant' ? ('assistant' as const) : ('user' as const),
    content: msg.content,
  }));

  messages.push({ role: 'user', content: message });

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: systemPrompt,
    messages,
  });

  const raw = (response.content[0] as { type: string; text: string }).text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  try {
    return JSON.parse(raw) as ChatResponse;
  } catch {
    return {
      response: raw,
      recommendations: [],
      options: [],
      followups: [],
      needs_human_advisor: false,
      advisor_reason: null,
      suggest_advisor: false,
    };
  }
}
