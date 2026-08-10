/** Geometric vertebra / atlas marks — one stroke language for the nav column */

export function VertebraGlyph({
  className = "",
  active = false,
}: {
  className?: string;
  active?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 56 28"
      className={className}
      aria-hidden
      fill="none"
    >
      {/* transverse processes */}
      <rect
        x="2"
        y="10"
        width="14"
        height="8"
        rx="3"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="40"
        y="10"
        width="14"
        height="8"
        rx="3"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* body */}
      <ellipse
        cx="28"
        cy="14"
        rx="12"
        ry="10"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* neural canal */}
      <circle
        cx="28"
        cy="14"
        r="3.2"
        fill={active ? "var(--spine-black)" : "currentColor"}
      />
    </svg>
  );
}

export function AtlasMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden
      fill="none"
    >
      <ellipse
        cx="20"
        cy="18"
        rx="13"
        ry="11"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 26c2.5 4 7 6.5 10 6.5S27.5 30 30 26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="14.5" cy="17" r="2.2" fill="currentColor" />
      <circle cx="25.5" cy="17" r="2.2" fill="currentColor" />
      <path
        d="M18 22.5h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MenuBones({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-7 flex-col items-center justify-center gap-[5px]">
      <span
        className={`h-[3px] w-full rounded-full bg-current transition-transform duration-300 ${
          open ? "translate-y-[8px] rotate-45" : ""
        }`}
      />
      <span
        className={`h-[3px] w-[70%] rounded-full bg-current transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`h-[3px] w-full rounded-full bg-current transition-transform duration-300 ${
          open ? "-translate-y-[8px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}
