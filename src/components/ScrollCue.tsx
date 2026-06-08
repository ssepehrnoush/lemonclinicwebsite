export function ScrollCue() {
  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="text-[11px] tracking-[0.4em] text-[#FBF8F2]/80 font-latin">SCROLL</span>
      <svg width="22" height="36" viewBox="0 0 22 36" aria-hidden="true" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>
        <defs>
          <linearGradient id="sc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4E692" /><stop offset="100%" stopColor="#A8884C" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="20" height="34" rx="10" fill="none" stroke="url(#sc)" strokeWidth="1.2" />
        <circle cx="11" cy="10" r="2.6" fill="url(#sc)">
          <animate attributeName="cy" values="10;22;10" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}