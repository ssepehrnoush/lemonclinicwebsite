import { useState, type ReactNode } from "react";

export interface GlassIconProps {
  /** The icon node (e.g. <SomeIcon size={20} />) */
  icon: ReactNode;
  /** Optional accessible label (sets aria-label and title) */
  label?: string;
  /** Optional click handler — makes the icon interactive */
  onClick?: () => void;
  /** Optional href — renders as <a> instead of <button> or <span> */
  href?: string;
  /** External link? adds target="_blank" rel="noopener noreferrer" */
  external?: boolean;
  /** Size variant: "sm" | "md" | "lg" */
  size?: "sm" | "md" | "lg";
  /** Custom className appended to the element */
  className?: string;
}

const sizeMap = {
  sm: { wrap: 40, icon: 18 },
  md: { wrap: 52, icon: 22 },
  lg: { wrap: 64, icon: 26 },
} as const;

export function GlassIcon({
  icon,
  label,
  onClick,
  href,
  external,
  size = "md",
  className = "",
}: GlassIconProps) {
  const [spinning, setSpinning] = useState(false);
  const dims = sizeMap[size];

  const handleClick = () => {
    if (onClick) onClick();
    setSpinning(false);
    requestAnimationFrame(() => setSpinning(true));
  };

  const baseClass = `glass-icon glass-icon--${size} ${spinning ? "is-spinning" : ""} ${className}`.trim();

  const content = (
    <span
      className="glass-icon__inner"
      style={{ width: dims.wrap, height: dims.wrap }}
      aria-hidden="true"
    >
      {icon}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={label}
        title={label}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={baseClass}
        onClick={handleClick}
        onAnimationEnd={() => setSpinning(false)}
      >
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        aria-label={label}
        title={label}
        className={baseClass}
        onClick={handleClick}
        onAnimationEnd={() => setSpinning(false)}
      >
        {content}
      </button>
    );
  }

  return (
    <span className={baseClass} aria-label={label} title={label} role="img">
      {content}
    </span>
  );
}
