import type { UserProfile } from './userProfile';

export type Segment = 'CONSERVATIVE' | 'BALANCED' | 'GROWTH' | 'AGGRESSIVE';

// Score mapping for each question and answer
const scoreMap: Record<string, Record<string, number>> = {
  q1: { A: 0, B: 1, C: 2, D: 2 },      // Investment Objective
  q2: { A: 0, B: 0, C: 1, D: 2 },      // Reaction to Loss (behavioral)
  q3_risk: { A: 0, B: 0, C: 1, D: 2 }, // Horizon (risk component)
  q3_liq: { A: 0, B: 1, C: 2, D: 2 },  // Horizon (liquidity component - life stage)
  q4: { A: 0, B: 1, C: 1, D: 2 },      // Financial Knowledge (sophistication)
  q5: { A: 0, B: 1, C: 2, D: 2 },      // Savings Rate (liquidity)
  q6: { A: 0, B: 0, C: 1, D: 2 },      // Emergency Fund (liquidity + override)
  q7: { A: 0, B: 0, C: 1, D: 2 },      // Loss Threshold (risk)
  q8: { A: 0, B: 1, C: 2, D: 2 },      // Return Expectation (risk)
  q9: { A: 0, B: 1, C: 2, D: 3 },      // ESG Preference
};

function getScore(question: string, answer: string): number {
  return scoreMap[question]?.[answer] ?? 0;
}

function getLabel(question: string, answer: string): string {
  const labels: Record<string, Record<string, string>> = {
    q1: {
      A: 'Protect from inflation',
      B: 'Generate regular income',
      C: 'Grow wealth long-term',
      D: 'Achieve high returns',
    },
    q2: {
      A: 'Sell everything',
      B: 'Sell part of it',
      C: 'Do nothing',
      D: 'Buy more',
    },
    q3: {
      A: 'Less than 1 year / Major obligations',
      B: '1-3 years / Stable with upcoming commitments',
      C: '3-7 years / Stable, no major commitments',
      D: '7+ years / Early career, few obligations',
    },
    q4: {
      A: 'None - only current accounts',
      B: 'Basic - investment funds or savings insurance',
      C: 'Intermediate - stocks, ETFs, bonds',
      D: 'Advanced - derivatives, forex, structured products',
    },
    q5: {
      A: 'Less than 10%',
      B: '10-20%',
      C: '20-35%',
      D: 'More than 35%',
    },
    q6: {
      A: 'No emergency fund',
      B: 'Less than 3 months',
      C: '3-6 months covered',
      D: 'More than 6 months covered',
    },
    q7: {
      A: 'Cannot afford any loss',
      B: 'Up to 10%',
      C: 'Up to 25%',
      D: 'More than 25%',
    },
    q8: {
      A: '2-3% (beat inflation)',
      B: '4-7%',
      C: '7-12%',
      D: '>12%',
    },
    q9: {
      A: 'No, prioritize returns only',
      B: 'Interested, not a deciding factor',
      C: 'Prefer ESG if returns comparable',
      D: 'Only certified sustainable-impact products',
    },
  };
  return labels[question]?.[answer] ?? answer;
}

export function calculateProfile(
  name: string,
  phone: string,
  answers: Record<number, string>
): UserProfile {
  const q1 = answers[2] || 'A';   // Investment Objective
  const q2 = answers[3] || 'A';   // Reaction to Loss
  const q3 = answers[4] || 'A';   // Horizon + Life Stage
  const q4 = answers[5] || 'A';   // Financial Knowledge
  const q5 = answers[6] || 'A';   // Savings Rate
  const q6 = answers[7] || 'A';   // Emergency Fund
  const q7 = answers[8] || 'A';   // Loss Threshold
  const q8 = answers[9] || 'A';   // Return Expectation
  const q9 = answers[10] || 'A';  // ESG Preference

  // Calculate dimension scores
  const risk_score = (
    getScore('q1', q1) +
    getScore('q2', q2) +
    getScore('q7', q7) +
    getScore('q8', q8)
  ) / 4;

  const horizon_score = getScore('q3_risk', q3);

  const liquidity_score = (
    getScore('q5', q5) +
    getScore('q3_liq', q3) +
    getScore('q6', q6)
  ) / 3;

  const sophistication = getScore('q4', q4);
  const esg_level = getScore('q9', q9);

  // Calculate global score: risk×0.5 + horizon×0.3 + liquidity×0.2
  let global = risk_score * 0.5 + horizon_score * 0.3 + liquidity_score * 0.2;

  // Determine initial segment
  let segment: Segment = 'CONSERVATIVE';
  if (global < 0.7) segment = 'CONSERVATIVE';
  else if (global < 1.2) segment = 'BALANCED';
  else if (global < 1.7) segment = 'GROWTH';
  else segment = 'AGGRESSIVE';

  // Check for expectation mismatch: Q8=D AND Q2 ∈ {A,B}
  const expectation_mismatch = q8 === 'D' && (q2 === 'A' || q2 === 'B');

  // Apply overrides
  let forced_conservative = false;

  // Override 1: Q6=A → force CONSERVATIVE
  if (q6 === 'A') {
    segment = 'CONSERVATIVE';
    forced_conservative = true;
  }

  // Override 2: AGGRESSIVE + sophistication < 2 → downgrade to GROWTH
  if (segment === 'AGGRESSIVE' && sophistication < 2) {
    segment = 'GROWTH';
  }

  // Override 3: GROWTH + sophistication = 0 → downgrade to BALANCED
  if (segment === 'GROWTH' && sophistication === 0) {
    segment = 'BALANCED';
  }

  return {
    name,
    phone,
    q1_objective: q1,
    q2_loss_reaction: q2,
    q3_horizon: q3,
    q4_knowledge: q4,
    q5_savings_rate: q5,
    q6_emergency: q6,
    q7_loss_threshold: q7,
    q8_return_expect: q8,
    q9_esg: q9,
    segment,
    esg_level,
    sophistication,
    expectation_mismatch,
    forced_conservative,
  };
}
