// SPDX-License-Identifier: MIT
// Copyright 2025 Alex Syrnikov <alex19srv@gmail.com>

package handler

//go:generate go run github.com/ogen-go/ogen/cmd/ogen@latest --target ./generated/ --clean ../../../config/forum-api.yaml

import (
	"context"
	"fmt"
	"log"
	"net/http"

	forumApi "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/handler/generated"
	"github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/lib/config"
	"github.com/ogen-go/ogen/ogenerrors"

	authRepo "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/repository/auth"
	postsRepo "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/repository/posts"
	threadsRepo "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/repository/threads"
	userRepo "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/repository/user"

	authService "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/service/auth"
	jwtService "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/service/jwt"
	threadsService "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/service/threads"
	userService "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/service/user"
)

// OgenHandler implements forumApi.Handler.
type OgenHandler struct {
	authHandler    *AuthHandler
	userHandler    *UserHandler
	threadsHandler *ThreadsHandler
	forumApi.UnimplementedHandler
}

func NewOgenHandler(
	authHandler *AuthHandler,
	userHandler *UserHandler,
	threadsHandler *ThreadsHandler,
) *OgenHandler {

	return &OgenHandler{
		threadsHandler: threadsHandler,
		userHandler:    userHandler,
		authHandler:    authHandler,
	}
}

type securityHandler struct {
	jwtService *jwtService.JwtAuthorizator
}

func NewSecurityHandler(jwtService *jwtService.JwtAuthorizator) *securityHandler {
	return &securityHandler{
		jwtService: jwtService,
	}
}

func (h *securityHandler) HandleCookieAuth(
	ctx context.Context, operationName forumApi.OperationName, t forumApi.CookieAuth) (context.Context, error) {

	fmt.Printf("Cookie Auth with operation name %s and APIKey %s\n", operationName, t.APIKey)
	global := GlobalContextFromContext(ctx)
	if global == nil {
		return ctx, ogenerrors.ErrSecurityRequirementIsNotSatisfied
	}
	claims, err := h.jwtService.ValidateToken(t.APIKey)
	if err != nil {
		log.Printf("JWT refresh token validation error: %v\n", err)
		return ctx, ogenerrors.ErrSecurityRequirementIsNotSatisfied
	}
	global.RefreshToken = t.APIKey
	global.RefreshTokenIsSet = true
	if !global.UserIDIsSet {
		global.UserID = int(claims.UserID)
		global.UserIDIsSet = true
	}

	return ctx, nil
}
func (h *securityHandler) HandleJwtAuth(
	ctx context.Context, operationName forumApi.OperationName, t forumApi.JwtAuth) (context.Context, error) {

	fmt.Printf("JWT Auth with operation name %s and token %s\n", operationName, t.Token)

	global := GlobalContextFromContext(ctx)
	if global == nil {
		return ctx, ogenerrors.ErrSecurityRequirementIsNotSatisfied
	}
	claims, err := h.jwtService.ValidateToken(t.Token)
	if err != nil {
		log.Printf("JWT access token validation error: %v\n", err)
		return ctx, ogenerrors.ErrSecurityRequirementIsNotSatisfied
	}
	global.AccessToken = t.Token
	global.AccessTokenIsSet = true
	if !global.UserIDIsSet {
		global.UserID = int(claims.UserID)
		global.UserIDIsSet = true
	}
	return ctx, nil
}
func RegisterOgenRoutes(mux *http.ServeMux, config *config.AppConfig) {
	jwtS := jwtService.NewJwtService(config.Server.JwtSecret)

	authR, err := authRepo.NewAuthRepo(config.Database.DSN(), jwtS)
	if err != nil {
		fmt.Printf("Failed to create auth repo: %v\n", err)
		return
	}
	userR, err := userRepo.NewUserRepo(config.Database.DSN())
	if err != nil {
		fmt.Printf("Failed to create storage: %v\n", err)
		return
	}
	postR, err := postsRepo.NewPostsRepo(config.Database.DSN())
	if err != nil {
		panic(err)
	}
	threadR, err := threadsRepo.NewThreadsRepo(config.Database.DSN())
	if err != nil {
		panic(err)
	}

	authS := authService.NewAuthService(authR)
	userS := userService.NewUserService(userR, authR)
	threadsS := threadsService.NewThreadsService(threadR, postR, userR)

	authH := NewAuthHandler(authS)
	userH := NewUserHandler(userS, jwtS)
	threadsH := NewThreadsHandler(threadsS)

	ogenHandler := NewOgenHandler(authH, userH, threadsH)
	secHandler := NewSecurityHandler(jwtS)

	srv, err := forumApi.NewServer(ogenHandler, secHandler)
	if err != nil {
		panic(err)
	}
	mux.Handle("/api/", WithGlobalContext(srv))
}

// Thread handlers

func (h *OgenHandler) ThreadAddPost(ctx context.Context, req *forumApi.ThreadCreatePostRequest, params forumApi.ThreadAddPostParams) (forumApi.ThreadAddPostRes, error) {
	return h.threadsHandler.ThreadAddPost(ctx, req, params)
}

func (h *OgenHandler) ThreadCreate(ctx context.Context, req *forumApi.ThreadCreateRequest) (forumApi.ThreadCreateRes, error) {
	return h.threadsHandler.ThreadCreate(ctx, req)
}

func (h *OgenHandler) ThreadGet(ctx context.Context, params forumApi.ThreadGetParams) (forumApi.ThreadGetRes, error) {
	return h.threadsHandler.ThreadGet(ctx, params)
}

func (h *OgenHandler) ThreadsList(ctx context.Context, params forumApi.ThreadsListParams) (forumApi.ThreadsListRes, error) {
	return h.threadsHandler.ThreadsList(ctx, params)
}

// User handlers

func (h *OgenHandler) UserGet(ctx context.Context, params forumApi.UserGetParams) (forumApi.UserGetRes, error) {
	return h.userHandler.UserGet(ctx, params)
}

func (h *OgenHandler) UserMe(ctx context.Context) (forumApi.UserMeRes, error) {
	return h.userHandler.UserMe(ctx)
}

func (h *OgenHandler) UserCreate(ctx context.Context, req *forumApi.UserCreateRequest) (forumApi.UserCreateRes, error) {
	return h.userHandler.UserCreate(ctx, req)
}

func (h *OgenHandler) UserUpdate(ctx context.Context, req *forumApi.UserUpdateRequest, params forumApi.UserUpdateParams) (*forumApi.UserCreateResponse, error) {
	return h.userHandler.UserUpdate(ctx, req, params)
}

// Auth handlers

func (h *OgenHandler) AuthLogin(ctx context.Context, req *forumApi.AuthLoginRequest) (*forumApi.JwtToken, error) {
	return h.authHandler.AuthLogin(ctx, req)
}
func (h *OgenHandler) AuthLogout(ctx context.Context) error {
	return h.authHandler.AuthLogout(ctx)
}
func (h *OgenHandler) AuthRefresh(ctx context.Context) (forumApi.AuthRefreshRes, error) {
	res, err := h.authHandler.AuthRefresh(ctx)
	if err != nil {
		log.Printf("AuthRefresh error: %v\n", err)
		return nil, err
	}
	return res, err
}
