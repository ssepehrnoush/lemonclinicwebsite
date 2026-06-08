import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import {
  AftercareCard,
  CountUpStat,
  FeatureList,
  LatinToken,
  SectionTitle,
  ServiceHero,
} from "@/components/service-page";
import prpAsset from "@/assets/prp.jpg.asset.json";

export const Route = createFileRoute("/prp")({
  head: () => ({
    meta: [
      { title: "PRP لمون | LEMON Active Cells" },
      { name: "description", content: "صفحه PRP لمون با تمرکز علمی، عدد ۹۰٪ زنده‌مانی پلاکت‌ها و مراقبت‌های پس از درمان." },
      { property: "og:title", content: "لاین مدیکال سلول‌های فعال (PRP)" },
      { property: "og:description", content: "رویکرد علمی و کلینیکال PRP در لمون با حداکثر زنده‌مانی پلاکت‌ها." },
    ],
  }),
  component: PrpPage,
});

function PrpPage() {
  return (
    <Layout>
      <ServiceHero
        label="لاین مدیکال"
        title={<>لاین مدیکال سلول‌های فعال (<LatinToken>PRP</LatinToken>)</>}
        image={prpAsset.url}
        alt="PRP در لمون"
        objectPosition="right center"
      />

      <section className="px-6 pb-[clamp(80px,12vw,160px)] pt-[clamp(56px,8vw,112px)]">
        <div className="mx-auto max-w-[1200px] space-y-16">
          <CountUpStat label="حداکثر زنده‌مانی پلاکت‌ها در زمان تزریق" />

          <div>
            <SectionTitle eyebrow="ویژگی‌ها" title="فرآیندی کلینیکال، درمان‌محور و دقیق" />
            <FeatureList
              items={[
                <>تمرکز مطلق بر رویکرد درمانی، علمی و کلینیکالِ فرآیند پی‌آرپی فقط توسط پزشک.</>,
                <>کیت‌های مخصوص آمریکایی: استفاده از لوله‌های پیشرفته <LatinToken>IVV</LatinToken> جهت حفظ حداکثری و زنده ماندن تا ۹۰ درصد پلاکت‌ها در زمان تزریق.</>,
                <>کنترل ریزش، تحریک رویش مجدد و تقویت بیولوژیک فولیکول‌ها با هدف درمان قطعی کم‌پشتی مو.</>,
                <>جوانسازی، آبرسانی و ترمیم سلولی بافت پوست در ناحیه صورت، گردن و دکلته.</>,
              ]}
            />
          </div>

          <AftercareCard
            items={[
              <>تا ۲۴ ساعت از شستن ناحیه تزریق و استحمام خودداری کنید.</>,
              <>از لمس، ماساژ و ایجاد فشار در محل‌های تزریق پرهیز فرمایید.</>,
              <>تا ۴۸ ساعت از رفتن به سونا، جکوزی، دوش داغ و فعالیت‌های ورزشی سنگین خودداری شود.</>,
              <>در صورت تزریق در صورت، استفاده منظم از ضدآفتاب فاقد چربی الزامی است.</>,
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}