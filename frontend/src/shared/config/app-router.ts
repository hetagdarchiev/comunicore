import { replaceRouteId } from '../lib/helpers/replaceRouteId';

export const idTemplate = ':id';

export const AppRouter = {
  main: '/',
  verification: '/verification',
  settings: '/settings',
  questions: '/questions',
  threads: '/threads',
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
  profile: {
    root: '/profile',
    get edit() {
      return `${this.root}/edit`;
    },
    get threads() {
      return `${this.root}/threads`;
    },
    get messages() {
      return `${this.root}/messages`;
    },
    get bookmarks() {
      return `${this.root}/bookmarks`;
    },
  },
  achivements: {
    root: 'achivements',
    getRoute(id: string) {
      return `${this.root}/${id}`;
    },
  },
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
