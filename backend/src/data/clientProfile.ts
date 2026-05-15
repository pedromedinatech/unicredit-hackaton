import { UserProfile } from '../types';

export const defaultClientProfile: UserProfile = {
  name: 'Alexandru Ionescu',
  age: 24,
  employment_status: 'Student',
  monthly_income: 800,
  monthly_spending: 600,
  savings: 2500,
  goals: ['Save for travel', 'Build emergency fund'],
  risk_tolerance: 'Low',
  primary_interest: 'Technology',
  has_debts: false,
  debt_type: null,
  has_used_products_before: false,
  interested_products: ['Savings Account', 'Term Deposit'],
  money_problems: ['No clear budget', 'Impulse spending'],
  checking_frequency: 'Weekly',
  banking_preference: 'Digital (Online/Mobile)',
  additional_notes: 'Looking to start saving seriously for the first time.',
};
