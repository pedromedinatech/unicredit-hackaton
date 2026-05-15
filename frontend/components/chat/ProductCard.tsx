"use client";

import { BadgeCheck } from "lucide-react";

export type RecommendationCard = {
  product_id: string;
  name?: string;
  reason: string;
  fit_score: number;
};

function prettify(id: string): string {
  return id
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ProductCard({ rec }: { rec: RecommendationCard }) {
  const displayName = rec.name ?? prettify(rec.product_id);
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-unicredit-line bg-white p-4 shadow-card transition hover:border-unicredit-red/40">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-1 rounded-full bg-unicredit-red-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-unicredit-red">
            <BadgeCheck size={11} strokeWidth={2.4} /> UniCredit product
          </p>
          <h4 className="mt-1.5 text-sm font-bold leading-snug text-unicredit-navy">
            {displayName}
          </h4>
        </div>
        <FitRing score={rec.fit_score} />
      </header>
      <p className="text-xs leading-relaxed text-unicredit-navy/75">
        {rec.reason}
      </p>
    </article>
  );
}

function FitRing({ score }: { score: number }) {
  const size = 36;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const safeScore = Math.max(0, Math.min(100, score));
  const offset = circumference - (safeScore / 100) * circumference;
  const color =
    safeScore >= 75 ? "#16a34a" : safeScore >= 50 ? "#f59e0b" : "#e30613";
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--color-unicredit-line)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-[10px] font-bold"
        style={{ color }}
      >
        {safeScore}
      </span>
    </div>
  );
}
