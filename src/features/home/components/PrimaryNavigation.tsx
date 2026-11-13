'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { primaryNavigation } from '@/features/home/data/navigation';
import type { NavigationId } from '@/features/home/types';

const sectionToNavigation: Record<string, NavigationId> = {
  about: 'about',
  impact: 'impact',
  'ecosystem-section': 'ecosystem',
  partners: 'partners',
  'closing-cta': 'contact',
};

export function PrimaryNavigation() {
  const t = useTranslations('Navigation');
  const tCommon = useTranslations('Common');
  const [active, setActive] = useState<NavigationId>('about');

  useEffect(() => {
    const sections = primaryNavigation
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const current = visible[0];

        if (current) {
          const navigationId = sectionToNavigation[current.target.id];

          if (navigationId) {
            setActive(navigationId);
          }
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label={tCommon('primaryNavigation')} className="hidden items-center gap-space-lg xl:flex">
      {primaryNavigation.map((item) => {
        const isActive = item.id === active;

        return (
          <a
            key={item.id}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => setActive(item.id)}
            className={cn(
              'font-body text-label-md transition-colors',
              isActive
                ? 'font-semibold text-brand-dark-orange'
                : 'text-brand-text/80 hover:text-brand-dark-orange',
            )}
          >
            {t(item.id)}
          </a>
        );
      })}
    </nav>
  );
}
