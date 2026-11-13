'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';
import { plusFocusTags } from '@/features/home/data/content';

export function EcosystemPlusPanel() {
  const t = useTranslations('Ecosystem.plus');

  return (
    <article className="flex flex-col justify-between rounded-3xl border border-brand-bg-alt bg-brand-white p-space-xl shadow-sm md:p-space-2xl">
      <div>
        <div className="mb-space-lg flex items-center justify-between gap-space-md">
          <div className="inline-flex items-center gap-space-xs rounded-full bg-brand-bg-alt px-3.5 py-1.5 font-body text-label-md font-bold text-brand-dark-green">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brand-dark-green" />
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

        <div className="mb-space-xl">
          <div className="mb-space-sm font-body text-label-sm font-bold uppercase tracking-wider text-brand-text">
            {t('focusLabel')}
          </div>
          <div className="flex flex-wrap gap-2">
            {plusFocusTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-brand-bg-alt bg-brand-bg px-3 py-1 font-body text-label-sm text-brand-text"
              >
                {t(`tags.${tag}`)}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-space-lg rounded-2xl border border-brand-bg-alt bg-brand-bg p-space-md">
          <div className="mb-1 flex items-center justify-between font-body text-body-sm">
            <span className="font-bold text-brand-dark-green">{t('retention.label')}</span>
            <span className="font-bold text-brand-text">{t('retention.value')}</span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={92}
            aria-label={t('retention.label')}
            className="h-2 w-full overflow-hidden rounded-full bg-brand-bg-alt"
          >
            <div className="h-full w-[92%] rounded-full bg-brand-dark-green" />
          </div>
          <div className="mt-1.5 text-xs text-brand-text/70">{t('retention.description')}</div>
        </div>
      </div>

      <div className="pt-space-md">
        <Button href="#" variant="green" fullWidth icon="arrow_forward">
          {t('cta')}
        </Button>
      </div>
    </article>
  );
}
