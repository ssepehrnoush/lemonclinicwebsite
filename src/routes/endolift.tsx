import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Framed } from "@/components/Framed";
import {
  AftercareCard,
  FeatureList,
  LatinToken,
  SectionTitle,
  ServiceHero,
} from "@/components/service-page";
import endoliftAsset from "@/assets/endolift.jpg.asset.json";
import endoliftMachineAsset from "@/assets/endolift_machine.jpg.asset.json";

export const Route = createFileRoute("/endolift")({
  head: () => ({
    meta: [
      { title: "اندولیفت لمون | Endolift" },
      { name: "description", content: "اندولیفت در کلینیک لمون با دستگاه یوفوتون ایتالیا — لیفت عمقی، جوانسازی و کلاژن‌سازی بدون جراحی." },
      { property: "og:title", content: "اندولیفت — لیفت عمقی بدون جراحی در لمون" },
      { property: "og:description", content: "تکنولوژی اندولیفت با دستگاه یوفوتون ایتالیا برای جوانسازی و کلاژن‌سازی بافت." },
      { property: "og:image", content: endoliftAsset.url },
      { property: "og:url", content: "https://lemonclinicwebsite.lovable.app/endolift" },
    ],
    links: [{ rel: "canonical", href: "https://lemonclinicwebsite.lovable.app/endolift" }],
  }),
  component: EndoliftPage,
});

function EndoliftPage() {
  return (
    <Layout>
      <ServiceHero
        label="لاین مدیکال"
        title={<>اندولیفت — لیفت عمقی و کلاژن‌سازی بدون جراحی</>}
        description={<>اندولیفت تکنولوژی نوینی برای جوانسازی، لیفت و فشردگی بافت صورت و گردن است که با فیبر اپتیکی بسیار نازک، انرژی لیزر را به لایه‌های عمقی پوست می‌رساند. در کلینیک لمون این پروسه با دستگاه یوفوتون <LatinToken>Eufoton</LatinToken> ساخت ایتالیا انجام می‌شود.</>}
        image={endoliftAsset.url}
        alt="اندولیفت در کلینیک لمون"
        objectPosition="center"
      />

      <section className="px-6 pb-[clamp(80px,12vw,160px)] pt-[clamp(56px,8vw,112px)]">
        <div className="mx-auto max-w-[1200px] space-y-16">
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <SectionTitle eyebrow="تکنولوژی" title={<>دستگاه <LatinToken>Eufoton</LatinToken> ایتالیا</>} />
              <p className="mt-6 text-[15px] leading-9 text-[var(--ink-soft)] max-w-[60ch]">
                دستگاه یوفوتون ایتالیا یکی از پیشرفته‌ترین تجهیزات اندولیفت در دنیاست — فیبر اپتیکی ۲۰۰ میکرونی، دقت بالا و کنترل هوشمندانه دما، ترکیبی از ایمنی و اثربخشی را در یک جلسه فراهم می‌کند.
              </p>
            </div>
            <div className="md:col-span-5">
              <Framed src={endoliftMachineAsset.url} alt="دستگاه یوفوتون ایتالیا" ratio="4 / 3" />
            </div>
          </div>

          <div>
            <SectionTitle eyebrow="ویژگی‌ها" title="چرا اندولیفت لمون متفاوت است؟" />
            <FeatureList
              items={[
                <>لیفت و جوانسازی عمقی صورت، گردن و غبغب در یک جلسه و بدون نیاز به جراحی.</>,
                <>تحریک سنتز کلاژن طبیعی و کاهش چربی‌های موضعی به‌صورت هم‌زمان.</>,
                <>دوره ریکاوری بسیار کوتاه — بازگشت سریع به فعالیت روزمره.</>,
                <>نتیجه ماندگار با اثرگذاری تدریجی طی هفته‌های پس از جلسه.</>,
                <>انجام انحصاری توسط پزشک متخصص با دستگاه اصلی <LatinToken>Eufoton</LatinToken> ایتالیا.</>,
              ]}
            />
          </div>

          <AftercareCard
            items={[
              <>تا ۴۸ ساعت از شستن یا ماساژ نواحی درمان‌شده خودداری کنید.</>,
              <>تا یک هفته از سونا، جکوزی، آفتاب مستقیم و فعالیت‌های ورزشی سنگین پرهیز شود.</>,
              <>استفاده روزانه از ضدآفتاب با <LatinToken>SPF</LatinToken> بالا تا چند هفته الزامی است.</>,
              <>نتیجه نهایی به‌صورت تدریجی طی ۶ تا ۱۲ هفته خود را نشان می‌دهد.</>,
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}