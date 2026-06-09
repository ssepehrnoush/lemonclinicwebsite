import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { SectionTitle, ServiceHero } from "@/components/service-page";
import { useReveal } from "@/components/useReveal";
import ba01 from "@/assets/ba/ba_01.jpg.asset.json";
import ba02 from "@/assets/ba/ba_02.jpg.asset.json";
import ba03 from "@/assets/ba/ba_03.jpg.asset.json";
import ba04 from "@/assets/ba/ba_04.jpg.asset.json";
import ba05 from "@/assets/ba/ba_05.jpg.asset.json";
import ba06 from "@/assets/ba/ba_06.jpg.asset.json";
import ba07 from "@/assets/ba/ba_07.jpg.asset.json";
import ba08 from "@/assets/ba/ba_08.jpg.asset.json";
import ba09 from "@/assets/ba/ba_09.jpg.asset.json";
import ba10 from "@/assets/ba/ba_10.jpg.asset.json";
import ba11 from "@/assets/ba/ba_11.jpg.asset.json";
import ba12 from "@/assets/ba/ba_12.jpg.asset.json";
import ba13 from "@/assets/ba/ba_13.jpg.asset.json";
import ba14 from "@/assets/ba/ba_14.jpg.asset.json";
import ba15 from "@/assets/ba/ba_15.jpg.asset.json";
import ba16 from "@/assets/ba/ba_16.jpg.asset.json";
import ba17 from "@/assets/ba/ba_17.jpg.asset.json";
import ba18 from "@/assets/ba/ba_18.jpg.asset.json";
import ba19 from "@/assets/ba/ba_19.jpg.asset.json";
import ba20 from "@/assets/ba/ba_20.jpg.asset.json";
import ba21 from "@/assets/ba/ba_21.jpg.asset.json";
import ba22 from "@/assets/ba/ba_22.jpg.asset.json";
import ba23 from "@/assets/ba/ba_23.jpg.asset.json";
import ba24 from "@/assets/ba/ba_24.jpg.asset.json";
import ba25 from "@/assets/ba/ba_25.jpg.asset.json";
import ba26 from "@/assets/ba/ba_26.jpg.asset.json";
import ba27 from "@/assets/ba/ba_27.jpg.asset.json";
import ba28 from "@/assets/ba/ba_28.jpg.asset.json";
import ba29 from "@/assets/ba/ba_29.jpg.asset.json";
import ba30 from "@/assets/ba/ba_30.jpg.asset.json";
import ba31 from "@/assets/ba/ba_31.jpg.asset.json";
import ba32 from "@/assets/ba/ba_32.jpg.asset.json";
import ba33 from "@/assets/ba/ba_33.jpg.asset.json";
import ba34 from "@/assets/ba/ba_34.jpg.asset.json";
import ba35 from "@/assets/ba/ba_35.jpg.asset.json";
import ba36 from "@/assets/ba/ba_36.jpg.asset.json";
import ba37 from "@/assets/ba/ba_37.jpg.asset.json";
import ba38 from "@/assets/ba/ba_38.jpg.asset.json";

export const Route = createFileRoute("/before-after")({
  head: () => ({
    meta: [
      { title: "گالری قبل و بعد درمان‌ها | کلینیک لمون" },
      { name: "description", content: "نتایج واقعی درمان‌های زیبایی، فیشال، لیفت، لیزر و فیلر در کلینیک لمون — گالری تصاویر قبل و بعد." },
      { property: "og:title", content: "گالری قبل و بعد — کلینیک لمون" },
      { property: "og:description", content: "تصاویر واقعی از نتایج درمان‌های انجام شده در کلینیک لمون." },
      { property: "og:url", content: "https://lemonclinicwebsite.lovable.app/before-after" },
      { property: "og:image", content: ba01.url },
    ],
    links: [{ rel: "canonical", href: "https://lemonclinicwebsite.lovable.app/before-after" }],
  }),
  component: BeforeAfterPage,
});

const gallery = [
  ba01, ba02, ba03, ba04, ba05, ba06, ba07, ba08, ba09, ba10,
  ba11, ba12, ba13, ba14, ba15, ba16, ba17, ba18, ba19, ba20,
  ba21, ba22, ba23, ba24, ba25, ba26, ba27, ba28, ba29, ba30,
  ba31, ba32, ba33, ba34, ba35, ba36, ba37, ba38,
];

function GalleryItem({ src, index }: { src: string; index: number }) {
  const ref = useReveal<HTMLDivElement>((index % 6) * 80);
  return (
    <div
      ref={ref}
      className="reveal group relative mb-5 block w-full overflow-hidden rounded-[18px] break-inside-avoid transition-transform duration-700 ease-out hover:-translate-y-1"
      style={{
        border: "1px solid var(--line)",
        boxShadow: "0 20px 60px rgba(43,38,32,0.12), inset 0 0 0 1px rgba(255,246,204,0.06)",
      }}
    >
      <img
        src={src}
        alt={`نتیجه قبل و بعد درمان ${index + 1} — کلینیک لمون`}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ boxShadow: "inset 0 0 80px rgba(244,230,146,0.07)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "linear-gradient(to top, rgba(4,19,15,0.55), transparent)" }}
      />
    </div>
  );
}

function BeforeAfterPage() {
  return (
    <Layout>
      <ServiceHero
        label="گالری نتایج"
        title="قبل و بعد درمان‌ها"
        description={
          <>
            هر تصویر در این گالری، روایتی واقعی از یک مراجعه‌کننده کلینیک لمون است؛ نتایجی که با
            پروتکل‌های شخصی‌سازی‌شده، تجهیزات روز و دستان متخصصان ما به دست آمده‌اند. در ادامه می‌توانید
            بخشی از این روایت‌ها را در قاب‌هایی طلایی کنار هم ببینید.
          </>
        }
        image={ba01.url}
        alt="گالری قبل و بعد کلینیک لمون"
        centered
      />

      <section className="px-4 pb-[clamp(80px,12vw,160px)] pt-[clamp(40px,6vw,80px)] sm:px-6">
        <div className="mx-auto max-w-[1280px]">
          <SectionTitle
            eyebrow="نتایج واقعی"
            title="روایتی تصویری از تغییرات ماندگار"
            centered
          />
          <p className="reveal mx-auto mt-6 max-w-[62ch] text-center text-[14px] leading-8 text-[var(--ink-soft)]">
            تمامی تصاویر با رضایت مراجعان و در شرایط نوری یکسان ثبت شده‌اند. نتایج هر فرد بسته به نوع
            پوست، سبک زندگی و پروتکل درمانی می‌تواند متفاوت باشد.
          </p>

          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-3 [column-fill:_balance]">
            {gallery.map((img, i) => (
              <GalleryItem key={img.asset_id} src={img.url} index={i} />
            ))}
          </div>

          <div className="mt-16 text-center text-[12px] tracking-[0.32em] text-[var(--ink-soft)]">
            <span className="inline-block h-px w-16 align-middle bg-gold-gradient" />
            <span className="mx-4">LEMON CLINIC · BEFORE & AFTER</span>
            <span className="inline-block h-px w-16 align-middle bg-gold-gradient" />
          </div>
        </div>
      </section>
    </Layout>
  );
}