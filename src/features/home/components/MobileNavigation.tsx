'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { SECTION_IDS } from '@/lib/constants';
import { primaryNavigation } from '@/features/home/data/navigation';

export function MobileNavigation() {
  const t = useTranslations('Navigation');
  const tCommon = useTranslations('Common');
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    panelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );

      if (!focusableElements || focusableElements.length === 0) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? tCommon('menu.close') : tCommon('menu.open')}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-bg-alt text-brand-text transition-colors hover:bg-brand-bg-alt/80 xl:hidden"
      >
        <Icon name={open ? 'close' : 'menu'} size={20} />
      </button>

      {open ? (
        <div className="fixed inset-x-0 top-20 bottom-0 z-[60] xl:hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-label={tCommon('menu.close')}
            onClick={closeMenu}
            className="absolute inset-0 bg-brand-text/40 backdrop-blur-sm"
          />
          <div
            id="mobile-navigation"
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            className="absolute inset-y-0 end-0 flex h-screen w-full max-w-sm flex-col bg-brand-bg p-space-lg shadow-2xl"
          >
            

            <nav
              aria-label={tCommon('primaryNavigation')}
              className="mt-space-lg flex flex-col gap-space-xs"
            >
              {primaryNavigation.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-space-sm py-space-sm font-body text-body-lg text-brand-text transition-colors hover:bg-brand-bg-alt hover:text-brand-dark-orange"
                >
                  {t(item.id)}
                </a>
              ))}
            </nav>

            <div className="mt-space-xl flex flex-col gap-space-sm border-t border-brand-bg-alt pt-space-lg">
              <Button
                href={`#${SECTION_IDS.ecosystem}`}
                variant="green"
                size="md"
                fullWidth
                icon="arrow_forward"
                onClick={() => setOpen(false)}
              >
                {t('growPlus')}
              </Button>
              <Button
                href={`#${SECTION_IDS.ecosystem}`}
                variant="orange"
                size="md"
                fullWidth
                icon="auto_awesome"
                iconPosition="start"
                onClick={() => setOpen(false)}
              >
                {t('growForYouth')}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
