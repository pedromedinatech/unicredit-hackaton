"use client";

import { Phone, X, Loader2 } from "lucide-react";

interface AdvisorCTAProps {
  onAccept: () => void;
  onDismiss: () => void;
  submitting: boolean;
}

export function AdvisorCTA({ onAccept, onDismiss, submitting }: AdvisorCTAProps) {
  return (
    <div className="ml-2 rounded-2xl border border-unicredit-red/30 bg-unicredit-red-soft p-4 uc-fade-up">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-unicredit-navy">
            Would you like a UniCredit advisor to reach out?
          </p>
          <p className="mt-1 text-xs text-unicredit-navy/70">
            A specialist will contact you to discuss your goals personally — no commitment required.
          </p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          disabled={submitting}
          className="shrink-0 rounded-full p-1 text-unicredit-navy/40 hover:text-unicredit-navy disabled:opacity-40"
          aria-label="Dismiss"
        >
          <X size={14} strokeWidth={2.4} />
        </button>
      </div>
      <button
        type="button"
        onClick={onAccept}
        disabled={submitting}
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-unicredit-red px-4 py-2 text-xs font-semibold text-white hover:bg-unicredit-red-dark disabled:opacity-60"
      >
        {submitting ? (
          <Loader2 size={13} className="animate-spin" />
        ) : (
          <Phone size={13} strokeWidth={2.4} />
        )}
        {submitting ? "Saving…" : "Yes, contact me"}
      </button>
    </div>
  );
}
