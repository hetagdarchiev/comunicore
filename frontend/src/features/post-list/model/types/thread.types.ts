export type Thread = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorName: string;
  postsCount: number;
  createdAt: string;
  isLiked: boolean;
  stats: {
    likes: number;
    views: number;
    comments: number;
    shares: number;
  };
  avatarUrl?: string; // Если в PostCard используется аватар
};

export type ThreadsResponse = {
  threads: Thread[];
  haveNext: boolean;
};
