export type Segment = 'CONSERVATIVE' | 'BALANCED' | 'GROWTH' | 'AGGRESSIVE';

export interface UserProfile {
  name: string;
  phone: string;
  // MiFID II raw answers (A/B/C/D)
  q1_objective: string;
  q2_loss_reaction: string;
  q3_horizon: string;
  q4_knowledge: string;
  q5_savings_rate: string;
  q6_emergency: string;
  q7_loss_threshold: string;
  q8_return_expect: string;
  q9_esg: string;
  // Computed scores
  segment: Segment;
  esg_level: number; // 0-3
  sophistication: number; // 0-2
  expectation_mismatch: boolean;
  forced_conservative: boolean;
}
