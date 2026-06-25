import { ImageUrl } from '@/shared/types/image-url.type';

export interface UserLocation {
  country: string;
  city: string;
}

export interface UserAchievement {
  id: string;
  name: string;
  imageUrl: string;
}

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
  recivedLikes: number;
  lastActivity: string;
  webSite?: string | null;
  location?: UserLocation;
  achievements: UserAchievement[];
  bookMarks: number;
  createdAt: string;
}
