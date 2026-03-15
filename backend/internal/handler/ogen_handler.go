// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package handler

//go:generate go run github.com/ogen-go/ogen/cmd/ogen@latest --target ./generated/ --clean ../../../config/comunicore-api.yaml

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/rs/cors"

	"github.com/hetagdarchiev/comunicore/backend/internal/apperror"
	api "github.com/hetagdarchiev/comunicore/backend/internal/handler/generated"
	"github.com/hetagdarchiev/comunicore/backend/internal/lib/config"
	"github.com/ogen-go/ogen/ogenerrors"

	authRepo "github.com/hetagdarchiev/comunicore/backend/internal/repository/auth"
	postsRepo "github.com/hetagdarchiev/comunicore/backend/internal/repository/posts"
	threadsRepo "github.com/hetagdarchiev/comunicore/backend/internal/repository/threads"
	userRepo "github.com/hetagdarchiev/comunicore/backend/internal/repository/user"

	authService "github.com/hetagdarchiev/comunicore/backend/internal/service/auth"
	jwtService "github.com/hetagdarchiev/comunicore/backend/internal/service/jwt"
	threadsService "github.com/hetagdarchiev/comunicore/backend/internal/service/threads"
	userService "github.com/hetagdarchiev/comunicore/backend/internal/service/user"
)

// OgenHandler implements api.Handler.
type OgenHandler struct {
	authHandler    *AuthHandler
	userHandler    *UserHandler
	threadsHandler *ThreadsHandler
	api.UnimplementedHandler
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
	ctx context.Context, operationName api.OperationName, t api.CookieAuth) (context.Context, error) {

	op := "securityHandler.HandleCookieAuth"
	fmt.Printf("Cookie Auth with operation name %s\n", operationName)
	global := GlobalContextFromContext(ctx)
	if global == nil {
		return ctx, apperror.NewAuthenticationError(op, nil, "context not found")
	}
	claims, err := h.jwtService.ValidateToken(t.APIKey)
	if err != nil {
		log.Printf("JWT refresh token validation error: %v\n", err)
		return ctx, apperror.NewAuthenticationError(op, err, "invalid Cookie JWT token")
	}
	fmt.Printf("op %s, Cookie auth valid, claims: %+v\n", op, claims)
	global.RefreshToken = t.APIKey
	global.RefreshTokenIsSet = true
	if !global.UserIDIsSet {
		global.UserID = int(claims.UserID)
		global.UserIDIsSet = true
	}

	return ctx, nil
}
func (h *securityHandler) HandleJwtAuth(
	ctx context.Context, operationName api.OperationName, t api.JwtAuth) (context.Context, error) {

	op := "securityHandler.HandleJwtAuth"
	fmt.Printf("JWT Auth with operation name %s and token %s\n", operationName, t.Token)

	global := GlobalContextFromContext(ctx)
	if global == nil {
		return ctx, ogenerrors.ErrSecurityRequirementIsNotSatisfied
	}
	claims, err := h.jwtService.ValidateToken(t.Token)
	if err != nil {
		log.Printf("JWT access token validation error: %v\n", err)
		return ctx, apperror.NewAuthenticationError(op, err, "invalid JWT token")
	}
	global.AccessToken = t.Token
	global.AccessTokenIsSet = true
	if !global.UserIDIsSet {
		global.UserID = int(claims.UserID)
		global.UserIDIsSet = true
	}
	return ctx, nil
}

type errorHandler struct{}

