// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package media

import (
	"context"
	"fmt"
	"io"
	"net/url"
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
	fileHash, err := r.mediaRepo.MediaUpload(ctx, reader)
	if err != nil {
		return url.URL{}, fmt.Errorf("failed to upload media: %w", err)
	}
	fileURLstring, err := url.JoinPath(r.mediaBaseUrl, fileHash)
	if err != nil {
		return url.URL{}, fmt.Errorf("failed to construct media URL: %w", err)
	}
	fileURL, err := url.Parse(fileURLstring)
	if err != nil {
		return url.URL{}, fmt.Errorf("failed to construct media URL: %w", err)
	}
	return *fileURL, nil
}
