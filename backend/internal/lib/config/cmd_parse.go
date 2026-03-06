// SPDX-License-Identifier: MIT
// Copyright 2025 Alex Syrnikov <alex19srv@gmail.com>

package config

import (
	"flag"
	"fmt"
	"log"
	"os"
	"strconv"

	toml "github.com/pelletier/go-toml/v2"
)

type CmdConfig struct {
	Config *string
	// database
	DatabaseHost     *string
	DatabasePort     *int
	DatabaseUser     *string
	DatabasePassword *string
	DatabaseName     *string
	// http server
	ServerHost      *string
	ServerPort      *int
	ServerJwtSecret *string
}

// CmdParse parses command-line arguments and returns a CmdConfig struct.
func CmdParse() *CmdConfig {
	configPath := flag.String("config", "", "path to config file")
	dbHost := flag.String("database-host", "", "database host")
	dbPort := flag.Int("database-port", 0, "database port")
	dbUser := flag.String("database-user", "", "database user")
	dbPassword := flag.String("database-password", "", "database password")
	dbName := flag.String("database-name", "", "database name")

	serverHost := flag.String("server-host", "", "http server host")
	serverPort := flag.Int("server-port", 0, "http server port")
	serverJwtSecret := flag.String("server-jwtsecret", "", "http server jwt secret")

	flag.Parse()

	return &CmdConfig{
		Config: configPath,
		// database
		DatabaseHost:     dbHost,
		DatabasePort:     dbPort,
		DatabaseUser:     dbUser,
		DatabasePassword: dbPassword,
		DatabaseName:     dbName,
		// http server
		ServerHost:      serverHost,
		ServerPort:      serverPort,
		ServerJwtSecret: serverJwtSecret,
	}
}

type DatabaseConfig struct {
	Host     string
	Port     int
	User     string
	Password string
	Name     string
}

func (db *DatabaseConfig) check(cmd *CmdConfig) error {
	db.Host = mergeCmdEnvCurrentDefaultString(cmd.DatabaseHost, "FORUM_DATABASE_HOST", db.Host, "localhost")
	db.Port = mergeCmdEnvCurrentDefaultInt(cmd.DatabasePort, "FORUM_DATABASE_PORT", db.Port, 5432)
	db.User = mergeCmdEnvCurrentDefaultString(cmd.DatabaseUser, "FORUM_DATABASE_USER", db.User, "")
	db.Password = mergeCmdEnvCurrentDefaultString(cmd.DatabasePassword, "FORUM_DATABASE_PASSWORD", db.Password, "")
	db.Name = mergeCmdEnvCurrentDefaultString(cmd.DatabaseName, "FORUM_DATABASE_NAME", db.Name, "")

	if db.Host == "" {
		return fmt.Errorf("database host is empty")
	}
	if db.Port <= 0 {
		return fmt.Errorf("database port is zero or negative")
	}
	if db.User == "" {
		return fmt.Errorf("database user is empty")
	}
	if db.Password == "" {
		return fmt.Errorf("database password is empty")
	}
	if db.Name == "" {
		return fmt.Errorf("database name is empty")
	}
	return nil
}

func (db *DatabaseConfig) DSN() string {
	// dsn := "postgres://username:password@localhost:5432/database_name"
	return fmt.Sprintf("postgres://%s:%s@%s:%d/%s", db.User, db.Password, db.Host, db.Port, db.Name)
}

type ServerConfig struct {
	Host      string
	Port      int
	JwtSecret string
}

func (srv *ServerConfig) check(cmd *CmdConfig) error {
	srv.Host = mergeCmdEnvCurrentDefaultString(cmd.ServerHost, "FORUM_SERVER_HOST", srv.Host, "::1")
	srv.Port = mergeCmdEnvCurrentDefaultInt(cmd.ServerPort, "FORUM_SERVER_PORT", srv.Port, 8080)
	srv.JwtSecret = mergeCmdEnvCurrentDefaultString(cmd.ServerJwtSecret, "FORUM_SERVER_JWTSECRET", srv.JwtSecret, "")

	if srv.Port <= 0 {
		return fmt.Errorf("server port is zero or negative")
	}
	if srv.Port > 65535 {
		return fmt.Errorf("server port is greater than 65535")
	}
	if srv.JwtSecret == "" {
		return fmt.Errorf("server jwt secret is empty")
	}
	return nil
}

type AppConfig struct {
	Database DatabaseConfig `toml:"database"`
	Server   ServerConfig   `toml:"server"`
}

// MustReadAppConfig reads the application configuration.
// If there is an error during reading or parsing the configuration, it panics.
func MustReadAppConfig(cmdConfig *CmdConfig) *AppConfig {
	cfgPath := configPath(cmdConfig)

	cfgBin, err := os.ReadFile(cfgPath)
	if err != nil {
		log.Fatalf("failed read config from \"%s\": %v", cfgPath, err)
	}

	var appConfig AppConfig
	err = toml.Unmarshal(cfgBin, &appConfig)
	if err != nil {
		log.Fatalf("failed parse config from \"%s\": %v", cfgPath, err)
	}

	err = appConfig.Database.check(cmdConfig)
	if err != nil {
		log.Fatalf("invalid db config from file \"%s\", environment or command-line: %v", cfgPath, err)
	}

	err = appConfig.Server.check(cmdConfig)
	if err != nil {
		log.Fatalf("invalid server config from file \"%s\", environment or command-line: %v", cfgPath, err)
	}

	return &appConfig
}

// get config path from command-line argument, environment variable or default value
func configPath(cmdConfig *CmdConfig) string {
	return mergeCmdEnvDefault(cmdConfig.Config, "FORUM_CONFIG", "./config.toml")
}

// mergeCmdEnvDefault merges command-line argument (most prioritive), environment and default
func mergeCmdEnvDefault(cmd *string, envName string, def string) string {
	var res string

	if cmd != nil && len(*cmd) > 0 {
		res = *cmd
	} else {
		res = os.Getenv(envName)
	}
	if res == "" {
		res = def
	}

	return res
}

// return first non empty value from command-line argument, environment variable, current or default value
func mergeCmdEnvCurrentDefaultString(cmd *string, envName string, current string, def string) string {
	if cmd != nil && len(*cmd) > 0 {
		return *cmd
	}
	env := os.Getenv(envName)
	if len(env) > 0 {
		return env
	}
	if len(current) > 0 {
		return current
	}
	return def
}

// return first non zero value from command-line argument, environment variable, current or default value
func mergeCmdEnvCurrentDefaultInt(cmd *int, envName string, current int, def int) int {
	if cmd != nil && *cmd != 0 {
		return *cmd
	}
	env := os.Getenv(envName)
	if len(env) > 0 {
		envInt, err := strconv.Atoi(env)
		if err == nil {
			return envInt
		}
	}
	if current != 0 {
		return current
	}
	return def
}
