import clsx from "clsx";

export function Logo({
  className,
  variant = "full",
  size = 28,
}: {
  className?: string;
  variant?: "full" | "mark";
  size?: number;
}) {
  const arc = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="UniCredit logo mark"
      className="shrink-0"
    >
      <path
        d="M6 12 C 14 4, 26 4, 34 12"
        stroke="var(--color-unicredit-red)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8 24 C 14 32, 26 32, 32 24"
        stroke="var(--color-unicredit-red)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
    </svg>
  );

  if (variant === "mark") {
    return <span className={clsx("inline-flex", className)}>{arc}</span>;
  }

  return (
    <span
      className={clsx("inline-flex items-center gap-2", className)}
      aria-label="UniCredit"
    >
      {arc}
      <span className="text-[18px] font-bold tracking-tight text-unicredit-navy">
        UniCredit
      </span>
      <span className="hidden sm:inline text-[13px] font-medium text-unicredit-red ml-1">
        Coach
      </span>
    </span>
  );
}
