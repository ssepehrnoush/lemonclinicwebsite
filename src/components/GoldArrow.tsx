export function GoldArrow({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ filter: "drop-shadow(0 2px 3px rgba(168,136,76,0.35))" }}>
      <defs>
        <linearGradient id="ga-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4E692" />
          <stop offset="50%" stopColor="#E5CC61" />
          <stop offset="100%" stopColor="#A8884C" />
        </linearGradient>
      </defs>
      <path d="M14 5l-7 7 7 7M7 12h13" fill="none" stroke="url(#ga-g)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}