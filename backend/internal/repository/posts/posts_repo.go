// SPDX-License-Identifier: MIT
// Copyright 2025 Alex Syrnikov <alex19srv@gmail.com>

package posts

import (
	"context"

	"github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/repository"
	postsDb "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/repository/sqlc/db"
	"github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/service/model"
)

type PostsRepo struct {
	queries *postsDb.Queries
}

func NewPostsRepo(dsn string) (*PostsRepo, error) {
	pool, err := repository.PgPool(dsn)
	if err != nil {
		return nil, err
	}
	return &PostsRepo{queries: postsDb.New(pool)}, nil
}

// create post in thread
func (r *PostsRepo) Create(ctx context.Context, post model.PostCreate) (model.Post, error) {
	row, err := r.queries.PostCreate(ctx, postsDb.PostCreateParams{
		ThreadID: int32(post.ThreadID),
		UserID:   int32(post.UserID),
		Content:  post.Content,
	})
	return model.Post{
		ID:        int(row.ID),
		ThreadID:  int(row.ThreadID),
		UserID:    int(row.UserID),
		Content:   row.Content,
		CreatedAt: row.CreatedAt.Time,
	}, err
}

// list posts by thread id
func (r *PostsRepo) List(ctx context.Context, threadId int) ([]model.Post, error) {
	rows, err := r.queries.PostListByThreadId(ctx, int32(threadId))

	var posts []model.Post
	for _, data := range rows {
		posts = append(posts, model.Post{
			ID:        int(data.ID),
			ThreadID:  int(data.ThreadID),
			UserID:    int(data.UserID),
			Content:   data.Content,
			CreatedAt: data.CreatedAt.Time,
		})
	}
	return posts, err
}
