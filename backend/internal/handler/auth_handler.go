// SPDX-License-Identifier: MIT
// Copyright 2025 Alex Syrnikov <alex19srv@gmail.com>

package handler

import (
	"context"
	"fmt"
	"net/http"
	"time"

	forumApi "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/handler/generated"
	authService "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/service/auth"
)

type AuthHandler struct {
	authService *authService.AuthService
}

func NewAuthHandler(authService *authService.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

func (u *AuthHandler) AuthLogin(ctx context.Context, req *forumApi.AuthLoginRequest) (*forumApi.JwtToken, error) {
	access, refresh, err := u.authService.Login(ctx, req.Login, req.Password)
	if err != nil {
		return nil, err
	}

	globalCtx := GlobalContextFromContext(ctx)
	setRefreshCookie(globalCtx.ResponseWriter, refresh, time.Now().Add(65*24*time.Hour-time.Minute))

	return &forumApi.JwtToken{
		AccessToken:  access,
		RefreshToken: refresh,
	}, nil
}
func (u *AuthHandler) AuthRefresh(ctx context.Context) (forumApi.AuthRefreshRes, error) {
	globalCtx := GlobalContextFromContext(ctx)
	newAccess, newRefresh, err := u.authService.Refresh(ctx, globalCtx.RefreshToken)
	if err != nil {
		return nil, err
	}

	setRefreshCookie(globalCtx.ResponseWriter, newRefresh, time.Now().Add(65*24*time.Hour-time.Minute))

	return &forumApi.JwtToken{
		AccessToken:  newAccess,
		RefreshToken: newRefresh,
	}, nil
}
func (u *AuthHandler) AuthLogout(ctx context.Context) error {
	globalCtx := GlobalContextFromContext(ctx)
	refreshToken := globalCtx.RefreshToken
	if refreshToken == "" {
		return fmt.Errorf("refresh token is required in cookie refreshToken")
	}

	if err := u.authService.Logout(ctx, refreshToken); err != nil {
		return err
	}

	setRefreshCookie(globalCtx.ResponseWriter, "", time.Unix(0, 0))
	return nil
}
func setRefreshCookie(w http.ResponseWriter, refreshToken string, expires time.Time) {
	cookie := &http.Cookie{
		Name:     "refreshToken",
		Value:    refreshToken,
		Expires:  expires,
		HttpOnly: true,
		Path:     "/api/auth", // FIXME: get from config
	}
	http.SetCookie(w, cookie)
}
