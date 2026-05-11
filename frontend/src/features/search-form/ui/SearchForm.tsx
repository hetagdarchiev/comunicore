'use client';

import { useForm } from 'react-hook-form';
import { LuSearch } from 'react-icons/lu';

import { searchSchema, SearchTypes } from '@/shared/lib/schemas/search.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const defaultValues = {
  search: '',
};

export function SearchForm(props: { className?: string }) {
  const { register } = useForm<SearchTypes>({
    resolver: zodResolver(searchSchema),
    mode: 'onChange',
    defaultValues,
  });
  const { className = '' } = props;

  return (
    <form
      role='search'
      className={`flex w-full max-w-125 items-center gap-x-3 rounded-sm border border-black px-3 py-2 focus-within:outline-1 ${className}`}
    >
      <LuSearch
        width={18}
        height={18}
        role='img'
        aria-hidden={true}
        className='text-gray-80 min-h-4.5 min-w-4.5'
      />
      <label htmlFor='search-input' className='visually-hidden'>
        Поиск
      </label>
      <input
        type='search'
        id='search-input'
        {...register('search')}
        placeholder='Поиск...'
        className='w-full text-sm font-light outline-0'
      />
    </form>
  );
}
