//

package handler

import (
	"context"
	"net/http"
)

// context keys (use unexported types to prevent collisions)
type globalContextKey struct{}

type GlobalContext struct {
	Request        *http.Request
	ResponseWriter http.ResponseWriter

	RefreshToken      string
	AccessToken       string
	UserID            int
	RefreshTokenIsSet bool
	AccessTokenIsSet  bool
	UserIDIsSet       bool
}

// WithGlobalContext is a middleware that stores GlobalContext in the request context.
func WithGlobalContext(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := context.WithValue(r.Context(), globalContextKey{}, &GlobalContext{
			Request:        r,
			ResponseWriter: w,
		})
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func GlobalContextFromContext(ctx context.Context) *GlobalContext {
	if v := ctx.Value(globalContextKey{}); v != nil {
		if gc, ok := v.(*GlobalContext); ok {
			return gc
		}
	}
	return nil
}
