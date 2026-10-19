/** Serving cloche mark. Takes its colour from `currentColor`. */
export function BrandMark({ className = "h-9 w-auto" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 40"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <circle cx="24" cy="7.5" r="3.5" />
      <rect x="22.5" y="9" width="3" height="4" rx="1" />
      <path d="M6 30a18 18 0 0 1 36 0Z" />
      <path
        d="M12.5 25a12 12 0 0 1 7-9"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.45"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect x="2" y="32" width="44" height="4.5" rx="2.25" />
    </svg>
  );
}

/** Full logo: cloche mark + "ERP17" wordmark + "Restaurant" tagline. */
export function BrandLogo({
  markClassName = "h-9 w-auto",
  nameClassName = "text-[1.6rem]",
  taglineClassName = "text-[10px] text-white/60",
  showTagline = true,
  // "light" for dark backgrounds (saffron), "dark" for white backgrounds (red)
  tone = "light",
  className = "",
}) {
  const color = tone === "dark" ? "text-[var(--primary)]" : "text-[var(--secondary)]";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BrandMark
        className={`shrink-0 ${color} ${markClassName}`}
      />
      <span className="leading-none">
        <span
          className={`block font-[family-name:var(--font-display)] font-bold tracking-[0.12em] lining-nums ${color} ${nameClassName}`}
        >
          ERP17
        </span>
        {showTagline ? (
          <span
            className={`mt-1 block font-semibold uppercase tracking-[0.42em] ${taglineClassName}`}
          >
            Restaurant
          </span>
        ) : null}
      </span>
    </span>
  );
}
