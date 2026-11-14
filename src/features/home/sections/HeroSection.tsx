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
        <div className="mb-space-lg flex flex-wrap items-center justify-between gap-space-sm">
          <div
            {...enter({ delay: 80 })}
            className="inline-flex items-center gap-space-xs rounded-full bg-brand-bg-alt px-space-md py-1 text-brand-dark-green"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 animate-ping rounded-full bg-brand-dark-green"
            />
            <span className="font-body text-label-sm font-bold uppercase tracking-wider">
              {t("badge")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-gutter-lg">
          <div className="flex flex-col items-start pe-0 lg:col-span-7 lg:pe-space-md rtl:lg:col-start-6">
            <div className="relative">
              <h1
                id="hero-title"
                {...enter({ delay: 200 })}
                className="mb-space-lg font-display text-headline-xl leading-[1.08] tracking-tight text-brand-dark-green md:text-display-hero"
              >
                {t("titleLine1Start")}{" "}
                <span className="hero-title-growth text-brand-dark-orange relative">
                  <span
                    aria-hidden="true"
                    className="hero-growth-effect absolute -right-10 -top-4 w-16 bg-center bg-cover aspect-254/310"
                    style={{ backgroundImage: "url(/hero/growth/effect.png)" }}
                  ></span>
                  <span
                    aria-hidden="true"
                    className="hero-growth-underline absolute right-0 bottom-0 w-full bg-center bg-cover aspect-2172/724"
                    style={{ backgroundImage: "url(/hero/growth/underline.png)" }}
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
        className="hero-layers pointer-events-none absolute bottom-0 left-165 aspect-1099/941 w-165 z-0 max-[850px]:relative max-[850px]:right-default max-[850px]:bottom-auto xl:px-4 max-[850px]:left-auto xl:left-auto xl:right-0 max-[850px]:w-[80vw] max-[850px]:m-auto"
      >
        {HERO_LAYER_IMAGES.map((src) => {
          const layer = Number(src.replace(/\D/g, ""));

          return (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              unoptimized
              sizes="(min-width: 1280px) 38vw, (min-width: 1024px) 40vw, (min-width: 640px) 56vw, 74vw"
              className={`hero-layer hero-layer-${layer} object-contain`}
            />
          );
        })}
      </div>
      <HeroImageReveal />
    </section>
  );
}
