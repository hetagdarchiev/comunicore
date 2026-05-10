DROP TRIGGER IF EXISTS trg_posts_bump_thread_count ON posts;
DROP FUNCTION IF EXISTS threads_bump_posts_count();

ALTER TABLE threads ALTER COLUMN posts_count SET DEFAULT 1;
