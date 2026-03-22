import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

type ButtonProps = Partial<
  AnchorHTMLAttributes<HTMLAnchorElement> &
    ButtonHTMLAttributes<HTMLButtonElement>
> & {
  children: ReactNode;
  href?: string;
  className?: string;
};

export function Button(props: ButtonProps) {
  const { children, href, className = '', ...restProps } = props;

  const commonClassName = `
    inline-flex items-center justify-center w-fit 
    bg-blue-16 hover:bg-blue-20 rounded-md px-5 py-3 
    duration-200 text-center text-white font-bold disabled:opacity-50 disabled:pointer-events-none
    ${className}
  `;

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
