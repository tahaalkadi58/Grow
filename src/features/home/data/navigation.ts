import { SECTION_IDS } from '@/lib/constants';

import type { FooterLink, NavigationItem } from '../types';

export const primaryNavigation: readonly NavigationItem[] = [
  { id: 'about', href: `#${SECTION_IDS.about}` },
  { id: 'impact', href: `#${SECTION_IDS.impact}` },
  { id: 'ecosystem', href: `#${SECTION_IDS.ecosystem}` },
  { id: 'partners', href: `#${SECTION_IDS.partners}` },
  { id: 'contact', href: `#${SECTION_IDS.contact}` },
];

export const footerExploreLinks: readonly FooterLink[] = [
  { id: 'about', href: `#${SECTION_IDS.about}` },
  { id: 'missionVision', href: `#${SECTION_IDS.visionMission}` },
  { id: 'impact', href: `#${SECTION_IDS.impact}` },
  { id: 'ecosystem', href: `#${SECTION_IDS.ecosystem}` },
  { id: 'news', href: '#' },
];

export const footerCollaborationLinks: readonly FooterLink[] = [
  { id: 'institutionalPartners', href: `#${SECTION_IDS.partners}` },
  { id: 'civicAlliances', href: `#${SECTION_IDS.partners}` },
  { id: 'becomeMentor', href: `#${SECTION_IDS.contact}` },
  { id: 'grantsSupport', href: `#${SECTION_IDS.contact}` },
];

export const footerLegalLinks: readonly FooterLink[] = [
  { id: 'privacy', href: '#' },
  { id: 'terms', href: '#' },
  { id: 'transparency', href: '#' },
];
