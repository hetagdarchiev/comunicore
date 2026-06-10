import { forwardRef, InputHTMLAttributes, PropsWithChildren } from 'react';
import { FieldError } from 'react-hook-form';
import { LuCheck } from 'react-icons/lu';

interface ICheckboxProps
  extends InputHTMLAttributes<HTMLInputElement>, PropsWithChildren {
  id: string;
  error?: FieldError | undefined;
}

export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  (props, ref) => {
    const { children, id, error, ...rest } = props;

    return (
      <div>
        <label
          className='flex cursor-pointer items-center gap-x-2.5'
          htmlFor={id}
        >
          <div className='relative flex h-4.5 w-4.5 items-center justify-center'>
            <input
              className='peer border-gray-9e checked:border-purple-67 h-4.5 w-4.5 cursor-pointer appearance-none rounded-sm border-2 duration-200 focus:ring-0 focus:outline-none'
              id={id}
              type='checkbox'
              ref={ref}
              {...rest}
            />
            <div className='pointer-events-none absolute hidden peer-checked:block'>
              <LuCheck
                aria-hidden={true}
                size={20}
                className='text-purple-67'
              />
            </div>
          </div>
          <p className='text-light select-none'>{children}</p>
        </label>
        {error && (
          <span className='animate-in fade-in slide-in-from-top-1 text-xs text-red-500 duration-200'>
            {error.message}
          </span>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
