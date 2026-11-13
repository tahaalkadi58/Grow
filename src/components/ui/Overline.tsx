import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type OverlineProps = {
  children: ReactNode;
  className?: string;
};

export function Overline({ children, className }: OverlineProps) {
  return (
    <h3
      className={cn(
        'block font-body text-headline-sm font-bold uppercase tracking-widest',
        className,
      )}
    >
      {children}
    </h3>
  );
}
