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
  email: string;
  password: string;
  policy: boolean;
  name: string;
  userTag: string;
  role: string;
  verify?: boolean;
  description?: string;
  rank: number;
  threadsQuantity: number;
  likes: number;
  recivedLikes: number;
  lastActivity: string;
  webSite?: string;
  location?: UserLocation;
  achievements: UserAchievement[];
  bookMarks: number;
  birthday?: string;
  updatedAt?: string;
  createdAt: string;
}
