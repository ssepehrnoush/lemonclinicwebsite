import { useRef, type CSSProperties } from "react";

type Props = {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  rounded?: number | string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  bordered?: boolean;
};

/**
 * Shows the entire image (object-contain) without cropping.
 * A blurred copy of the same image fills the background as ambient backdrop.
 * Hover: subtle parallax tilt + gold shimmer sweep.
 */
export function ContainImage({
  src,
  alt,
  ratio = "16 / 10",
  className = "",
  rounded = 20,
  loading = "lazy",
  fetchPriority,
  bordered = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--tx", `${(-x * 8).toFixed(2)}px`);
    el.style.setProperty("--ty", `${(-y * 8).toFixed(2)}px`);
    el.style.setProperty("--rx", `${(y * 3).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(-x * 3).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const wrapperStyle: CSSProperties = {
    aspectRatio: ratio,
    borderRadius: rounded,
    border: bordered ? "1px solid var(--line)" : "none",
    background: "radial-gradient(120% 80% at 50% 0%, rgba(185,154,92,0.10), rgba(7,7,10,0.6) 70%)",
    boxShadow: bordered ? "0 20px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,246,204,0.04)" : "none",
    perspective: 900,
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative overflow-hidden ${className}`}
      style={wrapperStyle}
    >
      {/* Ambient blurred backdrop — same image, scaled & blurred */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading={loading}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover scale-125 opacity-35"
        style={{ filter: "blur(28px) saturate(120%)" }}
      />
      {/* Dark vignette over backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(closest-side, transparent 55%, rgba(7,7,10,0.55) 100%)" }}
      />
      {/* Foreground full image — contained, parallax */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        {...(fetchPriority ? { fetchPriority } : {})}
        className="relative h-full w-full object-contain p-[clamp(10px,2vw,22px)] transition-transform duration-[600ms] ease-out will-change-transform"
        style={{
          transform:
            "translate3d(var(--tx,0), var(--ty,0), 0) rotateX(var(--rx,0)) rotateY(var(--ry,0))",
          filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.45))",
        }}
      />
      {/* Gold shimmer sweep on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px 220px at var(--mx,50%) var(--my,50%), rgba(216,192,131,0.18), transparent 60%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Top hairline */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(216,192,131,0.55), transparent)" }}
      />
    </div>
  );
}