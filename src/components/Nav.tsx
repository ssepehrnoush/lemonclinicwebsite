import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import logoAsset from "@/assets/logo.jpg.asset.json";

const LINES = [
  { label: "لیزر (کندلا شاتی)", to: "/laser" },
  { label: "فیشال و درمال", to: "/facial" },
  { label: "بوتاکس", to: "/botox" },
  { label: "PRP — سلول‌های فعال", to: "/prp" },
  { label: "مو و مزوتراپی", to: "/hair" },
  { label: "جوانسازی", to: "/rejuvenation" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-gold-gradient origin-right"
        style={{ transform: `scaleX(${progress})`, transition: "transform .1s linear" }}
      />
      <header
        dir="rtl"
        className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(244,239,230,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : undefined,
          borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:py-5">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="LEMON" className="h-11 w-11 rounded-full object-cover ring-1 ring-[var(--line)]" />
            <span className={`hidden font-latin text-[13px] tracking-[0.32em] md:inline ${scrolled ? "text-gold-gradient" : "text-[#FBF8F2]"}`}>LEMON</span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex" style={{ color: scrolled ? "var(--ink)" : "#FBF8F2" }}>
             <NavLink to="/">خانه</NavLink>
             <NavLink to="/services">خدمات VIP</NavLink>
             <NavLink to="/team">متخصصین لمون</NavLink>
            <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              <button className="group relative inline-flex items-center gap-1 text-[15px]">
                لاین‌های اختصاصی
                <span style={{ color: "var(--gold)" }}>▾</span>
                <span className="absolute -bottom-1 right-0 h-px w-0 bg-gold-gradient transition-all duration-500 group-hover:w-full" />
              </button>
              <div
                className="absolute right-0 top-full pt-3 transition-all duration-300"
                style={{ opacity: open ? 1 : 0, transform: `translateY(${open ? 0 : -6}px)`, pointerEvents: open ? "auto" : "none" }}
              >
                <div className="w-72 card-soft p-2">
                  {LINES.map((l, i) => (
                    <Link key={l.label} to={l.to} className="flex items-center justify-between rounded-md px-4 py-3 text-[14px] text-[var(--ink)] hover:bg-[var(--canvas)]" style={{ borderBottom: i < LINES.length - 1 ? "1px solid var(--line)" : "none" }}>
                      <span>{l.label}</span>
                      <span className="text-[var(--gold)]">←</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <button className="md:hidden p-2" style={{ color: scrolled ? "var(--ink)" : "#FBF8F2" }} onClick={() => setMobile(true)} aria-label="منو">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </header>

      <div dir="rtl" className="fixed inset-0 z-[70] md:hidden" style={{ pointerEvents: mobile ? "auto" : "none" }} aria-hidden={!mobile}>
        <div className="absolute inset-0 bg-[rgba(43,38,32,0.4)] transition-opacity" style={{ opacity: mobile ? 1 : 0 }} onClick={() => setMobile(false)} />
        <aside className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-[var(--canvas)] p-8 transition-transform duration-500" style={{ transform: `translateX(${mobile ? "0" : "100%"})`, borderLeft: "1px solid var(--line)" }}>
          <div className="mb-10 flex items-center gap-3">
            <img src={logoAsset.url} alt="" className="h-10 w-10 rounded-full" />
            <span className="font-latin tracking-[0.32em] text-gold-gradient">LEMON</span>
          </div>
          <ul className="space-y-5 text-[17px]">
             <li><Link to="/">خانه</Link></li><li><Link to="/services">خدمات VIP</Link></li><li><Link to="/team">متخصصین لمون</Link></li>
            <li className="pt-4 text-[var(--ink-soft)] text-[12px] tracking-widest">لاین‌های اختصاصی</li>
             {LINES.map((l) => <li key={l.label} className="text-[15px]"><Link to={l.to}>{l.label}</Link></li>)}
          </ul>
        </aside>
      </div>
    </>
  );
}

function NavLink({ children, to }: { children: ReactNode; to: "/" | "/services" | "/team" }) {
  return (
    <Link to={to} className="group relative text-[15px]">
      {children}
      <span className="absolute -bottom-1 right-0 h-px w-0 bg-gold-gradient transition-all duration-500 group-hover:w-full" />
    </Link>
  );
}