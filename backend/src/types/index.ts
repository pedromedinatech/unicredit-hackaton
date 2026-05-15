export interface UserProfile {
  name: string;
  age: number;
  employment_status: string;
  monthly_income: number;
  monthly_spending: number;
  savings: number;
  goals: string[];
  risk_tolerance: string;
  primary_interest?: string;
  has_debts: boolean;
  debt_type?: string | null;
  has_used_products_before: boolean;
  interested_products: string[];
  money_problems: string[];
  checking_frequency: string;
  banking_preference: string;
  additional_notes?: string;
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
  needs_human_advisor: boolean;
  advisor_reason: string | null;
  suggest_advisor: boolean;
}

export interface LeadInput {
  name: string;
  age?: number;
  employment_status?: string;
  monthly_income?: number;
  monthly_spending?: number;
  savings?: number;
  goals?: string[];
  risk_tolerance?: string;
  interested_products?: string[];
  money_problems?: string[];
  banking_preference?: string;
  conversation_summary?: string;
  advisor_reason?: string;
  additional_notes?: string;
}

export interface Lead extends LeadInput {
  id: number;
  status: string;
  created_at: string;
}
