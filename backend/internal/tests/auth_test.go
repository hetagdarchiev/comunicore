package tests

import (
	"net/http"
	"testing"
	"time"

	"github.com/gavv/httpexpect/v2"
	jwtService "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/service/jwt"
	"github.com/stretchr/testify/require"
)

type JwtTokens struct {
	AccessToken  string
	RefreshToken string
}

func testAuthLoginOk(t *testing.T, baseURL string, user ForumUser) (JwtTokens, *http.Cookie) {
	var jwtTokens JwtTokens
	var cookie *http.Cookie
	t.Run("Test AuthLogin OK", func(t *testing.T) {
		exp := expectCreate(t, baseURL)

		res := exp.POST(baseURL + authLoginPath).
			WithJSON(map[string]any{
				"login":    user.Email,
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

		auth.POST(baseURL + authLogoutPath).
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

		res := auth.POST(baseURL + authRefreshPath).
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
