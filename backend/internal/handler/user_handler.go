// SPDX-License-Identifier: MIT
// Copyright 2025 Alex Syrnikov <alex19srv@gmail.com>

package handler

import (
	"context"

	forumApi "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/handler/generated"
	"github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/service/jwt"
	userService "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/service/user"
)

type UserHandler struct {
	userService *userService.UserService
	jwtService  *jwt.JwtAuthorizator
}

func NewUserHandler(userService *userService.UserService, jwtService *jwt.JwtAuthorizator) *UserHandler {
	return &UserHandler{userService: userService, jwtService: jwtService}
}

func (u *UserHandler) UserGet(ctx context.Context, params forumApi.UserGetParams) (forumApi.UserGetRes, error) {
	return u.userGetById(ctx, params.UserId)
}
func (u *UserHandler) userGetById(ctx context.Context, userId int) (*forumApi.UserCreateResponseOk, error) {
	user, err := u.userService.Get(ctx, userId)
	if err != nil {
		return nil, err
	}
	return &forumApi.UserCreateResponseOk{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
	}, nil
}
func (u *UserHandler) UserMe(ctx context.Context) (forumApi.UserMeRes, error) {
	return u.userGetById(ctx, 1) // TODO: get user id from JWT token
}
func (u *UserHandler) UserCreate(ctx context.Context, req *forumApi.UserCreateRequest) (forumApi.UserCreateRes, error) {
	user, err := u.userService.Create(ctx, req.Name, req.Email, req.Password)
	if err != nil {
		return nil, err
	}
	return &forumApi.UserCreateResponseOk{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
	}, nil
}
func (u *UserHandler) UserUpdate(ctx context.Context, req *forumApi.UserUpdateRequest, params forumApi.UserUpdateParams) (*forumApi.UserCreateResponseOk, error) {
	user, err := u.userService.Update(ctx, params.UserId, req.Name, req.Email)
	if err != nil {
		return nil, err
	}
	return &forumApi.UserCreateResponseOk{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
	}, nil
}