func sendErrorStringMessage(w http.ResponseWriter, httpCode int, err error, errMessage string) {
	e := api.ErrorStringMessage{
		Code:    api.NewOptErrorStringMessageCode(api.ErrorStringMessageCodeErrorStringMessage),
		Message: errMessage,
	}
	w.Header().Set("Content-Type", "application/json")
	data, err := e.MarshalJSON()
	if err != nil {
	}
	w.WriteHeader(httpCode)
	_, _ = w.Write(data)
}
func (h *errorHandler) handler(ctx context.Context, w http.ResponseWriter, r *http.Request, err error) {
	fmt.Printf("in ogen error handler\n")
	var (
		code = http.StatusInternalServerError
	)
	// !!! errors handling order here is VERY important, because some errors can be wrapped in other errors,
	// so we need to check for more specific errors first
	if authenticationError, ok := errors.AsType[*apperror.AuthenticationError](err); ok {
		log.Printf("AuthenticationError: %v\n", authenticationError)
		sendErrorStringMessage(w, http.StatusUnauthorized, err, "incorrect login or password or login not exists")
		return
	}
	if decodeRequestError, ok := errors.AsType[*ogenerrors.DecodeRequestError](err); ok {
		log.Printf("DecodeRequestError: %v\n", decodeRequestError)
		sendErrorStringMessage(w, http.StatusBadRequest, err, decodeRequestError.Error())
		return
	}
	if securityError, ok := errors.AsType[*ogenerrors.SecurityError](err); ok {
		// security error means request did not reach JWT or Cookie auth handlers (they returns apperror),
		// so we can return 401
		log.Printf("SecurityError: %v\n", securityError)
		sendErrorStringMessage(w, http.StatusUnauthorized, securityError, "failed to read security credentials")
		return
	}
	fmt.Printf("error handler called with error: %T %v\n", err, err)
	_, _ = io.WriteString(w, http.StatusText(code))
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

	errHandler := &errorHandler{}
	srv, err := api.NewServer(ogenHandler, secHandler, api.WithErrorHandler(errHandler.handler))
	if err != nil {
		panic(err)
	}
	apiHandler := WithGlobalContext(srv)

	fmt.Printf("cors enabled for origins %s\n", config.Server.PermittedOrigin)
	if len(config.Server.PermittedOrigin) > 0 {
		fmt.Printf("cors enabled for origins %s\n", config.Server.PermittedOrigin)
		corsHandler := cors.New(cors.Options{
			AllowedOrigins:   []string{config.Server.PermittedOrigin},
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"Authorization", "Content-Type"},
			AllowCredentials: true,
		})
		apiHandler = corsHandler.Handler(apiHandler)
	}
	mux.Handle("/api/", apiHandler)
}

// Thread handlers

func (h *OgenHandler) ThreadAddPost(ctx context.Context, req *api.ThreadCreatePostRequest, params api.ThreadAddPostParams) (api.ThreadAddPostRes, error) {
	return h.threadsHandler.ThreadAddPost(ctx, req, params)
}

func (h *OgenHandler) ThreadCreate(ctx context.Context, req *api.ThreadCreateRequest) (api.ThreadCreateRes, error) {
	return h.threadsHandler.ThreadCreate(ctx, req)
}

func (h *OgenHandler) ThreadGet(ctx context.Context, params api.ThreadGetParams) (api.ThreadGetRes, error) {
	return h.threadsHandler.ThreadGet(ctx, params)
}

func (h *OgenHandler) ThreadsList(ctx context.Context, params api.ThreadsListParams) (api.ThreadsListRes, error) {
	return h.threadsHandler.ThreadsList(ctx, params)
}

// User handlers

func (h *OgenHandler) UserGet(ctx context.Context, params api.UserGetParams) (api.UserGetRes, error) {
	return h.userHandler.UserGet(ctx, params)
}

func (h *OgenHandler) UserMe(ctx context.Context) (api.UserMeRes, error) {
	return h.userHandler.UserMe(ctx)
}

func (h *OgenHandler) UserCreate(ctx context.Context, req *api.UserCreateRequest) (api.UserCreateRes, error) {
	return h.userHandler.UserCreate(ctx, req)
}

func (h *OgenHandler) UserUpdate(ctx context.Context, req *api.UserUpdateRequest, params api.UserUpdateParams) (*api.UserCreateResponse, error) {
	return h.userHandler.UserUpdate(ctx, req, params)
}

// Auth handlers

func (h *OgenHandler) AuthLogin(ctx context.Context, req *api.AuthLoginRequest) (api.AuthLoginRes, error) {
	return h.authHandler.AuthLogin(ctx, req)
}
func (h *OgenHandler) AuthLogout(ctx context.Context) error {
	return h.authHandler.AuthLogout(ctx)
}
func (h *OgenHandler) AuthRefresh(ctx context.Context) (api.AuthRefreshRes, error) {
	res, err := h.authHandler.AuthRefresh(ctx)
	if err != nil {
		log.Printf("AuthRefresh error: %v\n", err)
		return nil, err
	}
	return res, err
}
