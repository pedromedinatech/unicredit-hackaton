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
    text: "What is your main investment goal?",
    type: "radio",
    options: [
      "A) Protect my money from inflation",
      "B) Generate regular income (dividends, coupons)",
      "C) Grow my wealth over the long term",
      "D) Achieve high returns, accepting more risk",
    ],
    required: true,
  },
  {
    id: 3,
    text: "If your investment drops 20% in 3 months, what would you do?",
    type: "radio",
    options: [
      "A) Sell everything to avoid further losses",
      "B) Sell part of it to reduce exposure",
      "C) Do nothing and wait for recovery",
      "D) Buy more, it's an opportunity",
    ],
    required: true,
  },
  {
    id: 4,
    text: "When will you need this money, considering your life stage?",
    type: "radio",
    options: [
      "A) Less than 1 year / Major financial obligations",
      "B) 1-3 years / Stable with upcoming commitments",
      "C) 3-7 years / Stable, no major commitments",
      "D) 7+ years / Early career, few obligations",
    ],
    required: true,
  },
  {
    id: 5,
    text: "How would you describe your experience with financial products?",
    type: "radio",
    options: [
      "A) None, only current accounts or deposits",
      "B) Basic, investment funds or savings insurance",
      "C) Intermediate, stocks, ETFs, or bonds",
      "D) Advanced, derivatives, forex, structured products",
    ],
    required: true,
  },
  {
    id: 6,
    text: "What % of your monthly income can you consistently invest?",
    type: "radio",
    options: [
      "A) Less than 10%",
      "B) 10-20%",
      "C) 20-35%",
      "D) More than 35%",
    ],
    required: true,
  },
  {
    id: 7,
    text: "Do you have an emergency fund covering 3-6 months of expenses?",
    type: "radio",
    options: [
      "A) No",
      "B) I have some, but less than 3 months",
      "C) Yes, 3-6 months covered",
      "D) Yes, more than 6 months covered",
    ],
    required: true,
  },
  {
    id: 8,
    text: "What is the maximum loss you could sustain without affecting your daily life?",
    type: "radio",
    options: [
      "A) I cannot afford to lose anything",
      "B) Up to 10%",
      "C) Up to 25%",
      "D) More than 25%",
    ],
    required: true,
  },
  {
    id: 9,
    text: "What annual return would you expect from your investment?",
    type: "radio",
    options: [
      "A) 2-3% (beat inflation)",
      "B) 4-7%",
      "C) 7-12%",
      "D) >12%",
    ],
    required: true,
  },
  {
    id: 10,
    text: "Does sustainability influence your investment decisions?",
    type: "radio",
    options: [
      "A) No, I prioritize returns only",
      "B) Interested, but not a deciding factor",
      "C) I prefer ESG products if returns are comparable",
      "D) Only certified sustainable-impact products",
    ],
    required: true,
  },
];
