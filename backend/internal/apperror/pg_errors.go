// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package apperror

import (
	"fmt"

	"github.com/jackc/pgx/v5/pgconn"
)

// convert postgres error to app error or teturn original error
func PgErrorToAppError(err error) error {
	if pgErr, ok := err.(*pgconn.PgError); ok {
		if pgErr.Code == "23505" { // unique_violation
			return fmt.Errorf("error: %w\n caused by: %w", NewNotUniqueError(), err)
		}
		fmt.Printf("PostgreSQL unknown error code: %s, message: %s\n error struct %+v\n",
			pgErr.Code, pgErr.Message, *pgErr)
	} else {
		fmt.Printf("PgErrorToAppError got error %T %+v\n", err, err)
	}
	return err
}
