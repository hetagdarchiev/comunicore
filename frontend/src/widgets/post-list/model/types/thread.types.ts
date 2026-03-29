export type Thread = {
  id: number;
  title: string;
  content: string;
  author_id: number;
  author_name: string;
  posts_count: number;
  created_at: string;
};

export type ThreadsResponse = {
  threads: Thread[];
  have_next: boolean;
};
