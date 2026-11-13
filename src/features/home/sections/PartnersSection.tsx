import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Overline } from '@/components/ui/Overline';
import { partners } from '@/features/home/data/content';
import { SECTION_IDS } from '@/lib/constants';
import { reveal, staggerItem } from '@/lib/motion';

export async function PartnersSection() {
  const t = await getTranslations('Partners');

  return (
    <section
      id={SECTION_IDS.partners}
      aria-labelledby="partners-title"
      className="w-full bg-brand-bg py-space-3xl"
    >
      <Container>
        <div {...reveal()} className="mx-auto mb-space-2xl max-w-2xl text-center">
          <Overline className="text-brand-dark-green">{t('overline')}</Overline>
          <h2
            id="partners-title"
            className="mb-space-sm mt-space-xs font-display text-headline-lg text-brand-text"
          >
            {t('title')}
          </h2>
          <p className="font-body text-body-md text-brand-text/80">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => {
            const name = t(`items.${partner.id}.name`);
            const organisation = t(`items.${partner.id}.organisation`);
            const revealProps = staggerItem(index);
            const cardClassName =
              'group flex flex-col items-center justify-center rounded-2xl border border-brand-bg-alt bg-brand-white p-space-lg text-center shadow-sm transition-all hover:bg-brand-bg-alt';

            const content = (
              <>
                <div className="mb-space-md flex h-24 w-full items-center justify-center">
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt=""
                      width={500}
                      height={500}
                      className="h-24 w-24 rounded-xl object-contain"
                    />
                  ) : (
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-brand-bg-alt transition-transform group-hover:scale-110 ${partner.accentClassName}`}
                    >
                      <Icon name={partner.icon} size={24} />
                    </div>
                  )}
                </div>
                <span className="font-body text-label-md font-semibold text-brand-text">
                  {name}
                </span>
                <span className="mt-1 font-body text-label-sm text-brand-text/65">
                  {organisation}
                </span>
                {partner.href ? (
                  <span className="mt-space-sm inline-flex items-center gap-1 font-body text-label-sm font-semibold text-brand-dark-orange">
                    <span>{t('visitWebsite')}</span>
                    <Icon
                      name="arrow_forward"
                      size={16}
                      directional
                      className="-rotate-45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:rotate-45 rtl:group-hover:-translate-x-0.5"
                    />
                  </span>
                ) : null}
              </>
            );

            return partner.href ? (
              <a
                key={partner.id}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} — ${organisation}`}
                {...revealProps}
                className={cardClassName}
              >
                {content}
              </a>
            ) : (
              <div key={partner.id} {...revealProps} className={cardClassName}>
                {content}
              </div>
            );
          })}
        </div>

        <div
          {...reveal({ delay: 140 })}
          className="mt-space-xl flex flex-col items-center justify-between gap-space-md rounded-2xl border border-brand-bg-alt bg-brand-bg-alt p-space-md text-center sm:flex-row sm:text-start"
        >
          <div className="flex items-center gap-space-sm">
            <Icon name="handshake" size={24} className="text-brand-dark-green" />
            <span className="font-body text-label-md font-semibold text-brand-text">
              {t('endorsement.question')}
            </span>
          </div>
          <a
            href={`#${SECTION_IDS.contact}`}
            className="group flex items-center gap-1 font-body text-label-sm font-bold text-brand-dark-orange hover:underline"
          >
            <span>{t('endorsement.cta')}</span>
            <Icon
              name="arrow_forward"
              size={16}
              directional
              className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
            />
          </a>
        </div>
      </Container>
    </section>
  );
}
