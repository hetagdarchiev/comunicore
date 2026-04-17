import { ReactNode } from 'react';

export type PostProps = {
  author_name: string; //Имя автора поста
  avatarUrl?: string; //Ссылка на картинку профиля
  created_at: string; //Строка с датой создания поста
  title: string; //Заголовок поста
  children: ReactNode; //Основной текст поста.
  tags?: string[]; //Массив тегов
  author_id: number; //Уникальные числовые ID. Он нужен для формирования ссылок
  id: number; //Уникальные числовые ID. Он нужен для формирования ссылок
  isLiked: boolean; //Флаг (да/нет). Определяет, лайкнул ли текущий юзер этот пост.
  onLike: () => void; //Функция-обработчик. Когда ты жмешь на кнопку лайка, PostCard вызывает эту функцию, которую ему передал «родитель»
  stats: { views: number; comments: number; likes: number }; //Объект со статистикой
};
