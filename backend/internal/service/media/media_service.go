// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package media

import (
	"context"
	"io"
	"net/url"

	"github.com/hetagdarchiev/comunicore/backend/internal/apperror"
)

type MediaRepo interface {
	MediaUpload(ctx context.Context, reader io.Reader) (string, error)
}

type MediaService struct {
	mediaRepo    MediaRepo
	mediaBaseUrl string
}

func NewMediaService(mediaBaseUrl string, mediaRepo MediaRepo) *MediaService {
	return &MediaService{mediaRepo: mediaRepo, mediaBaseUrl: mediaBaseUrl}
}

func (r *MediaService) MediaUpload(ctx context.Context, reader io.Reader) (url.URL, error) {
	op := "MediaService.MediaUpload"
	fileHash, err := r.mediaRepo.MediaUpload(ctx, reader)
	if err != nil {
		return url.URL{}, apperror.NewUnspecifiedError("failed to upload media").InOperation(op).WithCause(err)
	}
	fileURLstring, err := url.JoinPath(r.mediaBaseUrl, fileHash)
	if err != nil {
		return url.URL{}, apperror.NewUnspecifiedError("failed to construct media URL").InOperation(op).WithCause(err)
	}
	fileURL, err := url.Parse(fileURLstring)
	if err != nil {
		return url.URL{}, apperror.NewUnspecifiedError("failed to construct media URL").InOperation(op).WithCause(err)
	}
	return *fileURL, nil
}
