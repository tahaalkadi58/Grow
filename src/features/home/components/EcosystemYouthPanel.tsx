'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';
import { ResilientImage } from '@/components/ui/ResilientImage';
import { youthFocusTags } from '@/features/home/data/content';
import { IMAGES } from '@/lib/constants';

export function EcosystemYouthPanel() {
  const t = useTranslations('Ecosystem.youth');

  return (
    <article className="flex flex-col justify-between rounded-3xl border border-brand-bg-alt bg-brand-white max-sm:p-space-md sm:p-space-xl shadow-sm md:p-space-2xl">
      <div>
        <div className="mb-space-lg flex items-center justify-between gap-space-md">
          <div className="inline-flex items-center gap-space-xs rounded-full bg-brand-bg-alt px-3.5 py-1.5 font-body text-label-md font-bold text-brand-dark-orange">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brand-dark-orange" />
            <span>{t('badge')}</span>
          </div>
          <span className="font-body text-label-sm font-semibold uppercase tracking-wider text-brand-text/60">
            {t('mandate')}
          </span>
        </div>

        <h3 className="mb-space-sm font-display text-headline-lg text-brand-text">{t('title')}</h3>
        <p className="mb-space-lg font-body text-body-md leading-relaxed text-brand-text/80">
          {t('description')}
        </p>

        <div className="mb-space-lg">
          <div className="mb-space-sm font-body text-label-sm font-bold uppercase tracking-wider text-brand-text">
            {t('focusLabel')}
          </div>
          <div className="flex flex-wrap gap-2">
            {youthFocusTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-brand-bg-alt bg-brand-bg px-3 py-1 font-body text-label-sm text-brand-text"
              >
                {t(`tags.${tag}`)}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mb-space-lg aspect-video overflow-hidden rounded-2xl border border-brand-bg-alt bg-brand-bg-alt shadow-sm">
          <ResilientImage
            src={IMAGES.youth}
            fallbackSrc={IMAGES.hero}
            alt={t('imageAlt')}
            fill
            unoptimized
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div className="absolute bottom-2 start-2 rounded-full bg-brand-text/90 px-3 py-1 font-body text-label-sm font-medium text-brand-white backdrop-blur-sm">
            {t('imageCaption')}
          </div>
        </div>
      </div>

      <div className="pt-space-md">
        <Button href="#" variant="orange" fullWidth icon="arrow_forward">
          {t('cta')}
        </Button>
      </div>
    </article>
  );
}
