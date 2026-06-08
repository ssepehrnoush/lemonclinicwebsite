import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { LemonOrnament } from "@/components/GoldIcon";
import { GoldArrow } from "@/components/GoldArrow";
import { useReveal } from "@/components/useReveal";

import laserImg from "@/assets/laser_square.jpg.asset.json";
import facialImg from "@/assets/facial_square.jpg.asset.json";
import botoxImg from "@/assets/dr_ghafouri_square.jpg.asset.json";
import prpImg from "@/assets/prp_square.jpg.asset.json";
import hairImg from "@/assets/haircare_square.jpg.asset.json";
import rejuvImg from "@/assets/mesogel_square.jpg.asset.json";
import endoliftImg from "@/assets/endolift_square.jpg.asset.json";
import fillerImg from "@/assets/dr_haavasi_square.jpg.asset.json";

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
  image: string;
  alt: string;
};

const cards: Card[] = [
  { title: "لاین لیزر موهای زائد با کندلا", to: "/laser", span: "wide", featured: true, sub: "موهای زائد، رفع لک و جوانسازی با طلایی‌ترین استاندارد جهانی", delay: 0, image: laserImg.url, alt: "لیزر کندلا — کلینیک لمون" },
  { title: "لاین تخصصی فیشال درمانی", to: "/facial", sub: "اکلادو کره جنوبی — درخشش و شفافیت پوست", delay: 80, image: facialImg.url, alt: "فیشال تخصصی" },
  { title: "متد اختصاصی بوتاکس لمون", to: "/botox", sub: "طراحی نگاه و فرم ابرو با امضای لمون", delay: 160, image: botoxImg.url, alt: "بوتاکس لمون" },
  { title: "لاین مدیکال سلول‌های فعال", to: "/prp", sub: "بازسازی پوست و مو با پلاسمای غنی از پلاکت", delay: 240, image: prpImg.url, alt: "پی آر پی" },
  { title: "لاین مراقبتی مو و مزوتراپی", to: "/hair", sub: "ریویتاکر فرانسه — تقویت و جوانسازی فولیکول‌ها", delay: 320, image: hairImg.url, alt: "مراقبت مو" },
  { title: "جوانسازی با پیشرفته‌ترین برندها", to: "/rejuvenation", span: "wide", featured: true, sub: "مزوژل‌ها و پروتکل‌های اختصاصی برند لمون", delay: 400, image: rejuvImg.url, alt: "جوانسازی پیشرفته" },
  { title: "جوانسازی و لیفت با لیزر اندو", to: "/endolift", sub: "لیفت عمقی و کلاژن‌سازی بدون جراحی", delay: 480, image: endoliftImg.url, alt: "اندولیفت" },
  { title: "تزریق انواع فیلر و ژل", to: "/services", sub: "لب، صورت، کانتورینگ و زیر چشم", delay: 560, image: fillerImg.url, alt: "فیلر و ژل" },
];

function ServicesPage() {
  const headerRef = useReveal<HTMLDivElement>();
  return (
    <Layout>
      <section className="px-6 pt-[clamp(120px,16vw,180px)]">
        <div ref={headerRef} className="reveal mx-auto max-w-[1200px]">
          <div className="flex items-center gap-3 text-[12px] tracking-[0.32em] text-[var(--ink-soft)]">
            <LemonOrnament size={32} />
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
      className={`reveal group relative block overflow-hidden rounded-[20px] ${span}`}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
        minHeight: card.featured ? 380 : 340,
        transition: "transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 30px 80px rgba(212,181,116,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.45)";
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)" }}
      />
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: card.featured ? "16 / 9" : "4 / 3" }}
      >
        <img
          src={card.image}
          alt={card.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          style={{
            borderRadius: 18,
            WebkitMaskImage:
              "radial-gradient(120% 120% at 50% 50%, #000 55%, rgba(0,0,0,0.85) 70%, rgba(0,0,0,0.4) 86%, rgba(0,0,0,0) 100%)",
            maskImage:
              "radial-gradient(120% 120% at 50% 50%, #000 55%, rgba(0,0,0,0.85) 70%, rgba(0,0,0,0.4) 86%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 50%, transparent 60%, var(--surface) 100%)",
          }}
        />
      </div>
      <div style={{ padding: card.featured ? "clamp(24px,2.8vw,36px)" : "clamp(20px,2.2vw,28px)" }}>
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
          <p className="mt-3 text-[14px] leading-7 text-[var(--ink-soft)] max-w-[44ch]">{card.sub}</p>
        )}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-[12px] tracking-[0.28em] text-[var(--ink-soft)]">مشاهده جزئیات</span>
          <span className="transition-transform duration-500 group-hover:-translate-x-2">
            <GoldArrow size={22} />
          </span>
        </div>
      </div>
    </a>
  );
}