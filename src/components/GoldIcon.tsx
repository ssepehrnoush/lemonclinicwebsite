import type { ReactNode } from "react";
import logoCutout from "@/assets/logo_cutout.png.asset.json";

type Props = { children: ReactNode; size?: number; className?: string };

let __id = 0;
const uid = () => `gi-${++__id}`;

/**
 * 3D cutout gold icon — multi-stop gradient body, top highlight,
 * bottom dark bevel + soft emerald ambient drop shadow.
 */
export function GoldIcon({ children, size = 28, className }: Props) {
  const id = uid();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      style={{
        filter:
          "drop-shadow(0 1px 0 rgba(255,240,180,0.35)) drop-shadow(0 3px 5px rgba(0,0,0,0.55)) drop-shadow(0 0 14px rgba(31,174,130,0.18))",
      }}
    >
      <defs>
        {/* Body: brushed gold with strong tonal range */}
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE9A6" />
          <stop offset="22%" stopColor="#F2CE6E" />
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="78%" stopColor="#8C7138" />
          <stop offset="100%" stopColor="#5A4621" />
        </linearGradient>
        {/* Top sheen */}
        <linearGradient id={`${id}-h`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFBE0" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#FFFBE0" stopOpacity="0.15" />
          <stop offset="60%" stopColor="#FFFBE0" stopOpacity="0" />
        </linearGradient>
        {/* Bottom bevel shadow */}
        <linearGradient id={`${id}-b`} x1="0" y1="0.55" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1208" stopOpacity="0" />
          <stop offset="100%" stopColor="#1A1208" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {/* Dark base for cutout depth */}
      <g fill="#0A0805" opacity="0.5" transform="translate(0,0.5)">
        {children}
      </g>
      {/* Body */}
      <g fill={`url(#${id}-g)`} stroke="#3A2E12" strokeWidth="0.35" strokeLinejoin="round">
        {children}
      </g>
      {/* Bottom bevel */}
      <g fill={`url(#${id}-b)`} style={{ mixBlendMode: "multiply" }}>
        {children}
      </g>
      {/* Top sheen */}
      <g fill={`url(#${id}-h)`} style={{ mixBlendMode: "screen" }}>
        {children}
      </g>
    </svg>
  );
}

export const IconCheck = ({ size = 26 }: { size?: number }) => {
  const id = uid();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{
        filter:
          "drop-shadow(0 1px 0 rgba(255,240,180,0.35)) drop-shadow(0 3px 5px rgba(0,0,0,0.55)) drop-shadow(0 0 14px rgba(31,174,130,0.18))",
      }}
    >
      <defs>
        <linearGradient id={`${id}-cg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE9A6" />
          <stop offset="40%" stopColor="#E5C266" />
          <stop offset="100%" stopColor="#8C7138" />
        </linearGradient>
      </defs>
      <path
        d="M5 12.5l4 4 10-10"
        fill="none"
        stroke="#0A0805"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
        transform="translate(0,0.6)"
      />
      <path
        d="M5 12.5l4 4 10-10"
        fill="none"
        stroke={`url(#${id}-cg)`}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconPin = (p: { size?: number }) => (
  <GoldIcon size={p.size}>
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.2a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4z" />
  </GoldIcon>
);
export const IconPhone = (p: { size?: number }) => (
  <GoldIcon size={p.size}>
    <path d="M6.6 3.5c.5-.5 1.3-.5 1.8 0l2.4 2.4c.5.5.5 1.3 0 1.8L9.4 9.1a14 14 0 0 0 5.5 5.5l1.4-1.4c.5-.5 1.3-.5 1.8 0l2.4 2.4c.5.5.5 1.3 0 1.8l-1.6 1.6c-.7.7-1.7 1-2.6.7C11.6 18.3 5.7 12.4 4.3 5.7c-.2-.9.1-1.9.8-2.6l1.5-1.6z" />
  </GoldIcon>
);
export const IconWhatsApp = (p: { size?: number }) => (
  <GoldIcon size={p.size}>
    <path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.2 1.2-1.7 1.2-.4 0-.9 0-1.5-.2-2.3-.7-3.9-3-4-3.2-.1-.2-1-1.3-1-2.5s.6-1.8.8-2c.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.7 1.7c.1.2.1.4 0 .6l-.3.4c-.1.2-.2.3 0 .5.2.3.7 1.2 1.6 1.9 1 .9 1.9 1.2 2.1 1.3.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.7.8c.2.1.4.2.4.3 0 .2 0 .8-.2 1.3z" />
  </GoldIcon>
);
export const IconClock = (p: { size?: number }) => (
  <GoldIcon size={p.size}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 3a1 1 0 0 1 1 1v5.6l3.5 2.1a1 1 0 1 1-1 1.7l-4-2.4A1 1 0 0 1 11 12V6a1 1 0 0 1 1-1z" />
  </GoldIcon>
);

export const LemonOrnament = ({ size = 36 }: { size?: number }) => (
  <img
    src={logoCutout.url}
    alt=""
    aria-hidden="true"
    width={size}
    height={size}
    loading="lazy"
    decoding="async"
    style={{
      width: size,
      height: size,
      objectFit: "contain",
      filter:
        "drop-shadow(0 2px 3px rgba(0,0,0,0.55)) drop-shadow(0 0 14px rgba(201,168,76,0.30)) drop-shadow(0 0 18px rgba(31,174,130,0.18))",
    }}
  />
);