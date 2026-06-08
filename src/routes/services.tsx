import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { LemonOrnament } from "@/components/GoldIcon";
import { GoldArrow } from "@/components/GoldArrow";
import { useReveal } from "@/components/useReveal";
import endoliftAsset from "@/assets/endolift.jpg.asset.json";
import endoliftMachineAsset from "@/assets/endolift_machine.jpg.asset.json";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "منوی خدمات VIP کلینیک لمون | LEMON Services" },
      { name: "description", content: "مجموعه خدمات تخصصی جوانسازی، زیبایی و مراقبت پوست و مو با برترین تکنولوژی‌های روز دنیا در کلینیک لمون." },
      { property: "og:title", content: "منوی خدمات VIP کلینیک لمون" },
      { property: "og:description", content: "خدمات تخصصی پوست، مو و جوانسازی." },
      { property: "og:url", content: "https://lemonclinicwebsite.lovable.app/services" },
    ],
    links: [{ rel: "canonical", href: "https://lemonclinicwebsite.lovable.app/services" }],
  }),
  component: ServicesPage,
});

type Card = {
  title: string;
  to?: string;
  sub?: string;
  span?: "wide" | "tall" | "normal";
  featured?: boolean;
  delay: number;
};

const cards: Card[] = [
  { title: "لاین تخصصی لیزر با کندلا شاتی آمریکا", to: "/laser", span: "wide", featured: true, sub: "موهای زائد، رفع لک و جوانسازی با طلایی‌ترین استاندارد جهانی", delay: 0 },
  { title: "لاین تخصصی فیشال و درمال", to: "/facial", sub: "اکلادو کره جنوبی — درخشش و شفافیت پوست", delay: 80 },
  { title: "زیبایی چشم و ابرو با متدهای انحصاری بوتاکس لمون", to: "/botox", sub: "طراحی نگاه و فرم ابرو با امضای لمون", delay: 160 },
  { title: "لاین مدیکال سلول‌های فعال (PRP)", to: "/prp", sub: "بازسازی پوست و مو با پلاسمای غنی از پلاکت", delay: 240 },
  { title: "لاین مراقبتی مو و مزوتراپی", to: "/hair", sub: "ریویتاکر فرانسه — تقویت و جوانسازی فولیکول‌ها", delay: 320 },
  { title: "جوانسازی پیشرفته با برترین برندهای جهانی", to: "/rejuvenation", span: "wide", featured: true, sub: "مزوژل‌ها و پروتکل‌های اختصاصی برند لمون", delay: 400 },
];

const infoCards = [
  { title: "تزریق انواع فیلر و ژل", sub: "لب، صورت، کانتورینگ و زیر چشم", delay: 560 },
  { title: "سابسیژن", sub: "درمان تخصصی اسکار و فرورفتگی‌های جای جوش", delay: 640 },
  { title: "میکروبلیدینگ و فیبروز", sub: "طراحی طبیعی و ماندگار ابرو", delay: 720 },
];

