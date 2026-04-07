// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package e2e

import (
	"net/http"
	"testing"

	"github.com/gavv/httpexpect/v2"
	"github.com/hetagdarchiev/comunicore/backend/internal/tests"
)

func testThreadCreateOk(t *testing.T, baseURL string, cookie *http.Cookie) {
	t.Run("Test UserUpdate OK", func(t *testing.T) {
		exp := expectCreate(t, baseURL)
		auth := exp.Builder(func(req *httpexpect.Request) {
			req.WithCookie(sessionCookieName, cookie.Value)
		})

		res := auth.POST(threadCreatePath).
			WithJSON(map[string]any{
				"title":   "Test Thread " + tests.RandomString(8),
				"content": "This is a test thread content " + tests.RandomString(20),
			}).
			Expect().
			Status(http.StatusCreated).JSON().Object()

		res.Keys().ContainsOnly("id", "author_id", "author_name", "title", "content", "posts_count", "created_at")
		res.Value("id").Number().Gt(0)
		res.Value("author_id").Number().Gt(0)
		res.Value("author_name").String().NotEmpty()
		res.Value("title").String().HasPrefix("Test Thread ")
		res.Value("content").String().HasPrefix("This is a test thread content ")
		res.Value("posts_count").Number().IsEqual(0)
		res.Value("created_at").String().NotEmpty()
	})
}
func TestThreadCreate(t *testing.T) {
	user := testUserCreateOk(t, globalConfig.URL)
	sessionCookie := testAuthLoginOk(t, globalConfig.URL, user)
	testThreadCreateOk(t, globalConfig.URL, sessionCookie)
}
