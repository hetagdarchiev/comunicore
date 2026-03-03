package tests

import (
	"context"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/handler"
	"github.com/hetagdarchiev/forum-interaction-analytics/backend/internal/lib/config"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/modules/postgres"
)

type globalAppConfig struct {
	ConfigPath string

	Host      string
	Port      int
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

		Host:      "",
		Port:      0,
		JwtSecret: "superSecret",

		DbName:     "test",
		DbHost:     "",
		DbPort:     0,
		DbUser:     "test",
		DbPassword: "password",
	}
)

func postgresStart(ctx context.Context) (stop func()) {
	postgresContainer, err := postgres.Run(ctx,
		// "postgres:16-alpine",
		"postgres:18",
		// postgres.WithInitScripts(filepath.Join("testdata", "init-user-db.sh")),
		// postgres.WithConfigFile(filepath.Join("testdata", "my-postgres.conf")),
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

	appConfig := config.MustReadAppConfig(cmdConfig)
	// fix config with globalConfig
	appConfig.Database.Host = globalConfig.DbHost
	appConfig.Database.Port = globalConfig.DbPort
	appConfig.Server.JwtSecret = globalConfig.JwtSecret

	mux := http.NewServeMux()
	handler.RegisterOgenRoutes(mux, appConfig)

	return httptest.NewServer(mux)
}

func TestAPI(t *testing.T) {
	// ctx := t.Context()
	// stop := postgresStart(ctx)
	// defer stop()

	server := testServerStart()
	defer server.Close()

	url := server.URL + "/api/v1/user/create"
	log.Printf("Test server is running at: %s", url)
	time.Sleep(time.Second * 5)
}
