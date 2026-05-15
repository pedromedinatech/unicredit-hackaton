"use client";

export function ThinkingArc() {
  return (
    <div className="flex items-center gap-3 text-sm text-unicredit-navy/70">
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden
      >
        <path
          d="M6 20 C 6 8, 34 8, 34 20"
          stroke="var(--color-unicredit-red)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          className="uc-arc-stroke"
        />
      </svg>
      <span>Thinking…</span>
    </div>
  );
}
