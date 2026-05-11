// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package threads

import (
	"context"

	"github.com/hetagdarchiev/comunicore/backend/internal/service/model"
)

type ThreadsRepo interface {
	Create(ctx context.Context, thread model.ThreadCreate) (model.ThreadRepoInfo, error)
	Get(ctx context.Context, threadId int) (*model.ThreadRepoInfo, error)
	PageByPageID(ctx context.Context, page, limit int) (model.ThreadListRepo, error)
	PageByOffset(ctx context.Context, threadId, limit int, before bool) (model.ThreadListRepo, error)
}
type PostsRepo interface {
	Create(ctx context.Context, post model.PostCreate) (model.Post, error)
	List(ctx context.Context, threadId int) ([]model.Post, error)
}
type UserRepo interface {
	GetNameById(ctx context.Context, userId int) (string, error)
	Get(ctx context.Context, userId int) (model.User, error)
}

type ThreadsService struct {
	threadsRepo ThreadsRepo
	postsRepo   PostsRepo
	userRepo    UserRepo
}

func NewThreadsService(threadsRepo ThreadsRepo, postsRepo PostsRepo, userRepo UserRepo) *ThreadsService {
	return &ThreadsService{threadsRepo: threadsRepo, postsRepo: postsRepo, userRepo: userRepo}
}

func (s *ThreadsService) AddPost(ctx context.Context, post model.PostCreate) (model.PostInfo, error) {
	createdPost, err := s.postsRepo.Create(ctx, post)
	if err != nil {
		return model.PostInfo{}, err
	}
	userName, err := s.userRepo.GetNameById(ctx, createdPost.UserID)
	if err != nil {
		return model.PostInfo{}, err
	}
	return model.PostInfo{
		ID:        createdPost.ID,
		ThreadID:  createdPost.ThreadID,
		UserID:    createdPost.UserID,
		UserName:  userName,
		Content:   createdPost.Content,
		CreatedAt: createdPost.CreatedAt,
	}, nil
}
func (s *ThreadsService) Create(ctx context.Context, thread model.ThreadCreate) (model.ThreadInfo, error) {
	createdThread, err := s.threadsRepo.Create(ctx, thread)
	if err != nil {
		return model.ThreadInfo{}, err
	}
	userName, err := s.userRepo.GetNameById(ctx, createdThread.UserID)
	if err != nil {
		return model.ThreadInfo{}, err
	}
	return model.ThreadInfo{
		ID:         createdThread.ID,
		Title:      createdThread.Title,
		Content:    createdThread.Content,
		UserID:     createdThread.UserID,
		UserName:   userName,
		PostsCount: createdThread.PostsCount,
		CreatedAt:  createdThread.CreatedAt,
	}, nil
}

func (s *ThreadsService) GetThreadWithPosts(ctx context.Context, threadId int) (model.ThreadWithPosts, error) {
	threadInfo, err := s.threadsRepo.Get(ctx, threadId)
	if err != nil {
		return model.ThreadWithPosts{}, err
	}
	posts, err := s.postsRepo.List(ctx, threadId)
	if err != nil {
		return model.ThreadWithPosts{}, err
	}
	var postListItems []model.PostListItem
	for _, post := range posts {
		userInfo, err := s.userRepo.Get(ctx, post.UserID)
		if err != nil {
			return model.ThreadWithPosts{}, err
		}
		postListItems = append(postListItems, model.PostListItem{
			ID:              post.ID,
			UserID:          post.UserID,
			UserName:        userInfo.Name,
			AuthorAvatarUrl: userInfo.AvatarURL,
			Content:         post.Content,
			CreatedAt:       post.CreatedAt,
		})
	}
	userInfo, err := s.userRepo.Get(ctx, threadInfo.UserID)
	if err != nil {
		return model.ThreadWithPosts{}, err
	}
	return model.ThreadWithPosts{
		ID:              threadInfo.ID,
		AuthorID:        threadInfo.UserID,
		AuthorName:      userInfo.Name,
		AuthorAvatarUrl: userInfo.AvatarURL,
		Title:           threadInfo.Title,
		Content:         threadInfo.Content,
		PostsCount:      threadInfo.PostsCount,
		CreatedAt:       threadInfo.CreatedAt,
		Posts:           postListItems,
	}, nil
}
func (s *ThreadsService) GetThreadListByPage(ctx context.Context, page, limit int) (model.ThreadListResponse, error) {
	threadListRepo, err := s.threadsRepo.PageByPageID(ctx, page, limit)
	if err != nil {
		return model.ThreadListResponse{}, err
	}
	return s.convertThreadListRepoToResponse(ctx, threadListRepo)
}
func (s *ThreadsService) GetThreadListByOffset(ctx context.Context, threadId, limit int, before bool) (model.ThreadListResponse, error) {
	threadListRepo, err := s.threadsRepo.PageByOffset(ctx, threadId, limit, before)
	if err != nil {
		return model.ThreadListResponse{}, err
	}
	return s.convertThreadListRepoToResponse(ctx, threadListRepo)
}
func (s *ThreadsService) convertThreadListRepoToResponse(
	ctx context.Context, threadListRepo model.ThreadListRepo) (model.ThreadListResponse, error) {

	var threadList []model.ThreadInfoResponse
	for _, thread := range threadListRepo.Threads {
		userInfo, err := s.userRepo.Get(ctx, thread.UserID)
		if err != nil {
			return model.ThreadListResponse{}, err
		}
		threadList = append(threadList, model.ThreadInfoResponse{
			ID:              thread.ID,
			Title:           thread.Title,
			Content:         thread.Content,
			AuthorID:        thread.UserID,
			AuthorName:      userInfo.Name,
			AuthorAvatarUrl: userInfo.AvatarURL,
			PostsCount:      thread.PostsCount,
			CreatedAt:       thread.CreatedAt,
		})
	}
	return model.ThreadListResponse{
		Threads:             threadList,
		TotalCountEstimated: threadListRepo.TotalCountEstimated,
		HavePrev:            threadListRepo.HavePrev,
		HaveNext:            threadListRepo.HaveNext,
	}, nil
}
