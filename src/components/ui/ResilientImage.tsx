'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type ResilientImageProps = Omit<ImageProps, 'src' | 'onError'> & {
  src: string;
  fallbackSrc?: string;
};

/**
 * Renders the original source first and degrades to a local fallback when the
 * remote asset is unavailable.
 */
export function ResilientImage({ src, fallbackSrc, alt, ...props }: ResilientImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          return;
        }
        setFailed(true);
      }}
    />
  );
}
