import { createContext } from 'react';

import { SelectContextType } from '../types/select-context.types';

export const SelectContext = createContext<SelectContextType | null>(null);
