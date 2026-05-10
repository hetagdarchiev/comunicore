CREATE TABLE IF NOT EXISTS thread_tags (
    thread_id INTEGER NOT NULL REFERENCES threads (id) ON DELETE CASCADE,
    tag TEXT NOT NULL,
    PRIMARY KEY (thread_id, tag)
);

CREATE INDEX IF NOT EXISTS thread_tags_tag_idx ON thread_tags (tag);

CREATE TABLE IF NOT EXISTS analytics_visit_batches (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id) ON DELETE SET NULL,
    client_batch_id UUID NOT NULL UNIQUE,
    active_duration_ms BIGINT NOT NULL CHECK (active_duration_ms >= 0),
    visible_duration_ms BIGINT NOT NULL CHECK (visible_duration_ms >= 0),
    is_mobile BOOLEAN NOT NULL,
    had_compose_activity BOOLEAN NOT NULL DEFAULT FALSE,
    had_read_activity BOOLEAN NOT NULL DEFAULT TRUE,
    batch_start_at TIMESTAMP WITH TIME ZONE NOT NULL,
    batch_end_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS analytics_visit_batches_start_at_idx ON analytics_visit_batches (batch_start_at);
CREATE INDEX IF NOT EXISTS analytics_visit_batches_user_id_idx ON analytics_visit_batches (user_id);
