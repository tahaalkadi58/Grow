import type { MouseEventHandler, ReactNode } from 'react';

import { cn } from '@/lib/utils';
import type { MaterialIconName } from '@/types';

import { Icon, type IconSize } from './Icon';

type ButtonVariant = 'green' | 'orange' | 'white';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonShape = 'rounded' | 'organic-a' | 'organic-b';

const variantClasses: Record<ButtonVariant, string> = {
  green: 'bg-grow-green text-brand-white shadow-md hover:opacity-95',
  orange: 'bg-grow-orange text-brand-white shadow-md hover:opacity-95',
  white: 'border border-brand-bg-alt bg-brand-white text-brand-text shadow-sm hover:bg-brand-bg-alt',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-space-md py-space-xs text-label-sm',
  md: 'px-7 py-3.5 text-label-lg',
  lg: 'px-8 py-4 text-label-lg',
};

const shapeClasses: Record<ButtonShape, string> = {
  rounded: '',
  'organic-a': 'clip-organic-a',
  'organic-b': 'clip-organic-b',
};

const iconSizes: Record<ButtonSize, IconSize> = {
  sm: 16,
  md: 18,
  lg: 18,
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  icon?: MaterialIconName;
  iconPosition?: 'start' | 'end';
  fullWidth?: boolean;
  lift?: boolean;
  className?: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function Button({
  href,
  children,
  variant = 'green',
  size = 'md',
  shape = 'rounded',
  icon,
  iconPosition = 'end',
  fullWidth = false,
  lift = false,
  className,
  ariaLabel,
  onClick,
}: ButtonProps) {
  const iconElement = icon ? (
    <Icon
      name={icon}
      size={iconSizes[size]}
      directional={icon === 'arrow_forward'}
      className={cn(
        iconPosition === 'end' && 'transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1',
      )}
    />
  ) : null;

  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'group inline-flex items-center justify-center gap-space-sm rounded-full font-body transition-all duration-200',
        sizeClasses[size],
        variantClasses[variant],
        shapeClasses[shape],
        fullWidth && 'w-full',
        lift && 'hover:-translate-y-0.5',
        className,
      )}
    >
      {iconPosition === 'start' && iconElement}
      <span>{children}</span>
      {iconPosition === 'end' && iconElement}
    </a>
  );
}
