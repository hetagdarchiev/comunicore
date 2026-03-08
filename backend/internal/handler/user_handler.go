// SPDX-License-Identifier: MIT
// Copyright 2025 Alex Syrnikov <alex19srv@gmail.com>

package handler

import (
	"context"
	"errors"

	"github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/apperror"

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
	res, err := u.userGetById(ctx, params.UserId)
	if err != nil {
		return &forumApi.UserGetInternalServerError{}, err
	}
	return res, err
}
func (u *UserHandler) userGetById(ctx context.Context, userId int) (*forumApi.UserCreateResponse, error) {
	user, err := u.userService.Get(ctx, userId)
	if err != nil {
		return nil, err
	}
	return &forumApi.UserCreateResponse{
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
		if _, ok := errors.AsType[*apperror.NotUniqueError](err); ok {
			res := forumApi.ErrorNotUnique{
				Code: forumApi.ErrorNotUniqueCode(forumApi.ErrorNotUniqueCodeErrorNotUnique),
				Data: []string{"name", "email"},
			}
			return &res, nil
		}
		return nil, err
	}
	return &forumApi.UserCreateResponse{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
	}, nil
}
func (u *UserHandler) UserUpdate(ctx context.Context, req *forumApi.UserUpdateRequest, params forumApi.UserUpdateParams) (*forumApi.UserCreateResponse, error) {
	user, err := u.userService.Update(ctx, params.UserId, req.Name, req.Email)
	if err != nil {
		return nil, err
	}
	return &forumApi.UserCreateResponse{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
	}, nil
}
