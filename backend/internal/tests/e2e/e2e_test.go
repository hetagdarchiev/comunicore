// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package e2e

import (
	"context"
	"log"
	"testing"

	"github.com/stretchr/testify/require"
)

type globalAppConfig struct {
	ConfigPath string

	URL       string
	JwtSecret string

	DbHost     string
	DbPort     int
	DbName     string
	DbUser     string
	DbPassword string
}

var (
	globalConfig = globalAppConfig{
		URL: "",
		// server params to override config file values
		ConfigPath: "../../../config/server-config.toml",

		JwtSecret: "superSecret",

		DbHost:     "",
		DbPort:     0,
		DbName:     "test",
		DbUser:     "test",
		DbPassword: "password",
		// server params end
	}
)

const (
	userCreatePath  = "/api/user"
	userMePath      = "/api/user/me"
	userGetPath     = "/api/user/{id}"
	userUpdatePath  = "/api/user/{id}"
	authLoginPath   = "/api/auth/page"
	authLogoutPath  = "/api/auth/logout"
	authRefreshPath = "/api/auth/refresh"
)

func TestMain(m *testing.M) { // for global setup and teardown
	stop := postgresStart(context.Background())
	defer stop()

	server := testServerStart()
	defer server.Close()
	globalConfig.URL = server.URL

	m.Run()
}

func TestUserAndAuth(t *testing.T) {
	// TODO: test negative cases
	// userCreate
	// testUserCreateBad(t, globalConfig.URL)
	user := testUserCreateOk(t, globalConfig.URL)
	t.Logf("Created user: %+v", user)
	testUserCreateAgainFailure(t, globalConfig.URL, user)
	// userLogin
	_, refreshTokenCookie1 := testAuthLoginOk(t, globalConfig.URL, user)
	// testAuthLoginFailure(t, globalConfig.URL, user)
	// userRefresh
	jwtTokens, refreshTokenCookie2 := testAuthRefreshOk(t, globalConfig.URL, refreshTokenCookie1)
	log.Printf("refresh tokens 1 and 2 %p %p\n", refreshTokenCookie1, refreshTokenCookie2)
	require.NotEqual(t, refreshTokenCookie1.Value, refreshTokenCookie2.Value)
	// userMe
	userMe := testUserMeOk(t, globalConfig.URL, jwtTokens.AccessToken)
	require.Equal(t, user.ID, userMe.ID)
	require.Equal(t, user.Name, userMe.Name)
	require.Equal(t, user.Email, userMe.Email)
	// userGet
	getByIdUser := testUserGetOk(t, globalConfig.URL, jwtTokens.AccessToken, user.ID)
	require.Equal(t, user.ID, getByIdUser.ID)
	require.Equal(t, user.Name, getByIdUser.Name)
	require.Equal(t, user.Email, getByIdUser.Email)
	// userUpdate
	updayedUser := testUserUpdateOk(t, globalConfig.URL, jwtTokens.AccessToken, user.ID)
	require.Equal(t, user.ID, updayedUser.ID)
	require.NotEqual(t, user.Name, updayedUser.Name)
	require.NotEqual(t, user.Email, updayedUser.Email)
	// userLogout
	testAuthLogoutOk(t, globalConfig.URL, refreshTokenCookie2)
	// TODO: check user logged out
}
