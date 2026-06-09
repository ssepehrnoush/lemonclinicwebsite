import { useState, type ReactNode } from "react";

type Props = {
  href?: string;
  label: string;
  value?: ReactNode;
  external?: boolean;
  icon: ReactNode;
};

export function GlassKey({ href, label, value, external, icon }: Props) {
  const [spinning, setSpinning] = useState(false);
  const interactive = Boolean(href);
  const isTel = href?.startsWith("tel:") || href?.startsWith("mailto:") || href?.startsWith("sms:");
  const handleClick = () => {
    setSpinning(false);
    requestAnimationFrame(() => setSpinning(true));
  };

  const content = (
    <>
      <span className="glass-key__icon" aria-hidden="true">{icon}</span>
      <span className="glass-key__text">
        <span className="glass-key__label">{label}</span>
        {value ? <span className="glass-key__value">{value}</span> : null}
      </span>
    </>
  );

  const className = `glass-key glass-key--full ${spinning ? "is-spinning" : ""}`;

  if (!interactive) {
    return (
      <div className={className} role="group" aria-label={label}>
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : isTel ? "_top" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
      onClick={handleClick}
      onAnimationEnd={() => setSpinning(false)}
    >
      {content}
    </a>
  );
}