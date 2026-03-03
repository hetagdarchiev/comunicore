// SPDX-License-Identifier: MIT
// Copyright 2025 Alex Syrnikov <alex19srv@gmail.com>

package user

import (
	"context"

	"github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/repository"
	userDb "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/repository/sqlc/db"
	"github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/service/model"
)

type UserRepo struct {
	queries *userDb.Queries
}

func NewUserRepo(dsn string) (*UserRepo, error) {
	pool, err := repository.PgPool(dsn)
	if err != nil {
		return nil, err
	}
	return &UserRepo{queries: userDb.New(pool)}, nil
}

func (r *UserRepo) Get(ctx context.Context, userId int) (model.User, error) {
	row, err := r.queries.UserGet(ctx, int32(userId))
	return model.User{
		ID:    int(row.ID),
		Name:  row.Name,
		Email: row.Email,
	}, err
}
func (r *UserRepo) GetNameById(ctx context.Context, userId int) (string, error) {
	// TODO: optimize with cache
	return r.queries.UserGetNameById(ctx, int32(userId))
}

func (r *UserRepo) Create(ctx context.Context, name, email string) (model.User, error) {
	row, err := r.queries.UserCreate(ctx, userDb.UserCreateParams{Name: name, Email: email})
	return model.User{
		ID:    int(row.ID),
		Name:  row.Name,
		Email: row.Email,
	}, err
}

func (r *UserRepo) Update(ctx context.Context, userId int, name, email string) (model.User, error) {
	row, err := r.queries.UserUpdate(ctx, userDb.UserUpdateParams{ID: int32(userId), Name: name, Email: email})
	return model.User{
		ID:    int(row.ID),
		Name:  row.Name,
		Email: row.Email,
	}, err
}
