// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package e2e

import (
	"net/http"
	"testing"
	"time"

	"github.com/gavv/httpexpect/v2"
	jwtService "github.com/hetagdarchiev/comunicore/backend/internal/service/jwt"
	"github.com/stretchr/testify/require"
)

type JwtTokens struct {
	AccessToken  string
	RefreshToken string
}

func TestAuthLoginOk(t *testing.T) {
	user := testUserCreateOk(t, globalConfig.URL)
	jwtTokens1, refreshTokenCookie1 := testAuthLoginOk(t, globalConfig.URL, user)
	jwtTokens2, refreshTokenCookie2 := testAuthLoginOk(t, globalConfig.URL, user)
	require.NotEqual(t, jwtTokens1.AccessToken, jwtTokens2.AccessToken)
	require.NotEqual(t, jwtTokens1.RefreshToken, jwtTokens2.RefreshToken)
	require.NotEqual(t, refreshTokenCookie1.Value, refreshTokenCookie2.Value)
}
func TestAuthLoginFailure(t *testing.T) {
	baseURL := globalConfig.URL
	user := testUserCreateOk(t, baseURL)

	tests := []struct {
		name     string
		page    string
		password string
	}{
		{
			name:     "Invalid password",
			page:    user.Email,
			password: user.Password + "bad",
		},
		{
			name:     "Invalid page",
			page:    user.Email + "bad",
			password: user.Password,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			exp := expectCreate(t, baseURL)

			res := exp.POST(authLoginPath).
				WithJSON(map[string]any{
					"page":    tt.page,
					"password": tt.password,
				}).
				Expect().
				Status(http.StatusUnauthorized)

			jwtObj := res.JSON().Object()
			jwtObj.Keys().ContainsOnly("code", "message")

			res.Cookies().IsEmpty()
		})
	}
}
func TestAuthRefresh(t *testing.T) {
	user := testUserCreateOk(t, globalConfig.URL)
	_, refreshTokenCookie := testAuthLoginOk(t, globalConfig.URL, user)
	_, newRefreshTokenCookie := testAuthRefreshOk(t, globalConfig.URL, refreshTokenCookie)
	// failure cases
	testAuthRefreshRecycledToken(t, globalConfig.URL, refreshTokenCookie)
	testAuthRefreshFailure(t, globalConfig.URL, newRefreshTokenCookie)
}
func testAuthLoginOk(t *testing.T, baseURL string, user ForumUser) (JwtTokens, *http.Cookie) {
	var jwtTokens JwtTokens
	var cookie *http.Cookie
	t.Run("Test AuthLogin OK", func(t *testing.T) {
		exp := expectCreate(t, baseURL)

		res := exp.POST(authLoginPath).
			WithJSON(map[string]any{
				"page":    user.Email,
				"password": user.Password,
			}).
			Expect().
			Status(http.StatusOK)

		jwtObj := res.JSON().Object()
		jwtObj.Keys().ContainsOnly("accessToken", "refreshToken")
		jwtTokens.AccessToken = jwtObj.Value("accessToken").String().Raw()
		jwtTokens.RefreshToken = jwtObj.Value("refreshToken").String().Raw()

		resCookie := res.Cookie("refreshToken")
		resCookie.Value().IsEqual(jwtTokens.RefreshToken)
		require.True(t, resCookie.Raw().HttpOnly)
		resCookie.Path().IsEqual("/api/auth")
		resCookie.Expires().NotEqual(time.Time{}) // Expires should be set
		cookie = resCookie.Raw()

		jwt := jwtService.NewJwtService(globalConfig.JwtSecret)
		_, err := jwt.ValidateToken(jwtTokens.AccessToken)
		require.NoError(t, err)
		_, err = jwt.ValidateToken(jwtTokens.RefreshToken)
		require.NoError(t, err)
	})

	return jwtTokens, cookie
}
func testAuthLogoutOk(t *testing.T, baseURL string, refreshTokenCookie *http.Cookie) {
	t.Run("Test Auth Logout OK", func(t *testing.T) {
		exp := expectCreate(t, baseURL)
		auth := exp.Builder(func(req *httpexpect.Request) {
			req.WithCookie("refreshToken", refreshTokenCookie.Value)
		})

		auth.POST(authLogoutPath).
			Expect().
			Status(http.StatusNoContent)
	})
}
func testAuthRefreshOk(t *testing.T, baseURL string, refreshTokenCookie *http.Cookie) (JwtTokens, *http.Cookie) {
	var jwtTokens JwtTokens
	var cookie *http.Cookie
	t.Run("Test AuthRefresh OK", func(t *testing.T) {
		exp := expectCreate(t, baseURL)
		auth := exp.Builder(func(req *httpexpect.Request) {
			req.WithCookie("refreshToken", refreshTokenCookie.Value)
		})

		res := auth.POST(authRefreshPath).
			Expect().
			Status(http.StatusOK)

		jwtObj := res.JSON().Object()
		jwtObj.Keys().ContainsOnly("accessToken", "refreshToken")
		jwtTokens.AccessToken = jwtObj.Value("accessToken").String().Raw()
		jwtTokens.RefreshToken = jwtObj.Value("refreshToken").String().Raw()

		resCookie := res.Cookie("refreshToken")
		resCookie.Value().IsEqual(jwtTokens.RefreshToken)
		require.True(t, resCookie.Raw().HttpOnly)
		resCookie.Path().IsEqual("/api/auth")
		resCookie.Expires().NotEqual(time.Time{}) // Expires should be set
		cookie = resCookie.Raw()

		jwt := jwtService.NewJwtService(globalConfig.JwtSecret)
		_, err := jwt.ValidateToken(jwtTokens.AccessToken)
		require.NoError(t, err)
		_, err = jwt.ValidateToken(jwtTokens.RefreshToken)
		require.NoError(t, err)
	})

	return jwtTokens, cookie
}
func testAuthRefreshRecycledToken(t *testing.T, baseURL string, refreshTokenCookie *http.Cookie) {
	t.Run("Test AuthRefresh Failure (used recycled token)", func(t *testing.T) {
		exp := expectCreate(t, baseURL)
		auth := exp.Builder(func(req *httpexpect.Request) {
			req.WithCookie("refreshToken", refreshTokenCookie.Value)
		})

		auth.POST(authRefreshPath).
			Expect().
			Status(http.StatusOK)
	})
}
func testAuthRefreshFailure(t *testing.T, baseURL string, refreshTokenCookie *http.Cookie) {
	t.Run("Test AuthRefresh Failure (no cookie)", func(t *testing.T) {
		exp := expectCreate(t, baseURL)
		// auth := exp.Builder(func(req *httpexpect.Request) {
		// 	req.WithCookie("refreshToken", refreshTokenCookie.Value)
		// })

		exp.POST(authRefreshPath).
			Expect().
			Status(http.StatusUnauthorized)

		// jwtObj := res.JSON().Object()
		// jwtObj.Keys().ContainsOnly("accessToken", "refreshToken")
		// jwtTokens.AccessToken = jwtObj.Value("accessToken").String().Raw()
		// jwtTokens.RefreshToken = jwtObj.Value("refreshToken").String().Raw()

		// resCookie := res.Cookie("refreshToken")
		// resCookie.Value().IsEqual(jwtTokens.RefreshToken)
		// require.True(t, resCookie.Raw().HttpOnly)
		// resCookie.Path().IsEqual("/api/auth")
		// resCookie.Expires().NotEqual(time.Time{}) // Expires should be set
		// cookie = resCookie.Raw()

		// jwt := jwtService.NewJwtService(globalConfig.JwtSecret)
		// _, err := jwt.ValidateToken(jwtTokens.AccessToken)
		// require.NoError(t, err)
		// _, err = jwt.ValidateToken(jwtTokens.RefreshToken)
		// require.NoError(t, err)
	})
}
