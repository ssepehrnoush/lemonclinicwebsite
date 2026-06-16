import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ADMIN_USER = "09122501786";
const ADMIN_PASS = "040471";

const AuthSchema = z.object({
  username: z.string(),
  password: z.string(),
});

function check(data: { username: string; password: string }) {
  if (data.username !== ADMIN_USER || data.password !== ADMIN_PASS) {
    throw new Error("نام کاربری یا رمز عبور اشتباه است.");
  }
}

async function sign(supabaseAdmin: any, path: string | null | undefined) {
  if (!path) return null;
  const { data } = await supabaseAdmin.storage
    .from("face-analyses")
    .createSignedUrl(path, 3600);
  return data?.signedUrl ?? null;
}

export interface AdminAnalysis {
  id: string;
  created_at: string;
  perceived_age: number | null;
  headline: string | null;
  summary: string | null;
  original_url: string | null;
  simulations: {
    id: string;
    created_at: string;
    treatment_names: string[];
    before_url: string | null;
    after_url: string | null;
  }[];
}

export const adminListAnalyses = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AuthSchema.parse(input))
  .handler(async ({ data }): Promise<AdminAnalysis[]> => {
    check(data);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: analyses, error: e1 } = await supabaseAdmin
      .from("face_analyses")
      .select("id, created_at, perceived_age, headline, summary, original_image_url")
      .order("created_at", { ascending: false })
      .limit(500);
    if (e1) throw new Error(e1.message);

    const { data: sims, error: e2 } = await supabaseAdmin
      .from("face_simulations")
      .select("id, created_at, analysis_id, before_image_url, after_image_url, treatment_names")
      .order("created_at", { ascending: false })
      .limit(2000);
    if (e2) throw new Error(e2.message);

    // Collect orphan sims grouped by null
    const byAnalysis = new Map<string | null, typeof sims>();
    for (const s of sims ?? []) {
      const k = s.analysis_id ?? null;
      if (!byAnalysis.has(k)) byAnalysis.set(k, [] as any);
      byAnalysis.get(k)!.push(s);
    }

    const out: AdminAnalysis[] = [];
    for (const a of analyses ?? []) {
      const simsForA = byAnalysis.get(a.id) ?? [];
      out.push({
        id: a.id,
        created_at: a.created_at,
        perceived_age: a.perceived_age,
        headline: a.headline,
        summary: a.summary,
        original_url: await sign(supabaseAdmin, a.original_image_url),
        simulations: await Promise.all(
          simsForA.map(async (s: any) => ({
            id: s.id,
            created_at: s.created_at,
            treatment_names: s.treatment_names ?? [],
            before_url: await sign(supabaseAdmin, s.before_image_url),
            after_url: await sign(supabaseAdmin, s.after_image_url),
          })),
        ),
      });
    }
    // Orphan simulations (no analysis_id)
    const orphans = byAnalysis.get(null) ?? [];
    if (orphans.length) {
      out.push({
        id: "orphan",
        created_at: orphans[0].created_at,
        perceived_age: null,
        headline: "شبیه‌سازی‌های بدون تحلیل",
        summary: null,
        original_url: null,
        simulations: await Promise.all(
          orphans.map(async (s: any) => ({
            id: s.id,
            created_at: s.created_at,
            treatment_names: s.treatment_names ?? [],
            before_url: await sign(supabaseAdmin, s.before_image_url),
            after_url: await sign(supabaseAdmin, s.after_image_url),
          })),
        ),
      });
    }
    return out;
  });