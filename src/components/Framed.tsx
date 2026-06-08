import type { ImgHTMLAttributes } from "react";
import { useReveal } from "./useReveal";

type Props = ImgHTMLAttributes<HTMLImageElement> & { ratio?: string; frameClassName?: string };

export function Framed({ ratio = "4 / 3", frameClassName = "", className = "", ...img }: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal relative overflow-hidden rounded-[20px] ${frameClassName}`}
      style={{
        aspectRatio: ratio,
        border: "1px solid var(--line)",
        boxShadow: "0 20px 60px rgba(43,38,32,0.10), inset 0 0 0 1px rgba(255,246,204,0.06)",
      }}
    >
      <img
        {...img}
        loading={img.loading ?? "lazy"}
        decoding={img.decoding ?? "async"}
        className={`h-full w-full object-cover ${className}`}
      />
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 80px rgba(244,230,146,0.06)" }} />
    </div>
  );
}