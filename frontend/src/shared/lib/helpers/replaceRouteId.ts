import { idTemplate } from '../../config/app-router';

export const replaceRouteId = (path: string, id: string) =>
  path.replace(idTemplate, id);
