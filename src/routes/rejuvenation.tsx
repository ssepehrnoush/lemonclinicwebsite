import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import {
  AftercareCard,
  BrandStrip,
  FeatureList,
  LatinToken,
  SectionTitle,
  ServiceHero,
} from "@/components/service-page";
import mesogelAsset from "@/assets/mesogel.jpg.asset.json";

export const Route = createFileRoute("/rejuvenation")({
  head: () => ({
    meta: [
      { title: "جوانسازی پیشرفته لمون | LEMON Rejuvenation" },
      { name: "description", content: "جوانسازی پیشرفته لمون با مزوژل‌های جهانی، برند وال لوکس و مراقبت‌های پس از درمان." },
      { property: "og:title", content: "جوانسازی پیشرفته با برترین برندهای جهانی" },
      { property: "og:description", content: "Profhilo، Jalupro، Vitten، Mesolike و Fusion در تجربه جوانسازی لمون." },
    ],
  }),
  component: RejuvenationPage,
});

function RejuvenationPage() {
  return (
    <Layout>
      <ServiceHero
        label="لاین جوانسازی"
        title="جوانسازی پیشرفته با برترین برندهای جهانی"
        image={mesogelAsset.url}
        alt="جوانسازی با برندهای جهانی در لمون"
        objectPosition="right center"
      />

      <section className="px-6 pb-[clamp(80px,12vw,160px)] pt-[clamp(56px,8vw,112px)]">
        <div className="mx-auto max-w-[1200px] space-y-16">
          <div>
            <SectionTitle eyebrow="برند وال" title="فهرست نام‌های ممتاز جوانسازی" centered />
            <div className="mt-8">
              <BrandStrip
                items={["Profhilo", "Jalupro", "Vitten", "Mesolike", "Fusion"]}
                caption="معتبرترین و پیشرفته‌ترین مزوژل‌ها و کوکتل‌های جوانساز دنیا"
                badge={<>استعلام اصالت <LatinToken>TTAC</LatinToken></>}
              />
            </div>
          </div>

          <div>
            <SectionTitle eyebrow="ویژگی‌ها" title="لوکس‌ترین لاین جوانسازی لمون" />
            <FeatureList
              items={[
                <>استفاده اختصاصی از معتبرترین و پیشرفته‌ترین مزوژل‌ها و کوکتل‌های جوانساز دنیا از جمله پروفایلو (<LatinToken>Profhilo</LatinToken>)، جالوپرو (<LatinToken>Jalupro</LatinToken>)، ویتن (<LatinToken>Vitten</LatinToken>)، مزولایک (<LatinToken>Mesolike</LatinToken>) و فیوژن (<LatinToken>Fusion</LatinToken>).</>,
                <>اصالت کالا: پایبندی مطلق به سلامت مراجعین با اجرای پروتکل استعلام آنلاین و آنی اصالت تمامی محصولات از طریق سامانه رسمی <LatinToken>TTAC</LatinToken> وزارت بهداشت در حضور شما.</>,
                <>هیدراتاسیون فوق‌العاده، لیفت طبیعی، رفع چین‌وچروک‌ها و بهبود آنی کیفیت و قوام پوست.</>,
                <>تزریق متریال اصلی و اورجینال با تکنیک‌های دقیق کلینیکال جهت دست‌یابی به ماندگارترین و طبیعی‌ترین نتایج جوانسازی.</>,
              ]}
            />
          </div>

          <AftercareCard
            items={[
              <>برجستگی‌های کوچک احتمالی در محل تزریق (پاپول‌ها) را اصلاً ماساژ ندهید تا طبیعی جذب پوست شوند.</>,
              <>تا ۲۴ ساعت از شستن صورت و استفاده از لوازم آرایشی خودداری کنید.</>,
              <>تا ۴۸ ساعت دوش آب داغ، سونا، جکوزی و ورزش‌های سنگین تعرق‌آور را عقب بیندازید.</>,
              <>در روزهای اول آب فراوان بنوشید؛ مواد جوانساز (هیالورونیک اسید) برای بازدهی و شفافیت حداکثری نیاز به جذب آب دارند.</>,
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}