// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package repository

import (
	"context"
	"log"
	"sync/atomic"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var dbpool *atomic.Pointer[pgxpool.Pool] = &atomic.Pointer[pgxpool.Pool]{}

func PgPool(dsn string) (*pgxpool.Pool, error) {
	pool := dbpool.Load()
	if pool != nil {
		return pool, nil
	}

	var err error
	pool, err = pgxpool.New(context.Background(), dsn)
	if err != nil {
		return nil, err
	}

	pingCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	err = pool.Ping(pingCtx)
	if err != nil {
		pool.Close()
		log.Fatal("failed db connect: ", err)
		return nil, err
	}

	swapped := dbpool.CompareAndSwap(nil, pool)
	if !swapped {
		pool.Close()
		return dbpool.Load(), nil
	}

	return pool, nil
}

func Close() {
	pool := dbpool.Load()
	if pool != nil {
		pool.Close()
		dbpool.Store(nil)
	}
}
