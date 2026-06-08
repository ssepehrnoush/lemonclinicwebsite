import { Link } from "@tanstack/react-router";
import logoCutout from "@/assets/logo_cutout.png.asset.json";
import { IconPin, IconPhone, IconWhatsApp, IconClock } from "./GoldIcon";

export function Footer() {
  return (
    <footer dir="rtl" className="mt-32" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="grid gap-14 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoCutout.url} alt="" className="h-12 w-12 object-contain" />
              <div>
                <div className="font-latin tracking-[0.32em] text-gold-gradient">LEMON</div>
                <div className="mt-1 text-[13px] text-[var(--ink-soft)]">کلینیک پزشکی زیبایی لمون</div>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-[13px] leading-7 text-[var(--ink-soft)]">آرامش، هنر پزشکان متخصص و بالاترین استانداردهای مراقبتی، در قلب تهران.</p>
          </div>

          <div>
            <h4 className="mb-5 text-[12px] tracking-[0.3em] text-[var(--ink-soft)]">دسترسی سریع</h4>
            <ul className="space-y-3 text-[14px]">
              <li><Link to="/" className="hover:text-[var(--gold-deep)] transition-colors">خانه</Link></li>
              <li><Link to="/services" className="hover:text-[var(--gold-deep)] transition-colors">خدمات VIP</Link></li>
              <li><Link to="/team" className="hover:text-[var(--gold-deep)] transition-colors">متخصصین لمون</Link></li>
              <li><Link to="/endolift" className="hover:text-[var(--gold-deep)] transition-colors">اندولیفت</Link></li>
              <li><Link to="/laser" className="hover:text-[var(--gold-deep)] transition-colors">لیزر</Link></li>
              <li><Link to="/facial" className="hover:text-[var(--gold-deep)] transition-colors">فیشال و درمال</Link></li>
              <li><Link to="/botox" className="hover:text-[var(--gold-deep)] transition-colors">بوتاکس</Link></li>
              <li><Link to="/prp" className="hover:text-[var(--gold-deep)] transition-colors">PRP</Link></li>
              <li><a href="/hair" className="hover:text-[var(--gold-deep)] transition-colors">مو و مزوتراپی</a></li>
              <li><Link to="/rejuvenation" className="hover:text-[var(--gold-deep)] transition-colors">جوانسازی</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[12px] tracking-[0.3em] text-[var(--ink-soft)]">ارتباط با ما</h4>
            <ul className="space-y-4 text-[14px] leading-7">
              <li className="flex items-start gap-3"><span className="mt-1 shrink-0"><IconPin size={18} /></span><span>تهران، اتوبان خرازی، بلوار اردستانی، مجتمع تجاری پارسه، طبقه ۸</span></li>
              <li className="flex items-center gap-3"><IconPhone size={18} /><a href="tel:02147009161" className="font-latin tracking-wide">02147009161</a></li>
              <li className="flex items-center gap-3"><IconWhatsApp size={18} /><a href="https://wa.me/989004709061" className="font-latin tracking-wide">09004709061</a></li>
              <li className="flex items-center gap-3"><IconClock size={18} /><span>شنبه تا پنجشنبه — ۱۰ صبح تا ۱۹ عصر</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 pt-8 text-[12px] text-[var(--ink-soft)] md:flex-row" style={{ borderTop: "1px solid var(--line)" }}>
          <span>© {new Date().getFullYear()} <span className="font-latin">LEMON</span> Aesthetic Center</span>
          <span>طراحی با وسواس، در سکوت طلایی.</span>
        </div>
      </div>
    </footer>
  );
}