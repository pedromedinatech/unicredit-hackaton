import Image from "next/image";
import clsx from "clsx";

export function Logo({
  className,
  height = 52,
}: {
  className?: string;
  height?: number;
}) {
  // The SVG (180×67) has the "UniCredit" text baseline at ~y=45.6 out of 67.
  // Space below the text = (67-45.6)/67 ≈ 32% of height.
  // Using items-end + marginBottom lifts GENOVAI to match that baseline.
  // SVG text bottom sits at 45.6/67 ≈ 68% from top → 32% whitespace below.
  // Subtract font descent (~9% of height) so the visible glyph bottom aligns, not the text box bottom.
  const belowBaseline = Math.round(height * 0.26);
  // SVG already has ~16px of right whitespace at h=52. Use gap=0 so total visual ≈ 16px.
  const gap = 0;

  return (
    <span className={clsx("inline-flex items-end", className)} style={{ gap: `${gap}px` }}>
      <Image
        src="/UC_LOGO.svg"
        alt="UniCredit"
        height={height}
        width={0}
        style={{ width: "auto", height: `${height}px` }}
        priority
      />
      <span
        style={{
          fontSize: `${Math.round(height * 0.28)}px`,
          letterSpacing: "0.1em",
          lineHeight: 1,
          marginBottom: `${belowBaseline}px`,
        }}
        className="font-semibold uppercase text-[#7a8fa6]"
      >
        GENOVAI
      </span>
    </span>
  );
}
