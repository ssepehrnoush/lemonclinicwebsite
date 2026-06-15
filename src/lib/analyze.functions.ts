import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const AnalysisSchema = z.object({
  imageBase64: z.string().min(100),
  mode: z.enum(["skin", "face"]),
});

export type AnalysisMode = "skin" | "face";

export interface AnalysisMetric { label: string; score: number; note: string; }
export interface TreatmentSuggestion {
  name: string; area: string;
  intensity: "ملایم" | "متوسط" | "قابل توجه";
  reason: string;
}
export interface AnalysisResult {
  perceivedAge: number;
  skinAge?: number;
  headline: string;
  summary: string;
  metrics: AnalysisMetric[];
  recommendations: string[];
  treatments?: TreatmentSuggestion[];
}

function buildPrompt(mode: AnalysisMode) {
  const facePrompt = `تو یک متخصص تناسب اجزای صورت هستی. این تصویر را تحلیل کن.
یک JSON با این ساختار دقیق برگردان (به فارسی):
{
  "perceivedAge": عدد سن ظاهری,
  "headline": یک جمله مثبت و مهربان درباره چهره,
  "summary": دو سه جمله توضیح کلی درباره تقارن و تناسب,
  "metrics": [
    {"label":"تقارن کلی","score":۰تا۱۰۰,"note":"..."},
    {"label":"تناسب چشم‌ها","score":۰تا۱۰۰,"note":"..."},
    {"label":"تناسب بینی","score":۰تا۱۰۰,"note":"..."},
    {"label":"تناسب لب","score":۰تا۱۰۰,"note":"..."},
    {"label":"تناسب چانه و فک","score":۰تا۱۰۰,"note":"..."}
  ],
  "recommendations": [سه پیشنهاد ملایم و حرفه‌ای],
  "treatments": [
    {"name":"فیلر لب عروسکی","area":"لب‌ها","intensity":"ملایم|متوسط|قابل توجه","reason":"..."},
    {"name":"فیلر لب نچرال","area":"لب‌ها","intensity":"...","reason":"..."},
    {"name":"فیلر زیر چشم","area":"زیر چشم","intensity":"...","reason":"..."},
    {"name":"کانتور کامل فول فیس","area":"فول فیس","intensity":"...","reason":"..."}
  ]
}
فهرست treatments باید دقیقاً همین چهار مورد و به همین ترتیب باشد.
فقط JSON خالص برگردان، بدون متن اضافه یا markdown.`;
  return facePrompt;
}

function ensureDataUrl(input: string): string {
  if (input.startsWith("data:")) return input;
  return `data:image/jpeg;base64,${input}`;
}

function dataUrlToBytes(dataUrl: string): { bytes: Uint8Array; contentType: string } {
  const m = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  const contentType = m?.[1] ?? "image/jpeg";
  const b64 = m?.[2] ?? dataUrl;
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return { bytes, contentType };
}

async function uploadImage(dataUrl: string, prefix: string): Promise<string> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { bytes, contentType } = dataUrlToBytes(ensureDataUrl(dataUrl));
  const ext = contentType.includes("png") ? "png" : "jpg";
  const path = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
  const { error } = await supabaseAdmin.storage.from("face-analyses").upload(path, bytes, {
    contentType,
    upsert: false,
  });
  if (error) {
    console.error("Storage upload failed:", error);
    throw new Error("ذخیره تصویر ممکن نشد.");
  }
  return path;
}

