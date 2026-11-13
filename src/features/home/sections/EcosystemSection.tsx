'use client';

import { useTranslations } from 'next-intl';

import { Container } from '@/components/ui/Container';
import { Overline } from '@/components/ui/Overline';
import { cn } from '@/lib/utils';
import { SECTION_IDS } from '@/lib/constants';

import { EcosystemPlusPanel } from '../components/EcosystemPlusPanel';
import { EcosystemYouthPanel } from '../components/EcosystemYouthPanel';
import { useEcosystem } from '../components/EcosystemProvider';
import type { EcosystemView } from '../types';

const viewOptions: readonly { id: EcosystemView; labelKey: 'plus' | 'youth' }[] = [
  { id: 'plus', labelKey: 'plus' },
  { id: 'youth', labelKey: 'youth' },
];

export function EcosystemSection() {
  const t = useTranslations('Ecosystem');
  const { view, setView } = useEcosystem();

  return (
    <section
      id={SECTION_IDS.ecosystem}
      aria-labelledby="ecosystem-title"
      className="relative w-full bg-brand-bg-alt py-space-3xl"
    >
      

      <Container className="relative">
        <div className="mx-auto mb-space-xl max-w-2xl text-center">
          <Overline className="text-brand-dark-green">{t('overline')}</Overline>
          <h2
            id="ecosystem-title"
            className="mb-space-sm mt-space-xs font-display text-headline-xl text-brand-text"
          >
            {t('title')}
          </h2>
          <p className="font-body text-body-lg text-brand-text/80">{t('description')}</p>

          <div
            role="group"
            aria-label={t('viewLabel')}
            className="mt-space-lg inline-flex flex-wrap items-center justify-center gap-1 rounded-2xl border border-brand-bg-alt bg-brand-white p-1.5 shadow-sm sm:flex-nowrap sm:rounded-full"
          >
            {viewOptions.map((option) => {
              const isActive = view === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setView(option.id)}
                  className={cn(
                    'rounded-full px-space-sm py-space-xs font-body text-label-md font-semibold transition-all sm:px-space-md',
                    isActive
                      ? 'bg-brand-text text-brand-white shadow-sm'
                      : 'text-brand-text/75 hover:text-brand-text',
                  )}
                >
                  {t(`views.${option.labelKey}`)}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={cn(
            'grid grid-cols-1 items-stretch gap-gutter-lg transition-all duration-300',
             'mx-auto max-w-3xl',
          )}
        >
          <div className={cn(view === 'youth' && 'hidden')}>
            <EcosystemPlusPanel />
          </div>
          <div className={cn(view === 'plus' && 'hidden')}>
            <EcosystemYouthPanel />
          </div>
        </div>
      </Container>
    </section>
  );
}