function ServicesPage() {
  const headerRef = useReveal<HTMLDivElement>();
  return (
    <Layout>
      <section className="px-6 pt-[clamp(120px,16vw,180px)]">
        <div ref={headerRef} className="reveal mx-auto max-w-[1200px]">
          <div className="flex items-center gap-3 text-[12px] tracking-[0.32em] text-[var(--ink-soft)]">
            <LemonOrnament size={22} />
            <span className="h-px w-16 bg-gold-gradient" />
            <span>منوی خدمات</span>
          </div>
          <h1 className="mt-6 font-display" style={{ fontWeight: 700, fontSize: "clamp(36px,5.4vw,68px)", lineHeight: 1.1 }}>
            منوی <span className="text-gold-gradient">خدمات VIP</span><br /> کلینیک لمون
          </h1>
          <p className="mt-8 max-w-[70ch] text-[15px] leading-9 text-[var(--ink-soft)]">
            ما در لمون مجموعه‌ای از پیشرفته‌ترین خدمات جوانسازی، زیبایی و مراقبت تخصصی پوست و مو را با استفاده از برترین تکنولوژی‌های روز دنیا به شما ارائه می‌دهیم. برای مشاهده جزئیات و مراقبت‌های هر خدمت، روی آن کلیک کنید.
          </p>
        </div>
      </section>

      {/* Bento grid */}
      <section className="px-6 pb-[clamp(80px,12vw,160px)] pt-[clamp(48px,7vw,96px)]">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            {cards.map((c) => (
              <LinkedCard key={c.title} card={c} />
            ))}

            {/* Special media card — Endolift (links to its own page) */}
            <EndoliftCard />

            {infoCards.map((c) => (
              <InfoCard key={c.title} title={c.title} sub={c.sub} delay={c.delay} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function LinkedCard({ card }: { card: Card }) {
  const ref = useReveal<HTMLAnchorElement>(card.delay);
  const span = card.span === "wide" ? "md:col-span-8" : "md:col-span-4";
  return (
    <a
      href={card.to!}
      ref={ref}
      className={`reveal group relative flex flex-col justify-between overflow-hidden rounded-[20px] ${span}`}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        boxShadow: "0 20px 60px rgba(43,38,32,0.06)",
        padding: card.featured ? "clamp(28px,3.2vw,44px)" : "clamp(24px,2.4vw,32px)",
        minHeight: card.featured ? 240 : 200,
        transition: "transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 30px 80px rgba(43,38,32,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(43,38,32,0.06)";
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)" }}
      />
      <div>
        <h3
          className="font-display"
          style={{
            fontWeight: 700,
            lineHeight: 1.3,
            fontSize: card.featured ? "clamp(22px,2.4vw,30px)" : "clamp(18px,1.6vw,22px)",
          }}
        >
          {card.title}
        </h3>
        {card.sub && (
          <p className="mt-4 text-[14px] leading-7 text-[var(--ink-soft)] max-w-[44ch]">{card.sub}</p>
        )}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span className="text-[12px] tracking-[0.28em] text-[var(--ink-soft)]">مشاهده جزئیات</span>
        <span className="transition-transform duration-500 group-hover:-translate-x-2">
          <GoldArrow size={22} />
        </span>
      </div>
    </a>
  );
}

function EndoliftCard() {
  const ref = useReveal<HTMLAnchorElement>(480);
  return (
    <a
      href="/endolift"
      ref={ref}
      className="reveal group relative block overflow-hidden rounded-[20px] md:col-span-6"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        boxShadow: "0 20px 60px rgba(43,38,32,0.06)",
        minHeight: 360,
      }}
    >
      <div className="relative h-[240px] w-full overflow-hidden">
        <img
          src={endoliftAsset.url}
          alt="اندولیفت — جوانسازی صورت در لمون"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 group-hover:opacity-0"
        />
        <img
          src={endoliftMachineAsset.url}
          alt="دستگاه یوفوتون ایتالیا"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(43,38,32,0.18), transparent 55%)" }} />
        <span
          className="absolute bottom-3 right-3 rounded-full px-3 py-1 text-[11px] tracking-[0.18em] text-[#FBF8F2] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "rgba(43,38,32,0.55)", backdropFilter: "blur(6px)", border: "1px solid rgba(244,230,146,0.4)" }}
        >
          دستگاه یوفوتون ایتالیا
        </span>
      </div>
      <div className="p-[clamp(24px,2.4vw,32px)]">
        <div className="mb-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] text-[var(--ink-soft)]">
            <span className="h-px w-8 bg-gold-gradient" /> ویژه
          </div>
          <span className="transition-transform duration-500 group-hover:-translate-x-2">
            <GoldArrow size={22} />
          </span>
        </div>
        <h3 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(22px,2.4vw,30px)", lineHeight: 1.25 }}>
          اندولیفت
        </h3>
        <p className="mt-3 text-[14px] leading-7 text-[var(--ink-soft)]">
          لیفت عمقی، جوانسازی و کلاژن‌سازی بافت صورت بدون جراحی
        </p>
      </div>
    </a>
  );
}

function InfoCard({ title, sub, delay }: { title: string; sub: string; delay: number }) {
  const ref = useReveal<HTMLDivElement>(delay);
  return (
    <div
      ref={ref}
      className="reveal relative flex flex-col justify-between rounded-[20px] md:col-span-4"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        boxShadow: "0 20px 60px rgba(43,38,32,0.06)",
        padding: "clamp(24px,2.4vw,32px)",
        minHeight: 200,
      }}
    >
      <div>
        <h3 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(18px,1.6vw,22px)", lineHeight: 1.3 }}>
          {title}
        </h3>
        <p className="mt-4 text-[14px] leading-7 text-[var(--ink-soft)] max-w-[44ch]">{sub}</p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-[11px] tracking-[0.28em] text-[var(--ink-soft)]">
        <LemonOrnament size={14} />
        <span>به‌زودی جزئیات کامل</span>
      </div>
    </div>
  );
}