export const analyzeFace = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AnalysisSchema.parse(input))
  .handler(async ({ data }): Promise<AnalysisResult & { analysisId: string }> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY is not configured");
    const dataUrl = ensureDataUrl(data.imageBase64);

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{
          role: "user",
          content: [
            { type: "text", text: buildPrompt(data.mode) },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        }],
        response_format: { type: "json_object" },
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) throw new Error("درخواست‌های زیاد. لطفاً کمی صبر کنید.");
      if (res.status === 402) throw new Error("اعتبار هوش مصنوعی تمام شده است.");
      throw new Error(`خطا در تحلیل (${res.status}): ${text.slice(0, 300)}`);
    }
    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const raw: string = json.choices?.[0]?.message?.content ?? "";
    let parsed: AnalysisResult;
    try {
      const cleaned = raw.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      throw new Error("پاسخ هوش مصنوعی قابل خواندن نبود.");
    }
    parsed.metrics = (parsed.metrics ?? []).map((m) => ({
      label: String(m.label ?? ""),
      score: Math.max(0, Math.min(100, Math.round(Number(m.score) || 0))),
      note: String(m.note ?? ""),
    }));
    parsed.recommendations = (parsed.recommendations ?? []).map(String);
    const rawTreatments = (parsed as { treatments?: unknown }).treatments;
    if (Array.isArray(rawTreatments)) {
      const allowed = ["ملایم", "متوسط", "قابل توجه"] as const;
      parsed.treatments = rawTreatments.map((raw) => {
        const t = (raw ?? {}) as Record<string, unknown>;
        const intensity = allowed.find((v) => v === t.intensity) ?? "ملایم";
        return {
          name: String(t.name ?? ""),
          area: String(t.area ?? ""),
          intensity,
          reason: String(t.reason ?? ""),
        };
      });
    }
    parsed.perceivedAge = Math.max(10, Math.min(99, Math.round(Number(parsed.perceivedAge) || 0)));

    // Persist to Cloud (storage + db)
    let analysisId = "";
    try {
      const originalPath = await uploadImage(dataUrl, "originals");
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: row, error } = await supabaseAdmin
        .from("face_analyses")
        .insert({
          original_image_url: originalPath,
          perceived_age: parsed.perceivedAge,
          headline: parsed.headline,
          summary: parsed.summary,
          result: parsed as never,
        })
        .select("id")
        .single();
      if (error) console.error("DB insert failed:", error);
      analysisId = row?.id ?? "";
    } catch (e) {
      console.error("Persist analysis failed:", e);
    }
    return { ...parsed, analysisId };
  });

const SimulateSchema = z.object({
  imageBase64: z.string().min(100),
  prompt: z.string().min(20).max(20000),
  analysisId: z.string().optional(),
  treatmentKeys: z.array(z.string()).optional(),
  treatmentNames: z.array(z.string()).optional(),
});

export type TreatmentKey =
  | "doll-lip-filler"
  | "natural-lip-filler"
  | "under-eye-filler"
  | "full-face-contour";

export const simulateTreatment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SimulateSchema.parse(input))
  .handler(async ({ data }): Promise<{ imageBase64: string }> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY is not configured");
    const dataUrl = ensureDataUrl(data.imageBase64);

    const res = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-image-preview",
        messages: [{
          role: "user",
          content: [
            { type: "text", text: data.prompt },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        }],
        modalities: ["image", "text"],
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) throw new Error("درخواست‌های زیاد. لطفاً کمی صبر کنید.");
      if (res.status === 402) throw new Error("اعتبار هوش مصنوعی تمام شده است.");
      throw new Error(`خطا در شبیه‌سازی (${res.status}): ${text.slice(0, 300)}`);
    }
    const json = (await res.json()) as {
      data?: Array<{ b64_json?: string }>;
      choices?: Array<{ message?: { images?: Array<{ image_url?: { url?: string } | string }> } }>;
    };
    const img = json.choices?.[0]?.message?.images?.[0];
    const imgUrl = typeof img?.image_url === "string" ? img.image_url : img?.image_url?.url;
    let afterDataUrl: string | null = null;
    if (imgUrl) afterDataUrl = imgUrl.startsWith("data:") ? imgUrl : `data:image/png;base64,${imgUrl}`;
    else if (json.data?.[0]?.b64_json) afterDataUrl = `data:image/png;base64,${json.data[0].b64_json}`;
    if (!afterDataUrl) throw new Error("تصویر شبیه‌سازی شده دریافت نشد.");

    // Persist before+after
    try {
      const [beforePath, afterPath] = await Promise.all([
        uploadImage(dataUrl, "before"),
        uploadImage(afterDataUrl, "after"),
      ]);
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.from("face_simulations").insert({
        analysis_id: data.analysisId || null,
        before_image_url: beforePath,
        after_image_url: afterPath,
        treatment_keys: data.treatmentKeys ?? [],
        treatment_names: data.treatmentNames ?? [],
      });
    } catch (e) {
      console.error("Persist simulation failed:", e);
    }

    return { imageBase64: afterDataUrl };
  });