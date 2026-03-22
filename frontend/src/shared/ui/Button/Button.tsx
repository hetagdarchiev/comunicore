import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ButtonProps = Partial<
  AnchorHTMLAttributes<HTMLAnchorElement> &
    ButtonHTMLAttributes<HTMLButtonElement>
> & {
  children: ReactNode;
  href?: string;
  className?: string;
};

function mergeClassNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Button(props: ButtonProps) {
  const { children, href, className = '', ...restProps } = props;

  const commonClassName = mergeClassNames(
    `inline-flex items-center justify-center w-fit
    bg-blue-16 hover:bg-blue-20 rounded-md px-5 py-3 
    duration-200 text-center text-white font-bold`,
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={commonClassName}
        {...(restProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type='button'
      className={commonClassName}
      {...(restProps as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
