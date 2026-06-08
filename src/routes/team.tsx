import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ContainImage } from "@/components/ContainImage";
import { Layout } from "@/components/Layout";
import { LemonOrnament } from "@/components/GoldIcon";
import { useReveal } from "@/components/useReveal";
import drGhafouriAsset from "@/assets/dr_ghafouri.jpg.asset.json";
import drHaavasiAsset from "@/assets/dr_haavasi.jpg.asset.json";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "متخصصین کلینیک لمون | LEMON Specialists" },
      { name: "description", content: "آشنایی با متخصصین کلینیک لمون — دکتر شادی غفوری و دکتر مصطفی هواسی، با تخصص در جوانسازی، کانتورینگ صورت و زیبایی پیشرفته." },
      { property: "og:title", content: "متخصصین کلینیک لمون" },
      { property: "og:description", content: "تیم پزشکی لمون — تخصص، تجربه و هنر زیباشناسی." },
      { property: "og:url", content: "https://lemonclinicwebsite.lovable.app/team" },
    ],
    links: [{ rel: "canonical", href: "https://lemonclinicwebsite.lovable.app/team" }],
  }),
  component: TeamPage,
});

function LeafIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ filter: "drop-shadow(0 2px 3px rgba(168,136,76,0.35))", flexShrink: 0 }}>
      <defs>
        <linearGradient id={`leaf-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4E692" />
          <stop offset="45%" stopColor="#E5CC61" />
          <stop offset="100%" stopColor="#A8884C" />
        </linearGradient>
      </defs>
      <path
        d="M20 4c-7 0-13 4-15 11-.6 2.1.3 4 2 5 5-1 10-5 12-11 .4-1.5.7-3 1-5z"
        fill={`url(#leaf-${size})`}
        stroke="#8a6b35"
        strokeWidth="0.4"
      />
      <path d="M5 19C8 14 13 10 19 8" stroke="#8a6b35" strokeWidth="0.7" fill="none" opacity="0.6" />
    </svg>
  );
}

function Portrait({ src, alt }: { src: string; alt: string }) {
  return (
    <ContainImage
      src={src}
      alt={alt}
      ratio="3 / 4"
      rounded={24}
      loading="lazy"
      bordered={true}
    />
  );
}

function Credential({ children, delay }: { children: ReactNode; delay: number }) {
  const ref = useReveal<HTMLLIElement>(delay);
  return (
    <li ref={ref} className="reveal flex items-start gap-3 leading-[2.15]" style={{ fontSize: "clamp(14px,1.05vw,16px)", color: "var(--ink)" }}>
      <span className="mt-2"><LeafIcon size={22} /></span>
      <span>{children}</span>
    </li>
  );
}

function Latin({ children }: { children: ReactNode }) {
  return <span style={{ fontFamily: "'Univia Pro', 'Cormorant Garamond', serif", letterSpacing: "0.02em" }}>{children}</span>;
}

function Spread({
  name,
  portrait,
  credentials,
  mirrored,
}: {
  name: string;
  portrait: string;
  credentials: ReactNode[];
  mirrored?: boolean;
}) {
  const headRef = useReveal<HTMLDivElement>(120);
  return (
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-14">
      <div className={`md:col-span-5 ${mirrored ? "md:order-2" : "md:order-1"}`}>
        <Portrait src={portrait} alt={name} />
      </div>
      <div className={`md:col-span-7 ${mirrored ? "md:order-1" : "md:order-2"}`}>
        <div ref={headRef} className="reveal">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.32em] text-[var(--ink-soft)]">
            <LemonOrnament size={26} />
            <span className="h-px w-12 bg-gold-gradient" />
            <span>پروفایل تخصصی</span>
          </div>
          <h2 className="mt-5 font-display" style={{ fontWeight: 700, fontSize: "clamp(28px,3.8vw,48px)", lineHeight: 1.2 }}>
            {name}
          </h2>
          <div className="mt-4 h-px w-24" style={{ background: "linear-gradient(90deg, rgba(201,169,110,0.8), transparent)" }} />
        </div>
        <ul className="mt-8 space-y-4">
          {credentials.map((c, i) => (
            <Credential key={i} delay={200 + i * 80}>{c}</Credential>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TeamPage() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <Layout>
      <section className="px-6 pt-[clamp(120px,16vw,180px)]">
        <div ref={headRef} className="reveal mx-auto max-w-[1200px]">
          <div className="flex items-center gap-3 text-[12px] tracking-[0.32em] text-[var(--ink-soft)]">
            <LemonOrnament size={32} />
            <span className="h-px w-16 bg-gold-gradient" />
            <span>تیم لمون</span>
          </div>
          <h1 className="mt-6 font-display" style={{ fontWeight: 700, fontSize: "clamp(36px,5.4vw,68px)", lineHeight: 1.1 }}>
            متخصصین <span className="text-gold-gradient">کلینیک لمون</span>
          </h1>
          <p className="mt-6 max-w-[60ch] text-[15px] leading-9 text-[var(--ink-soft)]">
            دانش، تجربه و هنر زیباشناسی — در دستان متخصصینی که هر جزئیات را با وسواس می‌نگرند.
          </p>
        </div>
      </section>

      <section className="px-6 pb-[clamp(80px,12vw,160px)] pt-[clamp(56px,8vw,112px)]">
        <div className="mx-auto max-w-[1200px] space-y-[clamp(80px,10vw,140px)]">
          <Spread
            name="دکتر شادی غفوری"
            portrait={drGhafouriAsset.url}
            objectPosition="22% center"
            credentials={[
              <>فارغ‌التحصیل دندانپزشکی (<Latin>B.D.S</Latin>) از دانشگاه علوم پزشکی مهاراشترا هند.</>,
              <>دارای ۴ سال سابقه کار تخصصی در حوزه دنتال‌فیشیال.</>,
              <>گذراندن دوره‌های پیشرفته کانتورینگ صورت و فیلر در آکادمی‌های معتبر آمریکا در مالزی (<Latin>AAAM</Latin>) و امارات (<Latin>AAOPM</Latin>).</>,
              <>تسلط بر آناتومی چهره، تزریقات پیشرفته زیبایی و طراحی جوانسازی و هارمونی صورت.</>,
              <>تلفیق علم روز با هنر زیباشناسی بین‌المللی جهت خلق نتایج طبیعی و ایمن.</>,
            ]}
          />

          <div className="mx-auto h-px w-full max-w-[640px]" style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.55), transparent)" }} />

          <Spread
            mirrored
            name="دکتر مصطفی هواسی"
            portrait={drHaavasiAsset.url}
            objectPosition="80% center"
            credentials={[
              <>دانش‌آموخته دکتری حرفه‌ای پزشکی از دانشگاه علوم پزشکی ایلام.</>,
              <>بیش از ۱۲ سال سابقه مستمر در حوزه طب زیبایی و متدهای نوین جوانسازی.</>,
              <>۳ سال سابقه تدریس تخصصی و برگزاری ورکشاپ‌های مهارتی برای پزشکان.</>,
              <>تسلط ویژه بر کانتورینگ کامل صورت (<Latin>Full-Face</Latin>) و تکنیک‌های پیشرفته لیفت و جوانسازی با نخ.</>,
              <>تلفیق دقیق آناتومی ایمن و هنر زیباشناسی با هدف خلق نتایج طبیعی و پایدار.</>,
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}