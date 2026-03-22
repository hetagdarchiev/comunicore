import { ReactNode } from 'react';

import { Ctx } from './ctx.types';

export interface MdTools {
  label: ReactNode;
  title: string;
  toolFn: (ctx: Ctx) => void;
}
