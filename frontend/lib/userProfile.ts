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
