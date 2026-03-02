// SPDX-License-Identifier: MIT
// Copyright 2025 Alex Syrnikov <alex19srv@gmail.com>

package user

import (
	"context"

	"github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/repository"
	"github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/service/model"
	"github.com/jackc/pgx/v5/pgxpool"
)

type UserRepo struct {
	dbpool *pgxpool.Pool
}

func NewUserRepo(dsn string) (*UserRepo, error) {
	pool, err := repository.PgPool(dsn)
	if err != nil {
		return nil, err
	}
	return &UserRepo{dbpool: pool}, nil
}

func (r *UserRepo) Get(ctx context.Context, userId int) (*model.User, error) {
	row := r.dbpool.QueryRow(ctx,
		`SELECT id, name, email FROM users WHERE id = $1`,
		userId)

	var id int
	var name, email string
	if err := row.Scan(&id, &name, &email); err != nil {
		return nil, err // TODO: not found error
	}
	return &model.User{
		ID:    id,
		Name:  name,
		Email: email,
	}, nil
}
func (r *UserRepo) GetNameById(ctx context.Context, userId int) (string, error) {
	// TODO: optimize with cache
	row := r.dbpool.QueryRow(ctx,
		`SELECT name FROM users WHERE id = $1`,
		userId)

	var name string
	if err := row.Scan(&name); err != nil {
		return "", err
	}
	return name, nil
}

func (r *UserRepo) Create(ctx context.Context, name, email string) (*model.User, error) {
	row := r.dbpool.QueryRow(ctx,
		`INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email`,
		name, email)

	var id int
	if err := row.Scan(&id, &name, &email); err != nil {
		return nil, err
	}
	return &model.User{
		ID:    id,
		Name:  name,
		Email: email,
	}, nil
}

func (r *UserRepo) Update(ctx context.Context, userId int, name, email string) (*model.User, error) {
	row := r.dbpool.QueryRow(ctx,
		`UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email`,
		name, email, userId)

	var id int
	if err := row.Scan(&id, &name, &email); err != nil {
		return nil, err
	}
	return &model.User{
		ID:    id,
		Name:  name,
		Email: email,
	}, nil
}
func (r *UserRepo) Delete(ctx context.Context, userId int) error {
	_, err := r.dbpool.Exec(ctx, `DELETE FROM users WHERE id = $1`, userId)
	return err
}
