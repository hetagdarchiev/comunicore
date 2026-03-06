package tests

import (
	"fmt"
	"net/http"
	"testing"

	"github.com/gavv/httpexpect/v2"
)

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
		exp := expectCreate(t, baseURL)

		obj := exp.POST(baseURL + userCreatePath).
			WithJSON(map[string]any{
				"name":     user.Name,
				"email":    user.Email,
				"password": user.Password,
			}).
			Expect().
			Status(http.StatusCreated).JSON().Object()
		obj.Keys().ContainsOnly("id", "name", "email")
		obj.Value("id").Number().Gt(0)
		obj.Value("name").IsEqual(user.Name)
		obj.Value("email").IsEqual(user.Email)

		user.ID = int(obj.Value("id").Number().Raw())
	})

	return user
}

func testUserUpdateOk(t *testing.T, baseURL string, accessToken string, userID int) ForumUser {
	user := ForumUser{}
	t.Run("Test UserUpdate OK", func(t *testing.T) {
		userIdStr := fmt.Sprintf("%d", userID)
		exp := expectCreate(t, baseURL)
		auth := exp.Builder(func(req *httpexpect.Request) {
			req.WithHeader("Authorization", "Bearer "+accessToken)
		})

		res := auth.POST(baseURL+userUpdatePath, userIdStr).
			WithJSON(map[string]any{
				"name":     "tester",
				"email":    "new@mail.ru",
				"password": "super_password_forever",
			}).
			Expect().
			Status(http.StatusOK).JSON().Object()

		res.Keys().ContainsOnly("id", "name", "email")

		user.ID = int(res.Value("id").Number().Raw())
		user.Name = res.Value("name").String().Raw()
		user.Email = res.Value("email").String().Raw()
	})

	return user
}
func testUserMeOk(t *testing.T, baseURL string, accessToken string) ForumUser {
	var user ForumUser
	t.Run("Test UserMe OK", func(t *testing.T) {
		exp := expectCreate(t, baseURL)
		auth := exp.Builder(func(req *httpexpect.Request) {
			req.WithHeader("Authorization", "Bearer "+accessToken)
		})

		res := auth.GET(baseURL + userMePath).
			WithJSON(map[string]any{
				"name":     "tester",
				"email":    "new@mail.ru",
				"password": "super_password_forever",
			}).
			Expect().
			Status(http.StatusOK).JSON().Object()

		res.Keys().ContainsOnly("id", "name", "email")

		user.ID = int(res.Value("id").Number().Raw())
		user.Name = res.Value("name").String().Raw()
		user.Email = res.Value("email").String().Raw()
	})

	return user
}

func testUserGetOk(t *testing.T, baseURL string, accessToken string, userID int) ForumUser {
	var user ForumUser
	t.Run("Test UserGet OK", func(t *testing.T) {
		userIdStr := fmt.Sprintf("%d", userID)
		exp := expectCreate(t, baseURL)
		auth := exp.Builder(func(req *httpexpect.Request) {
			req.WithHeader("Authorization", "Bearer "+accessToken)
		})

		res := auth.GET(baseURL+userGetPath, userIdStr).
			Expect().
			Status(http.StatusOK).JSON().Object()

		res.Keys().ContainsOnly("id", "name", "email")

		user.ID = int(res.Value("id").Number().Raw())
		user.Name = res.Value("name").String().Raw()
		user.Email = res.Value("email").String().Raw()
	})

	return user
}
