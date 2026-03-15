// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package model

import "time"

type Post struct {
	ID        int
	ThreadID  int
	UserID    int
	Content   string
	CreatedAt time.Time
}
type PostInfo struct {
	ID        int
	ThreadID  int
	UserID    int
	UserName  string
	Content   string
	CreatedAt time.Time
}
type PostListItem struct {
	ID        int
	UserID    int
	UserName  string
	Content   string
	CreatedAt time.Time
}

type PostCreate struct {
	ThreadID int
	UserID   int
	Content  string
}

// type PostListItem struct {
// 	ID      int
// 	UserID  int
// 	Content string
// }
