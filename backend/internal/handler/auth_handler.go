// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package handler

import (
	"context"
	"net/http"
	"time"

	"github.com/google/uuid"
	api "github.com/hetagdarchiev/comunicore/backend/internal/handler/generated"
	urlencode "github.com/hetagdarchiev/comunicore/backend/internal/lib/urlEncode"
	authService "github.com/hetagdarchiev/comunicore/backend/internal/service/auth"
)

type AuthHandler struct {
	authService *authService.AuthService
}

func NewAuthHandler(authService *authService.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

func (u *AuthHandler) AuthLogin(ctx context.Context, req *api.AuthLoginRequest) (api.AuthLoginRes, error) {
	user, sessionUUID, err := u.authService.Login(ctx, req.Login, req.Password)
	if err != nil {
		return nil, err
	}

	globalCtx := GlobalContextFromContext(ctx)
	sessionID := urlencode.Encode(sessionUUID[:])
	setCookie(globalCtx.ResponseWriter, sessionID, time.Now().Add(65*24*time.Hour-time.Minute))

	return &api.UserCreateResponse{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
	}, nil
}
func (u *AuthHandler) AuthLogout(ctx context.Context) error {
	globalCtx := GlobalContextFromContext(ctx)
	sessionUUID := globalCtx.SessionID
	if sessionUUID == uuid.Nil {
		return nil
	}

	if err := u.authService.Logout(ctx, sessionUUID); err != nil {
		return err
	}

	deleteCookie(globalCtx.ResponseWriter, "")
	globalCtx.ResponseWriter.Header().Set("Clear-Site-Data", "cookies")

	return nil
}
func setCookie(w http.ResponseWriter, sessionID string, expires time.Time) {
	cookie := &http.Cookie{
		Name:     "sid",
		Value:    sessionID,
		Path:     "/",
		Expires:  expires,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}
	http.SetCookie(w, cookie)
}
func deleteCookie(w http.ResponseWriter, refreshToken string) {
	cookie := &http.Cookie{
		Name:     "sid",
		Value:    refreshToken,
		MaxAge:   -1,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}
	http.SetCookie(w, cookie)
}
