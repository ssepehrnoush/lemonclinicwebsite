import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { analyzeFace } from "@/lib/analyze.functions";
import { getCapture, saveResult } from "@/lib/aineh-store";

export const Route = createFileRoute("/analyzing")({
  head: () => ({ meta: [{ title: "آینه — در حال تحلیل…" }] }),
  component: AnalyzingPage,
});

const PHASES = [
  { t: "شناسایی چهره...", at: 0 },
  { t: "اسکن اجزای صورت...", at: 1000 },
  { t: "تحلیل چشم‌ها...", at: 2000 },
  { t: "بینی و لب‌ها...", at: 3000 },
  { t: "محاسبه تقارن...", at: 4000 },
  { t: "✓ تکمیل شد", at: 5200 },
];

// Approximate facial landmark positions (% of frame) — tuned for a centered portrait.
const LANDMARKS: { x: number; y: number; delay: number }[] = [
  // brows
  { x: 38, y: 34, delay: 1100 },
  { x: 62, y: 34, delay: 1200 },
  // eyes
  { x: 40, y: 41, delay: 2000 },
  { x: 60, y: 41, delay: 2100 },
  // nose
  { x: 50, y: 50, delay: 2700 },
  { x: 50, y: 56, delay: 2900 },
  // lips
  { x: 44, y: 64, delay: 3300 },
  { x: 50, y: 65, delay: 3400 },
  { x: 56, y: 64, delay: 3500 },
  // jaw
  { x: 33, y: 60, delay: 4000 },
  { x: 50, y: 73, delay: 4100 },
  { x: 67, y: 60, delay: 4200 },
];

function AnalyzingPage() {
  const navigate = useNavigate();
  const run = useServerFn(analyzeFace);
  const [phase, setPhase] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [userImg, setUserImg] = useState<string | null>(null);
  const started = useRef(false);
  const apiDone = useRef(false);
  const apiResult = useRef<unknown>(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const cap = getCapture();
    if (!cap) {
      navigate({ to: "/capture" });
      return;
    }
    setUserImg(cap.dataUrl);

    const timers = PHASES.map((p, i) => setTimeout(() => setPhase(i), p.at));
    const startTime = Date.now();

    (async () => {
      try {
        const base64 = cap.dataUrl.split(",")[1] ?? cap.dataUrl;
        const result = await run({ data: { imageBase64: base64, mode: "face" } });
        apiResult.current = result;
        apiDone.current = true;
        // Wait for the scan animation to finish before navigating.
        const elapsed = Date.now() - startTime;
        const wait = Math.max(0, 5800 - elapsed);
        setTimeout(() => {
          saveResult(result);
          // Clear seen-flag so popup re-shows for new analysis
          sessionStorage.removeItem("aineh:beautyScoreSeen");
          sessionStorage.removeItem("aineh:beautyScore");
          navigate({ to: "/result" });
        }, wait);
      } catch (e) {
        setError(e instanceof Error ? e.message : "خطای نامشخص");
      }
    })();

    return () => { timers.forEach(clearTimeout); };
  }, [navigate, run]);

  return (
    <main className="fixed inset-0 bg-black text-white overflow-hidden">
      {userImg && (
        <img
          src={userImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {/* dark emerald overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(5, 42, 32, 0.45)" }}
      />

      {!error && (
        <>
          {/* Corner brackets */}
          <Bracket pos="tl" />
          <Bracket pos="tr" />
          <Bracket pos="bl" />
          <Bracket pos="br" />

          {/* Face oval + scan SVG */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <ellipse
              cx="50" cy="50" rx="26" ry="36"
              fill="none" stroke="#2DD4BF" strokeWidth="0.18"
              opacity="0.8"
              style={{
                strokeDasharray: 220,
                strokeDashoffset: 220,
                animation: "scan-draw 1.4s ease-out 0.3s forwards",
              }}
            />
            {/* connecting lines (appear after dots) */}
            <g
              stroke="#2DD4BF" strokeWidth="0.1" fill="none" opacity="0"
              style={{ animation: "scan-fade-in 600ms ease-out 4400ms forwards" }}
            >
              <polyline points="38,34 40,41 50,50 60,41 62,34" />
              <polyline points="50,50 50,56 44,64 50,65 56,64" />
              <polyline points="33,60 50,73 67,60" />
            </g>
            {LANDMARKS.map((l, i) => (
              <circle
                key={i}
                cx={l.x} cy={l.y} r="0.6"
                fill="#2DD4BF"
                opacity="0"
                style={{
                  animation: `scan-dot 500ms ease-out ${l.delay}ms forwards`,
                  filter: "drop-shadow(0 0 1.2px #2DD4BF)",
                }}
              />
            ))}
          </svg>

          {/* Horizontal scan line */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              height: "2px",
              top: 0,
              background:
                "linear-gradient(90deg, transparent, #2DD4BF 50%, transparent)",
              boxShadow: "0 0 18px 4px rgba(45,212,191,0.55)",
              animation: "scan-sweep 5s cubic-bezier(.55,0,.45,1) forwards",
            }}
          />

          {/* Bottom status strip */}
          <div
            className="absolute bottom-0 inset-x-0 px-6 py-5 text-center"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(2,15,11,0.85) 40%, rgba(2,15,11,0.95))",
            }}
            dir="rtl"
          >
            <div
              key={phase}
              className="text-sm font-bold tracking-wide animate-fade-in"
              style={{ color: "#7FE0B8" }}
            >
              {PHASES[phase].t}
            </div>
          </div>
        </>
      )}

      {error && (
        <div className="relative z-10 grid place-items-center h-full p-6 text-center">
          <div>
            <h1 className="text-xl font-bold">تحلیل ممکن نشد</h1>
            <p className="mt-2 text-sm text-[color:var(--destructive)]">{error}</p>
            <Link
              to="/capture"
              className="inline-block mt-6 px-6 py-3 rounded-full glass-dark text-sm font-semibold"
            >
              تلاش دوباره
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scan-sweep {
          0% { top: 8%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { top: 92%; opacity: 0; }
        }
        @keyframes scan-draw { to { stroke-dashoffset: 0; } }
        @keyframes scan-dot {
          0% { opacity: 0; transform-origin: center; }
          50% { opacity: 1; }
          100% { opacity: 0.9; }
        }
        @keyframes scan-fade-in { to { opacity: 0.7; } }
        @keyframes bracket-in {
          from { opacity: 0; transform: translate(var(--tx,0), var(--ty,0)); }
          to   { opacity: 1; transform: translate(0,0); }
        }
      `}</style>
    </main>
  );
}

function Bracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const size = 36;
  const isTop = pos[0] === "t";
  const isLeft = pos[1] === "l";
  const style: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    [isTop ? "top" : "bottom"]: 24,
    [isLeft ? "left" : "right"]: 24,
    borderColor: "#2DD4BF",
    borderStyle: "solid",
    borderWidth: 0,
    borderTopWidth: isTop ? 2 : 0,
    borderBottomWidth: !isTop ? 2 : 0,
    borderLeftWidth: isLeft ? 2 : 0,
    borderRightWidth: !isLeft ? 2 : 0,
    filter: "drop-shadow(0 0 6px rgba(45,212,191,0.55))",
    opacity: 0,
    ["--tx" as never]: isLeft ? "-8px" : "8px",
    ["--ty" as never]: isTop ? "-8px" : "8px",
    animation: "bracket-in 500ms ease-out 200ms forwards",
  };
  return <div style={style} aria-hidden="true" />;
}