package config

import (
	"net/http"
	"strings"
)

/*
Настраиваем флаги Set-Cookie в зависимости от протокола в [AppConfig.Server.BaseURL].
Для прода (HTTPS) выкручиваем безопасность на максимум: Secure и SameSite=None, чтобы внешние фронты могли слать креды.
Для локальной разработки (HTTP) ставим Lax и убираем Secure, иначе браузеры просто «забудут» про ваш sid при первом же fetch с другого порта.
*/
func SessionCookieOpts(baseURL string) (secure bool, sameSite http.SameSite) {
	s := strings.TrimSpace(strings.ToLower(baseURL))
	if strings.HasPrefix(s, "https:") {
		return true, http.SameSiteNoneMode
	}
	return false, http.SameSiteLaxMode
}
