package tests

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/handler"
	"github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/lib/config"
	jwtService "github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/service/jwt"
	"github.com/stretchr/testify/require"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/modules/postgres"
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
		ConfigPath: "../../config/server-config.toml",

		URL:       "",
		JwtSecret: "superSecret",

		DbHost:     "",
		DbPort:     0,
		DbName:     "test",
		DbUser:     "test",
		DbPassword: "password",
	}
)

const (
	userCreatePath  = "/api/user"
	userMePath      = "/api/user/me"
	authLoginPath   = "/api/auth/login"
	authRefreshPath = "/api/auth/refresh"
)

func postgresStart(ctx context.Context) (stop func()) {
	postgresContainer, err := postgres.Run(ctx,
		// "postgres:16-alpine",
		"postgres:18",
		postgres.WithInitScripts("../repository/sqlc/schema.sql"),
		postgres.WithDatabase(globalConfig.DbName),
		postgres.WithUsername(globalConfig.DbUser),
		postgres.WithPassword(globalConfig.DbPassword),
		postgres.BasicWaitStrategies(),
	)
	if err != nil {
		log.Printf("failed to start container: %s", err)
		return
	}

	globalConfig.DbHost, err = postgresContainer.Host(ctx)
	if err != nil {
		log.Printf("failed to get host: %s", err)
		return
	}
	log.Printf("PostgreSQL container is running on host: %s", globalConfig.DbHost)
	port, err := postgresContainer.MappedPort(ctx, "5432")
	if err != nil {
		log.Printf("failed to get mapped port: %s", err)
		return
	}
	globalConfig.DbPort = port.Int()
	log.Printf("PostgreSQL container is mapped to port: %d", globalConfig.DbPort)

	return func() {
		if err := testcontainers.TerminateContainer(postgresContainer); err != nil {
			log.Printf("failed to terminate container: %s", err)
		}
	}
}
func testServerStart() *httptest.Server {
	cmdConfig := config.CmdParse()
	cmdConfig.Config = &globalConfig.ConfigPath // fix config path for tests
	cmdConfig.ServerJwtSecret = &globalConfig.JwtSecret
	cmdConfig.DatabaseHost = &globalConfig.DbHost
	cmdConfig.DatabasePort = &globalConfig.DbPort
	cmdConfig.DatabaseName = &globalConfig.DbName
	cmdConfig.DatabaseUser = &globalConfig.DbUser
	cmdConfig.DatabasePassword = &globalConfig.DbPassword
	// HACK commandline config values will override config file values
	appConfig := config.MustReadAppConfig(cmdConfig)

	mux := http.NewServeMux()
	handler.RegisterOgenRoutes(mux, appConfig)

	return httptest.NewServer(mux)
}

func clientCreate() *http.Client {
	return &http.Client{
		Timeout: 5 * time.Second,
	}
}
func clientGet(
	t *testing.T, baseURLWithPath string, statusCode int, authToken string,
) (map[string]any, *http.Response, error) {

	client := clientCreate()
	req, err := http.NewRequest("GET", baseURLWithPath, nil)
	require.NoError(t, err)
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", authToken))

	resp, err := client.Do(req)
	require.NoError(t, err)
	defer resp.Body.Close()
	require.Equal(t, statusCode, resp.StatusCode)

	var result map[string]any
	err = json.NewDecoder(resp.Body).Decode(&result)

	return result, resp, err
}
func clientPost(t *testing.T, baseURLWithPath, jsonBody string, statusCode int) (map[string]any, *http.Response, error) {
	client := clientCreate()

	resp, err := client.Post(baseURLWithPath, "application/json", bytes.NewBufferString(jsonBody))
	require.NoError(t, err)
	defer resp.Body.Close()
	require.Equal(t, resp.StatusCode, statusCode)

	var result map[string]any
	err = json.NewDecoder(resp.Body).Decode(&result)

	return result, resp, err
}
func clientPostWithHeaders(
	t *testing.T, baseURLWithPath, jsonBody string, statusCode int, headers map[string]string, cookie *http.Cookie,
) (map[string]any, *http.Response, error) {

	client := clientCreate()
	req, err := http.NewRequest("POST", baseURLWithPath, bytes.NewBufferString(jsonBody))
	require.NoError(t, err)
	for key, value := range headers {
		req.Header.Set(key, value)
	}
	if cookie != nil {
		req.AddCookie(cookie)
	}

	resp, err := client.Do(req)
	require.NoError(t, err)
	defer resp.Body.Close()
	require.Equal(t, statusCode, resp.StatusCode)

	var result map[string]any
	err = json.NewDecoder(resp.Body).Decode(&result)

	return result, resp, err
}

