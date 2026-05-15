"use client";

import { ShieldCheck, RefreshCcw } from "lucide-react";
import { BANK_PROFILE, formatEur, maskIban } from "@/lib/mockBank";
import { clearAll } from "@/lib/demoStore";

export function BankPanel({ name }: { name: string }) {
  const card = BANK_PROFILE.credit_card;
  const cardAvailable = card.limit_eur - card.used_eur;
  const loan = BANK_PROFILE.active_loans[0];

  const reset = () => {
    if (typeof window === "undefined") return;
    const ok = window.confirm("Reset the demo? This clears the profile and chats.");
    if (!ok) return;
    clearAll();
    window.location.href = "/";
  };

  return (
    <aside className="flex flex-col gap-3 rounded-2xl border border-unicredit-line bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-unicredit-red">
          UniCredit account
        </p>
        <span className="rounded-full bg-unicredit-mist px-2 py-0.5 text-[10px] font-semibold text-unicredit-navy/70">
          {BANK_PROFILE.tenure_years}y client
        </span>
      </div>

      <div>
        <p className="text-base font-bold text-unicredit-navy">
          {name || "UniCredit Customer"}
        </p>
        <p className="text-xs text-unicredit-navy/60">
          IBAN {maskIban(BANK_PROFILE.iban)}
        </p>
      </div>

      <div className="rounded-xl border border-unicredit-line bg-unicredit-mist p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-unicredit-navy/55">
          Current account
        </p>
        <p className="mt-0.5 text-lg font-bold text-unicredit-navy">
          {formatEur(BANK_PROFILE.current_account_balance_eur)}
        </p>
      </div>

      <Row label="Savings">
        <span className="font-semibold text-unicredit-navy">
          {formatEur(BANK_PROFILE.savings_account_balance_eur)}
        </span>
      </Row>

      <Row label={card.type}>
        <span className="text-unicredit-navy">
          {formatEur(cardAvailable)}
          <span className="ml-1 text-unicredit-navy/50">available</span>
        </span>
      </Row>

      {loan && (
        <Row label={loan.product}>
          <span className="text-unicredit-navy">
            {formatEur(loan.outstanding_eur)}
            <span className="ml-1 text-unicredit-navy/50">
              · {loan.months_remaining}m left
            </span>
          </span>
        </Row>
      )}

      <div className="mt-1 grid grid-cols-2 gap-2 rounded-xl border border-unicredit-line p-3 text-[11px]">
        <div>
          <p className="text-unicredit-navy/55 uppercase tracking-wide">Inflow</p>
          <p className="font-semibold text-unicredit-navy">
            {formatEur(BANK_PROFILE.monthly_inflow_eur)}
          </p>
        </div>
        <div>
          <p className="text-unicredit-navy/55 uppercase tracking-wide">Outflow</p>
          <p className="font-semibold text-unicredit-navy">
            {formatEur(BANK_PROFILE.monthly_outflow_eur)}
          </p>
        </div>
      </div>

      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-unicredit-navy/55">
        <ShieldCheck size={12} strokeWidth={2.2} />
        <span>Synced with UniCredit core banking</span>
      </div>

      <button
        type="button"
        onClick={reset}
        className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full border border-unicredit-line bg-white px-3 py-1.5 text-xs font-semibold text-unicredit-navy hover:border-unicredit-red hover:text-unicredit-red"
      >
        <RefreshCcw size={12} strokeWidth={2.2} />
        Reset demo
      </button>
    </aside>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-unicredit-navy/65">{label}</span>
      <span className="text-right text-xs">{children}</span>
    </div>
  );
}
