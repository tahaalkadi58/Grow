import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[1400px] px-margin md:px-margin-md lg:px-margin-lg', className)}>
      {children}
    </div>
  );
}
