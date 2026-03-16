// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package model

import "time"

type ThreadWithPosts struct {
	ID         int
	AuthorID   int
	AuthorName string
	Title      string
	Content    string
	PostsCount int
	CreatedAt  time.Time
	Posts      []PostListItem
}

type ThreadCreate struct {
	Title   string
	Content string
	UserID  int
}
type ThreadRepoInfo struct {
	ID         int
	Title      string
	Content    string
	UserID     int
	PostsCount int
	CreatedAt  time.Time
}
type ThreadListRepo struct {
	Threads []ThreadRepoInfo

	TotalCountEstimated int
	HavePrev            bool
	HaveNext            bool
}
type ThreadInfoResponse struct {
	ID         int
	Title      string
	Content    string
	AuthorID   int
	AuthorName string
	PostsCount int
	CreatedAt  time.Time
}

type ThreadListResponse struct {
	Threads []ThreadInfoResponse

	TotalCountEstimated int
	HavePrev            bool
	HaveNext            bool
}

type ThreadInfo struct {
	ID         int
	Title      string
	Content    string
	UserID     int
	UserName   string
	PostsCount int
	CreatedAt  time.Time
}

// type ThreadListItem struct {
// 	ID   int
// 	Name string
// }
