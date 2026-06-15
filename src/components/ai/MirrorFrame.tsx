import type { ReactNode } from "react";
import logoCutout from "@/assets/ai/logo-cutout.png.asset.json";

interface MirrorFrameProps {
  progress?: number;
  size?: number;
  children?: ReactNode;
  spinning?: boolean;
}

export function MirrorFrame({ progress = 0, size = 260, children, spinning = false }: MirrorFrameProps) {
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, progress)) / 100) * c;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={`absolute inset-0 -rotate-90 ${spinning ? "animate-spin [animation-duration:3s]" : ""}`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="aineh-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9F0DC" />
            <stop offset="50%" stopColor="#2DD4A8" />
            <stop offset="100%" stopColor="#0E5740" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="color-mix(in oklab, #7FE0B8 22%, transparent)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#aineh-gold)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={spinning ? c * 0.7 : offset}
          style={{ transition: "stroke-dashoffset 800ms ease" }}
        />
      </svg>
      <div
        className="absolute rounded-full overflow-hidden shadow-ai-mirror flex items-center justify-center"
        style={{
          inset: stroke + 6,
          background: "radial-gradient(120% 120% at 30% 20%, color-mix(in oklab, #2DD4A8 22%, #0E3A2C), #04110D 80%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 28% 22%, color-mix(in oklab, #7FE0B8 28%, transparent), transparent 55%)",
          }}
        />
        {children ? (
          <div className="relative z-10">{children}</div>
        ) : (
          <img
            src={logoCutout.url}
            alt="Lemon Aesthetic Center"
            className="relative z-10 h-[78%] w-[78%] object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
          />
        )}
      </div>
    </div>
  );
}