import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import {
  AftercareCard,
  FeatureList,
  SectionTitle,
  SplitStickyLayout,
  TierCards,
} from "@/components/service-page";
import { Framed } from "@/components/Framed";
import laserAsset from "@/assets/laser.jpg.asset.json";

export const Route = createFileRoute("/laser")({
  head: () => ({
    meta: [
      { title: "لاین تخصصی لیزر کندلا شاتی | LEMON Laser" },
      { name: "description", content: "صفحه تخصصی لیزر لمون با دستگاه کندلا شاتی آمریکا، پکیج‌ها و مراقبت‌های پس از درمان." },
      { property: "og:title", content: "لاین تخصصی لیزر با کندلا شاتی آمریکا" },
      { property: "og:description", content: "تجربه لیزر دقیق، کلینیکال و لوکس در کلینیک لمون." },
    ],
  }),
  component: LaserPage,
});

function LaserPage() {
  return (
    <Layout>
      <SplitStickyLayout
        media={<Framed src={laserAsset.url} alt="لاین لیزر لمون" ratio="4 / 5" loading="lazy" style={{ objectPosition: "right center" }} />}
      >
        <SectionTitle eyebrow="لاین تخصصی" title={<>لاین تخصصی لیزر با <span className="text-gold-gradient">کندلا شاتی</span> آمریکا</>} />
        <FeatureList
          items={[
            <>مجهز به دستگاه محبوب و قدرتمند کندلا شاتی، محصول برتر کشور آمریکا در حوزه حذف موهای زائد.</>,
            <>پک بهداشتی و اختصاصی: رعایت بالاترین استانداردهای بهداشتی و سلامت فردی با ارائه پک شخصی مجزا شامل سری اختصاصی دستگاه، مداد و عینک ویژه برای هر مراجع.</>,
            <>بهره‌گیری از جدیدترین نسخه و آپدیت دستگاه با راندمان بالا و کمترین میزان درد.</>,
            <>قابلیت تنظیم دقیق پارامترهای دستگاه متناسب با هر ناحیه، رنگ پوست و ضخامت مو برای دریافت بهترین نتیجه در کمترین تعداد جلسات.</>,
          ]}
        />

        <div className="mt-16">
          <SectionTitle eyebrow="پکیج‌ها" title="انتخاب متناسب با سبک زندگی شما" />
          <TierCards
            items={[
              { title: "فول بادی", description: "شامل دست‌ها، پاها، بیکینی و زیربغل" },
              { title: "کاربردی", description: "شامل ساق پا، ساعد دست‌ها، بیکینی و زیربغل" },
              { title: "استخری", description: "شامل زیربغل‌ها و تمام نواحی بیکینی" },
              { title: "پایین‌تنه", description: "شامل تمامی قسمت‌های پا، بیکینی و باسن به صورت کامل" },
            ]}
          />
        </div>

        <div className="mt-16">
          <AftercareCard
            items={[
              <>لطفا از دوش آب داغ، سونا و جکوزی تا ۴۸ ساعت خودداری فرمایید (فقط دوش ولرم متمایل به خنک).</>,
              <>از انجام ورزش‌های سنگین و فعالیت‌های تعرق‌آور پرهیز شود.</>,
              <>روزی ۲ تا ۳ بار از کرم زینک اکساید یا ترمیم‌کننده تجویزشده روی ناحیه استفاده کنید.</>,
              <>تا ۲۴ ساعت از مصرف لوازم آرایشی، اسپری‌ها و لوسیون‌های معطر خودداری شود.</>,
              <>استفاده منظم از ضدآفتاب فاقد چربی روی نواحی در معرض آفتاب الزامی است.</>,
              <>بین جلسات، موها را فقط با ژیلت اصلاح کنید؛ از وکس، بند، اپیلاسیون و موچین پرهیز شود.</>,
            ]}
          />
        </div>
      </SplitStickyLayout>
    </Layout>
  );
}