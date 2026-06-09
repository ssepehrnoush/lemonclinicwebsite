import { useState, type ReactNode } from "react";

type Props = {
  href: string;
  label: string;
  external?: boolean;
  children: ReactNode;
};

export function GlassKey({ href, label, external, children }: Props) {
  const [spinning, setSpinning] = useState(false);
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`glass-key ${spinning ? "is-spinning" : ""}`}
      onClick={() => {
        setSpinning(false);
        requestAnimationFrame(() => setSpinning(true));
      }}
      onAnimationEnd={() => setSpinning(false)}
    >
      <span style={{ transform: "translateZ(1px)", display: "inline-flex" }}>
        {children}
      </span>
    </a>
  );
}