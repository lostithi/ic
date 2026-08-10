import { brand } from "@/lib/brand";

/** Sharp blade segments along an S-curve — closer to the studio column references */
const BLADES = (() => {
  const count = 11;
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const y = 4 + t * 40;
    // Gentle spinal S
    const x = 20 + Math.sin(t * Math.PI) * 7.2 - Math.sin(t * Math.PI * 2) * 1.8;
    const halfW = 8.6 - Math.abs(t - 0.5) * 5.5;
    const halfH = 1.55 + (1 - Math.abs(t - 0.5) * 2) * 0.35;
    const rot = Math.cos(t * Math.PI) * 22;
    return { x, y, halfW, halfH, rot };
  });
})();

export function LogoMark({
  className = "",
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 48"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      fill="currentColor"
    >
      {title ? <title>{title}</title> : null}
      {BLADES.map((b, i) => (
        <path
          key={i}
          transform={`translate(${b.x} ${b.y}) rotate(${b.rot})`}
          d={`M ${-b.halfW} 0 L 0 ${-b.halfH} L ${b.halfW} 0 L 0 ${b.halfH} Z`}
        />
      ))}
    </svg>
  );
}

type LogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  compact?: boolean;
  /** Hoboken-style vertical stack vs side-by-side lockup */
  stacked?: boolean;
};

/** Primary lockup: sharp S-curve mark + tracked SPINE / STUDIO */
export default function Logo({
  className = "",
  markClassName = "h-10 w-8",
  showWordmark = true,
  compact = false,
  stacked = false,
}: LogoProps) {
  if (stacked) {
    return (
      <span
        className={`inline-flex flex-col items-center gap-3 text-current ${className}`}
      >
        <LogoMark className={markClassName} title={brand.name} />
        {showWordmark ? (
          <span className="flex flex-col items-center leading-none">
            <span className="font-display text-[1.05em] font-medium uppercase tracking-[0.32em]">
              {brand.shortName}
            </span>
            {!compact ? (
              <span className="mt-2 font-mono-ui text-[0.48em] uppercase tracking-[0.42em] text-current/70">
                Studio
              </span>
            ) : null}
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-3 text-current ${className}`}>
      <LogoMark className={markClassName} title={brand.name} />
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.1em] font-medium uppercase tracking-[0.28em]">
            {brand.shortName}
          </span>
          {!compact ? (
            <span className="mt-1.5 font-mono-ui text-[0.5em] uppercase tracking-[0.38em] text-current/70">
              Studio
            </span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}
