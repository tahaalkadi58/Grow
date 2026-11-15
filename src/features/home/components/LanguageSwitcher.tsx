'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Icon } from '@/components/ui/Icon';
import { Link, usePathname } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const t = useTranslations('Common.language');
  const locale = useLocale();
  const pathname = usePathname();

  const targetLocale = locale === 'en' ? 'ar' : 'en';
  const targetLabel = targetLocale === 'en' ? t('english') : t('arabic');
  const ariaLabel =
    targetLocale === 'en' ? t('switchToEnglish') : t('switchToArabic');

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      aria-label={ariaLabel}
      className="inline-flex items-center gap-space-xs rounded-full bg-brand-bg-alt px-space-sm py-space-xs font-body text-label-sm text-brand-text transition-colors hover:bg-brand-bg-alt/80 hover:text-brand-dark-orange"
    >
      <Icon name="public" size={16} />
      <span lang={targetLocale} dir={targetLocale === 'ar' ? 'rtl' : 'ltr'}>
        {targetLabel}
      </span>
    </Link>
  );
}
