// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package jwt

import (
	"encoding/base64"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type JwtAuthorizator struct {
	Secret []byte
}

type JWTClaims struct {
	UserID uint32 `json:"uid"`
	jwt.RegisteredClaims
}

func NewJwtService(secret string) *JwtAuthorizator {
	return &JwtAuthorizator{
		Secret: []byte(secret),
	}
}

func (a *JwtAuthorizator) CreateRefreshToken(userID uint32) (uuid.UUID, string, error) {
	return a.generateToken(userID, 65*24*60*60) // 65 days
}
func (a *JwtAuthorizator) CreateAccessToken(userID uint32) (string, error) {
	_, tokenStr, err := a.generateToken(userID, 30*60) // 30 minutes
	return tokenStr, err
}

// generateToken generates a JWT token string for the given user ID
func (a *JwtAuthorizator) generateToken(userID uint32, expireSeconds uint32) (uuid.UUID, string, error) {
	uuidValue, err := uuid.NewV7()
	if err != nil {
		return uuid.UUID{}, "", err
	}
	jti := base64.RawStdEncoding.EncodeToString(uuidValue[:])
	claims := JWTClaims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Duration(expireSeconds) * time.Second)),
			Issuer:    "forum", // TODO: put server url here
			ID:        jti,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenStr, err := token.SignedString(a.Secret)

	return uuidValue, tokenStr, err
}

// checks if the token is valid and returns claims
func (a *JwtAuthorizator) ValidateToken(tokenStr string) (*JWTClaims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &JWTClaims{}, func(token *jwt.Token) (interface{}, error) {
		return a.Secret, nil
	})
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(*JWTClaims)
	if !ok {
		return nil, errors.New("invalid token claims")
	}

	return claims, nil
}
func (a *JwtAuthorizator) JwtID(tokenString string) (uuid.UUID, error) {
	var u uuid.UUID
	claims, err := a.ValidateToken(tokenString)
	if err != nil {
		return u, err
	}
	uuidBytes, err := base64.RawStdEncoding.DecodeString(claims.ID)
	if err != nil {
		return u, err
	}
	copy(u[:], uuidBytes)
	return u, nil
}
