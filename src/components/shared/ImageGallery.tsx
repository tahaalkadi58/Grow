'use client';

import Image from 'next/image';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { Icon } from '@/components/ui/Icon';
import { ASSET_GALLERY_IMAGES } from '@/lib/constants';
import { cn } from '@/lib/utils';

type ImageGalleryContextValue = {
  openGallery: (src: string) => void;
  closeGallery: () => void;
};

const ImageGalleryContext = createContext<ImageGalleryContextValue | null>(null);

export function useImageGallery() {
  const context = useContext(ImageGalleryContext);
  if (!context) {
    throw new Error('useImageGallery must be used within ImageGalleryProvider');
  }
  return context;
}

export function ImageGalleryProvider({ children }: { children: ReactNode }) {
  const images = ASSET_GALLERY_IMAGES;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  const openGallery = useCallback(
    (src: string) => {
      const index = images.findIndex((image) => image === src);
      setActiveIndex(index >= 0 ? index : 0);
    },
    [images],
  );

  const closeGallery = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeGallery();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeGallery, isOpen, showNext, showPrevious]);

  const value = useMemo(
    () => ({ openGallery, closeGallery }),
    [closeGallery, openGallery],
  );

  return (
    <ImageGalleryContext.Provider value={value}>
      {children}
      {isOpen && activeIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          className="fixed inset-0 z-[100] flex flex-col bg-black/90 text-white"
        >
          <div className="flex items-center justify-end p-3 sm:p-4">
            <button
              type="button"
              onClick={closeGallery}
              aria-label="Close gallery"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Icon name="close" size={24} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-2 sm:px-12">
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous image"
                  className="absolute start-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:start-4"
                >
                  <Icon name="arrow_forward" size={24} directional className="rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next image"
                  className="absolute end-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:end-4"
                >
                  <Icon name="arrow_forward" size={24} directional />
                </button>
              </>
            ) : null}

            <div className="relative h-full w-full max-w-6xl">
              <Image
                key={images[activeIndex]}
                src={images[activeIndex]}
                alt={`Gallery image ${activeIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {images.length > 1 ? (
            <div className="flex items-center justify-center gap-2 overflow-x-auto px-4 pb-4 pt-2 sm:gap-3 sm:pb-6">
              {images.map((src, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`View image ${index + 1}`}
                    aria-current={selected ? 'true' : undefined}
                    className={cn(
                      'relative h-16 w-20 shrink-0 overflow-hidden rounded-md border-2 transition sm:h-20 sm:w-28',
                      selected
                        ? 'border-brand-light-orange opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100',
                    )}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </ImageGalleryContext.Provider>
  );
}

export function GalleryImageTrigger({
  src,
  className,
  children,
  ariaLabel = 'Open image gallery',
}: {
  src: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const { openGallery } = useImageGallery();

  return (
    <button
      type="button"
      onClick={() => openGallery(src)}
      aria-label={ariaLabel}
      className={cn('cursor-zoom-in', className)}
    >
      {children}
    </button>
  );
}
