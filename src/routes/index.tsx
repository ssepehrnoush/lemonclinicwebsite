import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Framed } from "@/components/Framed";
import { ScrollCue } from "@/components/ScrollCue";
import { LemonOrnament, IconPin, IconPhone, IconWhatsApp, IconClock, IconCheck } from "@/components/GoldIcon";
import { useReveal } from "@/components/useReveal";
import landingAsset from "@/assets/reception.jpg.asset.json";
import mapAsset from "@/assets/clinic_map.jpg.asset.json";
import unitAsset from "@/assets/doctor_unit.png.asset.json";
import logoCutout from "@/assets/logo_cutout.png.asset.json";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "کلینیک پزشکی زیبایی لمون | LEMON Aesthetic Center" },
      { name: "description", content: "لمون، کلینیک پزشکی زیبایی در تهران. آرامش، هنر پزشکان متخصص و بالاترین استانداردهای مراقبتی." },
      { property: "og:title", content: "کلینیک پزشکی زیبایی لمون" },
      { property: "og:description", content: "تعریف دوباره‌ی زیبایی و اصالت." },
      { property: "og:image", content: landingAsset.url },
      { property: "og:url", content: "https://lemonclinicwebsite.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://lemonclinicwebsite.lovable.app/" },
      { rel: "preload", as: "image", href: landingAsset.url, fetchpriority: "high" } as any,
    ],
  }),
  component: Index,
});

