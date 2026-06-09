import { replaceRouteId } from '../lib/helpers/replaceRouteId';

export const idTemplate = ':id';

export const AppRouter = {
  main: '/',
  verification: '/verification',
  questions: '/questions',
  tags: {
    root: '/tags',
    get template() {
      return `${this.root}/${idTemplate}`;
    },
    getRoute(id: string) {
      return replaceRouteId(this.template, id);
    },
  },
  support: '/support',
  award: '/award',
  notification: '/notifications',
  profile: '/profile',
  profileEdit: '/profile/edit',
  faq: '/faq',
  favorites: '/favorites',
  registration: '/registration',
  login: '/login',
  editor: '/editor',

  rules: {
    root: '/rules',
    get community() {
      return `${this.root}/community`;
    },
  },

  recovery: {
    root: '/recovery',
    get password() {
      return `${this.root}/password`;
    },
  },

  user: {
    root: `/user/${idTemplate}`,
    getRoute(id: string) {
      return replaceRouteId(this.root, id);
    },
  },

  post: {
    root: `/posts/${idTemplate}`,
    getRoute(id: string) {
      return replaceRouteId(this.root, id);
    },
  },
} as const;
