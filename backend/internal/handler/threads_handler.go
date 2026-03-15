// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package handler

import (
	"context"

	forumApi "github.com/hetagdarchiev/comunicore/backend/internal/handler/generated"
	"github.com/hetagdarchiev/comunicore/backend/internal/service/model"
	threadsService "github.com/hetagdarchiev/comunicore/backend/internal/service/threads"
)

type ThreadsHandler struct {
	threadsService *threadsService.ThreadsService
}

func NewThreadsHandler(threadsService *threadsService.ThreadsService) *ThreadsHandler {
	return &ThreadsHandler{threadsService: threadsService}
}

func (h *ThreadsHandler) ThreadAddPost(
	ctx context.Context,
	req *forumApi.ThreadCreatePostRequest,
	params forumApi.ThreadAddPostParams) (forumApi.ThreadAddPostRes, error) {

	postCreate := model.PostCreate{
		ThreadID: params.ThreadId,
		// UserID:   params.UserID,
		UserID:  1, // FIXME: get user id from auth context
		Content: req.Content,
	}

	post, err := h.threadsService.AddPost(ctx, postCreate)
	if err != nil {
		return nil, err
	}

	return &forumApi.ThreadPostItem{
		ID:         post.ID,
		AuthorID:   post.UserID,
		AuthorName: post.UserName,
		Content:    post.Content,
		CreatedAt:  post.CreatedAt,
	}, nil
}

func (h *ThreadsHandler) ThreadCreate(ctx context.Context, req *forumApi.ThreadCreateRequest) (forumApi.ThreadCreateRes, error) {
	modelThreadCreate := model.ThreadCreate{
		Title:   req.Title,
		Content: req.Content,
		UserID:  1, // FIXME: get user id from auth context
	}

	thread, err := h.threadsService.Create(ctx, modelThreadCreate)
	if err != nil {
		return nil, err
	}
	return &forumApi.ThreadListItem{
		ID:         thread.ID,
		Title:      thread.Title,
		Content:    thread.Content,
		AuthorID:   thread.UserID,
		AuthorName: thread.UserName,
		PostsCount: thread.PostsCount,
		CreatedAt:  thread.CreatedAt,
	}, nil
}

// get thread with all posts
func (h *ThreadsHandler) ThreadGet(ctx context.Context, params forumApi.ThreadGetParams) (forumApi.ThreadGetRes, error) {
	threadWithPosts, err := h.threadsService.GetThreadWithPosts(ctx, params.ThreadId)
	if err != nil {
		return nil, err
	}
	var posts []forumApi.ThreadPostItem
	for _, post := range threadWithPosts.Posts {
		posts = append(posts, forumApi.ThreadPostItem{
			ID:         post.ID,
			AuthorID:   post.UserID,
			AuthorName: post.UserName,
			Content:    post.Content,
			CreatedAt:  post.CreatedAt,
		})
	}
	return &forumApi.ThreadWithPostsListResponse{
		ID:         threadWithPosts.ID,
		AuthorID:   threadWithPosts.AuthorID,
		AuthorName: threadWithPosts.AuthorName,
		Title:      threadWithPosts.Title,
		Content:    threadWithPosts.Content,
		PostsCount: threadWithPosts.PostsCount,
		CreatedAt:  threadWithPosts.CreatedAt,
		Posts:      posts,
	}, nil
}

func (h *ThreadsHandler) ThreadsList(ctx context.Context, params forumApi.ThreadsListParams) (forumApi.ThreadsListRes, error) {
	var limit = 20
	if params.Limit.IsSet() {
		limit = params.Limit.Value
	}
	var err error
	var threadList model.ThreadListResponse
	var threadId int
	page, ok := params.Page.Get()
	if ok {
		threadList, err = h.threadsService.GetThreadListByPage(ctx, page, limit)
		if err != nil {
			return nil, err
		}
		goto GOT_THREAD_ID
	}
	threadId, ok = params.Before.Get()
	if ok {
		threadList, err = h.threadsService.GetThreadListByOffset(ctx, threadId, limit, true)
		if err != nil {
			return nil, err
		}
		goto GOT_THREAD_ID
	}
	threadId, ok = params.After.Get()
	if ok {
		threadList, err = h.threadsService.GetThreadListByOffset(ctx, threadId, limit, false)
		if err != nil {
			return nil, err
		}
		goto GOT_THREAD_ID
	}
	threadList, err = h.threadsService.GetThreadListByPage(ctx, 1, limit)
	if err != nil {
		return nil, err
	}
GOT_THREAD_ID:
	resThreads := make([]forumApi.ThreadListItem, len(threadList.Threads))
	for i, thread := range threadList.Threads {
		resThreads[i] = forumApi.ThreadListItem{
			ID:         thread.ID,
			Title:      thread.Title,
			Content:    thread.Content,
			AuthorID:   thread.AuthorID,
			AuthorName: thread.AuthorName,
			PostsCount: thread.PostsCount,
			CreatedAt:  thread.CreatedAt,
		}
	}
	return &forumApi.ThreadListResponse{
		Threads:             resThreads,
		TotalCountEstimated: threadList.TotalCountEstimated,
		HavePrev:            threadList.HavePrev,
		HaveNext:            threadList.HaveNext,
	}, nil
}
