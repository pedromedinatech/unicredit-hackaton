export type QuestionType =
  | "text"
  | "number"
  | "select"
  | "select-multiple"
  | "radio";

export interface OnboardingQuestion {
  id: number;
  text: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
}

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    id: 1,
    text: "What is your full name?",
    type: "text",
    required: true,
  },
  {
    id: 2,
    text: "What is your age?",
    type: "number",
    required: true,
  },
  {
    id: 3,
    text: "What is your employment status?",
    type: "select",
    options: [
      "Student",
      "Employed",
      "Freelancer",
      "Self-employed",
      "Unemployed",
      "Retired",
    ],
    required: true,
  },
  {
    id: 4,
    text: "What is your approximate monthly income (in EUR)?",
    type: "number",
    required: true,
  },
  {
    id: 5,
    text: "What is your approximate monthly spending (in EUR)?",
    type: "number",
    required: true,
  },
  {
    id: 6,
    text: "How much do you have in savings (in EUR)?",
    type: "number",
    required: true,
  },
  {
    id: 7,
    text: "What are your main financial goals?",
    type: "select-multiple",
    options: [
      "Save for travel",
      "Buy a car",
      "Buy a house",
      "Build emergency fund",
      "Invest",
      "Pay off debt",
      "Start business",
      "Education",
    ],
    required: true,
  },
  {
    id: 8,
    text: "How do you feel about financial risk?",
    type: "radio",
    options: ["Very Low", "Low", "Medium", "High", "Very High"],
    required: true,
  },
  {
    id: 9,
    text: "What is your primary interest area?",
    type: "select",
    options: ["Technology", "Travel", "Health", "Education", "Business", "Other"],
    required: false,
  },
  {
    id: 10,
    text: "Do you have any current debts or loans?",
    type: "radio",
    options: ["Yes", "No"],
    required: true,
  },
  {
    id: 11,
    text: "If yes, what type?",
    type: "select",
    options: [
      "Student Loan",
      "Car Loan",
      "Mortgage",
      "Credit Card",
      "Personal Loan",
      "Other",
    ],
    required: false,
  },
  {
    id: 12,
    text: "Have you used financial products before?",
    type: "radio",
    options: ["Yes", "No"],
    required: true,
  },
  {
    id: 13,
    text: "Which financial products interest you?",
    type: "select-multiple",
    options: [
      "Savings Account",
      "Current Account",
      "Credit Card",
      "Debit Card",
      "Term Deposit",
      "Loans",
      "Investment Funds",
      "Insurance",
    ],
    required: false,
  },
  {
    id: 14,
    text: "What problems do you face with money?",
    type: "select-multiple",
    options: [
      "No clear budget",
      "Impulse spending",
      "High interest debt",
      "Savings goals unclear",
      "Investment confusion",
      "No emergency fund",
      "Other",
    ],
    required: false,
  },
  {
    id: 15,
    text: "How often do you check your bank account?",
    type: "radio",
    options: ["Daily", "Weekly", "Monthly", "Rarely"],
    required: true,
  },
  {
    id: 16,
    text: "Do you prefer digital or in-person banking?",
    type: "radio",
    options: ["Digital (Online/Mobile)", "In-person", "Both equally"],
    required: true,
  },
  {
    id: 17,
    text: "Any specific financial goals or concerns you'd like to share?",
    type: "text",
    required: false,
  },
];
