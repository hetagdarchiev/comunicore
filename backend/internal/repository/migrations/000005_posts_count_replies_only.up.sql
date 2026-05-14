-- posts_count counts only rows in posts (thread replies), not the opening thread body.

ALTER TABLE threads ALTER COLUMN posts_count SET DEFAULT 0;

UPDATE threads AS t
SET posts_count = (
    SELECT COUNT(*)::integer FROM posts p WHERE p.thread_id = t.id
);

CREATE OR REPLACE FUNCTION threads_bump_posts_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE threads SET posts_count = posts_count + 1 WHERE id = NEW.thread_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_posts_bump_thread_count ON posts;
CREATE TRIGGER trg_posts_bump_thread_count
AFTER INSERT ON posts
FOR EACH ROW
EXECUTE FUNCTION threads_bump_posts_count();
