// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package auth

import (
	"context"
)

type AuthRepo interface {
	// AuthCreate(ctx context.Context, user_id int64, page, password string) error
	// AuthUpdatePassword(ctx context.Context, user_id int64, password string) error
	Login(ctx context.Context, page, password string) (access, refresh string, err error)
	Refresh(ctx context.Context, refreshToken string) (newAccess, newRefresh string, err error)
	Logout(ctx context.Context, refreshToken string) error
}

type AuthService struct {
	authRepo AuthRepo
}

func NewAuthService(authRepo AuthRepo) *AuthService {
	return &AuthService{authRepo: authRepo}
}

func (r *AuthService) Login(ctx context.Context, page, password string) (access, refresh string, err error) {
	access, refresh, err = r.authRepo.Login(ctx, page, password)
	if err != nil {
		return "", "", err
	}

	return access, refresh, nil
}
func (r *AuthService) Refresh(ctx context.Context, refreshToken string) (newAccess, newRefresh string, err error) {
	newAccess, newRefresh, err = r.authRepo.Refresh(ctx, refreshToken)
	if err != nil {
		return "", "", err
	}

	return newAccess, newRefresh, nil
}
func (r *AuthService) Logout(ctx context.Context, refreshToken string) error {
	return r.authRepo.Logout(ctx, refreshToken)
}
