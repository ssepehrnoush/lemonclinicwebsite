import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import {
  AftercareCard,
  CenteredChips,
  FeatureList,
  LatinToken,
  SectionTitle,
  ServiceHero,
} from "@/components/service-page";
import botoxAsset from "@/assets/botox.jpg.asset.json";

export const Route = createFileRoute("/botox")({
  head: () => ({
    meta: [
      { title: "بوتاکس لمون | LEMON Botox" },
      { name: "description", content: "بوتاکس چشم و ابرو با متدهای انحصاری لمون، خدمات CAT EYE و FOX EYE و مراقبت‌های پس از درمان." },
      { property: "og:title", content: "زیبایی چشم و ابرو با متدهای انحصاری بوتاکس لمون" },
      { property: "og:description", content: "ترکیب آرامش، تقارن و دقت در خدمات بوتاکس تخصصی لمون." },
    ],
  }),
  component: BotoxPage,
});

function BotoxPage() {
  return (
    <Layout>
      <ServiceHero
        centered
        label="لاین تخصصی"
        title="زیبایی چشم و ابرو با متدهای انحصاری بوتاکس لمون"
        image={botoxAsset.url}
        alt="بوتاکس تخصصی لمون"
        objectPosition="right center"
      />

      <section className="px-6 pb-[clamp(80px,12vw,160px)] pt-[clamp(56px,8vw,112px)]">
        <div className="mx-auto max-w-[1000px] space-y-16 text-center">
          <div>
            <SectionTitle centered eyebrow="ویژگی‌ها" title="آیین آرام و دقیق بوتاکس لمون" />
            <FeatureList
              centered
              items={[
                <>استفاده از برند معتبر و پرطرفدار مصپورت (<LatinToken>Masport</LatinToken>) با تاییدیه رسمی <LatinToken>TTAC</LatinToken> وزارت بهداشت.</>,
                <>میزان ماندگاری ایده‌آل بین ۴ تا ۶ ماه.</>,
                <>ارائه خدمات تخصصی شامل: بوتاکس <LatinToken>CAT EYE</LatinToken>، بوتاکس <LatinToken>FOX EYE</LatinToken>، کشیدگی چشم و ابرو، رفع خطوط اخم، رفع خطوط پیشانی و رفع خطوط پنجه کلاغی دور چشم.</>,
              ]}
            />
          </div>

          <div>
            <SectionTitle centered eyebrow="خدمات شاخص" title="چیدمان مرکزی سرویس‌های امضادار" />
            <CenteredChips
              items={[
                <>بوتاکس <LatinToken>CAT EYE</LatinToken></>,
                <>بوتاکس <LatinToken>FOX EYE</LatinToken></>,
                <>کشیدگی چشم و ابرو</>,
                <>رفع خطوط اخم</>,
                <>رفع خطوط پیشانی</>,
                <>رفع خطوط پنجه کلاغی دور چشم</>,
              ]}
            />
          </div>

          <AftercareCard
            items={[
              <>تا ۴ ساعت از خم کردن سر و گردن به پایین (برای نگاه کردن به گوشی یا بستن کفش) جدا خودداری کنید.</>,
              <>تا ۵ ساعت اول به هیچ عنوان دراز نکشید و نخوابید تا از جابجایی بوتاکس جلوگیری شود.</>,
              <>محل‌های تزریق را اصلاً لمس نکنید، نخارانید و ماساژ ندهید.</>,
              <>تا ۴ ساعت از شستن صورت و استفاده از لوازم آرایشی پرهیز شود.</>,
              <>ترجیحاً شب اول را به صورت طاق‌باز (پشت) بخوابید.</>,
              <>تا ۲۴ ساعت از دوش آب داغ، سونا، جکوزی و ورزش سنگین خودداری کنید.</>,
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}