import { useEffect, useMemo, useState } from "react";

const MSG_90: string[] = [
  "استاندارد سوپرمدل جهانی ✨","زیبایی در سطح تبلیغات لوکس","چهره‌ای کاملاً سینمایی 🎬",
  "استاندارد فشن شو بین‌المللی","جذابیت در بالاترین سطح ممکن","چهره‌ای مناسب کاور مجلات",
  "استاندارد طلایی زیبایی ✨","زیبایی در سطح Elite","قدرت جذب بصری بسیار بالا",
  "بسیار نزدیک به مدلینگ حرفه‌ای","چهره‌ای که دوربین عاشقشه 📸","استاندارد کمپین‌های جهانی",
];
const MSG_85: string[] = [
  "زیبایی بسیار چشمگیر 💎","کاملاً مناسب مدلینگ","جذابیت بالا و حرفه‌ای","چهره بسیار متعادل",
  "استاندارد زیبایی بالا","ظاهر بسیار مطلوب","تناسب اجزای عالی","زیبایی مدرن و تمیز",
];
const MSG_80: string[] = [
  "چهره جذاب و متعادل 🔥","ظاهر خوب و استاندارد","زیبایی طبیعی","چهره دلنشین",
  "فرم مناسب صورت","ظاهر مرتب و تمیز","چهره سالم و طبیعی","جذابیت ملایم",
];
const MSG_70: string[] = [
  "چهره نرمال و قابل قبول 🌿","نیاز به نور یا زاویه بهتر","ظاهر طبیعی و ساده",
  "فرم معمولی و واقعی","کیفیت تصویر تاثیرگذار بوده","چهره استاندارد روزمره",
  "عکس بهتر = امتیاز بهتر 📸",
];
const MSG_LOW: string[] = [
  "دوربین گفت: من استعفا می‌دم 😄","زاویه امروز همکاری نکرد","نورپردازی رفته مرخصی",
  "این عکس با واقعیت sync نشده","لنز امروز حال نداشته","این عکس به تفسیر نیاز داره",
];

function messageFor(score: number): string {
  const pool =
    score >= 90 ? MSG_90 :
    score >= 85 ? MSG_85 :
    score >= 80 ? MSG_80 :
    score >= 70 ? MSG_70 :
    MSG_LOW;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function computeBeautyScore(rawAvg: number): number {
  const bonus = 5 + Math.floor(Math.random() * 11);
  const v = Math.round(rawAvg + bonus);
  return Math.max(40, Math.min(100, v));
}

export function BeautyScorePopup({ score, onClose }: { score: number; onClose: () => void }) {
  const [display, setDisplay] = useState(0);
  const message = useMemo(() => messageFor(score), [score]);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * score));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-6 animate-ai-fade-in"
      style={{ background: "rgba(2, 12, 9, 0.78)", backdropFilter: "blur(8px)" }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl"
        style={{
          background: "radial-gradient(120% 120% at 30% 10%, #0E5740 0%, #052A20 70%, #021510 100%)",
          border: "1px solid color-mix(in oklab, #2DD4A8 30%, transparent)",
          animation: "ai-beauty-pop 320ms cubic-bezier(.2,.9,.3,1.15) both",
        }}
        dir="rtl"
      >
        <div className="text-[10px] tracking-[0.4em] font-latin" style={{ color: "#7FE0B8" }}>BEAUTY SCORE</div>
        <div
          className="mt-3 font-display tabular-nums leading-none"
          style={{
            fontSize: "96px",
            background: "linear-gradient(180deg,#FFFFFF, #C9F0DC 60%, #2DD4A8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 4px 18px rgba(45,212,168,0.35))",
          }}
        >
          {display}
          <span className="text-2xl font-sans align-top mr-1" style={{ color: "#7FE0B8" }}>/100</span>
        </div>
        <p className="mt-5 text-[14px] leading-7 font-bold text-white/95">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-7 w-full rounded-full py-3.5 text-sm font-extrabold transition active:scale-[0.98]"
          style={{
            background: "linear-gradient(180deg,#2DD4A8,#0E5740)",
            color: "#02120D",
            boxShadow: "0 10px 30px -10px rgba(45,212,168,0.55)",
          }}
        >
          مشاهده نتایج کامل
        </button>
      </div>
    </div>
  );
}