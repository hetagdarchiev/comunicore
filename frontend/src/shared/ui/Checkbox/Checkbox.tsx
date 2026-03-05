import { forwardRef, InputHTMLAttributes } from 'react';
import Image from 'next/image';

import checkIcon from '../../assets/icons/form/check.svg';

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  (props, ref) => {
    const { label, id, ...rest } = props;

    return (
      <label
        className='flex cursor-pointer items-center gap-x-2.5'
        htmlFor={id}
      >
        <div className='relative flex h-5 w-5 items-center justify-center'>
          <input
            className='peer border-gray-80 h-5 w-5 cursor-pointer appearance-none rounded-sm border duration-200 checked:border-[#77A6F7] checked:bg-[#1682FD]'
            id={id}
            type='checkbox'
            ref={ref}
            {...rest}
          />
          <div className='pointer-events-none absolute hidden peer-checked:block'>
            <Image src={checkIcon} alt='' width={20} height={20} />
          </div>
        </div>
        <p className='text-gray-80 select-none'>{label}</p>
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
