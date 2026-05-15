export interface Lead {
  id: number;
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
  status: string;
  created_at: string;
}
