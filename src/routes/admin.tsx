import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { adminListAnalyses, type AdminAnalysis } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "داشبورد مدیریت — لمون" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminPage,
});

const STORE_KEY = "lemon-admin:auth";

function AdminPage() {
  const run = useServerFn(adminListAnalyses);
  const [creds, setCreds] = useState<{ username: string; password: string } | null>(null);
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [data, setData] = useState<AdminAnalysis[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem(STORE_KEY);
    if (raw) {
      try { setCreds(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (!creds) return;
    setLoading(true);
    setErr(null);
    run({ data: creds })
      .then((rows) => setData(rows))
      .catch((e) => {
        setErr(e instanceof Error ? e.message : "خطا");
        setCreds(null);
        sessionStorage.removeItem(STORE_KEY);
      })
      .finally(() => setLoading(false));
  }, [creds, run]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next = { username: u.trim(), password: p };
    sessionStorage.setItem(STORE_KEY, JSON.stringify(next));
    setCreds(next);
  }

  function logout() {
    sessionStorage.removeItem(STORE_KEY);
    setCreds(null);
    setData(null);
    setU(""); setP("");
  }

  if (!creds) {
    return (
      <main className="min-h-screen grid place-items-center bg-slate-900 text-slate-100 p-4" dir="rtl">
        <form onSubmit={submit} className="w-full max-w-sm bg-slate-800/70 rounded-2xl p-6 space-y-4 border border-slate-700">
          <h1 className="text-xl font-bold text-center">ورود مدیر</h1>
          <input
            value={u} onChange={(e) => setU(e.target.value)}
            placeholder="نام کاربری" inputMode="numeric"
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
          />
          <input
            value={p} onChange={(e) => setP(e.target.value)}
            type="password" placeholder="رمز عبور"
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
          />
          {err && <p className="text-xs text-rose-400">{err}</p>}
          <button type="submit" className="w-full rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 text-sm">
            ورود
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8" dir="rtl">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">داشبورد تحلیل چهره</h1>
          <p className="text-xs text-slate-400 mt-1">
            {data ? `${data.length} رکورد` : "در حال بارگذاری…"}
          </p>
        </div>
        <button onClick={logout} className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs hover:bg-slate-800">
          خروج
        </button>
      </header>

      {loading && <p className="text-center text-sm text-slate-400">در حال بارگذاری…</p>}
      {err && <p className="text-center text-sm text-rose-400">{err}</p>}

      <div className="max-w-6xl mx-auto space-y-6">
        {(data ?? []).map((a) => (
          <article key={a.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-4 md:p-6">
            <header className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <div className="text-xs text-slate-400">
                  {new Date(a.created_at).toLocaleString("fa-IR")}
                </div>
                {a.headline && <h2 className="text-base font-bold mt-1">{a.headline}</h2>}
                {a.summary && <p className="text-xs text-slate-400 mt-1 max-w-2xl">{a.summary}</p>}
              </div>
              {a.perceived_age != null && (
                <span className="rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 text-xs">
                  سن ظاهری: {a.perceived_age}
                </span>
              )}
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {a.original_url && (
                <Tile label="عکس اصلی" url={a.original_url} />
              )}
            </div>

            {a.simulations.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-bold mb-3 text-slate-300">شبیه‌سازی‌ها ({a.simulations.length})</h3>
                <div className="space-y-4">
                  {a.simulations.map((s) => (
                    <div key={s.id} className="rounded-xl bg-slate-950 border border-slate-800 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-slate-400">
                          {new Date(s.created_at).toLocaleString("fa-IR")}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {s.treatment_names.map((n, i) => (
                            <span key={i} className="text-[10px] rounded-full bg-slate-800 px-2 py-0.5">{n}</span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Tile label="قبل" url={s.before_url} />
                        <Tile label="بعد" url={s.after_url} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
        {data && data.length === 0 && (
          <p className="text-center text-slate-500 text-sm">هنوز هیچ تحلیلی ثبت نشده.</p>
        )}
      </div>
    </main>
  );
}

function Tile({ label, url }: { label: string; url: string | null }) {
  if (!url) {
    return (
      <div className="aspect-[3/4] rounded-lg bg-slate-800/50 grid place-items-center text-xs text-slate-500">
        {label} — موجود نیست
      </div>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block group">
      <div className="aspect-[3/4] rounded-lg overflow-hidden bg-slate-800">
        <img src={url} alt={label} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="text-[10px] text-slate-400 mt-1 text-center">{label}</div>
    </a>
  );
}