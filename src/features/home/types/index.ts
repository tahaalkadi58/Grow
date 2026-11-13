import type { MaterialIconName } from '@/types';

export type EcosystemView = 'all' | 'plus' | 'youth';

export type NavigationId = 'about' | 'impact' | 'ecosystem' | 'partners' | 'contact';

export type NavigationItem = {
  id: NavigationId;
  href: string;
};

export type HeroStatId = 'youth' | 'institutions' | 'programs';

export type HeroStat = {
  id: HeroStatId;
  accentClassName: string;
};

export type PillarId =
  | 'humanDevelopment'
  | 'economicEmpowerment'
  | 'communityDevelopment'
  | 'sustainability'
  | 'socialInnovation';

export type Pillar = {
  id: PillarId;
  icon: MaterialIconName;
  accentClassName: string;
};

export type ImpactMetricId = 'training' | 'mentoring' | 'sustainability' | 'continuity';

export type ImpactMetric = {
  id: ImpactMetricId;
  icon: MaterialIconName;
  accentClassName: string;
  valueClassName: string;
};

export type PartnerId =
  | 'anera'
  | 'iocc'
  | 'irada'
  | 'oxfam'
  | 'utopia'
  | 'localCsos';

export type Partner = {
  id: PartnerId;
  logo?: string;
  href?: string;
  icon: MaterialIconName;
  accentClassName: string;
};

export type EcosystemTagId =
  | 'institutionalDevelopment'
  | 'trainingConsulting'
  | 'capacityBuilding'
  | 'leadershipDevelopment'
  | 'entrepreneurship'
  | 'digitalTransformation'
  | 'organizationalSustainability'
  | 'youthEmpowerment'
  | 'womensEmpowerment'
  | 'volunteering'
  | 'environmental'
  | 'participation'
  | 'innovation';

export type FooterLinkId =
  | 'about'
  | 'missionVision'
  | 'impact'
  | 'ecosystem'
  | 'news'
  | 'institutionalPartners'
  | 'civicAlliances'
  | 'becomeMentor'
  | 'grantsSupport'
  | 'privacy'
  | 'terms'
  | 'transparency';

export type FooterLink = {
  id: FooterLinkId;
  href: string;
};

export type SocialLinkId = 'whatsapp' | 'linkedin' | 'instagram' | 'facebook';

export type SocialLink = {
  id: SocialLinkId;
  href: string;
  hoverClassName: string;
};
