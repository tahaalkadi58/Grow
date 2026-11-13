import type { EcosystemTagId, HeroStat, ImpactMetric, Partner, Pillar } from '../types';

export const heroStats: readonly HeroStat[] = [
  { id: 'youth', accentClassName: 'text-brand-dark-green' },
  { id: 'institutions', accentClassName: 'text-brand-dark-orange' },
  { id: 'programs', accentClassName: 'text-brand-light-orange' },
];

export const pillars: readonly Pillar[] = [
  { id: 'humanDevelopment', icon: 'psychology', accentClassName: 'text-brand-dark-green' },
  { id: 'economicEmpowerment', icon: 'payments', accentClassName: 'text-brand-dark-orange' },
  { id: 'communityDevelopment', icon: 'groups', accentClassName: 'text-brand-dark-green' },
  { id: 'sustainability', icon: 'eco', accentClassName: 'text-brand-light-green' },
  { id: 'socialInnovation', icon: 'lightbulb', accentClassName: 'text-brand-dark-orange' },
];

export const impactMetrics: readonly ImpactMetric[] = [
  {
    id: 'training',
    icon: 'school',
    accentClassName: 'text-brand-light-green',
    valueClassName: 'text-brand-white',
  },
  {
    id: 'mentoring',
    icon: 'apartment',
    accentClassName: 'text-brand-light-orange',
    valueClassName: 'text-brand-light-orange',
  },
  {
    id: 'sustainability',
    icon: 'yard',
    accentClassName: 'text-brand-light-green',
    valueClassName: 'text-brand-light-green',
  },
  {
    id: 'continuity',
    icon: 'trending_up',
    accentClassName: 'text-brand-dark-orange',
    valueClassName: 'text-brand-dark-orange',
  },
];

export const partners: readonly Partner[] = [
  {
    id: 'anera',
    logo: '/partners/anera.png',
    href: 'https://www.anera.org/',
    icon: 'volunteer_activism',
    accentClassName: 'text-brand-dark-green',
  },
  {
    id: 'iocc',
    logo: '/partners/iocc.png',
    href: 'https://www.iocc.org/',
    icon: 'handshake',
    accentClassName: 'text-brand-dark-orange',
  },
  {
    id: 'irada',
    logo: '/partners/irada.png',
    href: 'https://irada.org.lb/',
    icon: 'groups',
    accentClassName: 'text-brand-dark-green',
  },
  {
    id: 'oxfam',
    logo: '/partners/oxfam.png',
    href: 'https://www.oxfam.org/en/what-we-do/countries/lebanon',
    icon: 'public',
    accentClassName: 'text-brand-dark-green',
  },
  {
    id: 'utopia',
    logo: '/partners/utopia.png',
    href: 'https://utopialebanon.org/',
    icon: 'diversity_3',
    accentClassName: 'text-brand-dark-orange',
  },
  { id: 'localCsos', icon: 'diversity_3', accentClassName: 'text-brand-light-orange' },
];

export const plusFocusTags: readonly EcosystemTagId[] = [
  'institutionalDevelopment',
  'trainingConsulting',
  'capacityBuilding',
  'leadershipDevelopment',
  'entrepreneurship',
  'digitalTransformation',
  'organizationalSustainability',
];

export const youthFocusTags: readonly EcosystemTagId[] = [
  'youthEmpowerment',
  'womensEmpowerment',
  'volunteering',
  'environmental',
  'participation',
  'innovation',
];
