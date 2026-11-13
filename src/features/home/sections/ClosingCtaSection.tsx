import { getTranslations } from 'next-intl/server';

import { BrandIcon, type BrandIconName } from '@/components/ui/BrandIcon';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { CONTACT_LINKS, SECTION_IDS } from '@/lib/constants';
import { reveal } from '@/lib/motion';
import type { MaterialIconName } from '@/types';

type ContactItemId =
  | 'address'
  | 'phone'
  | 'whatsapp'
  | 'instagram'
  | 'facebook'
  | 'linkedin';

type ContactItem = {
  id: ContactItemId;
  label: string;
  value: string;
  href: string;
  materialIcon?: MaterialIconName;
  brandIcon?: BrandIconName;
  external?: boolean;
};

export async function ClosingCtaSection() {
  const t = await getTranslations('ClosingCta');

  const contactItems: ContactItem[] = [
    {
      id: 'address',
      materialIcon: 'location_on',
      label: t('contact.address.label'),
      value: t('contact.address.value'),
      href: CONTACT_LINKS.maps,
      external: true,
    },
    {
      id: 'phone',
      materialIcon: 'call',
      label: t('contact.phone.label'),
      value: t('contact.phone.value'),
      href: CONTACT_LINKS.phone,
    },
    {
      id: 'whatsapp',
      brandIcon: 'whatsapp',
      label: t('contact.whatsapp.label'),
      value: t('contact.whatsapp.value'),
      href: CONTACT_LINKS.whatsapp,
      external: true,
    },
    {
      id: 'instagram',
      brandIcon: 'instagram',
      label: t('contact.instagram.label'),
      value: t('contact.instagram.value'),
      href: CONTACT_LINKS.instagram,
      external: true,
    },
    {
      id: 'facebook',
      brandIcon: 'facebook',
      label: t('contact.facebook.label'),
      value: t('contact.facebook.value'),
      href: CONTACT_LINKS.facebook,
      external: true,
    },
    {
      id: 'linkedin',
      brandIcon: 'linkedin',
      label: t('contact.linkedin.label'),
      value: t('contact.linkedin.value'),
      href: CONTACT_LINKS.linkedin,
      external: true,
    },
  ];

  return (
    <section id={SECTION_IDS.contact} aria-labelledby="closing-cta-title" className="w-full bg-brand-bg-alt py-space-3xl">
      <Container>
        <div
          {...reveal({ variant: 'fade-in' })}
          className="relative overflow-hidden rounded-3xl bg-brand-dark-green max-sm:p-space-lg sm:p-space-2xl text-brand-white shadow-xl md:p-space-3xl"
        >
          <div
            {...reveal({ variant: 'fade-in', delay: 90 })}
            className="pointer-events-none absolute end-0 top-0 h-96 w-96 rounded-full bg-brand-dark-orange/20 blur-3xl"
          />
          <div
            {...reveal({ variant: 'fade-in', delay: 180 })}
            className="pointer-events-none absolute bottom-0 start-0 h-96 w-96 rounded-full bg-brand-light-green/30 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 items-center gap-gutter-lg lg:grid-cols-12">
            <div {...reveal({ delay: 100 })} className="lg:col-span-7">
              <div className="mb-space-md inline-flex items-center gap-2 rounded-full bg-brand-white/15 px-3 py-1 font-body text-label-sm font-bold uppercase tracking-wider text-brand-white">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-light-green" />
                <span>{t('badge')}</span>
              </div>
              <h2
                id="closing-cta-title"
                className="mb-space-md font-display text-headline-xl leading-[1.1] tracking-tight text-brand-white md:text-display-hero"
              >
                {t('title')}
              </h2>
              <p className="mb-space-xl max-w-xl font-body text-body-xl leading-relaxed text-brand-white/85">
                {t('description')}
              </p>

              <div className="flex flex-wrap items-center gap-space-md">
                <Button
                  href={CONTACT_LINKS.whatsapp}
                  variant="orange"
                  size="lg"
                  icon="handshake"
                  lift
                  className="w-full sm:w-auto"
                >
                  {t('primaryCta')}
                </Button>
                <Button
                  href={CONTACT_LINKS.instagram}
                  variant="green"
                  size="lg"
                  icon="volunteer_activism"
                  lift
                  className="w-full sm:w-auto"
                >
                  {t('secondaryCta')}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                {...reveal({ variant: 'slide-right', delay: 180 })}
                className="rounded-2xl border border-brand-white/10 bg-brand-text/85 p-space-xl text-brand-white shadow-lg backdrop-blur-md"
              >
                <div className="mb-space-sm font-display text-headline-sm text-brand-white">
                  {t('contact.title')}
                </div>
                <p className="mb-space-lg font-body text-body-sm text-brand-white/75">
                  {t('contact.description')}
                </p>

                <div className="flex flex-col gap-space-md font-body text-body-sm">
                  {contactItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="group flex items-start gap-space-sm rounded-lg transition-colors hover:text-brand-light-green"
                    >
                      <span className="mt-0.5 flex h-5 w-5 items-center justify-center text-brand-light-green">
                        {item.brandIcon ? (
                          <BrandIcon name={item.brandIcon} className="h-4 w-4" />
                        ) : (
                          <Icon name={item.materialIcon ?? 'call'} size={20} />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-body text-label-sm font-bold text-brand-white">
                          {item.label}
                        </span>
                        <span
                          dir={item.id === 'address' ? undefined : 'ltr'}
                          className={`inline-block text-brand-white/75 transition-colors group-hover:text-brand-white ${
                            item.id === 'address' ? 'break-words' : 'whitespace-nowrap'
                          }`}
                        >
                          {item.value}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
