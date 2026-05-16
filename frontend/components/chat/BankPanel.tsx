"use client";

import { RefreshCcw, Target, Clock, TrendingUp, Shield, Phone } from "lucide-react";
import { clearAll } from "@/lib/demoStore";
import type { UserProfile, Segment } from "@/lib/userProfile";

const SEGMENT_LABEL: Record<Segment, string> = {
  CONSERVATIVE: "Conservative",
  BALANCED: "Balanced",
  GROWTH: "Growth",
  AGGRESSIVE: "Aggressive",
};

const SEGMENT_COLOR: Record<Segment, string> = {
  CONSERVATIVE: "bg-blue-50 text-blue-700",
  BALANCED: "bg-emerald-50 text-emerald-700",
  GROWTH: "bg-amber-50 text-amber-700",
  AGGRESSIVE: "bg-red-50 text-unicredit-red",
};

const GOAL_LABELS: Record<string, string> = {
  A: "Build savings & security",
  B: "Save for something specific",
  C: "Grow money for the future",
  D: "Build wealth & passive income",
};

const HORIZON_LABELS: Record<string, string> = {
  A: "Less than 1 year",
  B: "1–3 years",
  C: "3–7 years",
  D: "7+ years (long-term)",
};

const SAVINGS_LABELS: Record<string, string> = {
  A: "Very little",
  B: "Up to 10%",
  C: "10–30%",
  D: "More than 30%",
};

const ESG_LABELS: Record<number, string> = {
  0: "Not a priority",
  1: "Mildly interested",
  2: "Prefer ESG products",
  3: "ESG only",
};

export function BankPanel({ name, profile }: { name: string; profile?: UserProfile }) {
  const reset = () => {
    if (typeof window === "undefined") return;
    const ok = window.confirm("Reset the demo? This clears the profile and chats.");
    if (!ok) return;
    clearAll();
    window.location.href = "/";
  };

  if (!profile) return null;

  const segment = profile.segment;

  return (
    <aside className="flex flex-col gap-4 rounded-2xl border border-unicredit-line bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-unicredit-red">
          Your Profile
        </p>
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${SEGMENT_COLOR[segment]}`}>
          {SEGMENT_LABEL[segment]}
        </span>
      </div>

      <div>
        <p className="text-base font-bold text-unicredit-navy">{name || "Your name"}</p>
        <p className="text-xs text-unicredit-navy/55">GENOVAI knows this about you</p>
      </div>

      <div className="flex flex-col gap-3">
        <ProfileRow
          icon={<Target size={13} strokeWidth={2.2} />}
          label="Goal"
          value={GOAL_LABELS[profile.q1_objective] ?? "—"}
        />
        <ProfileRow
          icon={<Clock size={13} strokeWidth={2.2} />}
          label="Horizon"
          value={HORIZON_LABELS[profile.q3_horizon] ?? "—"}
        />
        <ProfileRow
          icon={<TrendingUp size={13} strokeWidth={2.2} />}
          label="Can invest"
          value={SAVINGS_LABELS[profile.q5_savings_rate] ?? "—"}
        />
        <ProfileRow
          icon={<Shield size={13} strokeWidth={2.2} />}
          label="Risk"
          value={SEGMENT_LABEL[segment]}
        />
        {profile.esg_level > 0 && (
          <ProfileRow
            icon={
              <img
                src="/ESG%20Icons/UC_ESG_Empowering_Sustainability/UC_ESG_Empowering_Sustainability_PNG/UC_PNG_ESG_Empowering_Sustainability.png"
                alt="ESG"
                className="h-3.5 w-3.5 object-contain"
              />
            }
            label="ESG"
            value={ESG_LABELS[profile.esg_level] ?? "—"}
          />
        )}
        {profile.phone && (
          <ProfileRow
            icon={<Phone size={13} strokeWidth={2.2} />}
            label="Phone"
            value={profile.phone}
          />
        )}
      </div>

      <p className="rounded-xl bg-unicredit-mist px-3 py-2 text-[11px] leading-relaxed text-unicredit-navy/70">
        GENOVAI uses this profile to tailor every recommendation to your situation.
      </p>

      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-unicredit-line bg-white px-3 py-1.5 text-xs font-semibold text-unicredit-navy hover:border-unicredit-red hover:text-unicredit-red"
      >
        <RefreshCcw size={12} strokeWidth={2.2} />
        Reset demo
      </button>
    </aside>
  );
}

function ProfileRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="flex h-4 w-4 shrink-0 items-center justify-center text-unicredit-red">{icon}</span>
      <span className="w-14 shrink-0 text-unicredit-navy/55">{label}</span>
      <span className="font-medium text-unicredit-navy">{value}</span>
    </div>
  );
}
