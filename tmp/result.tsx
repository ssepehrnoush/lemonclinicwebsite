import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeftLong } from "@/components/LineArt";
import iconFace from "@/assets/icon-face.png";
import iconSparkle from "@/assets/icon-sparkle.png";
import iconOrnament from "@/assets/icon-ornament.png";
import iconTreatment from "@/assets/icon-treatment.png";
import logoCutout from "@/assets/logo-cutout.png.asset.json";
import dollLipAsset from "@/assets/product-doll-lip.png.asset.json";
import naturalLipAsset from "@/assets/product-natural-lip.png.asset.json";
import fullFaceAsset from "@/assets/product-full-face.png.asset.json";
import underEyeAsset from "@/assets/product-under-eye.png.asset.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { getCapture, getResult, clearAineh } from "@/lib/aineh-store";
import { simulateTreatment, type AnalysisResult, type TreatmentKey } from "@/lib/analyze.functions";
import { getPromptForSelection } from "@/data/treatment-prompts.js";
import { BeautyScorePopup, computeBeautyScore } from "@/components/BeautyScorePopup";

export const Route = createFileRoute("/result")({
  head: () => ({ meta: [{ title: "آینه — نتیجه تحلیل" }] }),
  validateSearch: (s: Record<string, unknown>) => ({
    preview: s.preview === "1" || s.preview === 1 || s.preview === true ? true : false,
  }),
  component: ResultPage,
});

// Treatment carousel: ordered list with placeholder images.
const TREATMENTS: { key: TreatmentKey; name: string; img: string }[] = [
  { key: "doll-lip-filler",    name: "فیلر لب عروسکی", img: dollLipAsset.url },
  { key: "natural-lip-filler", name: "فیلر لب نچرال",  img: naturalLipAsset.url },
  { key: "full-face-contour",  name: "کانتور فول فیس", img: fullFaceAsset.url },
  { key: "under-eye-filler",   name: "فیلر زیر چشم",   img: underEyeAsset.url },
];

// Single-letter codes used by src/data/treatment-prompts.js.
const TREATMENT_CODES: Record<TreatmentKey, string> = {
  "doll-lip-filler":    "A",
  "natural-lip-filler": "B",
  "under-eye-filler":   "C",
  "full-face-contour":  "D",
};

function ResultPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [img, setImg] = useState<string | null>(null);
  const [selected, setSelected] = useState<TreatmentKey[]>([]);
  const [simOpen, setSimOpen] = useState<null | { keys: TreatmentKey[]; names: string[] }>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [fillerOpen, setFillerOpen] = useState(true);
  const [beautyScore, setBeautyScore] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (search.preview) {
      setData(buildMockResult());
      setImg(MOCK_FACE_DATA_URL);
      return;
    }
    const r = getResult();
    const cap = getCapture();
    if (!r || !cap) { navigate({ to: "/" }); return; }
    setData(r);
    setImg(cap.dataUrl);
    const STORE_KEY = "aineh:beautyScore";
    const seenKey = "aineh:beautyScoreSeen";
    let s = Number(sessionStorage.getItem(STORE_KEY));
    if (!s) {
      const avg = r.metrics.length
        ? r.metrics.reduce((a, m) => a + (m.score || 0), 0) / r.metrics.length
        : 75;
      s = computeBeautyScore(avg);
      sessionStorage.setItem(STORE_KEY, String(s));
    }
    setBeautyScore(s);
    if (!sessionStorage.getItem(seenKey)) {
      setShowPopup(true);
      sessionStorage.setItem(seenKey, "1");
    }
  }, [navigate, search.preview]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  function toggle(key: TreatmentKey) {
    setSelected((prev) => {
      const has = prev.includes(key);
      if (has) return prev.filter((k) => k !== key);
      let next = [...prev, key];
      // Mutex: doll lip vs natural lip
      if (key === "doll-lip-filler" && next.includes("natural-lip-filler")) {
        next = next.filter((k) => k !== "natural-lip-filler");
        showToast("فیلر لب عروسکی و نچرال را نمی‌توان همزمان انتخاب کرد.");
      } else if (key === "natural-lip-filler" && next.includes("doll-lip-filler")) {
        next = next.filter((k) => k !== "doll-lip-filler");
        showToast("فیلر لب عروسکی و نچرال را نمی‌توان همزمان انتخاب کرد.");
      }
      return next;
    });
  }

  if (!data) return null;

  return (
    <main className="relative min-h-screen bg-page text-foreground overflow-x-hidden">
      <div className="mx-auto w-full max-w-md px-5 pt-6 pb-32">
        <header className="flex items-center justify-between animate-fade-up">
          <Link to="/" className="h-10 w-10 rounded-full grid place-items-center hairline text-foreground/70">
            <ArrowLeftLong size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <img src={iconFace} alt="" className="h-5 w-5 object-contain" />
            <h1 className="text-base font-bold">نتیجه تحلیل</h1>
          </div>
          <span className="w-10" />
        </header>

        {/* Top split: photo right, carousel left */}
        <section className="mt-6">
          <Collapsible open={fillerOpen} onOpenChange={setFillerOpen} title="تزریق فیلر">
            <div className="flex gap-3 items-stretch" dir="rtl">
              {/* RIGHT — user photo, vertical portrait frame */}
              <div className="shrink-0 animate-slide-in-right" style={{ animationDuration: "400ms" }}>
                <div className="photo-frame">
                  <div className="photo-inner">
                    {img && <img src={img} alt="چهره شما" className="h-full w-full object-cover" />}
                  </div>
                  <span className="photon" aria-hidden />
                </div>
                <div className="mt-2 text-center text-[9px] tracking-[0.3em] font-latin" style={{ color: "var(--gold-deep)" }}>
                  YOU
                </div>
                {/* Selected product thumbnails — fly here from the carousel */}
                <div className="mt-3 grid grid-cols-2 gap-2 justify-items-end" data-thumbs>
                  {selected.map((k) => {
                    const t = TREATMENTS.find((x) => x.key === k);
                    if (!t) return null;
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => toggle(k)}
                        data-product-slot={k}
                        className="product-thumb group"
                        aria-label={`حذف ${t.name}`}
                      >
                        <img src={t.img} alt={t.name} draggable={false} />
                        <span className="product-thumb-x" aria-hidden>×</span>
                      </button>
                    );
                  })}
                  {/* Landing-slot sentinel for the next selection */}
                  <span
                    data-product-target
                    aria-hidden
                    className="product-thumb-slot"
                  />
                </div>
              </div>
              {/* LEFT — swipeable carousel */}
              <TreatmentCarousel selected={selected} onToggle={toggle} />
            </div>
          </Collapsible>
        </section>

        {/* Headline / Summary */}
        <section className="mt-7 text-center">
          <img src={iconOrnament} alt="" className="mx-auto h-4 w-40 object-contain opacity-90" />
          <div className="mt-3 text-[10px] tracking-[0.4em] font-latin" style={{ color: "var(--gold-deep)" }}>
            سن ظاهری
          </div>
          <div className="text-6xl font-display tabular-nums leading-none mt-2">
            {data.perceivedAge}
            <span className="text-sm font-sans font-medium mr-2 align-top" style={{ color: "var(--petrol-soft)" }}>سال</span>
          </div>
          <p className="mt-4 text-sm font-bold">{data.headline}</p>
          <p className="mt-2 text-[12px] leading-6 text-balance" style={{ color: "var(--petrol-soft)" }}>
            {data.summary}
          </p>
        </section>

        {/* Metrics */}
        <section className="mt-7 space-y-3">
          {data.metrics.map((m, i) => (
            <MetricCard key={i} {...m} delay={120 + i * 70} />
          ))}
        </section>

        {/* Recommendations */}
        <section className="mt-7 rounded-3xl bg-card p-5 hairline">
          <div className="flex items-center gap-2 mb-3">
            <img src={iconSparkle} alt="" className="h-4 w-4 object-contain" />
            <h2 className="text-sm font-bold tracking-wide">پیشنهادهای آینه</h2>
          </div>
          <ul className="space-y-2.5 text-[13px] leading-6">
            {data.recommendations.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-gold-deep mt-1 text-[10px]">◆</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Treatment descriptions — informational only */}
        {data.treatments && data.treatments.length > 0 && (
          <section className="mt-7 space-y-3">
            <div className="flex items-center gap-2 px-1">
              <img src={iconTreatment} alt="" className="h-5 w-5 object-contain" />
              <h2 className="text-sm font-bold tracking-wide">توضیح درمان‌ها</h2>
            </div>
            {data.treatments.map((t, i) => (
              <div key={i} className="rounded-2xl bg-card hairline p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-[9px] tracking-[0.3em] text-gold-deep font-latin">{t.area}</div>
                </div>
                {t.reason && (
                  <p className="mt-2 text-[12px] leading-6" style={{ color: "var(--petrol-soft)" }}>
                    {t.reason}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        <div className="mt-7">
          <button
            type="button"
            onClick={() => { clearAineh(); navigate({ to: "/" }); }}
            className="w-full rounded-full py-3.5 text-sm font-semibold text-foreground bg-card hairline transition active:scale-[0.99]"
          >
            از نو
          </button>
        </div>

        <p className="mt-6 text-[11px] leading-5 text-center" style={{ color: "var(--petrol-soft)" }}>
          این تحلیل پیشنهادی است و جایگزین معاینه پزشک نیست.
        </p>

        <p
          className="mx-auto mt-10 text-center text-[11px] leading-6 max-w-[28ch]"
          dir="rtl"
          style={{ color: "var(--petrol-soft)", opacity: 0.6 }}
        >
          اگر در عکس تغییری نکردید یا جذابتر نشدید، این پروسیجر به شما توصیه نمی‌شود.
        </p>
      </div>

      {/* Page watermark — bottom center, not on photo */}
      <div className="pointer-events-none fixed bottom-2 left-1/2 -translate-x-1/2 z-10 opacity-[0.35]">
        <img src={logoCutout.url} alt="" className="h-16 w-16 object-contain" />
      </div>

      {/* Sticky preview CTA */}
      {selected.length > 0 && img && (
        <div className="fixed bottom-0 inset-x-0 z-30 px-5 pb-5 pt-3 pointer-events-none">
          <div className="mx-auto max-w-md pointer-events-auto">
            <button
              type="button"
              onClick={() => {
                const names = selected.map((k) => TREATMENTS.find((t) => t.key === k)?.name ?? "");
                setSimOpen({ keys: selected, names });
              }}
              className="w-full rounded-full py-3.5 text-sm font-extrabold glass-dark transition active:scale-[0.99] shadow-2xl"
            >
              پیش‌نمایش انتخاب‌ها ({selected.length})
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40 max-w-[90%] rounded-full px-4 py-2 text-xs font-semibold bg-card hairline shadow-xl animate-fade-up">
          {toast}
        </div>
      )}

      {simOpen && img && (
        <SequentialSimulationModal
          beforeImg={img}
          treatmentKeys={simOpen.keys}
          treatmentNames={simOpen.names}
          onClose={() => setSimOpen(null)}
        />
      )}

      {showPopup && beautyScore != null && (
        <BeautyScorePopup score={beautyScore} onClose={() => setShowPopup(false)} />
      )}
    </main>
  );
}

function Collapsible({
  title,
  open,
  onOpenChange,
  children,
}: {
  title: string;
  open: boolean;
  onOpenChange: (b: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-card hairline p-4">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        className="w-full flex items-center justify-between text-right"
      >
        <h2 className="text-sm font-bold tracking-wide">{title}</h2>
        <span
          className="text-foreground/60 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▾
        </span>
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function TreatmentCarousel({
  selected,
  onToggle,
}: {
  selected: TreatmentKey[];
  onToggle: (k: TreatmentKey) => void;
}) {
  const [idx, setIdx] = useState(0);
  const active = TREATMENTS[idx];
  const isSel = active ? selected.includes(active.key) : false;

  function handleToggle() {
    if (!active) return;
    if (isSel) { onToggle(active.key); return; }
    const sourceEl = document.querySelector<HTMLImageElement>(
      ".treatment-carousel .swiper-slide-active .tc-image",
    );
    const targetEl = document.querySelector<HTMLElement>("[data-product-target]");
    if (sourceEl && targetEl) {
      flyProductGhost({
        src: active.img,
        from: sourceEl.getBoundingClientRect(),
        to: targetEl.getBoundingClientRect(),
      });
    }
    onToggle(active.key);
  }

  return (
    <div className="flex-1 min-w-0 treatment-carousel" dir="ltr">
      <Swiper
        modules={[EffectCoverflow, Pagination]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={1.8}
        loop
        onSlideChange={(s) => {
          setIdx(s.realIndex);
          // Trigger photon burst on the user photo frame
          const frame = document.querySelector(".photo-frame");
          if (frame) {
            frame.classList.remove("photon-burst");
            // Force reflow to restart the animation
            void (frame as HTMLElement).offsetWidth;
            frame.classList.add("photon-burst");
          }
        }}
        coverflowEffect={{
          rotate: 5,
          stretch: 18,
          depth: 140,
          modifier: 1.1,
          slideShadows: false,
        }}
      >
        {TREATMENTS.map((t) => (
          <SwiperSlide key={t.key}>
            <div className="tc-slide">
              <ProductImage src={t.img} alt={t.name} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {active && (
        <button
          type="button"
          onClick={handleToggle}
          className="mt-3 w-full rounded-full py-2 text-[12px] font-bold transition active:scale-[0.98]"
          style={{
            backgroundColor: isSel
              ? "color-mix(in oklab, var(--gold-deep) 80%, var(--card))"
              : "var(--card)",
            color: isSel ? "var(--ink)" : "var(--foreground)",
            border: isSel
              ? "1px solid var(--gold-deep)"
              : "1px solid color-mix(in oklab, var(--foreground) 12%, transparent)",
          }}
        >
          {active.name}
        </button>
      )}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {TREATMENTS.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === idx ? 14 : 6,
              backgroundColor: i === idx ? "var(--gold-deep)" : "var(--divider)",
              display: "inline-block",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="tc-image-wrap">
      <img src={src} alt={alt} className="tc-image" draggable={false} />
    </div>
  );
}

// Fly a translucent "ghost" copy of the product image from `from` to `to`,
// then fade out. Cleans itself up via WAAPI onfinish.
function flyProductGhost({ src, from, to }: { src: string; from: DOMRect; to: DOMRect }) {
  const ghost = document.createElement("img");
  ghost.src = src;
  ghost.className = "product-ghost";
  ghost.style.left = `${from.left}px`;
  ghost.style.top = `${from.top}px`;
  ghost.style.width = `${from.width}px`;
  ghost.style.height = `${from.height}px`;
  document.body.appendChild(ghost);

  const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
  const dy = (to.top + to.height / 2) - (from.top + from.height / 2);
  const scale = Math.min(to.width / from.width, to.height / from.height) || 0.25;

  const anim = ghost.animate(
    [
      { transform: "translate(0,0) scale(1) rotate(0deg)",                    opacity: 0.95, filter: "drop-shadow(0 8px 18px rgba(255,255,255,0.35))" },
      { transform: `translate(${dx * 0.55}px, ${dy * 0.35}px) scale(${(1 + scale) / 2}) rotate(-8deg)`, opacity: 0.7,  filter: "drop-shadow(0 0 22px rgba(255,255,255,0.55)) blur(0.4px)", offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(${scale}) rotate(0deg)`, opacity: 0,   filter: "drop-shadow(0 0 8px rgba(255,255,255,0.25))" },
    ],
    { duration: 720, easing: "cubic-bezier(.45,.05,.2,1)" },
  );
  anim.onfinish = () => ghost.remove();
  anim.oncancel = () => ghost.remove();
}

function MetricCard({ label, score, note, delay }: { label: string; score: number; note: string; delay: number }) {
  const tone = score >= 75 ? "var(--success)" : score >= 50 ? "var(--gold-deep)" : "var(--warning)";
  return (
    <div className="rounded-2xl bg-card hairline p-4 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold">{label}</div>
        <div className="text-sm font-display tabular-nums" style={{ color: tone }}>{score}</div>
      </div>
      <div className="mt-2 h-1 rounded-full overflow-visible" style={{ backgroundColor: "var(--divider)" }}>
        <div className="metric-bar-fill h-full rounded-full transition-[width] duration-700" style={{ width: `${score}%`, background: "linear-gradient(90deg, var(--gold-soft), var(--gold-deep))" }} />
      </div>
      {note && <div className="mt-2 text-[11px] leading-5" style={{ color: "var(--petrol-soft)" }}>{note}</div>}
    </div>
  );
}

// =============================================================
// Mock data for UI/UX preview (face mode only)
// =============================================================
const MOCK_FACE_DATA_URL =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'>
      <defs>
        <linearGradient id='g' x1='0' x2='0' y1='0' y2='1'>
          <stop offset='0' stop-color='#3a4a55'/>
          <stop offset='1' stop-color='#1a2530'/>
        </linearGradient>
      </defs>
      <rect width='400' height='500' fill='url(#g)'/>
      <ellipse cx='200' cy='240' rx='110' ry='150' fill='#d9b89a'/>
      <ellipse cx='165' cy='220' rx='10' ry='6' fill='#2a2a2a'/>
      <ellipse cx='235' cy='220' rx='10' ry='6' fill='#2a2a2a'/>
      <path d='M170 295 Q200 315 230 295' stroke='#8a4a4a' stroke-width='6' fill='none'/>
    </svg>`,
  );

function buildMockResult(): AnalysisResult {
  return {
    perceivedAge: 28,
    headline: "اجزای صورت شما تناسب دلپذیری دارند",
    summary:
      "تقارن کلی صورت خوب است. با تنظیمات بسیار جزئی می‌توان هارمونی اجزا را به سطح بالاتری رساند.",
    metrics: [
      { label: "تقارن کلی", score: 82, note: "تقارن خوب." },
      { label: "تناسب چشم‌ها", score: 76, note: "زاویه و فاصله متعادل." },
      { label: "تناسب بینی", score: 80, note: "تناسب با صورت مناسب." },
      { label: "تناسب لب", score: 68, note: "حجم لب بالا کمی کم‌تر از پایین." },
      { label: "تناسب چانه و فک", score: 72, note: "زاویه فک ملایم." },
    ],
    recommendations: [
      "حجم‌دهی ملایم لب بالا می‌تواند تعادل بصری ایجاد کند.",
      "تقویت زاویه فک، صورت را تعریف‌شده‌تر می‌کند.",
      "روتین مراقبت پوست برای حفظ شادابی.",
    ],
    treatments: [
      { name: "فیلر لب عروسکی", area: "لب‌ها", intensity: "متوسط", reason: "ایجاد قوس قلبی و حجم بیشتر روی لب بالا." },
      { name: "فیلر لب نچرال", area: "لب‌ها", intensity: "ملایم", reason: "افزایش حجم طبیعی بدون تغییر شکل." },
      { name: "کانتور فول فیس", area: "فول فیس", intensity: "قابل توجه", reason: "تعریف زاویه فک، چونه و گونه به شکل هارمونیک." },
      { name: "فیلر زیر چشم", area: "زیر چشم", intensity: "ملایم", reason: "پر کردن گودی و رفع تیرگی." },
    ],
  };
}

// =============================================================
// Sequential simulation modal — applies each selected treatment in order
// =============================================================
function SequentialSimulationModal({
  beforeImg,
  treatmentKeys,
  treatmentNames,
  onClose,
}: {
  beforeImg: string;
  treatmentKeys: TreatmentKey[];
  treatmentNames: string[];
  onClose: () => void;
}) {
  const run = useServerFn(simulateTreatment);
  const [after, setAfter] = useState<string | null>(null);
  const [progress, setProgress] = useState({ step: 0, total: 1 });
  const [err, setErr] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [initialSide, setInitialSide] = useState<"before" | "after">("after");

  useEffect(() => {
    let cancelled = false;
    setAfter(null);
    setErr(null);
    setProgress({ step: 0, total: 1 });

    const codes = treatmentKeys.map((k) => TREATMENT_CODES[k]);
    const prompt = getPromptForSelection(codes);
    if (!prompt) {
      setErr("ترکیب انتخابی معتبر نیست");
      return;
    }

    (async () => {
      try {
        const r = await run({ data: { imageBase64: beforeImg, prompt } });
        if (!cancelled) {
          setAfter(r.imageBase64);
          setProgress({ step: 1, total: 1 });
        }
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : "خطا");
      }
    })();

    return () => { cancelled = true; };
  }, [beforeImg, treatmentKeys, run]);

  const loading = !err && progress.step < progress.total;
  const title = treatmentNames.join(" + ");

  if (fullscreen) {
    return (
      <FullscreenLoopViewer
        beforeImg={beforeImg}
        afterImg={after}
        loading={loading}
        err={err}
        title={title}
        initialSide={initialSide}
        onClose={() => setFullscreen(false)}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 animate-fade-up overflow-y-auto"
      style={{ backgroundColor: "color-mix(in oklab, var(--ink) 75%, transparent)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md mx-auto box-border rounded-3xl bg-card hairline p-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="min-w-0">
            <div className="text-[10px] tracking-[0.3em] font-latin" style={{ color: "var(--gold-deep)" }}>
              SIMULATION
            </div>
            <h3 className="text-sm font-bold mt-0.5 truncate">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-full hairline grid place-items-center text-foreground/70 shrink-0"
            aria-label="بستن"
          >
            ✕
          </button>
        </div>

        <div className="w-full grid grid-cols-2 gap-2.5">
          <figure className="min-w-0 space-y-2">
            <button
              type="button"
              onClick={() => { setInitialSide("before"); setFullscreen(true); }}
              className="block w-full aspect-[3/4] rounded-2xl overflow-hidden hairline bg-page transition active:scale-[0.98]"
            >
              <img src={beforeImg} alt="قبل" className="h-full w-full object-cover" />
            </button>
            <figcaption className="text-center text-[11px] tracking-[0.3em] font-latin" style={{ color: "var(--petrol-soft)" }}>
              BEFORE
            </figcaption>
          </figure>
          <figure className="min-w-0 space-y-2">
            <button
              type="button"
              onClick={() => { if (after) { setInitialSide("after"); setFullscreen(true); } }}
              disabled={!after}
              className="block w-full aspect-[3/4] rounded-2xl overflow-hidden hairline bg-page relative grid place-items-center transition active:scale-[0.98] disabled:cursor-default"
            >
              {after ? (
                <img src={after} alt="بعد" className="h-full w-full object-cover" />
              ) : err ? (
                <div className="p-3 text-center text-[11px] leading-5 text-foreground/80">{err}</div>
              ) : (
                <div className="flex flex-col items-center gap-2 p-3 text-center">
                  <div className="h-6 w-6 rounded-full border-2 border-foreground/20 border-t-foreground/80 animate-spin" />
                  <div className="text-[11px]" style={{ color: "var(--petrol-soft)" }}>
                    در حال شبیه‌سازی…
                  </div>
                </div>
              )}
            </button>
            <figcaption className="text-center text-[11px] tracking-[0.3em] font-latin" style={{ color: "var(--gold-deep)" }}>
              AFTER
            </figcaption>
          </figure>
        </div>

        {progress.total > 1 && (
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-latin tracking-[0.25em]" style={{ color: "var(--petrol-soft)" }}>
              <span>STEP {Math.min(progress.step + (loading ? 1 : 0), progress.total)} / {progress.total}</span>
              <span>{treatmentNames[Math.min(progress.step, progress.total - 1)]}</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "var(--divider)" }}>
              <div
                className="h-full transition-[width] duration-500"
                style={{
                  width: `${(progress.step / progress.total) * 100}%`,
                  background: "linear-gradient(90deg, var(--gold-soft), var(--gold-deep))",
                }}
              />
            </div>
          </div>
        )}

        <p className="mt-4 text-[11px] leading-5 text-center" style={{ color: "var(--petrol-soft)" }}>
          روی هر تصویر بزنید تا تمام‌صفحه شود — با سوایپ بین قبل و بعد بچرخانید.
        </p>
      </div>
    </div>
  );
}

// =============================================================
// Fullscreen before/after viewer with bidirectional swipe toggle
// and Instagram share via 1080x1080 composed canvas.
// =============================================================
function FullscreenLoopViewer({
  beforeImg,
  afterImg,
  loading,
  err,
  title,
  initialSide = "after",
  onClose,
}: {
  beforeImg: string;
  afterImg: string | null;
  loading: boolean;
  err: string | null;
  title: string;
  initialSide?: "before" | "after";
  onClose: () => void;
}) {
  const [showingAfter, setShowingAfter] = useState(initialSide === "after");
  const [sharing, setSharing] = useState(false);
  const [shareMsg, setShareMsg] = useState<string | null>(null);
  const startX = useRef<number | null>(null);

  function onPointerDown(e: React.PointerEvent) {
    startX.current = e.clientX;
  }
  function onPointerUp(e: React.PointerEvent) {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    // Bidirectional: swipe either way toggles
    if (Math.abs(dx) > 40) {
      if (!afterImg) return;
      setShowingAfter((v) => !v);
    }
  }

  const current = showingAfter ? (afterImg ?? beforeImg) : beforeImg;

  async function composeShareImage(): Promise<Blob | null> {
    if (!afterImg) return null;
    const SIZE = 1080;
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, SIZE, SIZE);

    const LOGO_H = 160;
    const FOOTER_H = 70;
    const imgY = LOGO_H;
    const imgH = SIZE - LOGO_H - FOOTER_H;
    const imgW = SIZE / 2;

    const load = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image();
        i.crossOrigin = "anonymous";
        i.onload = () => resolve(i);
        i.onerror = reject;
        i.src = src;
      });

    // Logo (top, centered)
    try {
      const logo = await load(logoCutout.url);
      const ratio = logo.width / logo.height;
      const lh = LOGO_H - 24;
      const lw = lh * ratio;
      ctx.drawImage(logo, (SIZE - lw) / 2, 12, lw, lh);
    } catch { /* ignore */ }

    // Helper: cover-draw image into rect
    const drawCover = (img: HTMLImageElement, x: number, y: number, w: number, h: number) => {
      const ir = img.width / img.height;
      const rr = w / h;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (ir > rr) {
        sw = img.height * rr;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / rr;
        sy = (img.height - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    };

    try {
      const [beforeI, afterI] = await Promise.all([load(beforeImg), load(afterImg)]);
      // BEFORE on right (RTL feel), AFTER on left
      drawCover(beforeI, imgW, imgY, imgW, imgH);
      drawCover(afterI, 0, imgY, imgW, imgH);
    } catch { /* ignore */ }

    // Labels (bottom of each half, white text on dark strip)
    const labelH = 56;
    const labelY = imgY + imgH - labelH;
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, labelY, SIZE, labelH);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("بعد", imgW / 2, labelY + labelH / 2);
    ctx.fillText("قبل", imgW + imgW / 2, labelY + labelH / 2);

    // Footer
    ctx.fillStyle = "#0E3A2C";
    ctx.fillRect(0, SIZE - FOOTER_H, SIZE, FOOTER_H);
    ctx.fillStyle = "#ffffff";
    ctx.font = "500 28px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ai.lemonclinic.org", SIZE / 2, SIZE - FOOTER_H / 2);

    return await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg", 0.92),
    );
  }

  async function shareToInstagram() {
    if (!afterImg || sharing) return;
    setSharing(true);
    setShareMsg(null);
    try {
      const blob = await composeShareImage();
      if (!blob) throw new Error("compose failed");

      const file = new File([blob], "lemon-result.jpg", { type: "image/jpeg" });
      const nav = navigator as Navigator & {
        canShare?: (d: { files?: File[] }) => boolean;
        share?: (d: { files?: File[] }) => Promise<void>;
      };

      // STEP 2 — Web Share with files (Android / supported browsers)
      if (nav.canShare && nav.canShare({ files: [file] }) && nav.share) {
        try {
          await nav.share({ files: [file] });
          return;
        } catch {
          /* fall through to download fallback */
        }
      }

      // STEP 3/4 — iOS / Desktop fallback: download then attempt Instagram deep link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lemon-result.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      const ua = navigator.userAgent;
      const isIOS = /iPad|iPhone|iPod/.test(ua);
      if (isIOS) {
        setTimeout(() => { window.location.href = "instagram://app"; }, 800);
      } else {
        setShareMsg("عکس ذخیره شد — آن را در اینستاگرام به اشتراک بگذارید");
      }
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (e) {
      setShareMsg(e instanceof Error ? e.message : "اشتراک‌گذاری ممکن نشد");
    } finally {
      setSharing(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 animate-fade-up" style={{ backgroundColor: "var(--ink)" }}>
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 pt-5">
        <button
          type="button"
          onClick={onClose}
          className="h-10 w-10 rounded-full grid place-items-center text-foreground/90"
          style={{ backgroundColor: "color-mix(in oklab, var(--ink) 55%, transparent)", backdropFilter: "blur(12px)" }}
          aria-label="بستن"
        >
          ✕
        </button>
        <div className="text-center">
          <div className="text-[10px] tracking-[0.4em] font-latin" style={{ color: "var(--gold-deep)" }}>
            SIMULATION
          </div>
          <div className="text-sm font-bold mt-0.5">{title}</div>
        </div>
        <span className="w-10" />
      </div>

      <div
        className="absolute inset-0 grid place-items-center touch-none select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="relative w-[88vw] max-w-[460px] aspect-[3/4] rounded-3xl overflow-hidden hairline"
          style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,.55)", backgroundColor: "var(--card)" }}
        >
          <img
            key={showingAfter ? "after" : "before"}
            src={current}
            alt=""
            className="absolute inset-0 h-full w-full object-cover animate-fade-in"
            draggable={false}
          />
          {showingAfter && (loading || err) && (
            <div
              className="absolute inset-0 grid place-items-center"
              style={{ backgroundColor: "color-mix(in oklab, var(--ink) 60%, transparent)", backdropFilter: "blur(8px)" }}
            >
              {err ? (
                <div className="px-4 text-center text-[12px] leading-5 text-foreground/90">{err}</div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="h-7 w-7 rounded-full border-2 border-foreground/20 border-t-foreground/90 animate-spin" />
                  <div className="text-[11px] tracking-[0.3em] font-latin" style={{ color: "var(--gold-deep)" }}>
                    SIMULATING…
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="absolute z-20 left-1/2 -translate-x-1/2" style={{ top: "calc(50% + min(46vw,240px) + 18px)" }}>
        <div
          className="rounded-full px-4 py-1.5 text-[10px] tracking-[0.45em] font-latin"
          style={{
            color: showingAfter ? "var(--gold-deep)" : "var(--petrol-soft)",
            backgroundColor: "color-mix(in oklab, var(--ink) 55%, transparent)",
            backdropFilter: "blur(12px)",
            border: "1px solid color-mix(in oklab, var(--gold-deep) 22%, transparent)",
          }}
        >
          {showingAfter ? "AFTER" : "BEFORE"}
        </div>
      </div>

      <div
        className="absolute bottom-0 inset-x-0 z-20 px-5 pb-6 pt-4 flex flex-col items-center gap-3"
        style={{ background: "linear-gradient(to top, color-mix(in oklab, var(--ink) 80%, transparent), transparent)" }}
      >
        <p className="text-[10px] tracking-[0.25em] font-latin" style={{ color: "var(--petrol-soft)" }}>
          ← SWIPE TO TOGGLE →
        </p>
        {shareMsg && (
          <p className="text-[11px] leading-5 text-center text-foreground/90">{shareMsg}</p>
        )}
        <div className="flex items-center gap-2 w-full max-w-sm">
          <button
            type="button"
            onClick={() => setShowingAfter((v) => !v)}
            disabled={!afterImg}
            className="flex-1 rounded-full py-3 text-sm font-semibold hairline text-foreground/90 disabled:opacity-50"
            style={{ backgroundColor: "color-mix(in oklab, var(--ink) 55%, transparent)", backdropFilter: "blur(12px)" }}
          >
            {showingAfter ? "نمایش قبل" : "نمایش بعد"}
          </button>
          <button
            type="button"
            onClick={shareToInstagram}
            disabled={!afterImg || sharing}
            className="flex-1 rounded-full py-3 text-sm font-extrabold disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg,#feda77,#f58529,#dd2a7b,#8134af,#515bd4)",
              color: "#fff",
            }}
          >
            {sharing ? "در حال آماده‌سازی…" : "اشتراک در اینستاگرام"}
          </button>
        </div>
      </div>
    </div>
  );
}
