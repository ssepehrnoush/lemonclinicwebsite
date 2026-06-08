import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import {
  AftercareCard,
  FeatureList,
  LatinToken,
  SectionTitle,
  ServiceHero,
} from "@/components/service-page";
import haircareAsset from "@/assets/haircare.jpg.asset.json";

export const Route = createFileRoute("/hair")({
  head: () => ({
    meta: [
      { title: "مو و مزوتراپی لمون | Hair Care" },
      { name: "description", content: "لاین مراقبتی مو و مزوتراپی کلینیک لمون با محصولات وارداتی Revitacare فرانسه." },
      { property: "og:title", content: "لاین مراقبتی مو و مزوتراپی کلینیک لمون" },
      { property: "og:description", content: "محصولات HairCare از برند Revitacare فرانسه برای درمان ریزش، آبرسانی و بازسازی مو." },
      { property: "og:image", content: haircareAsset.url },
    ],
  }),
  component: HairPage,
});

function HairPage() {
  return (
    <Layout>
      <ServiceHero
        label="لاین مراقبتی"
        title={<>لاین مراقبتی مو و مزوتراپی کلینیک لمون</>}
        image={haircareAsset.url}
        alt="محصولات HairCare و Dr.CYJ Hair Filler در کلینیک لمون"
        objectPosition="right center"
      />

      <section className="px-6 pb-[clamp(80px,12vw,160px)] pt-[clamp(56px,8vw,112px)]">
        <div className="mx-auto max-w-[1200px] space-y-16">
          <div>
            <SectionTitle eyebrow="ویژگی‌ها" title="یک داستان محصول‌محور، گرم و دقیق" />
            <FeatureList
              items={[
                <>بهره‌گیری از محصولات وارداتی رویتاهیر (<LatinToken>HairCare</LatinToken>) از برند سرشناس ریویتاکر (<LatinToken>Revitacare</LatinToken>) فرانسه.</>,
                <>مهار سریع ریزش مو، تنظیم چربی کف سر و توقف ریزش‌های ارثی و استرسی در آقایان و بانوان.</>,
                <>آبرسانی عمیق به پوست سر جهت ضخیم شدن تارهای نازک مو و ابرو و رویش مجدد آن‌ها.</>,
                <>تثبیت، تغذیه و سرعت بخشیدن به رشد فولیکول‌های جدید پس از جراحی کاشت مو.</>,
                <>بازسازی فیبر مو و رفع خشکی و شکنندگی ساقه موها جهت بهبود کیفیت و درخشش طبیعی آن‌ها.</>,
              ]}
            />
          </div>

          <AftercareCard
            items={[
              <>تا ۲۴ ساعت بعد از تزریق، از شستن سر و حمام رفتن خودداری کنید.</>,
              <>تا ۳ روز از رنگ کردن موها، سشوار داغ و استفاده از تافت یا ژل پرهیز شود.</>,
              <>محل تزریق را ماساژ ندهید و تا ۲۴ ساعت از کلاه‌های تنگ استفاده نکنید.</>,
              <>تا ۴۸ ساعت از ورزش سنگین و فعالیت‌هایی که باعث تعریق پوست سر می‌شوند خودداری کنید.</>,
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}