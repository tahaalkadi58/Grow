import { CONTACT_LINKS } from '@/lib/constants';

import type { SocialLink } from '../types';

export const socialLinks: readonly SocialLink[] = [
  {
    id: 'whatsapp',
    href: CONTACT_LINKS.whatsapp,
    hoverClassName: 'hover:bg-brand-dark-green hover:text-brand-white',
  },
  {
    id: 'linkedin',
    href: CONTACT_LINKS.linkedin,
    hoverClassName: 'hover:bg-brand-dark-green hover:text-brand-white',
  },
  {
    id: 'instagram',
    href: CONTACT_LINKS.instagram,
    hoverClassName: 'hover:bg-brand-dark-orange hover:text-brand-white',
  },
  {
    id: 'facebook',
    href: CONTACT_LINKS.facebook,
    hoverClassName: 'hover:bg-brand-dark-green hover:text-brand-white',
  },
];
