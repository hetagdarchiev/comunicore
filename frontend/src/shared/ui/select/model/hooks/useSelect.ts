import { useContext } from 'react';

import { SelectContext } from '../context/select-context';

export const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context)
    throw new Error(
      'Компоненты Select.* должны использоваться внутри <Select />',
    );

  return context;
};