func cookieGet(resp *http.Response, name string) *http.Cookie {
	for _, cookie := range resp.Cookies() {
		if cookie.Name == name {
			return cookie
		}
	}
	return nil
}

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
	user := testUserCreateOk(t, globalConfig.URL)
	t.Logf("Created user: %+v", user)
	// userLogin
	_, refreshTokenCookie1 := testAuthLoginOk(t, globalConfig.URL, user)
	// userRefresh
	jwtTokens, refreshTokenCookie2 := testAuthRefreshOk(t, globalConfig.URL, refreshTokenCookie1)
	log.Printf("refresh tokens 1 and 2 %p %p\n", refreshTokenCookie1, refreshTokenCookie2)
	require.NotEqual(t, refreshTokenCookie1.Value, refreshTokenCookie2.Value)
	// userMe
	userMe := testUserMeOk(t, globalConfig.URL, jwtTokens.AccessToken)
	require.Equal(t, user.ID, userMe.ID)
	require.Equal(t, user.Name, userMe.Name)
	require.Equal(t, user.Email, userMe.Email)

	// logout
	// user get by id
	// user update
}

type ForumUser struct {
	ID       int
	Name     string
	Email    string
	Password string
}

func testUserCreateOk(t *testing.T, baseURL string) ForumUser {
	user := ForumUser{
		Name:     "testUser",
		Email:    "test@example.com",
		Password: "testpassword",
	}
	t.Run("Test UserCreate OK", func(t *testing.T) {
		// Arrange
		body := fmt.Sprintf(`{"name":"%s","email":"%s","password":"%s"}`,
			user.Name, user.Email, user.Password)
		// Act
		result, _, err := clientPost(t, baseURL+userCreatePath, body, http.StatusCreated)
		// Assert
		require.NoError(t, err)
		require.Contains(t, result, "id")
		require.Contains(t, result, "name")
		require.Contains(t, result, "email")
		require.NotContains(t, result, "password")

		user.ID = int(result["id"].(float64))
	})

	return user
}
func testUserMeOk(t *testing.T, baseURL string, accessToken string) ForumUser {
	var user ForumUser
	t.Run("Test UserCreate OK", func(t *testing.T) {
		// Arrange
		// Act
		result, _, err := clientGet(t, baseURL+userMePath, http.StatusOK, accessToken)
		// Assert
		require.NoError(t, err)
		require.Contains(t, result, "id")
		require.Contains(t, result, "name")
		require.Contains(t, result, "email")
		require.NotContains(t, result, "password")

		user.ID = int(result["id"].(float64))
		user.Name = result["name"].(string)
		user.Email = result["email"].(string)
	})

	return user
}

type JwtTokens struct {
	AccessToken  string
	RefreshToken string
}

func testAuthLoginOk(t *testing.T, baseURL string, user ForumUser) (JwtTokens, *http.Cookie) {
	var jwtTokens JwtTokens
	var cookie *http.Cookie
	t.Run("Test AuthLogin OK", func(t *testing.T) {
		// Arrange
		body := fmt.Sprintf(`{"login":"%s","password":"%s"}`,
			user.Email, user.Password)
		// Act
		result, resp, err := clientPost(t, baseURL+authLoginPath, body, http.StatusOK)
		// Assert
		require.NoError(t, err)
		require.Contains(t, result, "accessToken")
		require.Contains(t, result, "refreshToken")
		// check cookies "refreshToken" is set
		cookie = cookieGet(resp, "refreshToken")
		require.NotNil(t, cookie)
		require.Equal(t, cookie.Value, result["refreshToken"])
		require.Equal(t, true, cookie.HttpOnly)
		require.Equal(t, "/api/auth", cookie.Path)
		require.NotEqual(t, cookie.Expires, time.Time{}) // Expires should be set
		jwt := jwtService.NewJwtService(globalConfig.JwtSecret)
		_, err = jwt.ValidateToken(result["accessToken"].(string))
		require.NoError(t, err)
		_, err = jwt.ValidateToken(result["refreshToken"].(string))
		require.NoError(t, err)

		jwtTokens = JwtTokens{
			AccessToken:  result["accessToken"].(string),
			RefreshToken: result["refreshToken"].(string),
		}
	})

	return jwtTokens, cookie
}
func testAuthRefreshOk(t *testing.T, baseURL string, refreshTokenCookie *http.Cookie) (JwtTokens, *http.Cookie) {
	var jwtTokens JwtTokens
	var cookie *http.Cookie
	t.Run("Test AuthRefresh OK", func(t *testing.T) {
		// Act
		result, resp, err := clientPostWithHeaders(
			t, baseURL+authRefreshPath, "", http.StatusOK, nil, refreshTokenCookie)
		// Assert
		require.NoError(t, err)
		require.Contains(t, result, "accessToken")
		require.Contains(t, result, "refreshToken")
		// check cookies "refreshToken" is set
		cookie = cookieGet(resp, "refreshToken")
		require.NotNil(t, cookie)
		require.Equal(t, cookie.Value, result["refreshToken"])
		require.Equal(t, true, cookie.HttpOnly)
		require.Equal(t, "/api/auth", cookie.Path)
		require.NotEqual(t, cookie.Expires, time.Time{}) // Expires should be set
		jwt := jwtService.NewJwtService(globalConfig.JwtSecret)
		_, err = jwt.ValidateToken(result["accessToken"].(string))
		require.NoError(t, err)
		_, err = jwt.ValidateToken(result["refreshToken"].(string))
		require.NoError(t, err)

		jwtTokens = JwtTokens{
			AccessToken:  result["accessToken"].(string),
			RefreshToken: result["refreshToken"].(string),
		}
	})

	return jwtTokens, cookie
}
