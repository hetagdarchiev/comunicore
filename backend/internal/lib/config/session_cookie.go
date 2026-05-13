// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package config

import (
	"net/http"
	"strings"
)

// SessionCookieOpts derives Set-Cookie flags from [AppConfig.Server.BaseURL].
// HTTPS: Secure + SameSite=None (cross-origin creds, e.g. SPA on another host).
// HTTP (typical local dev): not Secure + SameSite=Lax so browsers send sid on fetch from another localhost port.
func SessionCookieOpts(baseURL string) (secure bool, sameSite http.SameSite) {
	s := strings.TrimSpace(strings.ToLower(baseURL))
	if strings.HasPrefix(s, "https:") {
		return true, http.SameSiteNoneMode
	}
	return false, http.SameSiteLaxMode
}
