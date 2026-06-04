import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

import { cn } from '../lib/classNames';

type ButtonColor = 'blue' | 'red' | 'green' | 'ghost';

type ButtonProps = Partial<
  AnchorHTMLAttributes<HTMLAnchorElement> &
    ButtonHTMLAttributes<HTMLButtonElement>
> & {
  children: ReactNode;
  href?: string;
  className?: string;
  color?: ButtonColor;
};

const colorStyles: Record<ButtonColor, string> = {
  blue: 'bg-blue-16 hover:bg-blue-20',
  red: 'bg-red-fd hover:bg-red-aa',
  green: 'bg-green-500 hover:bg-green-600',
  ghost:
    'bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300',
};

export function Button(props: ButtonProps) {
  const { children, href, className, color = 'blue', ...restProps } = props;

  const commonClassName = cn(
    'inline-flex items-center justify-center w-fit cursor-pointer',
    'rounded-md px-5 py-3 duration-200 text-center font-bold text-white',
    colorStyles[color],
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
