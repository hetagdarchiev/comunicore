CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);
-- used for password authentication
CREATE TABLE IF NOT EXISTS auth_passwords (
    user_id INTEGER PRIMARY KEY,
    login TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
    jwt_id UUID PRIMARY KEY,
    user_id INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS threads (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    posts_count INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    thread_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

-- name: UserGet :one
SELECT id, name, email FROM users WHERE id = $1;
-- name: UserGetNameById :one
SELECT name FROM users WHERE id = $1;
-- name: UserCreate :one
INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email;
-- name: UserUpdate :one
UPDATE users
SET name = $1, email = $2
WHERE id = $3 RETURNING id, name, email;

-- name: AuthCreate :exec
INSERT INTO auth_passwords (user_id, login, password_hash) VALUES ($1, $2, $3);
-- name: AuthUpdatePassword :exec
UPDATE auth_passwords SET password_hash = $2 WHERE user_id = $1;
-- name: AuthCreateSession :exec
INSERT INTO sessions (jwt_id, user_id) VALUES ($1, $2);
-- name: AuthGetUserAndPasswordHash :one
SELECT user_id, password_hash FROM auth_passwords WHERE login = $1;
-- name: AuthDeleteSession :exec
DELETE FROM sessions WHERE jwt_id = $1;
-- name: AuthDeleteAllUserSessions :exec
DELETE FROM sessions WHERE user_id = $1;
-- name: AuthUpdateSession :execrows
UPDATE sessions SET jwt_id = $1 WHERE user_id = $2 AND jwt_id = $3;

-- name: PostCreate :one
INSERT INTO posts (thread_id, user_id, content) VALUES ($1, $2, $3)
RETURNING id, thread_id, user_id, content, created_at;
-- name: PostListByThreadId :many
SELECT id, thread_id, user_id, content, created_at FROM posts
WHERE thread_id = $1 ORDER BY created_at DESC;

-- name: ThreadCreate :one
INSERT INTO threads (title, content, user_id, posts_count) VALUES ($1, $2, $3, 1)
RETURNING id, title, content, posts_count, user_id, created_at;
-- name: ThreadGetById :one
SELECT id, title, content, user_id, posts_count, created_at FROM threads WHERE id = $1;
-- name: ThreadPageByPageID :many
SELECT id, title, content, user_id, posts_count, created_at
FROM threads
ORDER BY id DESC LIMIT $1 OFFSET $2;
-- name: ThreadPagesBeforeThreadID :many
SELECT id, title, content, user_id, posts_count, created_at
FROM threads
WHERE id < $1
ORDER BY id DESC LIMIT $2;
-- name: ThreadPagesAfterThreadID :many
SELECT id, title, content, user_id, posts_count, created_at
FROM threads
WHERE id > $1
ORDER BY id DESC LIMIT $2;
