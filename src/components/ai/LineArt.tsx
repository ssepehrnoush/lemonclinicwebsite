import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 24, ...rest }: Props) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...rest,
  };
}

export function ArrowLeftLong(p: Props) {
  return (
    <svg {...base(p)}>
      <path d="M20 12H4" />
      <path d="M9 7l-5 5 5 5" />
    </svg>
  );
}