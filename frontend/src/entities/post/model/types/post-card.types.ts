import { ReactNode } from 'react';

export interface PostStats {
  views: number;
  comments: number;
  likes: number;
}

export interface PostProps {
  id: number; // Уникальные числовые ID. Он нужен для формирования ссылок
  authorId: number; // Уникальные числовые ID. Он нужен для формирования ссылок
  authorName: string; // Имя автора поста
  avatarUrl?: string; // Ссылка на картинку профиля
  createdAt: string; // Строка с датой создания поста
  title: string; // Заголовок поста
  tags?: string[]; // Массив тегов
  isLiked: boolean; // Флаг (да/нет). Определяет, лайкнул ли текущий юзер этот пост.
  onLike: () => void; // Функция-обработчик. Когда ты жмешь на кнопку лайка, PostCard вызывает эту функцию, которую ему передал «родитель»
  stats: PostStats; // Объект со статистикой
  children: ReactNode; //Основной текст поста.
}
