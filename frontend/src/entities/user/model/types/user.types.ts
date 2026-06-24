import { ImageUrl } from '@/shared/types/image-url.type';

export interface User {
  id: string;
  avatarUrl: ImageUrl;
  profileBanerUrl: ImageUrl;
  name: string;
  userTag: string;
  role: string;
  description: string;
  rank: number;
  threadsQuantity: number;
  likes: number;
  bookMarks: number;
  createdAt: string;
}
