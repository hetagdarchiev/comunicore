// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package handler

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/hetagdarchiev/comunicore/backend/internal/apperror"

	forumApi "github.com/hetagdarchiev/comunicore/backend/internal/handler/generated"
	"github.com/hetagdarchiev/comunicore/backend/internal/service/jwt"
	userService "github.com/hetagdarchiev/comunicore/backend/internal/service/user"
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
	globalCtx := GlobalContextFromContext(ctx)
	if globalCtx == nil || globalCtx.UserIDIsSet == false || globalCtx.UserID <= 0 {
		log.Printf("global context %p, %+v\n", globalCtx, globalCtx)
		return nil, fmt.Errorf("handler UserMe invalid UserID")
	}
	return u.userGetById(ctx, globalCtx.UserID)
}
func (u *UserHandler) UserCreate(ctx context.Context, req *forumApi.UserCreateRequest) (forumApi.UserCreateRes, error) {
	user, err := u.userService.Create(ctx, req.Name, req.Email, req.Password)
	if err != nil {
		if _, ok := errors.AsType[*apperror.NotUniqueError](err); ok {
			res := forumApi.NewErrorNotUniqueUserCreateBadRequest(
				forumApi.ErrorNotUnique{
					Code: forumApi.ErrorNotUniqueCode(forumApi.ErrorNotUniqueCodeErrorNotUnique),
					Data: []string{"name", "email"},
				})
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
