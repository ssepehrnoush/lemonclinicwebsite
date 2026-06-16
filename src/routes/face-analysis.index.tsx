import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MirrorFrame } from "@/components/ai/MirrorFrame";
import { ArrowLeftLong } from "@/components/ai/LineArt";
import iconFace from "@/assets/ai/icon-face.png";
import { saveCapture } from "@/lib/aineh-store";

export const Route = createFileRoute("/face-analysis/")({
  head: () => ({ meta: [{ title: "آینه — گرفتن عکس" }] }),
  component: CapturePage,
});

function CapturePage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [ringProgress, setRingProgress] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!preview) { setRingProgress(0); setFlash(false); return; }
    setRingProgress(0);
    setFlash(false);
    const start = performance.now();
    const duration = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setRingProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setFlash(true);
        setTimeout(() => setFlash(false), 1200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [preview]);

  async function handleFile(file: File) {
    setErr(null);
    if (!file.type.startsWith("image/")) {
      setErr("لطفاً یک فایل تصویری انتخاب کنید.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setErr("حجم تصویر بیش از ۸ مگابایت است.");
      return;
    }
    try {
      const dataUrl = await downscaleImage(file, 1600);
      setPreview(dataUrl);
    } catch {
      setErr("خواندن تصویر ممکن نشد.");
    }
  }

  function start() {
    if (!preview) return;
    saveCapture("face", preview);
    navigate({ to: "/face-analysis/analyzing" });
  }

  return (
    <main className="ai-shell min-h-screen bg-page text-foreground">
      <div className="mx-auto w-full max-w-md px-6 pt-6 pb-10">
        <header className="flex items-center justify-between animate-fade-up">
          <Link to="/" className="h-10 w-10 rounded-full grid place-items-center hairline text-foreground/70">
            <ArrowLeftLong size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <img src={iconFace} alt="" className="h-5 w-5 object-contain" />
            <h1 className="text-base font-bold">آنالیز چهره با لمون</h1>
          </div>
          <span className="w-10" />
        </header>

        <section className="mt-8 text-center animate-fade-up" style={{ animationDelay: "80ms" }}>
          <div className={`relative mx-auto w-fit ${flash ? "ring-flash" : ""}`}>
            <MirrorFrame size={240} progress={preview ? ringProgress : 0}>
              {preview ? (
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <img src={preview} alt="پیش‌نمایش" className="h-full w-full object-cover" />
                  {ringProgress < 100 && (
                    <div className="brush-sweep" aria-hidden="true" />
                  )}
                </div>
              ) : null}
            </MirrorFrame>
          </div>

          <div className="mt-7 text-[11px] tracking-[0.45em] font-latin" style={{ color: "var(--gold-deep)" }}>
            ( POKER FACE )
          </div>
          <h2 className="mt-2 text-xl font-bold tracking-tight">کل صورت در کادر، نگاه مستقیم به دوربین</h2>
          <p className="mt-2 text-xs leading-6" style={{ color: "var(--petrol-soft)" }}>
            نور مناسب · بدون عینک و کلاه · چهره کاملاً در کادر
          </p>

          {err && (
            <p className="mt-3 text-xs text-[color:var(--destructive)]">{err}</p>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
              e.target.value = "";
            }}
          />
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
              e.target.value = "";
            }}
          />

          <div className="mt-8 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-full py-3.5 text-sm font-semibold text-foreground bg-card hairline transition active:scale-[0.99]"
              >
                دوربین
              </button>
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="rounded-full py-3.5 text-sm font-semibold text-foreground bg-card hairline transition active:scale-[0.99]"
              >
                انتخاب از گالری
              </button>
            </div>

            <button
              type="button"
              disabled={!preview}
              onClick={start}
              className="w-full rounded-full py-4 text-base font-extrabold tracking-wide glass-dark transition disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.99] shadow-[0_14px_40px_-12px_rgba(45,212,168,0.55)] border border-[color-mix(in_oklab,var(--gold-deep)_55%,transparent)]"
            >
              آنالیز با لمون
            </button>
          </div>

          <p className="mt-6 text-[11px] leading-5" style={{ color: "var(--petrol-soft)" }}>
            عکس روی سرور ذخیره نمی‌شود؛ فقط برای این تحلیل ارسال می‌گردد.
          </p>
        </section>
      </div>
    </main>
  );
}

async function downscaleImage(file: File, maxSize: number): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas ctx");
  ctx.drawImage(bitmap, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", 0.85);
}
