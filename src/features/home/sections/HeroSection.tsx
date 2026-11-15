import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { HeroActions } from "@/features/home/components/HeroActions";
import { HeroImageReveal } from "@/features/home/components/HeroImageReveal";
import { HERO_LAYER_IMAGES } from "@/lib/constants";
import { enter } from "@/lib/motion";

export async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section
      aria-labelledby="hero-title"
      className="relative z-10 w-full overflow-hidden bg-brand-bg pt-6"
    >
      <div className="relative z-10 mx-auto w-full max-w-350 px-margin md:px-margin-md lg:px-margin-lg">
        <div className="mb-space-lg flex flex-wrap max-[767px]:[visibility:hidden] items-center justify-start gap-space-sm rtl:justify-end">
          <div
            {...enter({ delay: 80 })}
            className="inline-flex items-center gap-space-xs  z-10 rounded-full bg-brand-bg-alt px-space-md py-1 text-brand-dark-green"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 animate-ping rounded-full bg-brand-dark-green"
            />
            <span className="font-body text-label-sm font-bold uppercase tracking-wider rtl:normal-case rtl:tracking-normal">
              {t("badge")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-gutter-lg">
          <div className="flex flex-col items-start pe-0 lg:col-span-7 lg:pe-space-md rtl:lg:col-start-1">
            <div className="relative">
              <h1
                id="hero-title"
                {...enter({ delay: 200 })}
                className="mb-space-lg font-display text-headline-xl leading-[1.3] tracking-tight text-brand-dark-green md:text-display-hero"
              >
                {t("titleLine1Start")}{" "}
                <span className="hero-title-growth text-brand-dark-orange relative">
                  <span
                    aria-hidden="true"
                    className="hero-growth-effect absolute top-[-0.35em] w-[0.85em] aspect-254/310 bg-center bg-cover ltr:right-[-0.55em] rtl:left-[-0.55em] rtl:top-0 rtl:scale-x-[-1]"
                    style={{ backgroundImage: "url(/hero/growth/effect.png)" }}
                  ></span>
                  <span
                    aria-hidden="true"
                    className="hero-growth-underline absolute right-0 bottom-0 w-full bg-center bg-cover aspect-2172/724"
                    style={{
                      backgroundImage: "url(/hero/growth/underline.png)",
                    }}
                  ></span>
                  {t("titleGrowth")}
                </span>
                <br />
                {t("titleLine2")}
                <br />
                {t("titleLine3")}
              </h1>
            </div>

            <p
              {...enter({ delay: 340 })}
              className="mb-space-xl max-w-xl font-body text-body-xl leading-relaxed text-brand-text/80"
            >
              {t("description")}
            </p>

            <HeroActions />

            {/* <div className="w-full rounded-2xl border border-brand-bg-alt bg-brand-bg-alt p-space-md shadow-sm">
              <dl className="grid grid-cols-3 gap-space-md">
                {heroStats.map((stat) => (
                  <div key={stat.id} className="flex min-w-0 flex-col">
                    <dt
                      className={`font-body text-label-sm font-bold uppercase tracking-wider ${stat.accentClassName}`}
                    >
                      {t(`stats.${stat.id}.label`)}
                    </dt>
                    <dd className="mt-1 font-display text-headline-lg leading-none text-brand-text">
                      {t(`stats.${stat.id}.value`)}
                    </dd>
                    <dd className="mt-1 font-body text-body-sm text-brand-text/75">
                      {t(`stats.${stat.id}.detail`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div> */}
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        data-reveal="fade-in"
        className="hero-layers pointer-events-none rtl:scale-x-[-1] absolute bottom-0 aspect-1099/941 w-165 z-0 ltr:left-165 rtl:right-165 max-[850px]:relative max-[850px]:bottom-auto max-[850px]:!left-auto max-[850px]:!right-auto xl:px-4 ltr:xl:left-auto rtl:xl:right-auto ltr:xl:right-0 rtl:xl:left-0 max-[850px]:w-[80vw] max-[850px]:!mx-auto"
      >
        {HERO_LAYER_IMAGES.map((src) => {
          const layer = Number(src.replace(/\D/g, ""));
          const layerClass = `hero-layer-${layer}`;

          return (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes="(max-width: 850px) 80vw, 660px"
              className={`hero-layer ${layerClass} object-contain`}
            />
          );
        })}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 z-0 aspect-1099/941 w-screen max-w-none left-1/2 -translate-x-1/2 min-[851px]:left-auto min-[851px]:right-auto rtl:scale-x-[-1] min-[851px]:translate-x-0 min-[851px]:w-[850px] min-[851px]:max-w-[850px] min-[851px]:ltr:right-0 min-[851px]:rtl:left-0"
      >
        <Image
          src="/hero/1.svg"
          alt=""
          fill
          sizes="(max-width: 850px) 100vw, 850px"
          className="object-contain"
        />
      </div>
      <HeroImageReveal />
    </section>
  );
}
