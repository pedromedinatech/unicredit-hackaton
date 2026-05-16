export type QuestionType =
  | "text"
  | "tel"
  | "number"
  | "select"
  | "select-multiple"
  | "radio";

export interface OnboardingQuestion {
  id: number;
  text: string;
  subtitle?: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
}

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    id: 1,
    text: "What's your name?",
    type: "text",
    required: true,
  },
  {
    id: 2,
    text: "What's your main financial goal right now?",
    type: "radio",
    options: [
      "A) Build savings and feel financially secure",
      "B) Save for something specific (trip, car, studies)",
      "C) Start growing my money for the future",
      "D) Build wealth and generate passive income",
    ],
    required: true,
  },
  {
    id: 3,
    text: "You put €500 in an app and it drops to €400 in a month. What do you do?",
    subtitle: "This helps us understand how you react under pressure.",
    type: "radio",
    options: [
      "A) Withdraw everything — I want my money back",
      "B) Withdraw some to limit the damage",
      "C) Leave it — markets recover, I'd wait",
      "D) Add more — it's a chance to buy low",
    ],
    required: true,
  },
  {
    id: 4,
    text: "When do you think you'll need this money?",
    type: "radio",
    options: [
      "A) Less than a year — I might need it anytime",
      "B) In 1 to 3 years",
      "C) In 3 to 7 years",
      "D) In 7+ years — I'm thinking long-term",
    ],
    required: true,
  },
  {
    id: 5,
    text: "How much do you know about investing?",
    type: "radio",
    options: [
      "A) Nothing — I only have a bank account",
      "B) The basics — savings accounts or deposits",
      "C) I've bought stocks, ETFs, or crypto before",
      "D) I actively invest and know complex products",
    ],
    required: true,
  },
  {
    id: 6,
    text: "How much of your monthly income can you usually save?",
    type: "radio",
    options: [
      "A) Very little — my expenses eat most of it",
      "B) Up to 10% of my income",
      "C) Between 10% and 30%",
      "D) More than 30%",
    ],
    required: true,
  },
  {
    id: 7,
    text: "Do you have savings set aside for unexpected expenses?",
    subtitle: "An emergency fund is money you can access immediately if needed.",
    type: "radio",
    options: [
      "A) No — I have nothing saved for emergencies",
      "B) A little — less than 1 month of expenses",
      "C) Yes — around 1 to 3 months covered",
      "D) Yes — more than 3 months covered",
    ],
    required: true,
  },
  {
    id: 8,
    text: "If you invested €1,000, how much could you afford to lose without it affecting your daily life?",
    type: "radio",
    options: [
      "A) Nothing — I can't afford any loss",
      "B) Up to €100 (10%)",
      "C) Up to €250 (25%)",
      "D) More than €250 — I'm in for the long run",
    ],
    required: true,
  },
  {
    id: 9,
    text: "What annual return would you realistically hope for?",
    type: "radio",
    options: [
      "A) 2–3% — just beat inflation",
      "B) 4–7% — steady and solid",
      "C) 7–12% — I'm willing to take some risk",
      "D) Over 12% — high risk, high reward",
    ],
    required: true,
  },
  {
    id: 10,
    text: "Does sustainability matter to you when choosing financial products?",
    type: "radio",
    options: [
      "A) Not really — I focus on returns",
      "B) A little, but it's not the main factor",
      "C) Yes — I prefer sustainable options",
      "D) Absolutely — only sustainable products for me",
    ],
    required: true,
  },
  {
    id: 11,
    text: "What's the best number to reach you?",
    subtitle: "Optional — so a UniCredit advisor can follow up with you directly.",
    type: "tel",
    required: false,
  },
];
