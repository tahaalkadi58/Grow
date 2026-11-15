import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Overline } from "@/components/ui/Overline";
import { impactMetrics } from "@/features/home/data/content";
import { SECTION_IDS } from "@/lib/constants";
import { reveal, staggerItem } from "@/lib/motion";

export async function ImpactSection() {
  const t = await getTranslations("Impact");

  return (
    <section
      id={SECTION_IDS.impact}
      aria-labelledby="impact-title"
      className="w-full bg-brand-text py-space-3xl text-brand-white"
    >
      <Container>
        <div className="mb-space-2xl flex flex-col justify-between gap-space-lg md:flex-row md:items-end">
          <div {...reveal()}>
            <Overline className="text-brand-light-green">
              {t("overline")}
            </Overline>
            <h2
              id="impact-title"
              className="mt-space-xs font-display text-headline-xl text-brand-white"
            >
              {t("title")}
            </h2>
          </div>
          <p
            {...reveal({ delay: 110 })}
            className="max-w-md font-body text-body-md text-brand-white/75"
          >
            {t("description")}
          </p>
        </div>

        <div className="mb-space-2xl grid grid-cols-1 gap-gutter-lg sm:grid-cols-2 lg:grid-cols-4">
          {impactMetrics.map((metric, index) => (
            <article
              key={metric.id}
              {...staggerItem(index)}
              className="flex flex-col flex-start rounded-3xl border border-brand-white/10 bg-brand-white/5 p-space-xl"
            >
              <div
                className={`mb-space-lg flex items-center justify-between ${metric.accentClassName}`}
              >
                <span className="font-body text-label-sm font-bold uppercase">
                  {t(`metrics.${metric.id}.label`)}
                </span>
                <Icon name={metric.icon} size={64} />
              </div>
              <div>
                <div
                  className={`mb-space-xs font-display text-display-hero leading-none ${metric.valueClassName}`}
                >
                  {t(`metrics.${metric.id}.value`)}
                </div>
                <h3 className="font-display text-headline-sm leading-snug text-brand-white">
                  {t(`metrics.${metric.id}.title`)}
                </h3>
                <p className="mt-2 font-body text-body-sm text-brand-white/70">
                  {t(`metrics.${metric.id}.description`)}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* <div className="flex flex-col items-center justify-between gap-space-md rounded-2xl border border-brand-white/10 bg-brand-white/5 p-space-lg md:flex-row">
          <div className="flex items-center gap-space-md">
            <Icon
              name="policy"
              size={28}
              className="shrink-0 text-brand-light-green"
            />
            <div>
              <div className="font-body text-label-lg font-semibold text-brand-white">
                {t("assurance.title")}
              </div>
              <div className="font-body text-body-sm text-brand-white/70">
                {t("assurance.description")}
              </div>
            </div>
          </div>
          <a
            href="#"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-white px-space-md py-space-sm font-body text-label-md font-bold text-brand-text transition-colors hover:bg-brand-bg-alt"
          >
            <Icon name="download" size={18} />
            <span>{t("assurance.cta")}</span>
          </a>
        </div> */}
      </Container>
    </section>
  );
}
