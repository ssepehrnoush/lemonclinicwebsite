import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import {
  AftercareCard,
  FeatureList,
  LatinToken,
  NumberedEditorialList,
  SectionTitle,
  ServiceHero,
} from "@/components/service-page";
import facialAsset from "@/assets/facial.jpg.asset.json";

export const Route = createFileRoute("/facial")({
  head: () => ({
    meta: [
      { title: "لاین تخصصی فیشال و درمال | LEMON Facial" },
      { name: "description", content: "فیشال و درمال تخصصی لمون با لاین‌های درمانی، محصولات اکلادو و مراقبت‌های پس از درمان." },
      { property: "og:title", content: "لاین تخصصی فیشال و درمال" },
      { property: "og:description", content: "فیشال و درمان پوستی با رویکرد ژورنال-ادیتوریال و درمانی در لمون." },
      { property: "og:url", content: "https://lemonclinicwebsite.lovable.app/facial" },
    ],
    links: [{ rel: "canonical", href: "https://lemonclinicwebsite.lovable.app/facial" }],
  }),
  component: FacialPage,
});

function FacialPage() {
  return (
    <Layout>
      <ServiceHero
        label="لاین تخصصی"
        title="لاین تخصصی فیشال و درمال"
        image={facialAsset.url}
        alt="فیشال و درمال لمون"
        objectPosition="right center"
      />

      <section className="px-6 pb-[clamp(80px,12vw,160px)] pt-[clamp(56px,8vw,112px)]">
        <div className="mx-auto max-w-[1200px] space-y-16">
          <div>
            <SectionTitle eyebrow="ارزش‌های اصلی" title="پروتکل تخصصی مراقبت و احیای پوست" />
            <FeatureList
              items={[
                <>استفاده انحصاری از محصولات تخصصی و فوق‌العاده باکیفیت برند اکلادو (<LatinToken>Eclado</LatinToken>) کره جنوبی.</>,
                <>ارائه پکیج‌های تخصصی جوانسازی، کربوکسی‌تراپی و پلاژن‌تراپی متناسب با نیاز و درمان انواع پوست.</>,
                <>احیای عمقی پوست با بهره‌گیری از پیشرفته‌ترین متدها و تجهیزات روز دنیا برای لاین‌های درمانی و زیبایی.</>,
                <>فضایی کاملاً آرام، راحت و استاندارد، طراحی‌شده برای ایجاد نهایت آرامش و رفع استرس‌های روزمره.</>,
                <>همراه با ماساژ اختصاصی و ریلکسی صورت و دکلته جهت بهبود گردش خون، لیفت پوست و خلق یک حس ناب و ماندگار.</>,
              ]}
            />
          </div>

          <div>
            <SectionTitle eyebrow="لاین‌های تخصصی" title="فهرست درمان‌ها به روایت یک ژورنال زیبایی" />
            <NumberedEditorialList
              items={[
                { number: "۰۱", title: "پاکسازی و مراقبت‌های پایه", description: <>لایه‌برداری و حذف جوش و آکنه همراه با ماساژ صورت، آبرسانی عمقی پوست و ضدعفونی توسط دستگاه هایفرکوئنسی (امکان افزودن بخش گردن و دکلته یا دور چشم).</> },
                { number: "۰۲", title: "هیدراتراپی", description: <>افزایش رطوبت و شادابی پوست با سرم‌ها و ماسک‌های تخصصی جهت رفع خشکی و تقویت سد دفاعی پوست.</> },
                { number: "۰۳", title: "کنترل آکنه و چربی", description: <>تنظیم ترشحات چربی پوست و کاهش التهابات ناشی از آکنه با فرمول‌های ضد باکتری و تسکین‌دهنده.</> },
                { number: "۰۴", title: "روشن‌کننده و ضد لک", description: <>کاهش لک‌های پوستی و یکنواخت‌سازی رنگ پوست با ترکیبات ویتامینه.</> },
                { number: "۰۵", title: "ریفورم و لیفت صورت", description: <>لیفت غیر‌تهاجمی، سفت‌کنندگی پوست، جوانسازی و کانتور صورت.</> },
                { number: "۰۶", title: "لاین ترکیبی درمانی زیر نظر پزشک", description: <>پروتکل درمانی شخصی‌سازی شده با ترکیب چند روش تخصصی تحت نظارت مستقیم پزشک.</> },
              ]}
            />
          </div>

          <AftercareCard
            items={[
              <>از دستکاری، لمس یا فشار دادن پوست صورت کاملاً خودداری فرمایید.</>,
              <>تا ۸ ساعت اول به صورت آب نزنید و از هیچ لوازم آرایشی استفاده نکنید تا مواد مغذی کاملاً جذب شوند.</>,
              <>دوش آب داغ، سونا و ورزش‌های سنگین را به روزهای بعد موکول کنید.</>,
              <>استفاده منظم از ضدآفتاب فاقد چربی الزامی است.</>,
              <>حداقل تا ۴ روز از اصلاح صورت (بند، وکس یا شیو) و اسکراب‌های خانگی خودداری کنید.</>,
              <>نوشیدن آب فراوان توصیه می‌شود.</>,
            ]}
            note={<>توجه: بروز قرمزی خفیف یا بیرون ریختن جوش‌های ریز تا ۴۸ ساعت، نشانه طبیعی سم‌زدایی عمقی پوست است و برطرف می‌شود.</>}
          />
        </div>
      </section>
    </Layout>
  );
}