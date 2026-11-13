import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Overline } from '@/components/ui/Overline';
import { pillars } from '@/features/home/data/content';
import { IMAGES, SECTION_IDS } from '@/lib/constants';

export async function AboutSection() {
  const t = await getTranslations('About');

  return (
    <section
      id={SECTION_IDS.about}
      aria-labelledby="about-title"
      className="relative w-full bg-brand-bg-alt py-space-3xl"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute end-0 top-12 h-96 w-96 text-brand-dark-green/10"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M20,100 C60,40 140,160 180,90"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="180" cy="90" r="16" fill="#73AC43" fillOpacity="0.18" />
        </svg>
      </div>

      <Container className="relative">
        <div className="mb-space-2xl flex flex-col justify-between gap-space-md md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Overline className="text-brand-dark-green">{t('overline')}</Overline>
            <h2 id="about-title" className="mt-space-xs font-display text-headline-xl text-brand-text">
              {t('title')}
            </h2>
          </div>
          <p className="max-w-md font-body text-body-lg text-brand-text/80">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-gutter-lg lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-space-md lg:col-span-7">
            <div className="rounded-3xl border border-brand-bg-alt bg-brand-white p-space-xl shadow-sm">
              <div className="mb-space-md flex items-center gap-space-sm">
                <span aria-hidden="true" className="h-3 w-3 rounded-full bg-brand-dark-orange" />
                <h3 className="font-display text-headline-md text-brand-text">{t('pillarsTitle')}</h3>
              </div>
              <p className="mb-space-lg font-body text-body-md text-brand-text/80">
                {t('pillarsDescription')}
              </p>

              <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.id}
                    className={`rounded-2xl border border-brand-bg-alt bg-brand-bg p-space-md transition-colors hover:bg-brand-bg-alt ${
                      pillar.id === 'socialInnovation' ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div
                      className={`mb-1 flex items-center gap-space-sm font-body ${pillar.accentClassName}`}
                    >
                      <Icon name={pillar.icon} size={20} />
                      <span className="text-label-lg font-bold">{t(`pillars.${pillar.id}.title`)}</span>
                    </div>
                    <p className="font-body text-body-sm text-brand-text/75">
                      {t(`pillars.${pillar.id}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-space-md rounded-2xl bg-brand-dark-green p-space-lg text-brand-white sm:flex-row sm:items-center">
              <div>
                <div className="font-body text-label-sm font-bold uppercase tracking-widest text-brand-light-green">
                  {t('banner.eyebrow')}
                </div>
                <div className="mt-0.5 font-display text-headline-sm text-brand-white">
                  {t('banner.title')}
                </div>
              </div>
              <a
                href={`#${SECTION_IDS.ecosystem}`}
                className="group inline-flex items-center gap-1 font-body text-label-md font-semibold text-brand-light-green hover:underline"
              >
                <span>{t('banner.cta')}</span>
                <Icon
                  name="arrow_forward"
                  size={16}
                  directional
                  className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-3xl border border-brand-bg-alt bg-brand-white p-3 shadow-sm">
              <div className="relative mb-space-md aspect-square overflow-hidden rounded-2xl bg-brand-bg-alt">
                <Image
                  src={IMAGES.portrait}
                  alt={t('imageAlt')}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute start-4 top-4 rounded-full bg-brand-white/90 px-3 py-1.5 font-body text-label-sm font-bold text-brand-dark-green shadow-sm backdrop-blur-md">
                  {t('imageBadge')}
                </div>
              </div>

              <div className="rounded-2xl border border-brand-bg-alt bg-brand-bg p-space-lg">
                <div className="mb-2 flex items-center gap-space-xs text-brand-dark-orange">
                  <Icon name="format_quote" size={20} />
                  <span className="font-body text-label-sm font-bold uppercase tracking-wider">
                    {t('quoteEyebrow')}
                  </span>
                </div>
                <blockquote className="mb-space-sm font-display text-headline-md italic leading-snug text-brand-text rtl:not-italic">
                  {t('quote')}
                </blockquote>
                <div className="flex items-center gap-space-sm pt-space-xs font-body text-label-md text-brand-text/80">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-dark-green" />
                  <span>{t('quoteAttribution')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
