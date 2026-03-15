// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package posts

import (
	"context"

	"github.com/hetagdarchiev/comunicore/backend/internal/service/model"
)

type PostRepo interface {
	Create(ctx context.Context, post model.PostCreate) (model.Post, error)
	List(ctx context.Context, threadId int) ([]model.Post, error)
}

type PostsService struct {
	postRepo PostRepo
}

func NewPostsService(postRepo PostRepo) *PostsService {
	return &PostsService{postRepo: postRepo}
}

func (s *PostsService) CreatePost(ctx context.Context, post model.PostCreate) (model.Post, error) {
	return s.postRepo.Create(ctx, post)
}

func (s *PostsService) ListPosts(ctx context.Context, threadId int) ([]model.Post, error) {
	return s.postRepo.List(ctx, threadId)
}
