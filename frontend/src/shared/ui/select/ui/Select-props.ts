import { HTMLAttributes } from 'react';

import { SelectOption } from '../model/types/select-option.type';

export type SelectContainerProps<T extends string | number> = SelectProps<T> &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

export interface SelectProps<T extends string | number> {
  children: React.ReactNode;
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  name?: string;
}
export interface SelectItemProps<T> {
  value: T;
}
