'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  threadsFiltrationSchema,
  ThreadsFiltrationTypes,
} from '../model/schemas/filtration.schema';
import {
  sortPeriodLabels,
  threadsPeriodSortEnum,
  ThreadsPeriodSortTypes,
} from '../model/schemas/period-sort.enum';
import {
  sortLabels,
  threadsSortEnum,
  type ThreadsSortTypes,
} from '../model/schemas/sort.enum';

import { cn } from '@/shared/lib/classNames';
import {
  Button,
  Checkbox,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';

export function ThreadsFiltration() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { handleSubmit, register, control } = useForm<ThreadsFiltrationTypes>({
    resolver: zodResolver(threadsFiltrationSchema),
    defaultValues: {
      withoutAnswers: searchParams.get('withoutAnswers') === 'true' || false,
      sortBy:
        (searchParams.get('sortBy') as ThreadsFiltrationTypes['sortBy']) ||
        'last_activity',
      period:
        (searchParams.get('period') as ThreadsFiltrationTypes['period']) ||
        'all',
    },
  });

  const onSubmit: SubmitHandler<ThreadsFiltrationTypes> = (data) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    Object.entries(data).forEach(([key, value]) => {
      currentParams.set(key, String(value));
    });
    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
  };

  const sortOptions = threadsSortEnum.options.map((value) => ({
    value: value,
    label: sortLabels[value],
  }));

  const sortPeriodOptions = threadsPeriodSortEnum.options.map((value) => ({
    value: value,
    label: sortPeriodLabels[value],
  }));

  return (
    <form
      id='threads-filtration'
      className={cn(
        'bg-dark-1b/50 border-gray-9e/10 grid gap-y-2 rounded-[1.25rem] border px-2.5 py-3.5',
        'md:grid-cols-2 md:gap-5 md:px-3.75 md:py-5',
        'xl:grid-cols-1',
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className='text-lg font-bold md:col-span-2 xl:col-auto'>Фильтры</h2>
      <Label htmlFor='sort-by-activity' title='Сортировка'>
        <span>Сортировка</span>
        <Controller
          name='sortBy'
          control={control}
          render={({ field }) => (
            <Select<ThreadsSortTypes>
              id='sort-by-activity'
              options={sortOptions}
              value={field.value}
              onChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder='Выберите сортировку' />
              </SelectTrigger>

              <SelectContent>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Label>
      <Label htmlFor='sort-by-period' title='Сортировка'>
        <span>Период</span>
        <Controller
          name='period'
          control={control}
          render={({ field }) => (
            <Select<ThreadsPeriodSortTypes>
              id='sort-by-period'
              options={sortPeriodOptions}
              value={field.value}
              onChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder='Выберите сортировку' />
              </SelectTrigger>

              <SelectContent>
                {sortPeriodOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Label>
      <Label className='flex-row items-center gap-x-3 md:col-span-2 xl:col-auto'>
        <Checkbox {...register('withoutAnswers')} id='sort-checkbox' />
        <span>Только без ответов</span>
      </Label>
      <Button
        color='transparent'
        type='submit'
        size='xl'
        className='md:col-span-2 xl:col-auto'
      >
        Применить
      </Button>
    </form>
  );
}
