import Anthropic from '@anthropic-ai/sdk';
import { UserProfile, Product, Branch, ChatResponse } from '../types';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function buildProfileSummary(profile: UserProfile): string {
  return [
    `Name: ${profile.name}`,
    `Age: ${profile.age}`,
    `Employment: ${profile.employment_status}`,
    `Monthly income: €${profile.monthly_income}`,
    `Monthly spending: €${profile.monthly_spending}`,
    `Savings: €${profile.savings}`,
    `Financial goals: ${profile.goals.join(', ')}`,
    `Risk tolerance: ${profile.risk_tolerance}`,
    `Has debts: ${profile.has_debts ? `Yes (${profile.debt_type ?? 'unspecified'})` : 'No'}`,
    `Money problems: ${profile.money_problems.length ? profile.money_problems.join(', ') : 'None'}`,
    `Interested in: ${profile.interested_products.length ? profile.interested_products.join(', ') : 'Open to suggestions'}`,
    `Banking preference: ${profile.banking_preference}`,
    ...(profile.additional_notes ? [`Notes: ${profile.additional_notes}`] : []),
  ].join('\n');
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
  branch: Branch,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<ChatResponse> {
  const systemPrompt = `You are an expert AI Financial Coach for UniCredit Romania. Respond ONLY with valid JSON — no markdown fences, no text outside the JSON object.

CLIENT PROFILE:
${buildProfileSummary(profile)}

NEAREST BRANCH:
${branch.name} — ${branch.address}
Phone: ${branch.phone} | Email: ${branch.email} | Hours: ${branch.hours}

UNICREDIT PRODUCT CATALOG:
${buildProductsCatalog(products)}

RESPONSE FORMAT (strict JSON, no extra fields):
{
  "response": "Friendly, personalized advice in 2-4 sentences. Mention the best product by name with its URL as a markdown link [Product Name](url). End with: 📍 ${branch.address} | 📞 ${branch.phone}",
  "recommendations": [
    {
      "product_id": "<id from catalog>",
      "name": "<product name>",
      "reason": "<one sentence why it fits this specific client>",
      "fit_score": <integer 0-100>
    }
  ],
  "followups": ["<follow-up question 1>", "<follow-up question 2>"],
  "needs_human_advisor": <true only if question is outside product scope or requires legal advice>,
  "advisor_reason": "<brief reason if needs_human_advisor is true, else null>",
  "suggest_advisor": <true if client is a qualified lead who would benefit from a personal advisor call, else false>
}

RULES:
- Always respond in English
- Personalize advice based on the client profile above
- recommendations: 1-3 items, best fit first, fit_score 0-100
- followups: 2-3 natural next questions the client might ask
- needs_human_advisor: true only for legal, compliance, or out-of-scope questions
- LEAD QUALIFICATION — suggest_advisor logic:
  * Set to false on the first message (never suggest on first exchange)
  * Set to true when: client shows specific product interest, has significant savings/income, mentions life events (buying home, starting business, having children), asks about investment or mortgage products
  * When suggest_advisor is true, naturally weave into your response: "Would you like a UniCredit advisor to reach out and walk you through this personally?"
  * Be warm and helpful, not pushy — frame it as added value
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
      followups: [],
      needs_human_advisor: false,
      advisor_reason: null,
      suggest_advisor: false,
    };
  }
}
