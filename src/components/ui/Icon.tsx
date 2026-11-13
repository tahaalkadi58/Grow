import { cn } from '@/lib/utils';
import type { MaterialIconName } from '@/types';

const sizeClasses = {
  16: 'text-[16px]',
  18: 'text-[18px]',
  20: 'text-[20px]',
  24: 'text-[24px]',
  28: 'text-[28px]',
  32: 'text-[32px]',
  64: 'text-[64px]'
} as const;

export type IconSize = keyof typeof sizeClasses;

type IconProps = {
  name: MaterialIconName;
  size?: IconSize;
  className?: string;
  directional?: boolean;
};

export function Icon({ name, size = 24, className, directional = false }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'material-symbols-outlined shrink-0',
        sizeClasses[size],
        directional && 'rtl:-scale-x-100',
        className,
      )}
    >
      {name}
    </span>
  );
}
