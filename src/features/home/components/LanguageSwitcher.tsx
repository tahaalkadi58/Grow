'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const t = useTranslations('Common.language');
  const locale = useLocale();
  const pathname = usePathname();

  const linkClasses = (isActive: boolean) =>
    cn(
      'rounded-full px-1 py-0.5 transition-colors',
      isActive ? 'font-bold text-brand-light-orange' : 'font-medium text-brand-text/70 hover:text-brand-text',
    );

  return (
    <div
      role="group"
      aria-label={t('label')}
      className="inline-flex items-center rounded-full bg-brand-bg-alt px-space-sm py-space-xs font-body text-label-sm"
    >
      <Link
        href={pathname}
        locale="en"
        aria-label={t('switchToEnglish')}
        aria-current={locale === 'en' ? 'true' : undefined}
        className={linkClasses(locale === 'en')}
      >
        <span lang="en" dir="ltr">
          {t('english')}
        </span>
      </Link>
      <span aria-hidden="true" className="mx-1 text-brand-text/40">
        |
      </span>
      <Link
        href={pathname}
        locale="ar"
        aria-label={t('switchToArabic')}
        aria-current={locale === 'ar' ? 'true' : undefined}
        className={linkClasses(locale === 'ar')}
      >
        <span lang="ar" dir="rtl">
          {t('arabic')}
        </span>
      </Link>
    </div>
  );
}
