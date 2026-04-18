export type Thread = {
  id: number;
  title: string;
  content: string;
  author_id: number;
  author_name: string;
  posts_count: number;
  created_at: string;
  isLiked: boolean;
  stats: {
    likes: number;
    views: number;
    comments: number;
  };
  avatarUrl?: string; // Если в PostCard используется аватар
};

export type ThreadsResponse = {
  threads: Thread[];
  have_next: boolean;
};