function Index() {
  const welcomeRef = useReveal<HTMLDivElement>();
  const hygieneRef = useReveal<HTMLDivElement>();
  const [heroP, setHeroP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 1;
      // Slow fade: complete the crossfade over ~3 viewport heights of scrolling
      setHeroP(Math.min(1, Math.max(0, window.scrollY / (vh * 3))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const heroOpacity = Math.max(0, 1 - heroP * 1.05);
  const welcomeOpacity = Math.min(1, Math.max(0, heroP * 1.15 - 0.05));
  const heroScale = 1 + heroP * 0.08;
  const heroBlur = heroP * 6;
  return (
    <Layout>
      {/* 1 + 1b) HERO ↔ WELCOME crossfade scene */}
      <div className="relative" style={{ height: "500vh" }}>
        {/* HERO (sticky, fades out) */}
        <section
          className="sticky top-0 h-screen min-h-[640px] w-full overflow-hidden"
          style={{ opacity: heroOpacity, zIndex: 1, willChange: "opacity" }}
          aria-hidden={heroOpacity < 0.05}
        >
          {/* Ken Burns image with scroll-driven zoom + blur */}
          <div
            className="absolute inset-0 h-full w-full"
            style={{
              transform: `scale(${heroScale})`,
              filter: `blur(${heroBlur}px)`,
              transformOrigin: "50% 55%",
              transition: "transform 120ms linear, filter 120ms linear",
              willChange: "transform, filter",
            }}
          >
            <img
              src={landingAsset.url}
              alt="پذیرش کلینیک زیبایی لمون"
              className="absolute inset-0 h-full w-full object-cover hero-kenburns"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          {/* Soft gold glow overlay (pendant lights breathing) */}
          <div
            className="pointer-events-none absolute inset-0 hero-glow"
            style={{
              background:
                "radial-gradient(60% 40% at 50% 18%, rgba(244,210,120,0.28), transparent 70%)",
              mixBlendMode: "screen",
            }}
          />
          {/* Subtle gold shimmer sweep */}
          <div className="pointer-events-none absolute inset-0 hero-shimmer" />
          {/* Vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 50%, transparent 55%, rgba(43,38,32,0.35) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-[38%]" style={{ background: "linear-gradient(to top, rgba(43,38,32,0.55), rgba(43,38,32,0.28) 55%, transparent)" }} />
          <div dir="rtl" className="absolute inset-x-0 bottom-0 z-10">
            <div className="mx-auto max-w-[1200px] px-6 pb-24 md:pb-28">
              <div className="ms-auto max-w-[560px] text-right">
                <h1 className="font-display text-[#FBF8F2]" style={{ fontWeight: 700, fontSize: "clamp(28px,4.4vw,46px)", lineHeight: 1.2, textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}>
                  تعریف دوباره‌ی زیبایی و اصالت
                </h1>
                <div className="mt-6">
                  <a href="#contact" className="group inline-flex items-center gap-3 rounded-full px-6 py-3 text-[14px] text-[#FBF8F2] backdrop-blur-sm transition-all duration-500"
                    style={{ border: "1px solid rgba(244,230,146,0.6)", background: "rgba(43,38,32,0.18)" }}>
                    <span>مشاهده خدمات VIP</span>
                    <span className="text-gold-gradient transition-transform duration-500 group-hover:-translate-x-1">←</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <ScrollCue />
        </section>

        {/* WELCOME (sticky, fades in over hero) */}
        <section
          className="sticky top-0 h-screen w-full flex items-center justify-center px-6"
          style={{ opacity: welcomeOpacity, zIndex: 2, marginTop: "-100vh", willChange: "opacity", pointerEvents: welcomeOpacity > 0.5 ? "auto" : "none" }}
          aria-hidden={welcomeOpacity < 0.05}
        >
          <div ref={welcomeRef} className="relative mx-auto max-w-[760px] text-center">
            <img
              src={logoCutout.url}
              alt=""
              aria-hidden="true"
              className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
              style={{ width: "min(560px, 86%)", opacity: 0.08, filter: "drop-shadow(0 0 28px rgba(201,168,76,0.22))" }}
            />
            <div className="relative">
              <div className="flex justify-center"><LemonOrnament size={56} /></div>
              <p className="mt-8 text-[var(--ink-soft)]" style={{ fontSize: "clamp(18px,1.6vw,22px)", lineHeight: 2 }}>
                به <span className="text-gold-gradient font-bold">لمون</span> خوش آمدید. جایی که آرامش، هنر پزشکان متخصص و بالاترین استانداردهای مراقبتی در هم می‌آمیزند.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 2) CONTACT & LOCATION */}
      <section id="contact" className="px-6">
        <div className="mx-auto max-w-[1200px] py-[clamp(60px,9vw,120px)]">
          <div className="grid items-center gap-14 md:grid-cols-12">
            <div className="md:col-span-7">
              <a
                href="https://maps.google.com?q=%DA%A9%D9%84%DB%8C%D9%86%DB%8C%DA%A9%20%D8%B2%DB%8C%D8%A8%D8%A7%DB%8C%DB%8C%20%D9%84%D9%85%D9%88%D9%86,%20District%2022,%20Tehran,%20Tehran%20Province,%20Iran&ftid=0x3f8def006236f4c9:0x1df9f00288829bf2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="مشاهده موقعیت کلینیک لمون روی گوگل مپ"
                className="block transition-transform duration-500 hover:scale-[1.01]"
              >
                <Framed src={mapAsset.url} alt="موقعیت کلینیک لمون روی نقشه — کلیک کنید" ratio="1 / 1" />
              </a>
            </div>
            <div className="md:col-span-5">
              <div className="mb-4 inline-flex items-center gap-3 text-[12px] tracking-[0.32em] text-[var(--ink-soft)]">
                <span className="h-px w-10 bg-gold-gradient" /> ارتباط با لمون
              </div>
              <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(34px,4vw,52px)", lineHeight: 1.15 }}>
                در قلب تهران،<br /><span className="text-gold-gradient">منتظر شما هستیم</span>
              </h2>
              <ul className="mt-10 space-y-6 text-[15px] leading-8">
                <li className="flex items-start gap-4"><span className="mt-1 shrink-0"><IconPin size={30} /></span>
                  <div><div className="text-[12px] tracking-[0.25em] text-[var(--ink-soft)] mb-1">آدرس کلینیک</div>تهران، اتوبان خرازی، بلوار اردستانی، مجتمع تجاری پارسه، طبقه ۸</div>
                </li>
                <li className="flex items-start gap-4"><span className="mt-1 shrink-0"><IconPhone size={30} /></span>
                  <div><div className="text-[12px] tracking-[0.25em] text-[var(--ink-soft)] mb-1">تلفن تماس</div><a href="tel:02147009161" className="font-latin tracking-wide hover:text-[var(--gold-deep)]">02147009161</a></div>
                </li>
                <li className="flex items-start gap-4"><span className="mt-1 shrink-0"><IconWhatsApp size={30} /></span>
                  <div><div className="text-[12px] tracking-[0.25em] text-[var(--ink-soft)] mb-1">واتساپ</div><a href="https://wa.me/989004709061" className="font-latin tracking-wide hover:text-[var(--gold-deep)]">09004709061</a></div>
                </li>
                <li className="flex items-start gap-4"><span className="mt-1 shrink-0"><IconClock size={30} /></span>
                  <div><div className="text-[12px] tracking-[0.25em] text-[var(--ink-soft)] mb-1">ساعات حضور</div>شنبه تا پنجشنبه — ۱۰ صبح تا ۱۹ عصر</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3) HYGIENE TRUST BAND */}
      <section className="px-6">
        <div ref={hygieneRef} className="reveal mx-auto max-w-[1200px]">
          <div className="relative rounded-[28px] px-6 py-[clamp(60px,9vw,110px)] md:px-14"
            style={{ background: "var(--surface)", borderTop: "1px solid rgba(139,175,154,0.35)", borderBottom: "1px solid rgba(139,175,154,0.35)", boxShadow: "0 20px 60px rgba(43,38,32,0.06)" }}>
            <div className="grid items-center gap-14 md:grid-cols-12">
              <div className="md:col-span-6">
                <Framed src={unitAsset.url} alt="یونیت پزشکی استریل کلینیک لمون" ratio="16 / 10" />
              </div>
              <div className="md:col-span-6">
                <div className="mb-4 inline-flex items-center gap-3 text-[12px] tracking-[0.32em]" style={{ color: "var(--sage-deep)" }}>
                  <span className="h-px w-10" style={{ background: "var(--sage)" }} /> امنیت و سلامت
                </div>
                <h3 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(28px,3.2vw,40px)", lineHeight: 1.2 }}>
                  امنیت و سلامت شما،<br /><span className="text-gold-gradient">اولویت ماست</span>
                </h3>
                <p className="mt-8 text-[15px] leading-8 text-[var(--ink-soft)] max-w-[52ch]">
                  در کلینیک لمون، امنیت و سلامت شما اولویت ماست. استفاده از روکش‌های استریل و یک‌بار مصرف برای یونیت‌های پزشکی و رعایت سخت‌گیرانه‌ترین پروتکل‌های بهداشتی، محیطی امن را برای آرامش شما فراهم کرده است.
                </p>
                <ul className="mt-8 space-y-3 text-[14px]">
                  {["روکش‌های استریل و یک‌بار مصرف","پروتکل‌های بهداشتی سخت‌گیرانه","یونیت‌های پزشکی استاندارد"].map((t) => (
                    <li key={t} className="flex items-center gap-3"><IconCheck size={24} /><span>{t}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
