// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package analytics

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/hetagdarchiev/comunicore/backend/internal/repository"
	analyticsDb "github.com/hetagdarchiev/comunicore/backend/internal/repository/sqlc/db"
	"github.com/hetagdarchiev/comunicore/backend/internal/service/model"
)

type AnalyticsRepo struct {
	dbpool  *pgxpool.Pool
	queries *analyticsDb.Queries
}

func NewAnalyticsRepo(dsn string) (*AnalyticsRepo, error) {
	pool, err := repository.PgPool(dsn)
	if err != nil {
		return nil, err
	}
	return &AnalyticsRepo{dbpool: pool, queries: analyticsDb.New(pool)}, nil
}

func pgUUID(u uuid.UUID) pgtype.UUID {
	return pgtype.UUID{Bytes: u, Valid: true}
}

func (r *AnalyticsRepo) InsertVisitBatch(ctx context.Context, batch model.AnalyticsVisitBatchInsert) error {
	var uid *int32
	if batch.UserID != nil {
		v := int32(*batch.UserID)
		uid = &v
	}
	return r.queries.AnalyticsVisitBatchInsert(ctx, analyticsDb.AnalyticsVisitBatchInsertParams{
		UserID:               uid,
		ClientBatchID:        pgUUID(batch.ClientBatchID),
		ActiveDurationMs:     batch.ActiveDurationMs,
		VisibleDurationMs:    batch.VisibleDurationMs,
		IsMobile:             batch.IsMobile,
		HadComposeActivity:   batch.HadComposeActivity,
		HadReadActivity:      batch.HadReadActivity,
		BatchStartAt:         batch.BatchStartAt,
		BatchEndAt:           batch.BatchEndAt,
	})
}

func (r *AnalyticsRepo) GetMetrics(ctx context.Context, dropoffN, dropoffInactiveDays int) (model.AnalyticsMetricsRepo, error) {
	var out model.AnalyticsMetricsRepo

	dur, err := r.queries.AnalyticsAvgDurations(ctx)
	if err != nil {
		return out, err
	}
	out.AvgActiveTimeMs = dur.AvgActiveMs
	out.AvgVisibleTimeMs = dur.AvgVisibleMs
	out.MaxActiveTimeMs = dur.MaxActiveMs

	out.ConnectionDensity, err = r.queries.AnalyticsConnectionDensity(ctx)
	if err != nil {
		return out, err
	}

	out.DropoffChurnPercent, err = r.queries.AnalyticsDropoffPercent(ctx, analyticsDb.AnalyticsDropoffPercentParams{
		ThresholdN:   int32(dropoffN),
		InactiveDays: int32(dropoffInactiveDays),
	})
	if err != nil {
		return out, err
	}

	mobileSess, err := r.queries.AnalyticsMobileSessionShares(ctx)
	if err != nil {
		return out, err
	}
	out.MobilePctReaders = mobileSess.PctMobileReaders
	out.MobilePctWriters = mobileSess.PctMobileWriters
	out.MobilePctSessions = mobileSess.PctMobileSessions

	out.MobilePctUsers, err = r.queries.AnalyticsMobileUserPercent(ctx)
	if err != nil {
		return out, err
	}

	hours, err := r.queries.AnalyticsActivityHourDistribution(ctx)
	if err != nil {
		return out, err
	}
	out.ActivityByHourUTC = make([]model.AnalyticsHourShare, 0, len(hours))
	for _, h := range hours {
		out.ActivityByHourUTC = append(out.ActivityByHourUTC, model.AnalyticsHourShare{
			Hour:          int(h.HourUtc),
			SharePercent:  h.SharePercent,
		})
	}

	tagRow, err := r.queries.AnalyticsTopTag(ctx)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			out.TopTag = nil
		} else {
			return out, err
		}
	} else {
		out.TopTag = &model.AnalyticsTopTag{
			Tag:         tagRow.Tag,
			UsageCount:  tagRow.UsageCount,
		}
	}

	now := time.Now().UTC()
	weekStart := now.AddDate(0, 0, -7)
	monthStart := now.AddDate(0, -1, 0)

	weekRow, err := r.queries.AnalyticsTopThreadInRange(ctx, analyticsDb.AnalyticsTopThreadInRangeParams{
		StartAt: weekStart,
		EndAt:   now,
	})
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			out.TopThreadWeekly = nil
		} else {
			return out, err
		}
	} else {
		out.TopThreadWeekly = &model.AnalyticsTopThread{
			ThreadID:           int(weekRow.ID),
			Title:              weekRow.Title,
			RepliesInWindow:    weekRow.ReplyCountInRange,
		}
	}

	monthRow, err := r.queries.AnalyticsTopThreadInRange(ctx, analyticsDb.AnalyticsTopThreadInRangeParams{
		StartAt: monthStart,
		EndAt:   now,
	})
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			out.TopThreadMonthly = nil
		} else {
			return out, err
		}
	} else {
		out.TopThreadMonthly = &model.AnalyticsTopThread{
			ThreadID:           int(monthRow.ID),
			Title:              monthRow.Title,
			RepliesInWindow:    monthRow.ReplyCountInRange,
		}
	}

	return out, nil
}
