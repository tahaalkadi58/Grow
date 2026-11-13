import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Overline } from '@/components/ui/Overline';
import { SECTION_IDS } from '@/lib/constants';

export async function VisionMissionSection() {
  const t = await getTranslations('VisionMission');

  const cards = [
    {
      id: 'vision' as const,
      icon: 'visibility' as const,
      accent: 'text-brand-dark-green',
      badgeIcon: 'verified' as const,
    },
    {
      id: 'mission' as const,
      icon: 'rocket_launch' as const,
      accent: 'text-brand-dark-orange',
      badgeIcon: 'handshake' as const,
    },
  ];

  return (
    <section
      id={SECTION_IDS.visionMission}
      aria-labelledby="vision-mission-title"
      className="w-full bg-brand-bg py-space-3xl"
    >
      <Container>
        <div className="mb-space-2xl max-w-xl">
          <Overline className="text-brand-dark-orange">{t('overline')}</Overline>
          <h2
            id="vision-mission-title"
            className="mt-space-xs font-display text-headline-xl text-brand-text"
          >
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-gutter-lg lg:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-brand-bg-alt bg-brand-bg-alt p-space-2xl shadow-sm"
            >
              <div
                aria-hidden="true"
                className={`absolute end-0 top-0 z-0 h-32 w-32 rounded-es-[20rem] ${
                  card.id === 'vision' ? 'bg-brand-light-green/15' : 'bg-brand-dark-orange/15'
                }`}
              />
              <div className="relative z-10">
                <div
                  className={`mb-space-lg inline-flex items-center gap-2 rounded-full bg-brand-white px-3 py-1 font-body text-label-sm font-bold uppercase tracking-wider shadow-sm ${card.accent}`}
                >
                  <Icon name={card.icon} size={16} />
                  <span>{t(`${card.id}.badge`)}</span>
                </div>
                <h3 className="mb-space-md font-display text-headline-lg text-brand-text">
                  {t(`${card.id}.title`)}
                </h3>
                <div className="mb-space-lg rounded-2xl border border-brand-bg-alt bg-brand-white p-space-lg font-body text-body-lg leading-relaxed text-brand-text/85 shadow-sm">
                  <span
                    className={`mb-1 block font-body text-label-sm font-bold ${card.accent}`}
                  >
                    {t(`${card.id}.statementLabel`)}
                  </span>
                  {t(`${card.id}.statement`)}
                </div>
              </div>
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-space-sm pt-space-md">
                <div
                  className={`flex items-center gap-space-xs font-body text-label-md font-bold ${card.accent}`}
                >
                  <Icon name={card.badgeIcon} size={18} />
                  <span>{t(`${card.id}.${card.id === 'vision' ? 'horizon' : 'mandate'}`)}</span>
                </div>
                <span className="font-body text-label-sm font-semibold text-brand-text/60">
                  {t(`${card.id}.status`)}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
