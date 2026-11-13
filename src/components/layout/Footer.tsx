import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { BrandIcon } from '@/components/ui/BrandIcon';
import { Icon } from '@/components/ui/Icon';
import { ResilientImage } from '@/components/ui/ResilientImage';
import {
  footerCollaborationLinks,
  footerExploreLinks,
  footerLegalLinks,
} from '@/features/home/data/navigation';
import { socialLinks } from '@/features/home/data/social';
import { CONTACT_LINKS, IMAGES } from '@/lib/constants';
import { reveal } from '@/lib/motion';

export async function Footer() {
  const t = await getTranslations('Footer');
  const tCommon = await getTranslations('Common');

  return (
    <footer className="w-full border-t border-brand-bg-alt bg-brand-bg-alt pb-space-xl pt-space-3xl text-brand-text">
      <Container>
        <div className="grid grid-cols-1 gap-x-gutter-lg gap-y-space-2xl pb-space-2xl md:grid-cols-2 lg:grid-cols-12">
          <div {...reveal()} className="flex flex-col items-start lg:col-span-4">
            <div className="mb-space-md flex items-center gap-space-sm">
              <ResilientImage
                src={IMAGES.logo}
                alt={tCommon('logoAlt')}
                width={96}
                height={36}
                unoptimized
                className="h-20 w-auto object-contain"
              />
              
            </div>
            <p className="mb-space-lg max-w-sm font-body text-body-md leading-relaxed text-brand-text/80">
              {t('description')}
            </p>
            <nav aria-label={t('socialTitle')} className="flex items-center gap-space-sm">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(`social.${link.id}`)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-brand-bg-alt bg-brand-white text-brand-text transition-all ${link.hoverClassName}`}
                >
                  <BrandIcon name={link.id} className="h-4 w-4" />
                </a>
              ))}
            </nav>
          </div>

          <nav
            aria-label={t('explore.title')}
            {...reveal({ delay: 110 })}
            className="flex flex-col lg:col-span-2"
          >
            <h3 className="mb-space-md font-display text-headline-sm font-bold text-brand-text">
              {t('explore.title')}
            </h3>
            <ul className="flex flex-col gap-space-sm font-body text-body-sm">
              {footerExploreLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="transition-colors hover:text-brand-dark-orange">
                    {t(`explore.${link.id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div {...reveal({ delay: 220 })} className="flex flex-col lg:col-span-3">
            <h3 className="mb-space-md font-display text-headline-sm font-bold text-brand-text">
              {t('arms.title')}
            </h3>
            <div className="flex flex-col gap-space-md font-body text-body-sm">
              <div className="rounded-xl border border-brand-bg-alt bg-brand-white p-space-md">
                <div className="mb-space-xs flex items-center gap-space-xs font-body text-label-md text-brand-dark-green">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-dark-green" />
                  <span className="font-bold">{t('arms.plusTitle')}</span>
                </div>
                <p className="font-body text-body-sm text-brand-text/75">{t('arms.plusDescription')}</p>
              </div>
              <div className="rounded-xl border border-brand-bg-alt bg-brand-white p-space-md">
                <div className="mb-space-xs flex items-center gap-space-xs font-body text-label-md text-brand-dark-orange">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-dark-orange" />
                  <span className="font-bold">{t('arms.youthTitle')}</span>
                </div>
                <p className="font-body text-body-sm text-brand-text/75">
                  {t('arms.youthDescription')}
                </p>
              </div>
            </div>
          </div>

          <div {...reveal({ delay: 330 })} className="flex flex-col lg:col-span-3">
            <h3 className="mb-space-md font-display text-headline-sm font-bold text-brand-text">
              {t('collaboration.title')}
            </h3>
            <ul className="mb-space-lg flex flex-col gap-space-sm font-body text-body-sm">
              {footerCollaborationLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="transition-colors hover:text-brand-dark-orange">
                    {t(`collaboration.${link.id}`)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-space-xs rounded-xl border border-brand-bg-alt bg-brand-white p-space-md font-body text-body-sm">
              <a
                href={CONTACT_LINKS.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-space-xs font-body text-label-md font-semibold text-brand-text transition-colors hover:text-brand-dark-green"
              >
                <Icon name="location_on" size={16} className="text-brand-dark-green" />
                {t('location.name')}
              </a>
              <div className="ps-space-lg text-brand-text/75">{t('location.city')}</div>
              <div className="flex items-center gap-space-xs pt-space-xs text-brand-text/75">
                <Icon name="call" size={16} className="text-brand-dark-green" />
                <a href={CONTACT_LINKS.phone} dir="ltr" className="transition-colors hover:text-brand-dark-green">
                  {t('location.phone')}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          {...reveal({ delay: 140 })}
          className="flex flex-col items-center justify-between gap-space-md rounded-xl border border-brand-bg-alt bg-brand-white px-space-lg py-space-md font-body text-body-sm text-brand-text/75 md:flex-row"
        >
          <div className="flex flex-wrap items-center justify-center gap-space-xs text-center md:justify-start md:text-start">
            <span>{t('legal.copyright')}</span>
            <span aria-hidden="true" className="hidden md:inline">
              •
            </span>
            <span className="font-bold text-brand-dark-green">{t('legal.registered')}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-space-md font-body text-label-sm">
            {footerLegalLinks.map((link) => (
              <a key={link.id} href={link.href} className="transition-colors hover:text-brand-text">
                {t(`legal.${link.id}`)}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
