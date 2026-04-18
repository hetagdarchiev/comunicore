export const AppRouter = {
  main: '/',
  verification: '/verification',
  questions: '/questions',
  tags: '/tags',
  award: '/award',
  rules: '/rules',
  community: '/rules/community',
  notification: '/notification',
  profile: '/profile',
  faq: '/faq',
  favorites: '/favorites',
  registration: '/registration',
  login: '/login',
  user: (id: number | string) => `/users/${id}`,
  post: (id: number | string) => `/posts/${id}`,

  // For the time being
  editor: '/editor',
};
