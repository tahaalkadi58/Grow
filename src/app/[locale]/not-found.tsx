'use client';

import { useTranslations } from 'next-intl';

import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <main id="main-content" className="w-full bg-brand-bg">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-space-3xl text-center">
        <p className="font-display text-display-hero text-brand-dark-orange">404</p>
        <h1 className="mt-space-sm font-display text-headline-xl text-brand-text">{t('title')}</h1>
        <p className="mt-space-sm max-w-md font-body text-body-lg text-brand-text/80">
          {t('description')}
        </p>
        <Link
          href="/"
          className="group mt-space-xl inline-flex items-center justify-center gap-space-sm rounded-full bg-grow-green px-7 py-3.5 font-body text-label-lg text-brand-white shadow-md transition-all hover:opacity-95"
        >
          <span>{t('cta')}</span>
          <Icon
            name="arrow_forward"
            size={18}
            directional
            className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          />
        </Link>
      </Container>
    </main>
  );
}
