import { Link } from "@tanstack/react-router";
import logoCutout from "@/assets/logo_cutout.png.asset.json";
import { IconPin, IconPhone, IconWhatsApp, IconClock } from "./GoldIcon";
import { GlassKey } from "./GlassKey";

export function Footer() {
  return (
    <footer dir="rtl" className="mt-32" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="grid gap-14 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-4">
              <img src={logoCutout.url} alt="" className="h-20 w-20 object-contain" style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.55)) drop-shadow(0 0 18px rgba(201,168,76,0.28))" }} />
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
            <ul className="space-y-3">
              <li>
                <GlassKey
                  external
                  href="https://maps.google.com?q=%DA%A9%D9%84%DB%8C%D9%86%DB%8C%DA%A9%20%D8%B2%DB%8C%D8%A8%D8%A7%DB%8C%DB%8C%20%D9%84%D9%85%D9%88%D9%86,%20District%2022,%20Tehran,%20Tehran%20Province,%20Iran&ftid=0x3f8def006236f4c9:0x1df9f00288829bf2"
                  label="آدرس کلینیک"
                  value="اتوبان خرازی، بلوار اردستانی، مجتمع پارسه، طبقه ۸"
                  icon={<IconPin size={24} />}
                />
              </li>
              <li>
                <GlassKey
                  href="tel:02147009161"
                  label="تماس تلفنی"
                  value={<span className="font-latin tracking-wide">02147009161</span>}
                  icon={<IconPhone size={24} />}
                />
              </li>
              <li>
                <GlassKey
                  external
                  href="https://wa.me/989004709061"
                  label="واتساپ"
                  value={<span className="font-latin tracking-wide">09004709061</span>}
                  icon={<IconWhatsApp size={24} />}
                />
              </li>
              <li>
                <GlassKey
                  label="ساعات حضور"
                  value="شنبه تا پنجشنبه — ۱۰ صبح تا ۱۹ عصر"
                  icon={<IconClock size={24} />}
                />
              </li>
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