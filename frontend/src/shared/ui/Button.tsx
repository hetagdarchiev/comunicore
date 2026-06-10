import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

import { cn } from '../lib/classNames';

type ButtonColor = 'purple' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = Partial<
  AnchorHTMLAttributes<HTMLAnchorElement> &
    ButtonHTMLAttributes<HTMLButtonElement>
> & {
  children: ReactNode;
  href?: string;
  className?: string;
  color?: ButtonColor;
  size?: ButtonSize;
};

const colorStyles: Record<ButtonColor, string> = {
  purple:
    'bg-purple-67 border border-purple-67 hover:bg-transparent hover:text-purple-67',
  ghost: 'bg-transparent border border-gray-9e/10 hover:border-gray-9e',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-[20px] py-[10px] text-[12px]',
  md: 'px-[20px] py-[14px] text-[16px]',
  lg: 'px-[50px] py-[20px] text-[18px]',
};

export function Button(props: ButtonProps) {
  const {
    children,
    href,
    className,
    color = 'purple',
    size = 'md',
    ...restProps
  } = props;

  const commonClassName = cn(
    'inline-flex items-center justify-center w-fit cursor-pointer',
    'rounded-[5px] duration-200 text-center font-bold text-white',
    colorStyles[color],
    sizeStyles[size],
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={commonClassName}
        {...(restProps satisfies AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type='button'
      className={commonClassName}
      {...(restProps satisfies ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
