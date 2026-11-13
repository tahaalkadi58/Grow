import { getTranslations } from 'next-intl/server';

import { BrandIcon } from '@/components/ui/BrandIcon';

export async function WhatsAppButton() {
  const t = await getTranslations('Common');

  return (
    <a
      href="https://wa.me/9613598903"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsappAria')}
      className="fixed bottom-5 end-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-brand-white shadow-lg shadow-brand-text/20 transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark-green"
    >
      <BrandIcon name="whatsapp" className="h-7 w-7" />
    </a>
  );
}
