// SPDX-License-Identifier: MIT
// Copyright 2025 Alex Syrnikov <alex19srv@gmail.com>

package auth

import (
	"context"
	"fmt"
	"log"

	"github.com/google/uuid"
	"github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/repository"
	authDb "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/repository/sqlc/db"
	"github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/service/jwt"
	"github.com/jackc/pgx/v5/pgtype"
)

type AuthRepo struct {
	jwt     *jwt.JwtAuthorizator
	queries *authDb.Queries
}

func NewAuthRepo(dsn string, jwtAuthorizator *jwt.JwtAuthorizator) (*AuthRepo, error) {
	pool, err := repository.PgPool(dsn)
	if err != nil {
		return nil, err
	}

	return &AuthRepo{
		jwt:     jwtAuthorizator,
		queries: authDb.New(pool),
	}, nil
}

func (r *AuthRepo) AuthCreate(ctx context.Context, user_id int64, login, password string) error {
	passwordHash := hashPassword(password)
	fmt.Printf("password hash %s\n", passwordHash)

	return r.queries.AuthCreate(ctx, authDb.AuthCreateParams{
		UserID:       int32(user_id),
		Login:        login,
		PasswordHash: passwordHash,
	})
}
func (r *AuthRepo) AuthUpdatePassword(ctx context.Context, user_id int64, password string) error {
	passwordHash := hashPassword(password)
	fmt.Printf("password hash %s\n", passwordHash)
	// TODO: make upsert query
	return r.queries.AuthUpdatePassword(ctx, authDb.AuthUpdatePasswordParams{
		UserID:       int32(user_id),
		PasswordHash: passwordHash,
	})
}
func (r *AuthRepo) Login(ctx context.Context, login, password string) (access, refresh string, err error) {
	userId, err := r.checkLoginPassword(ctx, login, password)
	if err != nil {
		return "", "", err
	}

	accessToken, refreshToken, refreshUuid, err := r.createTokens(int64(userId))
	if err != nil {
		return "", "", err
	}

	fmt.Printf("access token: %s\n", accessToken)
	fmt.Printf("refresh token: %s\n", refreshToken)

	err = r.queries.AuthCreateSession(ctx, authDb.AuthCreateSessionParams{
		JwtID:  pgtype.UUID{Bytes: refreshUuid, Valid: true},
		UserID: int32(userId),
	})

	return accessToken, refreshToken, err
}

func (r *AuthRepo) Logout(ctx context.Context, refreshToken string) error {
	uu, err := r.jwt.JwtID(refreshToken)
	if err != nil {
		return err
	}
	return r.queries.AuthDeleteSession(ctx, pgtype.UUID{Bytes: uu, Valid: true})
}

func (r *AuthRepo) Refresh(ctx context.Context, refreshToken string) (access, newRefresh string, err error) {
	claims, err := r.jwt.ValidateToken(refreshToken)
	if err != nil {
		return "", "", err
	}

	oldJwtId, err := r.jwt.JwtID(refreshToken)
	if err != nil {
		return "", "", err
	}

	userId := claims.UserID
	newAccess, newRefresh, refreshJwtId, err := r.createTokens(int64(userId))
	if err != nil {
		return "", "", err
	}

	rowsAffected, err := r.queries.AuthUpdateSession(ctx, authDb.AuthUpdateSessionParams{
		JwtID:   pgtype.UUID{Bytes: refreshJwtId, Valid: true},
		UserID:  int32(userId),
		JwtID_2: pgtype.UUID{Bytes: oldJwtId, Valid: true},
	})
	if err != nil {
		return "", "", err
	}
	if rowsAffected == 1 {
		return newAccess, newRefresh, nil
	}
	// session already refreshed, probubly by hacker, removing all sessions for user
	log.Printf("session not found or already refreshed, removing all sessions for user %d with old jwt id %s\n",
		userId, oldJwtId.String())
	err = r.queries.AuthDeleteAllUserSessions(ctx, int32(userId))

	return "", "", fmt.Errorf("session not found or already refreshed")
}

func (r *AuthRepo) createTokens(userId int64) (access, refresh string, refreshUuid uuid.UUID, err error) {
	accessToken, err := r.jwt.CreateAccessToken(uint32(userId))
	if err != nil {
		return "", "", uuid.UUID{}, err
	}
	refreshUuid, refreshToken, err := r.jwt.CreateRefreshToken(uint32(userId))
	if err != nil {
		return "", "", uuid.UUID{}, err
	}
	return accessToken, refreshToken, refreshUuid, nil
}

func (r *AuthRepo) checkLoginPassword(ctx context.Context, login, password string) (int, error) {
	row, err := r.queries.AuthGetUserAndPasswordHash(ctx, login)
	fmt.Printf("stored hash %s\n", row.PasswordHash)

	err = authenticateUser(row.PasswordHash, password)
	if err != nil {
		return 0, err
	}
	return int(row.UserID), nil
}
