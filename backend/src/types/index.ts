export type Segment = 'CONSERVATIVE' | 'BALANCED' | 'GROWTH' | 'AGGRESSIVE';

export interface UserProfile {
  name: string;
  phone?: string;
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

export interface Branch {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  distance_km: number;
  coordinates: { lat: number; lng: number };
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  key_benefits: string[];
  target_audience: string[];
  url: string;
  segments: Segment[];
  min_sophistication: number;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  clientProfile?: UserProfile;
  conversationHistory?: ConversationMessage[];
}

export interface RecommendationCard {
  product_id: string;
  name?: string;
  reason: string;
  fit_score: number;
}

export interface ChatResponse {
  response: string;
  recommendations: RecommendationCard[];
  followups: string[];
  options: string[];
  needs_human_advisor: boolean;
  advisor_reason: string | null;
  suggest_advisor: boolean;
}

export interface LeadInput {
  name: string;
  phone?: string | null;
  segment?: Segment | null;
  esg_level?: number | null;
  conversation_summary?: string | null;
  advisor_reason?: string | null;
}

export interface Lead extends LeadInput {
  id: number;
  status: string;
  created_at: string;
}
