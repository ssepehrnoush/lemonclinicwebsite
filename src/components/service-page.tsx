import { useEffect, useState, type ReactNode } from "react";
import { LemonOrnament } from "@/components/GoldIcon";
import { useReveal } from "@/components/useReveal";
import { ContainImage } from "@/components/ContainImage";

export function LatinToken({ children }: { children: ReactNode }) {
  return <span className="font-latin">{children}</span>;
}

export function LeafIcon({ size = 18 }: { size?: number }) {
  const id = `leaf-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ filter: "drop-shadow(0 2px 3px rgba(168,136,76,0.35))", flexShrink: 0 }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4E692" />
          <stop offset="45%" stopColor="#E5CC61" />
          <stop offset="100%" stopColor="#A8884C" />
        </linearGradient>
      </defs>
      <path d="M20 4c-7 0-13 4-15 11-.6 2.1.3 4 2 5 5-1 10-5 12-11 .4-1.5.7-3 1-5z" fill={`url(#${id})`} stroke="#8a6b35" strokeWidth="0.4" />
      <path d="M5 19C8 14 13 10 19 8" stroke="#8a6b35" strokeWidth="0.7" fill="none" opacity="0.6" />
    </svg>
  );
}

export function ServiceHero({
  label,
  title,
  description,
  image,
  alt,
  centered,
}: {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  image: string;
  alt: string;
  objectPosition?: string;
  centered?: boolean;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="px-6 pt-[clamp(120px,16vw,180px)]">
      <div ref={ref} className={`reveal mx-auto max-w-[1200px] ${centered ? "text-center" : ""}`}>
        <div className={`flex items-center gap-3 text-[12px] tracking-[0.32em] text-[var(--ink-soft)] ${centered ? "justify-center" : ""}`}>
          <LemonOrnament size={32} />
          <span className="h-px w-16 bg-gold-gradient" />
          <span>{label}</span>
        </div>
        <h1 className="mt-6 font-display" style={{ fontWeight: 700, fontSize: "clamp(34px,5.1vw,66px)", lineHeight: 1.12 }}>
          {title}
        </h1>
        {description && (
          <p className={`mt-6 text-[15px] leading-9 text-[var(--ink-soft)] ${centered ? "mx-auto max-w-[64ch]" : "max-w-[64ch]"}`}>
            {description}
          </p>
        )}
        <div className={`mt-10 ${centered ? "mx-auto max-w-[920px]" : "max-w-[780px]"}`}>
          <ContainImage src={image} alt={alt} ratio="16 / 10" />
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, centered }: { eyebrow?: string; title: ReactNode; centered?: boolean }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 text-[11px] tracking-[0.3em] text-[var(--ink-soft)] ${centered ? "justify-center" : ""}`}>
          <span className="h-px w-12 bg-gold-gradient" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="mt-4 font-display" style={{ fontWeight: 700, fontSize: "clamp(26px,3.2vw,42px)", lineHeight: 1.2 }}>
        {title}
      </h2>
    </div>
  );
}

export function FeatureList({ items, centered }: { items: ReactNode[]; centered?: boolean }) {
  return (
    <ul className={`mt-8 space-y-4 ${centered ? "mx-auto max-w-[900px]" : ""}`}>
      {items.map((item, index) => (
        <FeatureItem key={index} delay={index * 80} centered={centered}>
          {item}
        </FeatureItem>
      ))}
    </ul>
  );
}

function FeatureItem({ children, delay, centered }: { children: ReactNode; delay: number; centered?: boolean }) {
  const ref = useReveal<HTMLLIElement>(delay);
  return (
    <li ref={ref} className={`reveal flex gap-3 text-[15px] leading-[2.05] ${centered ? "justify-center text-center" : "items-start"}`}>
      <span className={`${centered ? "mt-1" : "mt-2"}`}><LeafIcon size={18} /></span>
      <span className={centered ? "max-w-[70ch]" : "max-w-[68ch]"}>{children}</span>
    </li>
  );
}

export function AftercareCard({ items, note }: { items: ReactNode[]; note?: ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal rounded-[20px] p-[clamp(24px,2.8vw,34px)]"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRight: "4px solid color-mix(in srgb, var(--sage) 72%, white)",
        boxShadow: "0 20px 60px rgba(43,38,32,0.08)",
      }}
    >
      <div className="flex items-center gap-3 text-[11px] tracking-[0.28em] text-[var(--ink-soft)]">
        <LemonOrnament size={26} />
        <span>مراقبت‌های پس از درمان</span>
      </div>
      <ul className="mt-6 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-[15px] leading-[2.05]">
            <span className="mt-2"><LeafIcon size={18} /></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {note && (
        <div className="mt-6 flex items-start gap-3 rounded-[16px] px-4 py-4 text-[14px] leading-8" style={{ background: "rgba(201,169,110,0.08)", color: "var(--ink-soft)" }}>
          <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-[13px]" style={{ border: "1px solid rgba(201,169,110,0.45)", color: "var(--gold-deep)" }}>i</span>
          <span>{note}</span>
        </div>
      )}
    </div>
  );
}

export function TierCards({ items }: { items: { title: string; description: string }[] }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <TierCard key={item.title} title={item.title} description={item.description} delay={index * 80} />
      ))}
    </div>
  );
}

function TierCard({ title, description, delay }: { title: string; description: string; delay: number }) {
  const ref = useReveal<HTMLDivElement>(delay);
  return (
    <div
      ref={ref}
      className="reveal flex min-h-[220px] flex-col justify-between rounded-[20px] p-6"
      style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "0 20px 60px rgba(43,38,32,0.06)" }}
    >
      <div className="h-px w-14 bg-gold-gradient" />
      <div className="space-y-4">
        <h3 className="font-display text-[30px] leading-none" style={{ fontWeight: 700 }}>{title}</h3>
        <p className="text-[14px] leading-8 text-[var(--ink-soft)]">{description}</p>
      </div>
    </div>
  );
}

export function NumberedEditorialList({ items }: { items: { number: string; title: string; description: ReactNode }[] }) {
  return (
    <div className="mt-8 space-y-6">
      {items.map((item, index) => (
        <NumberedItem key={item.number} item={item} delay={index * 80} />
      ))}
    </div>
  );
}

function NumberedItem({ item, delay }: { item: { number: string; title: string; description: ReactNode }; delay: number }) {
  const ref = useReveal<HTMLDivElement>(delay);
  return (
    <div ref={ref} className="reveal border-b pb-6 last:border-b-0" style={{ borderColor: "var(--line)" }}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[120px_minmax(0,1fr)] md:gap-8">
        <div className="font-display text-[clamp(36px,6vw,72px)] leading-none text-[var(--gold-deep)]">{item.number}</div>
        <div className="pt-1">
          <h3 className="text-[18px] font-bold leading-8 text-[var(--ink)]">{item.title}</h3>
          <p className="mt-2 text-[15px] leading-8 text-[var(--ink-soft)]">{item.description}</p>
        </div>
      </div>
    </div>
  );
}

export function CenteredChips({ items }: { items: ReactNode[] }) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {items.map((item, index) => (
        <CenteredChip key={index} delay={index * 70}>{item}</CenteredChip>
      ))}
    </div>
  );
}

function CenteredChip({ children, delay }: { children: ReactNode; delay: number }) {
  const ref = useReveal<HTMLDivElement>(delay);
  return (
    <div
      ref={ref}
      className="reveal rounded-full px-5 py-3 text-[14px] leading-7"
      style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "0 12px 32px rgba(43,38,32,0.05)" }}
    >
      {children}
    </div>
  );
}

export function BrandStrip({ items, caption, badge }: { items: string[]; caption: ReactNode; badge?: ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal rounded-[20px] px-6 py-8 text-center" style={{ background: "rgba(251,248,242,0.75)", border: "1px solid var(--line)" }}>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[clamp(22px,2.7vw,34px)] text-[var(--ink)]">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-4">
            <span className="font-latin">{item}</span>
            {index < items.length - 1 && <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-gradient" />}
          </div>
        ))}
      </div>
      <p className="mt-5 text-[14px] leading-8 text-[var(--ink-soft)]">{caption}</p>
      {badge && <div className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] tracking-[0.18em]" style={{ border: "1px solid rgba(201,169,110,0.4)", background: "rgba(201,169,110,0.08)", color: "var(--gold-deep)" }}>{badge}</div>}
    </div>
  );
}

export function SplitStickyLayout({ media, children }: { media: ReactNode; children: ReactNode }) {
  return (
    <section className="px-6 pb-[clamp(80px,12vw,160px)] pt-[clamp(56px,8vw,112px)]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[120px] lg:self-start">{media}</div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export function CountUpStat({ value = 90, suffix = "٪", label }: { value?: number; suffix?: string; label: ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    let start = 0;
    const duration = 1100;
    const step = (time: number) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      setDisplay(Math.round(value * progress));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <div ref={ref} className="reveal rounded-[24px] px-6 py-[clamp(34px,6vw,62px)] text-center" style={{ background: "rgba(251,248,242,0.7)", border: "1px solid var(--line)" }}>
      <div className="font-display text-[clamp(72px,16vw,160px)] leading-none text-[var(--gold-deep)]">
        {display}
        {suffix}
      </div>
      <p className="mt-4 text-[14px] tracking-[0.14em] text-[var(--ink-soft)]">{label}</p>
    </div>
  );
}