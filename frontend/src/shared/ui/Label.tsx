import { LabelHTMLAttributes, PropsWithChildren } from 'react';
import { FieldError } from 'react-hook-form';

import { cn } from '../lib/classNames';

import { ErrorMessage } from './ErrorMessage';

type LablePropsAttrs = LabelHTMLAttributes<HTMLLabelElement> &
  PropsWithChildren;

interface LabelProps extends LablePropsAttrs {
  className?: string;
  isHidden?: boolean;
  error?: FieldError;
}

export function Label(props: LabelProps) {
  const { className, children, isHidden, error, htmlFor, ...attrs } = props;

  return (
    <>
      <label
        className={cn(
          'text-gray-9e inline-flex cursor-pointer flex-col gap-y-1.25 text-lg font-normal',
          isHidden && 'visually-hidden',
          error?.message && 'text-red-ff',
          className,
        )}
        htmlFor={htmlFor}
        {...attrs}
      >
        {children}
      </label>
      {error?.message && <ErrorMessage error={error.message} />}
    </>
  );
}
