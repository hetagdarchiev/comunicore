import { LabelHTMLAttributes, PropsWithChildren } from 'react';
import { FieldError } from 'react-hook-form';
import clsx from 'clsx';

import { ErrorMessage } from '../error-message';

type LablePropsAttrs = LabelHTMLAttributes<HTMLLabelElement> &
  PropsWithChildren;

interface LabelProps extends LablePropsAttrs {
  className?: string;
  isHidden?: boolean;
  error?: FieldError;
}

export function Label(props: LabelProps) {
  const {
    className = '',
    children,
    isHidden,
    error,
    htmlFor,
    ...attrs
  } = props;

  return (
    <>
      <div className=''>
        <label
          className={clsx(
            'bg-light-fc focus-within:ring-gray-80/30 flex h-full w-full items-center gap-x-2.5 rounded-sm px-5 py-3 transition-all duration-200 focus-within:ring-2',
            isHidden && 'visually-hidden',
            error?.message && 'border-red-500',
            className,
          )}
          htmlFor={htmlFor}
          {...attrs}
        >
          {children}
        </label>
        {error?.message && <ErrorMessage error={error.message} />}
      </div>
    </>
  );
}
