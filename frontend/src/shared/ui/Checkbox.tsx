import { forwardRef, InputHTMLAttributes } from 'react';
import { LuCheck } from 'react-icons/lu';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { id, ...rest } = props;

    return (
      <div className='relative flex size-3 items-center justify-center'>
        <input
          className='peer border-gray-9e checked:border-purple-67 size-3 cursor-pointer appearance-none rounded-xs border duration-200 focus:ring-0 focus:outline-none'
          id={id}
          type='checkbox'
          ref={ref}
          {...rest}
        />
        <div className='pointer-events-none absolute hidden peer-checked:block'>
          <LuCheck aria-hidden={true} size={10} className='text-purple-67' />
        </div>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
