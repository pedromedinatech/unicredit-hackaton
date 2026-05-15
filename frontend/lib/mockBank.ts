export type BankLoan = {
  product: string;
  outstanding_eur: number;
  monthly_payment_eur: number;
  months_remaining: number;
};

export type BankCreditCard = {
  type: string;
  limit_eur: number;
  used_eur: number;
};

export type BankProfile = {
  iban: string;
  current_account_balance_eur: number;
  credit_card: BankCreditCard;
  savings_account_balance_eur: number;
  active_loans: BankLoan[];
  monthly_inflow_eur: number;
  monthly_outflow_eur: number;
  tenure_years: number;
};

export const BANK_PROFILE: BankProfile = {
  iban: "RO49 BACX 0000 0010 5728 4100",
  current_account_balance_eur: 4280.5,
  credit_card: { type: "Visa Gold", limit_eur: 5000, used_eur: 612.2 },
  savings_account_balance_eur: 8200.0,
  active_loans: [
    {
      product: "Personal Loan",
      outstanding_eur: 3100,
      monthly_payment_eur: 145,
      months_remaining: 24,
    },
  ],
  monthly_inflow_eur: 4500,
  monthly_outflow_eur: 3200,
  tenure_years: 6,
};

export function formatEur(amount: number): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function maskIban(iban: string): string {
  const compact = iban.replace(/\s+/g, "");
  if (compact.length < 8) return iban;
  return `${compact.slice(0, 4)} •••• •••• ${compact.slice(-4)}`;
}
